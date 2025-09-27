export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-accent via-primary-dark to-primary text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-12 left-12 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-28 right-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-16 left-1/3 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-28 right-1/4 w-28 h-28 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Contact Us
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
              Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="font-heading font-bold text-lg mb-2">Email Us</h3>
              <p className="text-sm opacity-90">info@ceylonnaturelink.com</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="font-heading font-bold text-lg mb-2">Call Us</h3>
              <p className="text-sm opacity-90">+94 11 234 5678</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="font-heading font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-sm opacity-90">Colombo, Sri Lanka</p>
            </div>
          </div>

          {/* Response Time Promise */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Quick Response Guarantee</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              We respond to all inquiries within 24 hours. Our experienced team is ready to help you with 
              product information, pricing, and custom solutions for your business needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
