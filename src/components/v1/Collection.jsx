export default function CollectionV1() {
  return (
    <section className="py-24 px-6 relative bg-white" id="collection">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-4xl md:text-5xl font-playfair font-medium text-gray-900 mb-4">Curated Collection</h2>
                <div className="w-16 h-px bg-soft-purple-400 mx-auto mb-6"></div>
                <p className="font-inter text-gray-600 max-w-2xl mx-auto">Hand-selected, ethically sourced pieces for your spiritual altar.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl border border-soft-purple-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="relative h-80 overflow-hidden bg-soft-purple-50">
                        <img src="https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=600&h=800&fit=crop" alt="Rose Quartz" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-8 text-center">
                        <h3 className="text-2xl font-playfair text-soft-purple-800 mb-2">Rose Quartz</h3>
                        <p className="text-soft-purple-600 font-inter text-sm mb-4">Unconditional Love • Heart Chakra</p>
                        <span className="text-lg font-medium text-gray-900">$45.00</span>
                    </div>
                </div>
                
                <div className="bg-white rounded-2xl border border-soft-purple-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="relative h-80 overflow-hidden bg-soft-purple-50">
                        <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=800&fit=crop" alt="Amethyst" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-8 text-center">
                        <h3 className="text-2xl font-playfair text-soft-purple-800 mb-2">Amethyst Cluster</h3>
                        <p className="text-soft-purple-600 font-inter text-sm mb-4">Spiritual Growth • Crown Chakra</p>
                        <span className="text-lg font-medium text-gray-900">$85.00</span>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-soft-purple-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
                    <div className="relative h-80 overflow-hidden bg-soft-purple-50">
                        <img src="https://images.unsplash.com/photo-1612817288484-6fbd006f7ce5?w=600&h=800&fit=crop" alt="Citrine" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="p-8 text-center">
                        <h3 className="text-2xl font-playfair text-soft-purple-800 mb-2">Raw Citrine</h3>
                        <p className="text-soft-purple-600 font-inter text-sm mb-4">Abundance • Solar Plexus</p>
                        <span className="text-lg font-medium text-gray-900">$55.00</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-16 text-center">
                <button className="inline-block border-b-2 border-soft-purple-400 text-soft-purple-800 font-playfair italic text-xl pb-1 hover:text-soft-purple-600 hover:border-soft-purple-600 transition-colors">
                    View All Treasures →
                </button>
            </div>
        </div>
    </section>
  );
}
