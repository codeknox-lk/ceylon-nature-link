import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const brands = [
  {
    id: 1,
    name: "Ceylon Gold",
    tagline: "Premium Tea Excellence",
    description:
      "Ceylon Gold represents the pinnacle of Sri Lankan tea craftsmanship. Our premium tea blends are sourced from the finest highland estates, where the unique climate and soil conditions create teas with exceptional flavor profiles and aromatic qualities.",
    logo: "/ceylon-gold-brand-logo.png",
    image: "/ceylon-gold-tea-estate.png",
    established: "1995",
    specialties: ["Black Tea", "Earl Grey", "English Breakfast", "Green Tea"],
    certifications: ["Organic", "Fair Trade", "ISO 22000"],
    markets: ["Europe", "North America", "Middle East"],
  },
  {
    id: 2,
    name: "Spice Island",
    tagline: "Authentic Ceylon Spices",
    description:
      "Spice Island brings you the authentic flavors of Sri Lanka through our premium spice collection. Each spice is carefully selected from traditional growing regions and processed using time-honored methods to preserve their natural oils and intense flavors.",
    logo: "/spice-island-brand-logo.png",
    image: "/spice-island-plantation.png",
    established: "1998",
    specialties: ["Ceylon Cinnamon", "Black Pepper", "Cardamom", "Cloves"],
    certifications: ["Organic", "HACCP", "ISO 9001"],
    markets: ["Asia Pacific", "Europe", "Americas"],
  },
  {
    id: 3,
    name: "Nature's Bounty",
    tagline: "Herbal Wellness Solutions",
    description:
      "Nature's Bounty harnesses the power of Sri Lanka's rich biodiversity to create premium herbal products and wellness solutions. Our products combine ancient Ayurvedic wisdom with modern processing techniques to deliver natural health benefits.",
    logo: "/nature-s-bounty-brand-logo.png",
    image: "/nature-s-bounty-herbs.png",
    established: "2005",
    specialties: [
      "Ayurvedic Herbs",
      "Wellness Teas",
      "Natural Supplements",
      "Herbal Extracts",
    ],
    certifications: ["Organic", "GMP", "Ayurvedic Council"],
    markets: ["Global", "Health Stores", "Wellness Centers"],
  },
  {
    id: 4,
    name: "Tropical Harvest",
    tagline: "Pure Dehydrated Fruits",
    description:
      "Tropical Harvest specializes in naturally dehydrated tropical fruits that capture the essence of Sri Lanka's abundant fruit varieties. Our gentle dehydration process preserves the natural sweetness and nutritional value of fresh fruits.",
    logo: "/tropical-harvest-brand-logo.png",
    image: "/tropical-harvest-fruits.png",
    established: "2010",
    specialties: [
      "Mango Strips",
      "Pineapple Rings",
      "Papaya Chunks",
      "Mixed Fruit Packs",
    ],
    certifications: ["Organic", "USDA", "EU Organic"],
    markets: ["Health Food Stores", "Retail Chains", "Export Markets"],
  },
  {
    id: 5,
    name: "Heritage Blends",
    tagline: "Traditional Recipe Collections",
    description:
      "Heritage Blends preserves traditional Sri Lankan recipes and flavor combinations passed down through generations. Our products represent the authentic taste of Sri Lankan cuisine and traditional wellness practices.",
    logo: "/heritage-blends-brand-logo.png",
    image: "/heritage-blends-traditional.png",
    established: "2015",
    specialties: [
      "Spice Blends",
      "Curry Powders",
      "Traditional Teas",
      "Recipe Mixes",
    ],
    certifications: [
      "Traditional Recipe",
      "Quality Assured",
      "Cultural Heritage",
    ],
    markets: ["Diaspora Communities", "Specialty Stores", "Restaurants"],
  },
];

export default function BrandsShowcase() {
  return (
    <section className="py-16 bg-gray-50 nature-texture">
      <div className="container mx-auto px-4">
        <div className="space-y-16">
          {brands.map((brand, index) => (
            <Card
              key={brand.id}
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Brand Image */}
                <div
                  className={`relative ${
                    index % 2 === 1 ? "lg:col-start-2" : ""
                  }`}
                >
                  <img
                    src={brand.image || "/placeholder.svg"}
                    alt={brand.name}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute top-6 left-6 bg-white p-4 rounded-lg shadow-lg">
                    <img
                      src={brand.logo || "/placeholder.svg"}
                      alt={`${brand.name} logo`}
                      className="h-16 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* Brand Content */}
                <CardContent
                  className={`p-8 lg:p-12 ${
                    index % 2 === 1 ? "lg:col-start-1" : ""
                  }`}
                >
                  <div className="space-y-6">
                    <div>
                      <h2 className="font-heading font-bold text-3xl text-primary-dark mb-2">
                        {brand.name}
                      </h2>
                      <p className="text-primary font-semibold text-lg">
                        {brand.tagline}
                      </p>
                      <p className="text-sm text-gray-500">
                        Established {brand.established}
                      </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {brand.description}
                    </p>

                    {/* Specialties */}
                    <div>
                      <h4 className="font-heading font-semibold text-lg text-primary-dark mb-3">
                        Specialties
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {brand.specialties.map((specialty, idx) => (
                          <span
                            key={idx}
                            className="bg-primary bg-opacity-10 text-primary px-3 py-1 rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Certifications & Markets */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-heading font-semibold text-sm text-primary-dark mb-2">
                          Certifications
                        </h4>
                        <ul className="space-y-1">
                          {brand.certifications.map((cert, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {cert}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-sm text-primary-dark mb-2">
                          Key Markets
                        </h4>
                        <ul className="space-y-1">
                          {brand.markets.map((market, idx) => (
                            <li
                              key={idx}
                              className="flex items-center text-sm text-gray-600"
                            >
                              <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                              {market}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button className="bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
                        View Products
                      </Button>
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Brand Story
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
