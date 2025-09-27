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
            
            {/* Right side - Person with phone illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-purple-200/30 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex items-center justify-center">
                  {/* Person with phone illustration */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Person figure */}
                    <div className="relative">
                      {/* Head */}
                      <div className="w-16 h-16 bg-gray-200 rounded-full mb-2"></div>
                      {/* Body */}
                      <div className="w-20 h-24 bg-gray-300 rounded-lg"></div>
                      {/* Arms */}
                      <div className="absolute -left-2 top-8 w-6 h-16 bg-gray-300 rounded-full transform -rotate-12"></div>
                      <div className="absolute -right-2 top-8 w-6 h-16 bg-gray-300 rounded-full transform rotate-12"></div>
                      {/* Legs */}
                      <div className="absolute -left-1 bottom-0 w-8 h-12 bg-gray-300 rounded-full transform -rotate-6"></div>
                      <div className="absolute -right-1 bottom-0 w-8 h-12 bg-gray-300 rounded-full transform rotate-6"></div>
                    </div>
                    
                    {/* Phone */}
                    <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                      <div className="w-12 h-20 bg-red-500 rounded-lg transform rotate-12 shadow-lg">
                        <div className="w-8 h-12 bg-red-600 rounded-sm mx-auto mt-2"></div>
                        <div className="w-6 h-1 bg-red-700 rounded-full mx-auto mt-1"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
