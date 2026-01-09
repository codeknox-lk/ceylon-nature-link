import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const products = [
  {
    id: 1,
    category: "Spices",
    name: "Premium Ceylon Spices",
    description:
      "Authentic Sri Lankan spices including cinnamon, cardamom, pepper, and cloves. Hand-selected from the finest estates and processed using traditional methods to preserve their natural oils and flavors.",
    image: "/sri-lankan-spices-collection.png",
    price: "From $15.99",
    features: [
      "100% Pure Ceylon Origin",
      "Hand-Selected Quality",
      "Traditional Processing",
      "Export Grade",
    ],
    products: [
      "Ceylon Cinnamon",
      "Black Pepper",
      "Cardamom",
      "Cloves",
      "Nutmeg",
      "Turmeric",
    ],
  },
  {
    id: 2,
    category: "Tea",
    name: "Ceylon Tea Collection",
    description:
      "World-renowned Ceylon tea from the highland estates of Sri Lanka. Our collection includes black tea, green tea, and specialty blends that capture the unique terroir of our mountain regions.",
    image: "/ceylon-tea-collection.png",
    price: "From $18.99",
    features: [
      "Highland Estate Tea",
      "Single Origin",
      "BOPF Grade",
      "Sustainable Sourcing",
    ],
    products: [
      "Earl Grey",
      "English Breakfast",
      "Green Tea",
      "White Tea",
      "Herbal Blends",
      "Flavored Teas",
    ],
  },
  {
    id: 3,
    category: "Herbal Products",
    name: "Ayurvedic Herbal Range",
    description:
      "Traditional Ayurvedic herbs and wellness products sourced from Sri Lanka's rich biodiversity. Each product is carefully processed to maintain its therapeutic properties and natural potency.",
    image: "/ayurvedic-herbal-products.png",
    price: "From $22.99",
    features: [
      "Ayurvedic Tradition",
      "Organic Certified",
      "Therapeutic Grade",
      "Lab Tested",
    ],
    products: [
      "Gotukola",
      "Beli Leaves",
      "Neem",
      "Moringa",
      "Ashwagandha",
      "Wellness Teas",
    ],
  },
  {
    id: 4,
    category: "Dehydrated Fruits",
    name: "Tropical Fruit Selection",
    description:
      "Naturally dehydrated tropical fruits that preserve the authentic taste and nutritional value of fresh Sri Lankan fruits. Perfect for healthy snacking and culinary applications.",
    image: "/dehydrated-tropical-fruits.png",
    price: "From $12.99",
    features: [
      "No Added Sugar",
      "Natural Dehydration",
      "Nutrient Rich",
      "Long Shelf Life",
    ],
    products: [
      "Mango Strips",
      "Pineapple Rings",
      "Papaya Chunks",
      "Banana Chips",
      "Jackfruit",
      "Mixed Fruit",
    ],
  },
];

export default function ProductsGrid() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {product.category}
                </div>
              </div>

              <CardContent className="p-5 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 sm:mb-4 gap-2">
                  <h3 className="font-heading font-bold text-xl sm:text-2xl text-primary-dark">
                    {product.name}
                  </h3>
                  <span className="text-lg sm:text-xl font-semibold text-primary">
                    {product.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-heading font-semibold text-base sm:text-lg text-primary-dark mb-2 sm:mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs sm:text-sm text-gray-600"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                        <span className="break-words">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product List */}
                <div className="mb-4 sm:mb-6">
                  <h4 className="font-heading font-semibold text-base sm:text-lg text-primary-dark mb-2 sm:mb-3">
                    Available Products
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.products.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 hover:scale-105 border-0 min-h-[48px] text-sm sm:text-base touch-manipulation">
                    View Details
                  </Button>
                  <Button className="flex-1 border border-primary bg-white text-primary hover:bg-primary hover:text-white active:scale-95 transition-all duration-300 hover:scale-105 min-h-[48px] text-sm sm:text-base touch-manipulation">
                    Request Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
