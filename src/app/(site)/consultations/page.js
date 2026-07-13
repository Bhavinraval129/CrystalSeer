import { buildWhatsAppLink } from "@/utils/whatsapp";

export const metadata = {
  title: "Spiritual Consultations | CRYSTALSEER",
  description: "Schedule personal consultations for custom crystal recommendations, tarot readings, and numerology reports.",
};

export default function ConsultationsPage() {
  const whatsappLink = buildWhatsAppLink("Hi, I'd like to enquire about your Spiritual Consultations");

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto flex flex-col items-center">
      
      {/* Visual Title / Decorative Intro */}
      <div className="text-center mb-10 space-y-3">
        <span className="text-gold-600 text-sm block tracking-widest uppercase">✧ Mystical Readings & Advice ✧</span>
        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-deep-plum">Spiritual Consultations</h1>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-accent to-transparent mx-auto"></div>
      </div>

      {/* Main Services Image Board */}
      <div className="w-full rounded-[2.5rem] overflow-hidden border border-lavender-mist shadow-[0_20px_50px_rgba(110,65,110,0.12)] bg-white p-3 md:p-6 transition-all duration-500 hover:shadow-[0_30px_70px_rgba(110,65,110,0.18)]">
        <img 
          src="/Services.jpeg" 
          alt="Spiritual Consultations" 
          className="w-full h-auto rounded-3xl object-contain mx-auto"
        />
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-12 space-y-6 max-w-xl">
        <p className="text-ink/80 text-base leading-relaxed font-light">
          Have questions or ready to book your slot? Connect directly with our spiritual reader on WhatsApp for personal scheduling and inquiries.
        </p>
        
        <div className="flex justify-center">
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-12 py-5 bg-gradient-btn text-white rounded-full font-semibold shadow-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(188,130,188,0.5)] focus:outline-none focus:ring-2 focus:ring-primary-purple/50 focus:ring-offset-2"
          >
            {/* Pulsing button background glow */}
            <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-purple to-gold-accent opacity-20 blur-md group-hover:opacity-40 transition-opacity duration-300 -z-10"></span>
            
            <svg className="w-6 h-6 fill-current transition-transform duration-300 group-hover:rotate-6" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
            </svg>
            Enquire Now on WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
}
