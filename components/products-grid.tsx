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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </div>
              </div>

              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-heading font-bold text-2xl text-primary-dark">
                    {product.name}
                  </h3>
                  <span className="text-xl font-semibold text-primary">
                    {product.price}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-lg text-primary-dark mb-3">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {product.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product List */}
                <div className="mb-6">
                  <h4 className="font-heading font-semibold text-lg text-primary-dark mb-3">
                    Available Products
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {product.products.map((item, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                    View Details
                  </Button>
                  <Button className="flex-1 border border-primary bg-white text-primary hover:bg-white hover:scale-105 transition-all duration-300">
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
