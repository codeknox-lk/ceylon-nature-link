import { Card, CardContent } from "@/components/ui/card"

const contactMethods = [
  {
    title: "Phone",
    details: ["071 100 5969"],
    icon: "📞",
    description: "Call us during business hours",
  },
  {
    title: "Email",
    details: ["info@ceylonnaturelink.com"],
    icon: "✉️",
    description: "Send us your inquiries",
  },
  {
    title: "Address",
    details: ["Koholanwala, Homapola Road", "21000, Sri Lanka"],
    icon: "📍",
    description: "Visit our location",
  },
]

const businessHours = [
  { day: "Monday - Saturday", hours: "8:00 AM - 5:00 PM" },
  { day: "Sunday", hours: "Closed" },
]

const departments = [
  {
    name: "Sales",
    email: "sales@ceylonnaturelink.com",
    phone: "+94 71 100 5969",
    description: "Product inquiries, quotes, and export orders",
  },
  {
    name: "Customer Service",
    email: "support@ceylonnaturelink.com",
    phone: "+94 66 222 7474",
    description: "General support and order assistance",
  },
]

export default function ContactInfo() {
  return (
    <section className="py-16 bg-gray-50 nature-texture">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-8">
          <div>
            <h2 className="font-heading font-bold text-3xl text-primary-dark mb-6">Get In Touch</h2>
            <p className="text-gray-600 mb-8">
              We're here to help you with all your Sri Lankan natural product needs. Reach out to us through any of the
              following channels.
            </p>
          </div>

          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-lg text-primary-dark mb-1">{method.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{method.description}</p>
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Business Hours */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold text-lg text-primary-dark mb-4">Business Hours</h3>
              <div className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{schedule.day}</span>
                    <span className="font-medium text-primary">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Departments */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-primary-dark mb-4">Departments</h3>
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4">
                    <h4 className="font-heading font-semibold text-primary-dark mb-1">{dept.name}</h4>
                    <p className="text-sm text-gray-600 mb-2">{dept.description}</p>
                    <div className="text-sm space-y-1">
                      <p className="text-gray-700">{dept.email}</p>
                      <p className="text-gray-700">{dept.phone}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
