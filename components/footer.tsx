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

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative flex-shrink-0">
                <Image 
                  src="/cnl-logo.png" 
                  alt="Ceylon Nature Link" 
                  width={80} 
                  height={80} 
                  className="drop-shadow-2xl w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg"></div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-1 sm:mb-2">Ceylon Nature Link</h3>
                <p className="text-accent text-xs sm:text-sm font-medium tracking-wide">(Private) Limited</p>
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-green-400 text-xs sm:text-sm font-medium">Premium Quality</span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-base sm:text-lg max-w-md">
              Premium Sri Lankan natural products for local retail, export, and tourists. 
              <span className="text-accent font-semibold"> Naturally Sri Lankan, Perfectly Global.</span>
            </p>
            
            {/* Social Media */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-heading font-semibold text-base sm:text-lg text-white">Follow Us</h4>
              <div className="flex space-x-3 sm:space-x-4">
                <a
                  href="#"
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 hover:border-primary/50 touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="Facebook"
                >
                  <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">📘</span>
                </a>
                <a
                  href="#"
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 hover:border-primary/50 touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="Instagram"
                >
                  <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">📷</span>
                </a>
                <a
                  href="#"
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 hover:border-primary/50 touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="LinkedIn"
                >
                  <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">💼</span>
                </a>
                <a
                  href="#"
                  className="group w-11 h-11 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 active:scale-95 transition-all duration-300 border border-white/20 hover:border-primary/50 touch-manipulation min-w-[44px] min-h-[44px]"
                  aria-label="WhatsApp"
                >
                  <span className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">📱</span>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6 sm:space-y-8">
            <h4 className="font-heading font-bold text-lg sm:text-xl text-white relative">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-10 sm:w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </h4>
            <nav className="space-y-3 sm:space-y-4">
              <Link
                href="/"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">🏠</span>
                <span className="ml-2">Home</span>
              </Link>
              <Link
                href="/about"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">ℹ️</span>
                <span className="ml-2">About</span>
              </Link>
              <Link
                href="/products-filter"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">🌶️</span>
                <span className="ml-2">Products</span>
              </Link>
              <Link
                href="/services"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">⚙️</span>
                <span className="ml-2">Services</span>
              </Link>
              <Link
                href="/brands"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">🏷️</span>
                <span className="ml-2">Brands</span>
              </Link>
              <Link
                href="/marketplace"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">🛒</span>
                <span className="ml-2">Marketplace</span>
              </Link>
              <Link
                href="/contact"
                className="group flex items-center text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-base sm:text-lg min-h-[44px] touch-manipulation"
              >
                <span className="group-hover:text-primary transition-colors duration-300 text-lg sm:text-xl">📞</span>
                <span className="ml-2">Contact</span>
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <h4 className="font-heading font-bold text-lg sm:text-xl text-white relative">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-10 sm:w-12 h-1 bg-gradient-to-r from-primary to-accent rounded-full"></div>
            </h4>
            <div className="space-y-5 sm:space-y-6">
              <div className="group flex items-start space-x-3 sm:space-x-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 flex-shrink-0">
                  <span className="text-base sm:text-lg">📍</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-white text-base sm:text-lg group-hover:text-accent transition-colors duration-300">Our Location</p>
                  <p className="text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300 break-words">Homapola Road, Koholanwala, Matale</p>
                  <p className="text-gray-500 text-xs sm:text-sm">Sri Lanka</p>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 sm:space-x-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 flex-shrink-0">
                  <span className="text-base sm:text-lg">📞</span>
                </div>
                <div className="min-w-0 flex-1">
                  <a href="tel:+94662227474" className="font-semibold text-white text-base sm:text-lg group-hover:text-accent transition-colors duration-300 block break-all">+94 66 222 7474</a>
                  <p className="text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">Mon - Sat, 8AM - 5PM</p>
                  <a href="https://wa.me/94761566346" className="text-gray-500 text-xs sm:text-sm hover:text-primary transition-colors break-all">WhatsApp: +94 76 156 6346</a>
                </div>
              </div>
              
              <div className="group flex items-start space-x-3 sm:space-x-4 text-gray-300 hover:text-white transition-colors duration-300">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors duration-300 flex-shrink-0">
                  <span className="text-base sm:text-lg">✉️</span>
                </div>
                <div className="min-w-0 flex-1">
                  <a href="mailto:info@ceylonnaturelink.com" className="font-semibold text-white text-sm sm:text-base md:text-lg group-hover:text-accent transition-colors duration-300 block break-all">info@ceylonnaturelink.com</a>
                  <p className="text-gray-400 text-sm sm:text-base group-hover:text-gray-300 transition-colors duration-300">We reply within 24 hours</p>
                  <a href="mailto:sales@ceylonnaturelink.com" className="text-gray-500 text-xs sm:text-sm hover:text-primary transition-colors break-all">sales@ceylonnaturelink.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-gradient-to-r from-primary/10 via-white/5 to-accent/10 rounded-2xl sm:rounded-3xl border border-white/10 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white mb-3 sm:mb-4">Stay Updated</h3>
            <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6">Get the latest updates on our premium Sri Lankan products and special offers.</p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 sm:py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base min-h-[48px]"
              />
              <button className="px-6 py-3 sm:py-4 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 hover:scale-105 border-0 min-h-[48px] text-base sm:text-lg touch-manipulation">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 sm:mt-16 pt-8 sm:pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 sm:space-y-6 md:space-y-0 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <p className="text-gray-400 text-sm sm:text-base md:text-lg">© 2024 Ceylon Nature Link (Private) Limited.</p>
              <span className="text-gray-500 text-xs sm:text-sm md:text-base">All rights reserved.</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-gray-400">
              <a href="#" className="hover:text-accent transition-colors text-sm sm:text-base md:text-lg hover:scale-105 transform duration-300 min-h-[44px] flex items-center touch-manipulation">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors text-sm sm:text-base md:text-lg hover:scale-105 transform duration-300 min-h-[44px] flex items-center touch-manipulation">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors text-sm sm:text-base md:text-lg hover:scale-105 transform duration-300 min-h-[44px] flex items-center touch-manipulation">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
