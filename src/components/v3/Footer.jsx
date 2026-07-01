export default function FooterV3() {
  return (
    <footer className="bg-ocean-blue-950 text-white pt-24 pb-12 border-t-4 border-ocean-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-12 gap-12 mb-20">
          
          <div className="md:col-span-5 space-y-8">
            <h3 className="font-cormorant text-4xl font-bold tracking-wide">
              Crystal<span className="text-ocean-blue-400">Wisdom</span>
            </h3>
            <p className="font-lato text-ocean-blue-200 leading-relaxed max-w-sm">
              Elevating your spiritual journey through ethically sourced crystals and expert guidance. Based in New York, shipping worldwide.
            </p>
          </div>
          
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-lato uppercase tracking-[0.2em] text-xs font-bold text-ocean-blue-400">Shop</h4>
            <ul className="space-y-4 font-lato text-ocean-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">All Crystals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-5 space-y-6">
            <h4 className="font-lato uppercase tracking-[0.2em] text-xs font-bold text-ocean-blue-400">Newsletter</h4>
            <p className="font-lato text-ocean-blue-200">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full bg-transparent border border-ocean-blue-600 text-white px-4 py-3 focus:outline-none focus:border-ocean-blue-400 font-lato placeholder:text-ocean-blue-500 transition-colors"
              />
              <button className="px-6 bg-ocean-blue-600 hover:bg-ocean-blue-500 text-white font-lato uppercase tracking-widest text-xs font-bold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-ocean-blue-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-lato text-sm text-ocean-blue-400">
            © 2026 Crystal Wisdom. All Rights Reserved.
          </p>
          <div className="flex gap-6 font-lato uppercase tracking-widest text-xs text-ocean-blue-400">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
