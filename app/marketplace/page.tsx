import Header from "@/components/header";
import Footer from "@/components/footer";

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 lg:pt-24">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Marketplace</h1>
            <p className="text-xl text-gray-600 mb-8">
              Coming Soon - Our online marketplace for premium Sri Lankan products
            </p>
            <div className="bg-gray-100 rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What to Expect</h2>
              <ul className="text-left space-y-2 text-gray-600">
                <li>• Direct purchase of our premium products</li>
                <li>• Bulk ordering for businesses</li>
                <li>• Custom packaging solutions</li>
                <li>• International shipping</li>
                <li>• Quality assurance guarantees</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
