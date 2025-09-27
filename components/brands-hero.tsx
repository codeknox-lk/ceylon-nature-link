export default function BrandsHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="text-center lg:text-left">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-6">
                <span className="text-2xl">🏷️</span>
              </div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-emerald-800 mb-6">
                Our Brands
              </h1>
              <p className="text-xl md:text-2xl text-emerald-700/80 leading-relaxed">
                Discover our carefully curated collection of premium Sri Lankan brands, each representing the finest quality and authentic heritage of our island nation.
              </p>
            </div>
            
            {/* Right side - Image container */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 bg-emerald-200/30 rounded-3xl transform rotate-3"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src="/corporate-gift-sets.png"
                    alt="Corporate gift sets"
                    className="w-full h-full object-cover"
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
