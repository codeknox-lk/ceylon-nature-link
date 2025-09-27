export default function ContactMap() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="font-heading font-bold text-3xl text-primary-dark mb-4">Find Us</h2>
          <p className="text-gray-600">Visit our location in Koholanwala</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="aspect-video bg-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="font-heading font-semibold text-xl text-primary-dark mb-2">Interactive Map</h3>
              <p className="text-gray-600 mb-4">
                Ceylon Nature Link (Pvt) Ltd
                <br />
                Koholanwala, Homapola Road
                <br />
                21000, Sri Lanka
              </p>
              <div className="text-sm text-gray-500">
                <p>Coordinates: 7.6309° N, 80.6305° E</p>
                <p className="mt-2">
                  <strong>Directions:</strong> Located in Koholanwala, easily accessible via Homapola Road and major highways.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-primary text-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-heading font-semibold mb-2">Office Hours</h4>
                <p className="text-sm">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-sm">Saturday: 9:00 AM - 1:00 PM</p>
              </div>
              <div>
                <h4 className="font-heading font-semibold mb-2">Parking</h4>
                <p className="text-sm">Free parking available</p>
                <p className="text-sm">Visitor spaces reserved</p>
              </div>
              <div>
                <h4 className="font-heading font-semibold mb-2">Public Transport</h4>
                <p className="text-sm">Bus stops within 200m</p>
                <p className="text-sm">Train station 1.5km away</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
