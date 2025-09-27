export default function ContactHero() {
  return (
    <section className="pt-20 lg:pt-24 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div>
              <h1 className="font-bold text-6xl md:text-7xl lg:text-8xl text-green-600 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                Contact Us
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Get in touch with our team to discuss your requirements, request quotes, or learn more about our premium Sri Lankan natural products.
              </p>
            </div>
            
            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">📍</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Head Office</h3>
                </div>
                <p className="text-gray-600">Level 8, Valiant Towers<br/>46/7, Nawam Mawatha<br/>Colombo 02</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">🏭</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Factory</h3>
                </div>
                <p className="text-gray-600">364/5, Kelanitissa Mawatha<br/>Wanawasala, Kelaniya</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">📞</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Phone</h3>
                </div>
                <p className="text-gray-600">+94 77 958 9371</p>
              </div>
              
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-green-600 text-xl">✉️</span>
                  </div>
                  <h3 className="font-semibold text-lg text-gray-800">Email</h3>
                </div>
                <p className="text-gray-600">info@winloflavors.com</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-96 h-96 lg:w-[28rem] lg:h-[28rem]">
              <img
                src="/contact.png"
                alt="Person with phone"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We specialize in premium Sri Lankan natural products, offering comprehensive solutions for global distribution and private labeling.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Products</h3>
              <p className="text-gray-600">Dehydrated fruits, authentic spices, and traditional herbal products from Sri Lanka.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Global Distribution</h3>
              <p className="text-gray-600">Worldwide shipping and distribution solutions for your business needs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🏷️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Private Labeling</h3>
              <p className="text-gray-600">Custom branding and packaging solutions for your products.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Partner with Us?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join our network of satisfied customers and experience the quality of Sri Lankan natural products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-green-600 px-8 py-4 rounded-2xl font-semibold hover:bg-green-50 transition-colors">
              Get Quote
            </a>
            <a href="/marketplace" className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-green-600 transition-colors">
              View Marketplace
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
