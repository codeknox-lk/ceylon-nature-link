import { EncryptionService, SecurityValidator, AuditLogger } from './security';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    district: string;
    postalCode: string;
    country: string;
  };
  role: 'customer' | 'admin' | 'moderator';
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  loginAttempts: number;
  lockedUntil?: string;
}

export interface LoginAttempt {
  email: string;
  ip: string;
  userAgent: string;
  timestamp: string;
  success: boolean;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  isActive: boolean;
}

// User authentication service
export class AuthService {
  private static users: Map<string, User> = new Map();
  private static sessions: Map<string, Session> = new Map();
  private static loginAttempts: LoginAttempt[] = [];

  // Register new user
  static async registerUser(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string;
  }): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      // Validate email
      if (!SecurityValidator.isValidEmail(userData.email)) {
        return { success: false, error: 'Invalid email address' };
      }

      // Check if user already exists
      if (this.users.has(userData.email)) {
        return { success: false, error: 'User already exists' };
      }

      // Validate password
      const passwordValidation = SecurityValidator.validatePassword(userData.password);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.errors.join(', ') };
      }

      // Validate phone if provided
      if (userData.phone && !SecurityValidator.isValidSriLankanPhone(userData.phone)) {
        return { success: false, error: 'Invalid Sri Lankan phone number' };
      }

      // Hash password
      const hashedPassword = await EncryptionService.hashPassword(userData.password);

      // Create user
      const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email: userData.email.toLowerCase(),
        firstName: SecurityValidator.sanitizeHtml(userData.firstName),
        lastName: SecurityValidator.sanitizeHtml(userData.lastName),
        phone: userData.phone,
        role: 'customer',
        isEmailVerified: false,
        isPhoneVerified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        loginAttempts: 0
      };

      // Store user (in production, this would be in a database)
      this.users.set(user.email, user);
      
      // Store hashed password separately (in production, this would be in a secure database)
      localStorage.setItem(`password_${user.email}`, hashedPassword);

      // Log registration
      AuditLogger.log('INFO', 'User registered', { userId: user.id, email: user.email });

      return { success: true, user };
    } catch (error) {
      AuditLogger.log('ERROR', 'Registration failed', { error: error.message, email: userData.email });
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  }

  // Login user
  static async loginUser(
    email: string,
    password: string,
    ipAddress: string,
    userAgent: string
  ): Promise<{ success: boolean; user?: User; session?: Session; error?: string }> {
    try {
      const normalizedEmail = email.toLowerCase();
      const user = this.users.get(normalizedEmail);

      // Record login attempt
      const attempt: LoginAttempt = {
        email: normalizedEmail,
        ip: ipAddress,
        userAgent,
        timestamp: new Date().toISOString(),
        success: false
      };

      // Check if user exists
      if (!user) {
        attempt.success = false;
        this.loginAttempts.push(attempt);
        AuditLogger.logSecurityEvent('Failed login attempt', { email: normalizedEmail, ip: ipAddress });
        return { success: false, error: 'Invalid credentials' };
      }

      // Check if account is locked
      if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
        AuditLogger.logSecurityEvent('Login attempt on locked account', { userId: user.id, email: normalizedEmail });
        return { success: false, error: 'Account is temporarily locked. Please try again later.' };
      }

      // Verify password
      const storedPassword = localStorage.getItem(`password_${normalizedEmail}`);
      if (!storedPassword) {
        attempt.success = false;
        this.loginAttempts.push(attempt);
        return { success: false, error: 'Invalid credentials' };
      }

      const isPasswordValid = await EncryptionService.verifyPassword(password, storedPassword);
      
      if (!isPasswordValid) {
        // Increment login attempts
        user.loginAttempts += 1;
        
        // Lock account after 5 failed attempts
        if (user.loginAttempts >= 5) {
          user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString(); // 15 minutes
          AuditLogger.logSecurityEvent('Account locked due to failed login attempts', { userId: user.id, email: normalizedEmail });
        }
        
        user.updatedAt = new Date().toISOString();
        this.users.set(normalizedEmail, user);
        
        attempt.success = false;
        this.loginAttempts.push(attempt);
        AuditLogger.logSecurityEvent('Failed login attempt', { userId: user.id, email: normalizedEmail, attempts: user.loginAttempts });
        return { success: false, error: 'Invalid credentials' };
      }

      // Reset login attempts on successful login
      user.loginAttempts = 0;
      user.lockedUntil = undefined;
      user.lastLoginAt = new Date().toISOString();
      user.updatedAt = new Date().toISOString();
      this.users.set(normalizedEmail, user);

      // Create session
      const session = await this.createSession(user.id, ipAddress, userAgent);

      attempt.success = true;
      this.loginAttempts.push(attempt);

      // Log successful login
      AuditLogger.log('INFO', 'User logged in', { userId: user.id, email: normalizedEmail, sessionId: session.id });

      return { success: true, user, session };
    } catch (error) {
      AuditLogger.log('ERROR', 'Login failed', { error: error.message, email });
      return { success: false, error: 'Login failed. Please try again.' };
    }
  }

  // Create session
  private static async createSession(userId: string, ipAddress: string, userAgent: string): Promise<Session> {
    const session: Session = {
      id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      token: EncryptionService.generateKey(),
      expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 minutes
      ipAddress,
      userAgent,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    this.sessions.set(session.id, session);
    return session;
  }

  // Validate session
  static async validateSession(sessionId: string, token: string): Promise<{ valid: boolean; user?: User; session?: Session }> {
    const session = this.sessions.get(sessionId);
    
    if (!session || !session.isActive) {
      return { valid: false };
    }

    if (session.token !== token) {
      return { valid: false };
    }

    if (new Date(session.expiresAt) < new Date()) {
      session.isActive = false;
      this.sessions.set(sessionId, session);
      return { valid: false };
    }

    const user = Array.from(this.users.values()).find(u => u.id === session.userId);
    if (!user) {
      return { valid: false };
    }

    return { valid: true, user, session };
  }

  // Logout user
  static async logoutUser(sessionId: string): Promise<{ success: boolean }> {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.isActive = false;
      this.sessions.set(sessionId, session);
      AuditLogger.log('INFO', 'User logged out', { sessionId, userId: session.userId });
    }
    return { success: true };
  }

  // Update user profile
  static async updateUserProfile(
    userId: string,
    updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phone' | 'address'>>
  ): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const user = Array.from(this.users.values()).find(u => u.id === userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Validate phone if provided
      if (updates.phone && !SecurityValidator.isValidSriLankanPhone(updates.phone)) {
        return { success: false, error: 'Invalid Sri Lankan phone number' };
      }

      // Update user data
      if (updates.firstName) user.firstName = SecurityValidator.sanitizeHtml(updates.firstName);
      if (updates.lastName) user.lastName = SecurityValidator.sanitizeHtml(updates.lastName);
      if (updates.phone) user.phone = updates.phone;
      if (updates.address) {
        user.address = {
          street: SecurityValidator.sanitizeAddress(updates.address.street),
          city: SecurityValidator.sanitizeHtml(updates.address.city),
          district: SecurityValidator.sanitizeHtml(updates.address.district),
          postalCode: SecurityValidator.sanitizeHtml(updates.address.postalCode),
          country: 'Sri Lanka'
        };
      }

      user.updatedAt = new Date().toISOString();
      this.users.set(user.email, user);

      AuditLogger.log('INFO', 'User profile updated', { userId, updates });
      return { success: true, user };
    } catch (error) {
      AuditLogger.log('ERROR', 'Profile update failed', { error: error.message, userId });
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  }

  // Change password
  static async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const user = Array.from(this.users.values()).find(u => u.id === userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Verify current password
      const storedPassword = localStorage.getItem(`password_${user.email}`);
      if (!storedPassword) {
        return { success: false, error: 'Current password is incorrect' };
      }

      const isCurrentPasswordValid = await EncryptionService.verifyPassword(currentPassword, storedPassword);
      if (!isCurrentPasswordValid) {
        return { success: false, error: 'Current password is incorrect' };
      }

      // Validate new password
      const passwordValidation = SecurityValidator.validatePassword(newPassword);
      if (!passwordValidation.isValid) {
        return { success: false, error: passwordValidation.errors.join(', ') };
      }

      // Hash new password
      const hashedNewPassword = await EncryptionService.hashPassword(newPassword);
      localStorage.setItem(`password_${user.email}`, hashedNewPassword);

      user.updatedAt = new Date().toISOString();
      this.users.set(user.email, user);

      AuditLogger.log('INFO', 'Password changed', { userId });
      return { success: true };
    } catch (error) {
      AuditLogger.log('ERROR', 'Password change failed', { error: error.message, userId });
      return { success: false, error: 'Password change failed. Please try again.' };
    }
  }

  // Get user by ID
  static getUserById(userId: string): User | null {
    return Array.from(this.users.values()).find(u => u.id === userId) || null;
  }

  // Get user by email
  static getUserByEmail(email: string): User | null {
    return this.users.get(email.toLowerCase()) || null;
  }

  // Get all users (admin only)
  static getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  // Delete user (admin only)
  static async deleteUser(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const user = Array.from(this.users.values()).find(u => u.id === userId);
      if (!user) {
        return { success: false, error: 'User not found' };
      }

      // Remove user
      this.users.delete(user.email);
      localStorage.removeItem(`password_${user.email}`);

      // Deactivate all sessions
      for (const session of this.sessions.values()) {
        if (session.userId === userId) {
          session.isActive = false;
        }
      }

      AuditLogger.log('INFO', 'User deleted', { userId, email: user.email });
      return { success: true };
    } catch (error) {
      AuditLogger.log('ERROR', 'User deletion failed', { error: error.message, userId });
      return { success: false, error: 'User deletion failed. Please try again.' };
    }
  }

  // Get login attempts (admin only)
  static getLoginAttempts(): LoginAttempt[] {
    return this.loginAttempts.slice(-100); // Last 100 attempts
  }

  // Clean up expired sessions
  static cleanupExpiredSessions(): void {
    const now = new Date();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (new Date(session.expiresAt) < now) {
        session.isActive = false;
        this.sessions.set(sessionId, session);
      }
    }
  }
}
