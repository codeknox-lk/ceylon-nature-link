import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary via-primary-dark to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 text-white/20 text-4xl animate-float">
        🌿
      </div>
      <div
        className="absolute top-20 right-20 text-white/20 text-3xl animate-float"
        style={{ animationDelay: "1s" }}
      >
        🍃
      </div>
      <div
        className="absolute bottom-20 left-20 text-white/20 text-5xl animate-float"
        style={{ animationDelay: "2s" }}
      >
        🌱
      </div>
      <div
        className="absolute bottom-10 right-10 text-white/20 text-3xl animate-float"
        style={{ animationDelay: "0.5s" }}
      >
        🌾
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-8 animate-fade-in-up">
            Ready to Experience
            <span className="block text-accent">
              {" "}
              Authentic Ceylon Quality?
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-white/90 text-lg md:text-xl mb-12 leading-relaxed animate-fade-in-up animate-delay-200">
            Join thousands of satisfied customers worldwide who trust Ceylon
            Nature Link for premium Sri Lankan natural products. Start your
            journey with authentic quality today.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center mb-16 animate-fade-in-up animate-delay-400">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-primary-dark hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 border-0"
              >
                Get Started Today
              </Button>
            </Link>

            <Link href="/products">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-dark px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore Products
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animate-delay-600">
            <div className="text-center">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-heading font-semibold text-white text-lg mb-2">
                Global Shipping
              </h3>
              <p className="text-white/80 text-sm">
                Fast and reliable delivery worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="font-heading font-semibold text-white text-lg mb-2">
                Quality Guaranteed
              </h3>
              <p className="text-white/80 text-sm">
                100% authentic Sri Lankan products
              </p>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-heading font-semibold text-white text-lg mb-2">
                24/7 Support
              </h3>
              <p className="text-white/80 text-sm">
                Expert assistance whenever you need
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 pt-8 border-t border-white/20 animate-fade-in-up animate-delay-800">
            <p className="text-white/80 text-lg mb-4">
              Have questions? Our team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-white/90">
              <div className="flex items-center space-x-2">
                <span className="text-xl">📞</span>
                <span className="font-semibold">+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xl">✉️</span>
                <span className="font-semibold">info@ceylonnaturelink.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
