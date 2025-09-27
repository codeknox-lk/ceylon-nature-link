export default function BrandsHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-100">
      {/* Minimalistic Nature Elements */}
      <div className="absolute inset-0">
        {/* Brand-inspired patterns */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-emerald-200/30 rounded-full"></div>
        <div className="absolute top-40 right-32 w-12 h-12 bg-teal-300/20 rounded-full"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-emerald-200/25 rounded-full"></div>
        <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-teal-300/30 rounded-full"></div>
        
        {/* Organic lines */}
        <div className="absolute top-1/3 left-16 w-24 h-1 bg-emerald-300/40 rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-1/4 right-20 w-20 h-1 bg-teal-200/50 rounded-full transform rotate-6"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center">
            <div className="mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏷️</span>
              </div>
              <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-emerald-800 mb-6">
                Our Brands
              </h1>
              <p className="text-xl md:text-2xl text-emerald-700/80 leading-relaxed max-w-3xl mx-auto">
                Discover our carefully curated collection of premium Sri Lankan brands, each representing the finest quality and authentic heritage of our island nation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
