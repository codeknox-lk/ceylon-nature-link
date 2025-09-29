"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Lock, Mail, User, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { SecurityValidator } from '@/lib/security';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string>('');

  // Login form
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Register form
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: ''
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Validate input
      const validationErrors: string[] = [];
      
      if (!SecurityValidator.isValidEmail(loginData.email)) {
        validationErrors.push('Please enter a valid email address');
      }
      
      if (loginData.password.length < 8) {
        validationErrors.push('Password must be at least 8 characters long');
      }
      
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulate login success
      const user = {
        id: 'user_123',
        email: loginData.email,
        firstName: 'John',
        lastName: 'Doe',
        role: 'customer'
      };

      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify({
        id: 'session_123',
        userId: user.id,
        token: 'token_123',
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      }));

      setSuccess('Login successful!');
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 1000);

    } catch (error) {
      setErrors(['Login failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);
    setSuccess('');

    try {
      // Validate input
      const validationErrors: string[] = [];
      
      if (!SecurityValidator.isValidEmail(registerData.email)) {
        validationErrors.push('Please enter a valid email address');
      }
      
      const passwordValidation = SecurityValidator.validatePassword(registerData.password);
      if (!passwordValidation.isValid) {
        validationErrors.push(...passwordValidation.errors);
      }
      
      if (registerData.password !== registerData.confirmPassword) {
        validationErrors.push('Passwords do not match');
      }
      
      if (registerData.firstName.length < 2) {
        validationErrors.push('First name must be at least 2 characters long');
      }
      
      if (registerData.lastName.length < 2) {
        validationErrors.push('Last name must be at least 2 characters long');
      }
      
      if (registerData.phone && !SecurityValidator.isValidSriLankanPhone(registerData.phone)) {
        validationErrors.push('Please enter a valid Sri Lankan phone number');
      }
      
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
        setIsLoading(false);
        return;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate registration success
      const user = {
        id: 'user_456',
        email: registerData.email,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        role: 'customer'
      };

      // Store user in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('session', JSON.stringify({
        id: 'session_456',
        userId: user.id,
        token: 'token_456',
        expiresAt: new Date(Date.now() + 30 * 60 * 1000).toISOString()
      }));

      setSuccess('Registration successful! Please check your email for verification.');
      setTimeout(() => {
        onSuccess(user);
        onClose();
      }, 1500);

    } catch (error) {
      setErrors(['Registration failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <Card className="border-0 shadow-none">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl font-bold text-primary-dark">
                {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <p className="text-gray-600">
              {activeTab === 'login' 
                ? 'Sign in to your account to continue shopping' 
                : 'Join Ceylon Nature Link for exclusive offers and fast checkout'
              }
            </p>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login" className="font-semibold">
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="register" className="font-semibold">
                  Sign Up
                </TabsTrigger>
              </TabsList>

              {/* Error/Success Messages */}
              {errors.length > 0 && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <ul className="space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Login Form */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="Enter your email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        className="pl-10 pr-10 border-gray-300 focus:border-primary focus:ring-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2 text-sm">
                      <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <button type="button" className="text-sm text-primary hover:text-primary-dark">
                      Forgot password?
                    </button>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>

              {/* Register Form */}
              <TabsContent value="register" className="space-y-4">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-firstName" className="text-sm font-medium text-gray-700">
                        First Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="register-firstName"
                          type="text"
                          placeholder="First name"
                          value={registerData.firstName}
                          onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                          className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-lastName" className="text-sm font-medium text-gray-700">
                        Last Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="register-lastName"
                          type="text"
                          placeholder="Last name"
                          value={registerData.lastName}
                          onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                          className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="Enter your email"
                        value={registerData.email}
                        onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-phone" className="text-sm font-medium text-gray-700">
                      Phone Number (Optional)
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-phone"
                        type="tel"
                        placeholder="+94 77 123 4567"
                        value={registerData.phone}
                        onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium text-gray-700">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a strong password"
                        value={registerData.password}
                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                        className="pl-10 pr-10 border-gray-300 focus:border-primary focus:ring-primary"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={registerData.confirmPassword}
                        onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-address" className="text-sm font-medium text-gray-700">
                      Address (Optional)
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="register-address"
                        type="text"
                        placeholder="Street address"
                        value={registerData.address}
                        onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
                        className="pl-10 border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-city" className="text-sm font-medium text-gray-700">
                        City
                      </Label>
                      <Input
                        id="register-city"
                        type="text"
                        placeholder="City"
                        value={registerData.city}
                        onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-district" className="text-sm font-medium text-gray-700">
                        District
                      </Label>
                      <Input
                        id="register-district"
                        type="text"
                        placeholder="District"
                        value={registerData.district}
                        onChange={(e) => setRegisterData({ ...registerData, district: e.target.value })}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-postalCode" className="text-sm font-medium text-gray-700">
                      Postal Code
                    </Label>
                    <Input
                      id="register-postalCode"
                      type="text"
                      placeholder="12345"
                      value={registerData.postalCode}
                      onChange={(e) => setRegisterData({ ...registerData, postalCode: e.target.value })}
                      className="border-gray-300 focus:border-primary focus:ring-primary"
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the{' '}
                      <a href="#" className="text-primary hover:text-primary-dark underline">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-primary hover:text-primary-dark underline">
                        Privacy Policy
                      </a>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl border-0"
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
