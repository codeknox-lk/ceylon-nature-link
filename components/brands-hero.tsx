export default function BrandsHero() {
  return (
    <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-primary to-primary-light text-white relative overflow-hidden">
      {/* Nature-inspired Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {/* Brand-inspired organic shapes */}
        <div className="absolute top-16 left-16 w-24 h-24 bg-white rounded-full transform rotate-45"></div>
        <div className="absolute top-32 right-20 w-20 h-20 bg-white rounded-full transform rotate-12"></div>
        <div className="absolute bottom-24 left-1/4 w-16 h-16 bg-white rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-white rounded-full transform rotate-45"></div>
        {/* Brand flow lines */}
        <div className="absolute top-1/4 left-8 w-32 h-8 bg-white/20 rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-1/3 right-12 w-24 h-6 bg-white/20 rounded-full transform rotate-12"></div>
        <div className="absolute top-1/2 left-1/3 w-20 h-4 bg-white/20 rounded-full transform rotate-6"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 drop-shadow-lg">
            Our Brands
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Discover our carefully curated collection of premium Sri Lankan brands, each representing the finest quality
            and authentic heritage of our island nation.
          </p>
        </div>
      </div>
    </section>
  )
}
