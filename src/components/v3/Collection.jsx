export default function CollectionV3() {
  return (
    <section className="py-32 bg-white" id="collection">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-ocean-blue-950 mb-4">The Collection</h2>
                    <p className="font-lato text-ocean-blue-800 leading-relaxed">
                        Ethically sourced and meticulously selected crystals for deep healing and spiritual elevation.
                    </p>
                </div>
                <button className="font-lato uppercase tracking-widest text-sm font-bold text-ocean-blue-600 border-b-2 border-ocean-blue-600 pb-1 hover:text-ocean-blue-800 hover:border-ocean-blue-800 transition-all">
                    View Complete Catalog
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group bg-ocean-blue-50/50 p-6 rounded-sm border border-ocean-blue-100 hover:border-ocean-blue-400 hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="relative aspect-[3/4] overflow-hidden bg-ocean-blue-100 mb-8 rounded-sm">
                        <img src="https://images.unsplash.com/photo-1599707367072-cd6ad66acc40?w=600&h=800&fit=crop" alt="Rose Quartz" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <div className="border-t border-ocean-blue-200 pt-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-cormorant font-bold text-ocean-blue-950">Rose Quartz</h3>
                            <span className="text-lg font-lato text-ocean-blue-900">$45.00</span>
                        </div>
                        <p className="font-lato uppercase tracking-widest text-xs font-bold text-ocean-blue-500">Unconditional Love</p>
                    </div>
                </div>
                
                <div className="group bg-ocean-blue-50/50 p-6 rounded-sm border border-ocean-blue-100 hover:border-ocean-blue-400 hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="relative aspect-[3/4] overflow-hidden bg-ocean-blue-100 mb-8 rounded-sm">
                        <img src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?w=600&h=800&fit=crop" alt="Amethyst" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <div className="border-t border-ocean-blue-200 pt-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-cormorant font-bold text-ocean-blue-950">Amethyst Cluster</h3>
                            <span className="text-lg font-lato text-ocean-blue-900">$85.00</span>
                        </div>
                        <p className="font-lato uppercase tracking-widest text-xs font-bold text-ocean-blue-500">Spiritual Growth</p>
                    </div>
                </div>

                <div className="group bg-ocean-blue-50/50 p-6 rounded-sm border border-ocean-blue-100 hover:border-ocean-blue-400 hover:bg-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl">
                    <div className="relative aspect-[3/4] overflow-hidden bg-ocean-blue-100 mb-8 rounded-sm">
                        <img src="https://images.unsplash.com/photo-1612817288484-6fbd006f7ce5?w=600&h=800&fit=crop" alt="Citrine" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    </div>
                    <div className="border-t border-ocean-blue-200 pt-6">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-2xl font-cormorant font-bold text-ocean-blue-950">Raw Citrine</h3>
                            <span className="text-lg font-lato text-ocean-blue-900">$55.00</span>
                        </div>
                        <p className="font-lato uppercase tracking-widest text-xs font-bold text-ocean-blue-500">Abundance</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}
