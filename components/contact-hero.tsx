export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-100">
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl mb-6 text-green-600 drop-shadow-lg" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Us
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
              </p>
            </div>
            
            {/* Right side - Contact image */}
            <div className="flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[32rem] lg:h-[32rem]">
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
