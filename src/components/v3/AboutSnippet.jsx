export default function AboutSnippetV3() {
  return (
    <section className="py-24 bg-white border-t border-ocean-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square">
            <div className="absolute inset-4 bg-ocean-blue-50 border border-ocean-blue-200 shadow-xl overflow-hidden flex items-center justify-center group">
               <img src="https://images.unsplash.com/photo-1518131336423-fcc255b5d122?w=800&h=800&fit=crop" alt="Ethical Mining" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <p className="font-lato uppercase tracking-[0.3em] text-ocean-blue-600 text-sm font-bold">
              Our Standard
            </p>
            <h2 className="text-4xl md:text-6xl font-cormorant font-bold text-ocean-blue-950 leading-tight">
              Sourced with Integrity.
            </h2>
            <p className="font-lato text-lg text-ocean-blue-800 leading-relaxed">
              We believe that the energy of a crystal is deeply tied to its origin. That is why we maintain direct, transparent relationships with ethical mines across the globe. We guarantee fair labor practices and sustainable extraction methods for every piece in our collection.
            </p>
            <button className="px-8 py-4 bg-ocean-blue-950 text-white font-lato uppercase tracking-widest text-sm font-bold hover:bg-ocean-blue-800 transition-colors">
              Read Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
