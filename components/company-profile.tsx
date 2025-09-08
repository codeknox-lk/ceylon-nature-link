import { Card, CardContent } from "@/components/ui/card"

const companyFacts = [
  {
    title: "Years of Experience",
    value: "25+",
    description: "Decades of expertise in natural product processing",
  },
  {
    title: "Countries Served",
    value: "25+",
    description: "Global reach across multiple continents",
  },
  {
    title: "Product Categories",
    value: "4",
    description: "Spices, Tea, Herbal Products, Dehydrated Fruits",
  },
  {
    title: "Certifications",
    value: "ISO & Organic",
    description: "International quality and organic certifications",
  },
  {
    title: "Processing Capacity",
    value: "500+ MT",
    description: "Monthly processing capacity for various products",
  },
  {
    title: "Local Farmers",
    value: "200+",
    description: "Direct partnerships with Sri Lankan farmers",
  },
]

const companyValues = [
  {
    title: "Quality Excellence",
    description:
      "Uncompromising commitment to delivering premium quality natural products that meet international standards.",
    icon: "⭐",
  },
  {
    title: "Sustainable Practices",
    description:
      "Environmentally responsible sourcing and processing methods that support local communities and ecosystems.",
    icon: "🌱",
  },
  {
    title: "Authentic Heritage",
    description:
      "Preserving traditional Sri Lankan processing methods while embracing modern technology for consistency.",
    icon: "🏛️",
  },
]

export default function CompanyProfile() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-dark mb-4">Company Profile</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Key facts and figures that define our commitment to excellence in Sri Lankan natural products
          </p>
        </div>

        {/* Company Facts Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {companyFacts.map((fact, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{fact.value}</div>
                <h3 className="font-heading font-semibold text-sm text-primary-dark mb-2">{fact.title}</h3>
                <p className="text-xs text-gray-600">{fact.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Company Values */}
        <div className="bg-gray-50 nature-texture rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="font-heading font-bold text-2xl md:text-3xl text-primary-dark mb-4">Our Core Values</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide our operations and define our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h4 className="font-heading font-semibold text-lg text-primary-dark mb-3">{value.title}</h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <div className="bg-primary text-white rounded-2xl p-8 md:p-12">
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-6">Our Mission</h3>
            <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
              To be the leading bridge between Sri Lanka's rich agricultural heritage and global markets, delivering
              premium natural products that showcase the authentic flavors and wellness benefits of our island nation
              while supporting sustainable farming practices and local communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
