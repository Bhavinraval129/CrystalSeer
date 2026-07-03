import Image from "next/image";
import Link from "next/link";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export const metadata = {
  title: "Our Story & Rituals | CRYSTALSEER",
  description: "Learn about CRYSTALSEER's commitment to ethical mineral sourcing, full moon cleansing rituals, and spiritual authenticity.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" style={{ background: "linear-gradient(180deg, #ffffff 0%, #fdfafc 40%, #f8f1f8 100%)" }}>
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold-600 text-sm block">✧ Sourced with Integrity</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum font-bold">Our Story & Cleansing Rituals</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
      </div>

      {/* Brand Story Block */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div className="space-y-6">
          <h2 className="text-3xl font-playfair font-semibold text-deep-plum">The CRYSTALSEER Vision</h2>
          <p className="text-ink/80 leading-relaxed font-light text-sm">
            CRYSTALSEER was founded with a single mission: to create a transparent, high-vibrational sanctuary for spiritual seekers. We realized that many commercial crystal stores mass-produce stones under poor mining conditions, stripping the mineral of its natural healing essence.
          </p>
          <p className="text-ink/80 leading-relaxed font-light text-sm">
            We chose a different path. We work directly with conscious, family-owned local mines in Brazil, Madagascar, and India. Every stone is extracted respectfully from the earth, ensuring the initial energy remains pure and clear.
          </p>
        </div>
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-lavender-mist shadow-lg bg-white p-4">
          <Image 
            src="/crystal_mining.png" 
            alt="Crystal mining raw stones" 
            fill 
            className="object-cover rounded-2xl" 
          />
        </div>
      </section>

      {/* Sourcing/Authenticity Promise */}
      <section className="bg-white p-10 md:p-16 border border-lavender-mist rounded-[2.5rem] space-y-10 mb-20 relative overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-32 h-32 bg-lavender-mist rounded-full filter blur-3xl opacity-50"></div>
        
        <div className="text-center space-y-3">
          <span className="text-gold-600 text-sm block">✧ Quality Framework</span>
          <h2 className="text-3xl font-playfair font-semibold text-deep-plum">The Cleansing & Charging Promise</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-lavender-mist rounded-full flex items-center justify-center text-xl mx-auto shadow-inner">🧼</div>
            <h3 className="font-playfair text-lg font-bold text-deep-plum">1. Salt Cleansing</h3>
            <p className="text-xs text-ink/75 leading-relaxed font-light">
              We cleanse every raw cluster and jewelry bead in a pink Himalayan salt bath to reset any energy memory from mining or logistics.
            </p>
          </div>
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-lavender-mist rounded-full flex items-center justify-center text-xl mx-auto shadow-inner">🌕</div>
            <h3 className="font-playfair text-lg font-bold text-deep-plum">2. Lunar Attunement</h3>
            <p className="text-xs text-ink/75 leading-relaxed font-light">
              During peak Full Moon phases, our stones are laid out overnight on natural wooden altars to attune to peak manifestation frequencies.
            </p>
          </div>
          <div className="space-y-3 text-center">
            <div className="w-12 h-12 bg-lavender-mist rounded-full flex items-center justify-center text-xl mx-auto shadow-inner">🧘‍♂️</div>
            <h3 className="font-playfair text-lg font-bold text-deep-plum">3. Healer Activation</h3>
            <p className="text-xs text-ink/75 leading-relaxed font-light">
              Before shipping, our certified Reiki masters infuse each crystal with specific positive focus intentions based on the category you ordered.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section className="space-y-8 text-center">
        <h2 className="text-3xl font-playfair font-semibold text-deep-plum">Our Authenticity Standards</h2>
        <div className="w-12 h-px bg-gold-accent mx-auto"></div>
        
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-lavender-mist shadow-sm">
            <div className="icon-circle mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a36d27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/>
                <circle cx="12" cy="12" r="10"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-deep-plum text-sm">Lab-Certified Guarantee</h4>
              <p className="text-xs text-ink/70 font-light mt-1 leading-relaxed">
                We provide a physical gemstone certification report with every single order. This report states the natural authenticity, origin, and mineral details of the stone.
              </p>
            </div>
          </div>
          <div className="flex gap-4 items-start bg-white p-6 rounded-2xl border border-lavender-mist shadow-sm">
            <div className="icon-circle mt-0.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a36d27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l2.09 6.26L21 9.27l-4.91 4.73 1.18 6.74L12 17.27l-5.27 3.47 1.18-6.74L3 9.27l6.91-.01z"/>
              </svg>
            </div>
            <div>
              <h4 className="font-bold text-deep-plum text-sm">Zero Heat-Treatment Promise</h4>
              <p className="text-xs text-ink/70 font-light mt-1 leading-relaxed">
                Many online sellers heat amethyst to sell it as Citrine. We promise that our Citrine and Amethyst products are entirely natural, unprocessed, and non-heated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center pt-16">
        <a 
          href={buildWhatsAppLink("Hi, I'd like to ask a question about your crystals")} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-btn text-white rounded-full font-semibold shadow-lg text-sm"
        >
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
          </svg>
          Ask a Question on WhatsApp
        </a>
      </div>

    </div>
  );
}
