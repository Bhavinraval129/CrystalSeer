export default function FooterV1() {
  return (
    <footer className="bg-soft-purple-900 text-soft-purple-100 py-16 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-soft-purple-600 rounded-full blur-[100px] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2 space-y-6">
            <h3 className="font-playfair text-3xl font-medium text-white tracking-wide">Crystal Seer</h3>
            <p className="font-inter text-soft-purple-200 max-w-sm leading-relaxed">
              Elevating your spiritual journey through ethically sourced crystals, mystical readings, and profound cosmic connections.
            </p>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-inter font-medium text-white tracking-wider uppercase text-sm">Explore</h4>
            <ul className="space-y-4 font-inter text-soft-purple-200">
              <li><a href="#" className="hover:text-white transition-colors">The Collection</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tarot Readings</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Numerology</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
            </ul>
          </div>
          
          <div className="space-y-6">
            <h4 className="font-inter font-medium text-white tracking-wider uppercase text-sm">Join the Coven</h4>
            <p className="font-inter text-sm text-soft-purple-200">Subscribe for lunar updates and exclusive rituals.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-soft-purple-800/50 border border-soft-purple-700 text-white px-4 py-3 rounded-full focus:outline-none focus:border-soft-purple-400 font-inter text-sm placeholder:text-soft-purple-400 transition-colors"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-soft-purple-500 hover:bg-soft-purple-400 text-white rounded-full font-inter text-sm font-medium transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-soft-purple-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-inter text-sm text-soft-purple-400">© 2026 Crystal Seer. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-soft-purple-400 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-soft-purple-400 hover:text-white transition-colors">TikTok</a>
            <a href="#" className="text-soft-purple-400 hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
