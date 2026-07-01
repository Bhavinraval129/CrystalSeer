import Navbar from "@/components/Navbar";
import CollectionV1 from "@/components/v1/Collection";
import AboutSnippetV1 from "@/components/v1/AboutSnippet";
import TestimonialsV1 from "@/components/v1/Testimonials";
import FooterV1 from "@/components/v1/Footer";

export default function V1Concept() {
  return (
    <div className="min-h-screen bg-soft-purple-50">
      <Navbar theme="v1" />
      
      {/* Hero Section */}
      <main className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-soft-purple-100 border border-soft-purple-200 text-soft-purple-700 font-inter text-sm tracking-wide">
            ✧ Awaken Your Inner Magic
          </div>
          <h1 className="text-5xl lg:text-7xl font-playfair font-medium text-gray-900 leading-tight">
            Ethereal <span className="text-soft-purple-600 italic">Crystals</span> & Mystic Healing
          </h1>
          <p className="text-lg text-gray-600 font-inter max-w-2xl mx-auto lg:mx-0 leading-relaxed">
            Discover our curated collection of ethically sourced crystals, tarot readings, and personalized numerology designed to elevate your spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <button className="px-8 py-4 bg-soft-purple-600 hover:bg-soft-purple-700 text-white rounded-xl font-inter font-medium transition-all shadow-lg shadow-soft-purple-200 w-full sm:w-auto">
              Explore Collection
            </button>
            <button className="px-8 py-4 bg-white border border-soft-purple-200 text-soft-purple-700 hover:bg-soft-purple-50 rounded-xl font-inter font-medium transition-all w-full sm:w-auto">
              Book a Reading
            </button>
          </div>
        </div>

        {/* Decorative Image Area */}
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-soft-purple-200 to-transparent rounded-full blur-3xl opacity-50"></div>
          <div className="relative aspect-[4/5] bg-white rounded-[2rem] border border-soft-purple-100 shadow-2xl overflow-hidden flex items-center justify-center p-8">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-soft-purple-50/50"></div>
            {/* Placeholder for premium crystal image */}
            <div className="text-center z-10 space-y-4">
              <div className="w-24 h-24 mx-auto rounded-full bg-soft-purple-100 flex items-center justify-center">
                <span className="text-4xl">🔮</span>
              </div>
              <p className="font-playfair text-xl text-soft-purple-800">Premium Amethyst Cluster</p>
              <p className="font-inter text-sm text-gray-500 uppercase tracking-widest">Featured Item</p>
            </div>
          </div>
        </div>
      </main>

      <CollectionV1 />

      {/* Featured Services */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-playfair font-medium text-gray-900">Mystical Services</h2>
            <p className="font-inter text-gray-600 max-w-2xl mx-auto">Connect with the universe through our specialized spiritual guidance.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl bg-soft-purple-50 border border-soft-purple-100 hover:shadow-lg transition-all text-center">
              <span className="text-4xl mb-4 block">🃏</span>
              <h3 className="font-playfair text-2xl text-gray-900 mb-2">Tarot Card Reading</h3>
              <p className="font-inter text-gray-600 mb-6">Gain clarity and insight into your past, present, and future.</p>
              <button className="text-soft-purple-600 font-inter font-medium hover:text-soft-purple-800">Learn More →</button>
            </div>
            <div className="p-8 rounded-2xl bg-soft-purple-50 border border-soft-purple-100 hover:shadow-lg transition-all text-center">
              <span className="text-4xl mb-4 block">🔢</span>
              <h3 className="font-playfair text-2xl text-gray-900 mb-2">Numerology</h3>
              <p className="font-inter text-gray-600 mb-6">Discover the hidden meaning behind the numbers in your life.</p>
              <button className="text-soft-purple-600 font-inter font-medium hover:text-soft-purple-800">Learn More →</button>
            </div>
          </div>
        </div>
      </section>

      <AboutSnippetV1 />
      <TestimonialsV1 />
      <FooterV1 />
    </div>
  );
}
