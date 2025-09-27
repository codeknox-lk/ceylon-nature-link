export default function AboutHero() {
  return (
    <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary via-primary-dark to-accent text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-20 h-20 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              About Ceylon Nature Link
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
              Premier Sri Lankan company specializing in premium dehydrated fruits, authentic spices, and traditional herbal products.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">25+</div>
              <div className="text-sm md:text-base opacity-90">Years Experience</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-sm md:text-base opacity-90">Countries Served</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-sm md:text-base opacity-90">Happy Customers</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base opacity-90">Natural Products</div>
            </div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              To bridge the gap between local farmers and global markets, delivering exceptional quality natural products 
              that showcase Sri Lanka's biodiversity while maintaining sustainable practices and authentic flavors.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
