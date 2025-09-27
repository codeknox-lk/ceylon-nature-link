export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/sri-lankan-tea-plantation.png"
          alt="Sri Lankan tea plantation"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="font-heading font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-8 drop-shadow-2xl">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl drop-shadow-lg">
              Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri
              Lankan natural products.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
