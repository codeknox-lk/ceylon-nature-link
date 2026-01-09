import { Card, CardContent } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/animated-button";
import Link from "next/link";

const productCategories = [
  {
    id: 1,
    name: "Spices",
    description:
      "Premium Ceylon spices including Cinnamon, Cardamom, Clove and Pepper",
    longDescription:
      "Discover the authentic taste of Sri Lanka with our premium spice collection. From the world-famous Ceylon cinnamon to aromatic cardamom, pungent black pepper, and fragrant cloves, each spice is carefully sourced and processed to maintain its natural flavor and aroma.",
    image: "/sri-lankan-spices.png",
    icon: "",
    features: ["100% Natural", "Premium Quality", "Export Grade"],
    products: [
      "Cinnamon Sticks",
      "Cardamom Pods",
      "Black Pepper",
      "Clove",
    ],
  },
  {
    id: 2,
    name: "Herbal Products",
    description: "Traditional Ayurvedic herbs and wellness products",
    longDescription:
      "Embrace the healing power of traditional Ayurvedic herbs. Our herbal products combine ancient wisdom with modern quality standards, offering natural solutions for wellness and vitality.",
    image: "/sri-lankan-herbal-plants.png",
    icon: "",
    features: ["Ayurvedic", "Traditional Recipes", "Wellness Focus"],
    products: [
      "Moringa Tea",
      "Cinnamon Tea",
    ],
  },
  {
    id: 3,
    name: "Dehydrated Fruits",
    description: "Naturally dried tropical fruits preserving authentic flavors",
    longDescription:
      "Taste the tropics in every bite with our naturally dehydrated fruits. We preserve the authentic flavors and nutrients of Sri Lanka's finest produce using traditional drying methods.",
    image: "/sri-lankan-dehydrated-fruits.png",
    icon: "",
    features: ["No Preservatives", "Rich in Nutrients", "Natural Drying"],
    products: [
      "Dehydrated Mango",
      "Dehydrated Jackfruit",
    ],
  },
];

export default function ProductsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in-up">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary-dark mb-4 sm:mb-6 px-2">
            Our Premium Products
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-4">
            Explore our diverse range of premium Sri Lankan natural products,
            carefully selected and processed to maintain their authentic quality
            and traditional heritage.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {productCategories.map((category, index) => (
            <Card
              key={category.id}
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg sm:shadow-2xl bg-white/20 backdrop-blur-lg rounded-2xl sm:rounded-3xl hover:scale-105 border border-white/30 premium-card"
            >
              <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {category.icon && (
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white bg-opacity-90 rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                    {category.icon}
                  </div>
                )}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-primary text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs font-semibold shadow-lg">
                  Premium
                </div>
              </div>

              <CardContent className="p-4 sm:p-6 rounded-b-2xl sm:rounded-b-3xl">
                <h3 className="font-heading font-bold text-lg sm:text-xl text-primary-dark mb-2 sm:mb-3 group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>

                <p className="text-gray-600 mb-3 sm:mb-4 text-sm leading-relaxed">
                  {category.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {category.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Product List */}
                <div className="mb-4 sm:mb-6">
                  <p className="text-gray-500 text-xs font-semibold mb-2 uppercase tracking-wide">
                    Popular Products:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {category.products.map((product, idx) => (
                      <span
                        key={idx}
                        className="text-gray-600 text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 sm:space-y-3 flex flex-col items-center">
                  <Link
                    href={`/products-filter?category=${category.name.toLowerCase().replace(' ', '-')}`}
                    className="w-full"
                  >
                    <AnimatedButton variant="animated" className="w-full mb-2 min-h-[44px] text-sm sm:text-base touch-manipulation">
                      View Products
                    </AnimatedButton>
                  </Link>

                  <Link href="/contact" className="w-full">
                    <AnimatedButton
                      size="sm"
                      className="w-full border-2 border-purple-500 bg-purple-50 text-purple-700 hover:bg-green-400 hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 font-semibold min-h-[44px] text-sm sm:text-base touch-manipulation"
                    >
                      Request Quote
                    </AnimatedButton>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16 animate-fade-in-up animate-delay-500 px-4">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary-dark mb-3 sm:mb-4">
              Looking for Custom Solutions?
            </h3>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">
              We offer private labeling, bulk orders, and custom packaging
              solutions for businesses worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center">
              <Link href="/services" className="w-full sm:w-auto">
                <AnimatedButton
                  variant="animated"
                  size="lg"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 border-0 min-h-[48px] text-sm sm:text-base touch-manipulation"
                >
                  Explore Services
                </AnimatedButton>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <AnimatedButton
                  size="lg"
                  className="w-full sm:w-auto border-2 border-teal-500 bg-teal-50 text-teal-700 hover:bg-green-400 hover:text-white hover:scale-105 active:scale-95 px-6 sm:px-8 py-3 font-semibold transition-all duration-300 min-h-[48px] text-sm sm:text-base touch-manipulation"
                >
                  Get Custom Quote
                </AnimatedButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
