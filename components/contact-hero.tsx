export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Minimalistic Nature Elements */}
      <div className="absolute inset-0">
        {/* Contact-inspired patterns */}
        <div className="absolute top-24 left-24 w-14 h-14 bg-purple-200/30 rounded-full"></div>
        <div className="absolute top-36 right-28 w-10 h-10 bg-pink-300/20 rounded-full"></div>
        <div className="absolute bottom-28 left-1/4 w-18 h-18 bg-purple-200/25 rounded-full"></div>
        <div className="absolute bottom-24 right-1/3 w-12 h-12 bg-pink-300/30 rounded-full"></div>
        
        {/* Organic lines */}
        <div className="absolute top-1/4 left-20 w-20 h-1 bg-purple-300/40 rounded-full transform -rotate-6"></div>
        <div className="absolute bottom-1/3 right-24 w-16 h-1 bg-pink-200/50 rounded-full transform rotate-12"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">📧</span>
              </div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-purple-800 mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-purple-700/80 leading-relaxed max-w-3xl mx-auto">
                Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
