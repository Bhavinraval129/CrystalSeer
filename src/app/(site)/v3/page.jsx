import Navbar from "@/components/Navbar";
import CollectionV3 from "@/components/v3/Collection";
import AboutSnippetV3 from "@/components/v3/AboutSnippet";
import TestimonialsV3 from "@/components/v3/Testimonials";
import FooterV3 from "@/components/v3/Footer";

export default function V3Concept() {
  return (
    <div className="min-h-screen bg-ocean-blue-50">
      <Navbar theme="v3" />
      
      {/* Hero Section */}
      <main className="relative pt-20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Text Content */}
            <div className="space-y-8 text-ocean-blue-950">
              <p className="font-lato uppercase tracking-[0.3em] text-ocean-blue-600 text-sm font-bold">
                Authentic Healing & Guidance
              </p>
              <h1 className="text-6xl lg:text-8xl font-cormorant font-bold leading-none">
                Crystal<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-blue-600 to-ocean-blue-900">Wisdom</span>
              </h1>
              <p className="font-lato text-lg text-ocean-blue-800 max-w-lg leading-relaxed font-light">
                Elevate your life with our premium, ethically sourced crystals and expert spiritual services. Dive deep into self-discovery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="px-8 py-4 bg-ocean-blue-900 text-white font-lato uppercase tracking-widest text-sm font-bold hover:bg-ocean-blue-800 transition-colors shadow-lg">
                  Shop Collection
                </button>
                <button className="px-8 py-4 border-2 border-ocean-blue-400 text-ocean-blue-900 font-lato uppercase tracking-widest text-sm font-bold hover:bg-ocean-blue-100 transition-colors">
                  Our Services
                </button>
              </div>
            </div>

            {/* Structured Image Grid */}
            <div className="grid grid-cols-2 gap-4 relative">
              <div className="aspect-[3/4] bg-ocean-blue-100 rounded-sm border border-ocean-blue-200 shadow-xl overflow-hidden mt-12 flex items-center justify-center hover:shadow-2xl transition-shadow">
                 <div className="text-center p-6">
                    <span className="text-5xl mb-4 block drop-shadow-md">🌊</span>
                    <h3 className="font-cormorant text-2xl text-ocean-blue-950 font-bold">Aquamarine</h3>
                 </div>
              </div>
              <div className="aspect-[3/4] bg-white rounded-sm border border-ocean-blue-100 shadow-xl overflow-hidden mb-12 flex items-center justify-center hover:shadow-2xl transition-shadow">
                 <div className="text-center p-6">
                    <span className="text-5xl mb-4 block drop-shadow-md">💎</span>
                    <h3 className="font-cormorant text-2xl text-ocean-blue-950 font-bold">Clear Quartz</h3>
                 </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <CollectionV3 />

      {/* Services Section */}
      <section className="py-32 bg-ocean-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-ocean-blue-950 mb-4">Spiritual Guidance</h2>
              <p className="font-lato text-ocean-blue-800 leading-relaxed">
                Our expert practitioners offer deep, insightful sessions designed to help you navigate life's challenges.
              </p>
            </div>
            <button className="font-lato uppercase tracking-widest text-sm font-bold text-ocean-blue-600 border-b-2 border-ocean-blue-600 pb-1 hover:text-ocean-blue-800 hover:border-ocean-blue-800 transition-all">
              View All Services
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Service 1 */}
            <div className="group bg-white p-10 border-l-4 border-ocean-blue-400 hover:border-ocean-blue-600 transition-colors shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-cormorant text-3xl font-bold text-ocean-blue-950">Tarot Card</h3>
                <span className="text-ocean-blue-300 group-hover:text-ocean-blue-600 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </div>
              <p className="font-lato text-ocean-blue-800 mb-6 line-clamp-2">
                Structured layouts and deep intuitive readings to provide clarity on your career, relationships, and personal growth.
              </p>
              <p className="font-lato uppercase tracking-widest text-xs font-bold text-ocean-blue-400">60 Min / 90 Min Sessions</p>
            </div>

            {/* Service 2 */}
            <div className="group bg-white p-10 border-l-4 border-ocean-blue-400 hover:border-ocean-blue-600 transition-colors shadow-sm hover:shadow-md">
              <div className="flex justify-between items-start mb-8">
                <h3 className="font-cormorant text-3xl font-bold text-ocean-blue-950">Numerology</h3>
                <span className="text-ocean-blue-300 group-hover:text-ocean-blue-600 transition-colors">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              </div>
              <p className="font-lato text-ocean-blue-800 mb-6 line-clamp-2">
                Unlock the mathematical blueprint of your life. Understand your life path number, destiny, and soul urge.
              </p>
              <p className="font-lato uppercase tracking-widest text-xs font-bold text-ocean-blue-400">Comprehensive Report included</p>
            </div>
          </div>
        </div>
      </section>

      <AboutSnippetV3 />
      <TestimonialsV3 />
      <FooterV3 />
    </div>
  );
}
