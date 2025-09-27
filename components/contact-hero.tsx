export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl mb-6 text-green-600" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl text-purple-700/80 leading-relaxed">
                Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
              </p>
            </div>
            
            {/* Right side - Contact image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[28rem] h-[28rem] lg:w-[36rem] lg:h-[36rem]">
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
    </section>
  )
}
