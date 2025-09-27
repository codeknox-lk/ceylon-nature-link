import Link from "next/link"

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-4">
              <img src="/cnl-logo.png" alt="Ceylon Nature Link" className="w-20 h-20 drop-shadow-2xl" />
              <div>
                <h3 className="font-heading font-bold text-2xl text-white">Ceylon Nature Link</h3>
                <p className="text-accent text-sm font-medium tracking-wide">(Private) Limited</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg max-w-md">
              Premium Sri Lankan natural products for local retail, export, and tourists. Naturally Sri Lankan,
              Perfectly Global.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20"
              >
                <span className="text-xl">📘</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20"
              >
                <span className="text-xl">📷</span>
              </a>
              <a
                href="#"
                className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-primary hover:scale-110 transition-all duration-300 border border-white/20"
              >
                <span className="text-xl">💼</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-xl text-white">Quick Links</h4>
            <nav className="space-y-4">
              <Link
                href="/"
                className="block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                Home
              </Link>
              <Link
                href="/about"
                className="block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                About
              </Link>
              <Link
                href="/products"
                className="block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                Products
              </Link>
              <Link
                href="/services"
                className="block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                Services
              </Link>
              <Link
                href="/brands"
                className="block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                Brands
              </Link>
              <Link
                href="/contact"
                className="block text-gray-300 hover:text-accent transition-all duration-300 hover:translate-x-2 text-lg"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h4 className="font-heading font-bold text-xl text-white">Get In Touch</h4>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 text-gray-300">
                <span className="text-2xl mt-1">📍</span>
                <div>
                  <p className="font-semibold text-white text-lg">Our Location</p>
                  <p className="text-gray-400">Koholanwala, Homapola Road, 21000</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-gray-300">
                <span className="text-2xl mt-1">📞</span>
                <div>
                  <p className="font-semibold text-white text-lg">071 100 5969</p>
                  <p className="text-gray-400">Sat - Thu, 8AM - 5PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 text-gray-300">
                <span className="text-2xl mt-1">✉️</span>
                <div>
                  <p className="font-semibold text-white text-lg">info@ceylonnaturelink.com</p>
                  <p className="text-gray-400">We reply within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <p className="text-gray-400 text-lg">© 2024 Ceylon Nature Link (Private) Limited. All rights reserved.</p>
            <div className="flex space-x-8 text-gray-400">
              <a href="#" className="hover:text-accent transition-colors text-lg">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-accent transition-colors text-lg">
                Terms of Service
              </a>
              <a href="#" className="hover:text-accent transition-colors text-lg">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
