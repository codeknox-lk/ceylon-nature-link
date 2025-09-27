export default function ProductsHero() {
  return (
    <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-accent via-primary to-primary-dark text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-white rounded-full"></div>
        <div className="absolute top-40 right-16 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/4 w-28 h-28 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl mb-6">
              Our Premium Products
            </h1>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mb-8">
              Discover our premium collection of authentic Sri Lankan natural products, carefully sourced and processed to preserve their traditional flavors and nutritional benefits.
            </p>
          </div>

          {/* Product Categories Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🌶️</div>
              <h3 className="font-heading font-bold text-xl mb-2">Spices</h3>
              <p className="text-sm opacity-90">Premium Ceylon spices including cinnamon, cardamom, and pepper</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="font-heading font-bold text-xl mb-2">Herbal Products</h3>
              <p className="text-sm opacity-90">Traditional Ayurvedic herbs and wellness products</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center group hover:bg-white/20 transition-all duration-300">
              <div className="text-4xl mb-4">🥭</div>
              <h3 className="font-heading font-bold text-xl mb-2">Dehydrated Fruits</h3>
              <p className="text-sm opacity-90">Naturally dried tropical fruits preserving authentic flavors</p>
            </div>
          </div>

          {/* Quality Promise */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center">
            <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">Quality Promise</h2>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              Every product is carefully selected from trusted farms, processed using traditional methods, 
              and packaged to maintain freshness and authenticity for our global customers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
