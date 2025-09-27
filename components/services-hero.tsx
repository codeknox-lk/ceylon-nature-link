export default function ServicesHero() {
  return (
    <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary-dark via-primary to-accent text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-36 h-36 bg-white rounded-full"></div>
        <div className="absolute top-32 right-12 w-28 h-28 bg-white rounded-full"></div>
        <div className="absolute bottom-24 left-1/4 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute bottom-16 right-1/3 w-32 h-32 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Our Services
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
              Comprehensive solutions tailored to meet your business needs with our premium Sri Lankan natural products and expert industry knowledge.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="font-heading font-bold text-lg mb-2">Bulk Export</h3>
              <p className="text-sm opacity-90">Large quantity exports with competitive pricing</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🏷️</div>
              <h3 className="font-heading font-bold text-lg mb-2">Private Labeling</h3>
              <p className="text-sm opacity-90">Custom branding and packaging solutions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="font-heading font-bold text-lg mb-2">Online Platform</h3>
              <p className="text-sm opacity-90">Digital ordering and tracking systems</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="font-heading font-bold text-lg mb-2">Corporate Gifting</h3>
              <p className="text-sm opacity-90">Premium gift sets and custom packages</p>
            </div>
          </div>

          {/* Value Proposition */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Why Choose Us?</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              With over 25 years of experience in Sri Lankan natural products, we provide end-to-end solutions 
              from sourcing to delivery, ensuring quality and authenticity in every transaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
