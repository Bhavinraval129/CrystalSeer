import Image from "next/image";
import Link from "next/link";
import { services } from "@/data/services";
import { buildWhatsAppLink } from "@/utils/whatsapp";

export async function generateStaticParams() {
  return services.map(s => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 text-center">
        <h1 className="text-2xl font-playfair text-deep-plum">Service Not Found</h1>
        <Link href="/" className="text-primary-purple hover:underline mt-4 inline-block">Back Home</Link>
      </div>
    );
  }

  const isTarot = slug === "tarot-card-reading";
  const whatsappMsg = isTarot 
    ? "Hi, I'd like to book a Tarot Card reading"
    : "Hi, I'd like to book a Numerology session";

  const buttonLabel = isTarot
    ? "Book Your Tarot Reading on WhatsApp"
    : "Book Your Numerology Session on WhatsApp";

  return (
    <div className="min-h-screen pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Hero section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        
        {/* Text */}
        <div className="space-y-6">
          <div className="inline-block px-4 py-1.5 rounded-full bg-lavender-mist border border-soft-lilac text-primary-purple text-xs uppercase tracking-wider font-semibold">
            ✧ Mystical Consultation
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-playfair font-semibold text-deep-plum leading-tight">
            {service.title}
          </h1>
          
          <p className="text-ink/80 leading-relaxed font-light text-lg">
            {service.longDescription}
          </p>

          <div className="pt-4">
            <a 
              href={buildWhatsAppLink(whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-btn text-white rounded-full font-semibold shadow-lg text-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
              </svg>
              {buttonLabel}
            </a>
          </div>
        </div>

        {/* Hero image */}
        <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border border-lavender-mist shadow-xl bg-white p-4">
          <Image 
            src={service.heroImageUrl} 
            alt={service.title} 
            fill 
            className="object-cover rounded-2xl" 
            priority 
          />
        </div>

      </div>

      {/* What's Covered / Value Proposition */}
      <section className="py-16 border-t border-lavender-mist">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="text-3xl font-playfair font-bold text-deep-plum text-center">What is Covered in Your Session</h2>
          <div className="w-12 h-px bg-gold-accent mx-auto"></div>
          
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="bg-white p-6 rounded-2xl border border-lavender-mist shadow-sm space-y-3">
              <div className="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a36d27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h4 className="font-bold text-deep-plum text-base">Direct Astrological Mapping</h4>
              <p className="text-xs text-ink/75 font-light leading-relaxed">
                We attune your calculations or cards directly to your zodiac characteristics to ensure maximum accuracy.
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-lavender-mist shadow-sm space-y-3">
              <div className="icon-circle">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a36d27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/>
                  <path d="M19.07 4.93L5.93 18.07M4.93 4.93l14.14 14.14M12 2v4M12 18v4M2 12h4M18 12h4"/>
                </svg>
              </div>
              <h4 className="font-bold text-deep-plum text-base">Intuitive Remedies</h4>
              <p className="text-xs text-ink/75 font-light leading-relaxed">
                Receive specific crystal and cleansing remedies that align with your reading results to help dissolve blockages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 border-t border-lavender-mist">
        <div className="text-center mb-16 space-y-3">
          <span className="text-gold-600 text-sm block">✧ The Alignment Journey</span>
          <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-plum">How It Works</h2>
          <div className="w-12 h-px bg-gold-accent mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {service.howItWorks.map((step, idx) => (
            <div key={idx} className="bg-white p-8 border border-lavender-mist rounded-2xl text-center space-y-4 relative shadow-sm">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-primary-purple text-white flex items-center justify-center font-bold font-playfair text-base shadow-[0_0_0_4px_#f8f1f8,0_0_0_5px_#e3c9e3]">
                {idx + 1}
              </span>
              <h3 className="font-playfair text-lg font-bold text-deep-plum pt-4">{step.stepTitle}</h3>
              <p className="text-xs text-ink/75 leading-relaxed font-light">{step.stepDescription}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="bg-gradient-to-r from-deep-plum to-[#2e0854] text-white p-12 rounded-[2.5rem] text-center space-y-6 relative overflow-hidden mt-16 shadow-xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-purple/30 rounded-full filter blur-[80px]"></div>
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <span className="text-3xl block">✧</span>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold">Secure Your Consultation Slot</h2>
          <p className="text-sm text-lavender-mist/80 font-light leading-relaxed">
            Ready to clarify your cosmic path? Click below to start a chat on WhatsApp with our reader.
          </p>
          <a 
            href={buildWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-white text-primary-purple font-semibold hover:bg-lavender-mist rounded-full transition-colors inline-flex items-center gap-2 text-sm shadow-md"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
            </svg>
            Book via WhatsApp
          </a>
        </div>
      </section>

    </div>
  );
}
