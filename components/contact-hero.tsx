export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 pb-16 bg-gradient-to-br from-accent via-primary-dark to-primary text-white relative overflow-hidden">
      {/* Nature-inspired Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        {/* Communication-inspired organic shapes */}
        <div className="absolute top-12 left-12 w-32 h-32 bg-white rounded-full transform rotate-45"></div>
        <div className="absolute top-28 right-20 w-24 h-24 bg-white rounded-full transform rotate-12"></div>
        <div className="absolute bottom-16 left-1/3 w-20 h-20 bg-white rounded-full transform -rotate-12"></div>
        <div className="absolute bottom-28 right-1/4 w-28 h-28 bg-white rounded-full transform rotate-45"></div>
        {/* Flowing communication lines */}
        <div className="absolute top-1/3 left-6 w-32 h-4 bg-white/20 rounded-full transform -rotate-6"></div>
        <div className="absolute bottom-1/4 right-8 w-24 h-3 bg-white/20 rounded-full transform rotate-6"></div>
        <div className="absolute top-1/2 left-1/4 w-20 h-2 bg-white/20 rounded-full transform rotate-12"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-6 drop-shadow-lg">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl leading-relaxed">
            Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri
            Lankan natural products.
          </p>
        </div>
      </div>
    </section>
  )
}
