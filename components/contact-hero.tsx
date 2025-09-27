export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <span className="text-4xl">📧</span>
              </div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-purple-800 mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-purple-700/80 leading-relaxed">
                Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
              </p>
            </div>
            
            {/* Right side - Contact image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-purple-200/30 rounded-3xl transform rotate-3"></div>
                <div className="relative">
                  <img
                    src="/contact.png"
                    alt="Person with phone"
                    className="w-full h-full object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
