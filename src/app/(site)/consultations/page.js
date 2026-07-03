import { buildWhatsAppLink } from "@/utils/whatsapp";

export const metadata = {
  title: "Spiritual Consultations | CRYSTALSEER",
  description: "Schedule personal consultations for custom crystal recommendations, tarot readings, and numerology reports.",
};

export default function ConsultationsPage() {
  const consultations = [
    {
      title: "Crystal Selection Consultation",
      description: "Not sure which stone attunes to your current life blockages? Connect with our resident crystal healer. We analyze your astrological chart and current intentions to curate a custom crystal grid for your home or jewelry.",
      duration: "15 Mins Chat",
      whatsappMsg: "Hi, I'd like to book a Crystal Recommendation consultation",
      icon: "💎"
    },
    {
      title: "Full Tarot Reading Session",
      description: "Secure a full live tarot reading session. Discover hidden blockages, analyze relationship status, or get predictive career pathing insights. Includes detailed layout guidance and healing remedies.",
      duration: "45 Mins Call",
      whatsappMsg: "Hi, I'd like to book a Tarot Consultation",
      icon: "🃏"
    },
    {
      title: "Comprehensive Numerology Analysis",
      description: "Unlock your birth names and date blueprints. Receive a complete PDF analysis containing your Life Path, Destiny, Soul Urge numbers, plus warning dates, followed by a live counseling review session.",
      duration: "PDF + Counseling Call",
      whatsappMsg: "Hi, I'd like to book a Numerology Consultation",
      icon: "🔢"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <span className="text-gold-600 text-sm block">✧ Direct Consultation</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum">Spiritual Consultations</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed">
          Book personal slots directly on WhatsApp with our healers to customize your spiritual attunement path.
        </p>
      </div>

      {/* Grid */}
      <div className="space-y-8">
        {consultations.map((c, idx) => (
          <div key={idx} className="glass-card rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center justify-between border border-lavender-mist">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <span className="text-5xl">{c.icon}</span>
                <div>
                  <h3 className="text-2xl font-playfair font-bold text-deep-plum">{c.title}</h3>
                  <span className="inline-block mt-1 text-xs font-semibold uppercase tracking-wider text-primary-purple bg-lavender-mist px-3 py-1 rounded-full border border-soft-lilac">
                    Duration: {c.duration}
                  </span>
                </div>
              </div>
              <p className="text-sm text-ink/75 font-light leading-relaxed">
                {c.description}
              </p>
            </div>
            <div className="w-full md:w-auto shrink-0">
              <a 
                href={buildWhatsAppLink(c.whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-8 py-4 bg-gradient-btn text-white rounded-full font-semibold shadow-md inline-flex items-center justify-center gap-2 text-sm"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                </svg>
                Book Session on WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
