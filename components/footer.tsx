import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      
      {/* Floating Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-primary/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image 
                  src="/cnl-logo.png" 
                  alt="Ceylon Nature Link" 
                  width={80} 
                  height={80} 
                  className="drop-shadow-2xl"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg"></div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-white mb-2">Ceylon Nature Link</h3>
                <p className="text-accent text-sm font-medium tracking-wide">(Private) Limited</p>
                <div className="flex items-center space-x-2 mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-sm font-medium">Premium Quality</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg max-w-md">
              Premium Sri Lankan natural products for local retail, export, and tourists. 
              <span className="text-accent font-semibold"> Naturally Sri Lankan, Perfectly Global.</span>
            </p>
            
            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-heading font-semibold text-lg text-white">Follow Us</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20 hover:border-primary/50"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">📘</span>
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20 hover:border-primary/50"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">📷</span>
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20 hover:border-primary/50"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">💼</span>
                </a>
                <a
                  href="#"
                  className="group w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20 hover:border-primary/50"
                >
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">📱</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-xl text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </h4>
            <nav className="space-y-4">
              <Link
                href="/"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">🏠</span>
                <span className="ml-2">Home</span>
              </Link>
              <Link
                href="/about"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">ℹ️</span>
                <span className="ml-2">About</span>
              </Link>
              <Link
                href="/products-filter"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">🌶️</span>
                <span className="ml-2">Products</span>
              </Link>
              <Link
                href="/services"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">⚙️</span>
                <span className="ml-2">Services</span>
              </Link>
              <Link
                href="/brands"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">🏷️</span>
                <span className="ml-2">Brands</span>
              </Link>
              <Link
                href="/marketplace"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">🛒</span>
                <span className="ml-2">Marketplace</span>
              </Link>
              <Link
                href="/contact"
                className="group block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                <span className="group-hover:text-primary transition-colors duration-300">📞</span>
                <span className="ml-2">Contact</span>
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-xl text-white relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </h4>
            <div className="space-y-6">
              <div className="group flex items-start space-x-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <span className="text-lg">📍</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-lg group-hover:text-accent transition-colors duration-300">Our Location</p>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Homapola Road, Koholanwala, Matale</p>
                  <p className="text-gray-500 text-sm">Sri Lanka</p>
                </div>
              </div>
              
              <div className="group flex items-start space-x-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <span className="text-lg">📞</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-lg group-hover:text-accent transition-colors duration-300">+94 66 222 7474</p>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Mon - Sat, 8AM - 5PM</p>
                  <p className="text-gray-500 text-sm">WhatsApp: +94 76 156 6346</p>
                </div>
              </div>
              
              <div className="group flex items-start space-x-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300">
                  <span className="text-lg">✉️</span>
                </div>
                <div>
                  <p className="font-semibold text-white text-lg group-hover:text-accent transition-colors duration-300">info@ceylonnaturelink.com</p>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">We reply within 24 hours</p>
                  <p className="text-gray-500 text-sm">sales@ceylonnaturelink.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 bg-gradient-to-r from-primary/10 via-white/5 to-accent/10 rounded-3xl border border-white/10 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading font-bold text-2xl text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6">Get the latest updates on our premium Sri Lankan products and special offers.</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-2">
              <p className="text-gray-400 text-lg">© 2024 Ceylon Nature Link (Private) Limited.</p>
              <span className="text-gray-500">All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-gray-400">
              <a href="#" className="hover:text-accent transition-colors text-lg hover:scale-105 transform duration-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors text-lg hover:scale-105 transform duration-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors text-lg hover:scale-105 transform duration-300">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
