"use client";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { useTheme } from "@/components/theme/ThemeProvider";

export default function ContactPage() {
  const { theme } = useTheme();
  
  const phone = theme?.phone || "+91 70966 91255";
  const email = theme?.email || "hello@crystalseer.in";
  const address = theme?.address || "Mumbai, Maharashtra, India";

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-lavender-mist/20 to-white">
      {/* Background glow washes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-[#F3E8FF] rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-soft-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 pointer-events-none"></div>

      {/* Header / Get in Touch */}
      <div className="text-center mb-16 space-y-4 relative z-10">
        <span className="text-gold-600 text-sm block">✧ Connect with Us</span>
        <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-deep-plum pb-3">Get in Touch</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed text-sm font-inter">
          We'd love to hear from you. Reach out for bulk orders, questions about finding the right products, or bespoke remedies.
        </p>
      </div>

      <div className="relative z-10 space-y-16">
        {/* Contact Information Card */}
        <div className="bg-white rounded-3xl border border-lavender-mist shadow-sm p-8 md:p-12 max-w-5xl mx-auto">
          <h2 className="text-2xl font-playfair font-semibold text-deep-plum text-center mb-10">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 text-center items-stretch">
            
            {/* Phone */}
            <div className="flex flex-col items-center p-6 space-y-4 border-b md:border-b-0 md:border-r border-lavender-mist last:border-0">
              <div className="w-12 h-12 rounded-full bg-soft-purple-50 flex items-center justify-center text-primary-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-deep-plum text-base">Phone</h3>
              <div className="space-y-1">
                <a href={`tel:${phone}`} className="text-sm text-ink hover:text-primary-purple transition-colors block font-medium">
                  {phone}
                </a>
                <span className="text-xs text-ink/50 block font-light">Mon-Sat 9AM to 6PM</span>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex flex-col items-center p-6 space-y-4 border-b md:border-b-0 md:border-r border-lavender-mist last:border-0">
              <div className="w-12 h-12 rounded-full bg-soft-purple-50 flex items-center justify-center text-primary-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-deep-plum text-base">WhatsApp</h3>
              <a 
                href={buildWhatsAppLink("Hi, I'd like to chat regarding crystals and healing services")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 hover:text-green-700 transition-colors font-semibold uppercase tracking-wider cursor-pointer"
              >
                Chat directly with us
              </a>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center p-6 space-y-4 border-b md:border-b-0 md:border-r border-lavender-mist last:border-0">
              <div className="w-12 h-12 rounded-full bg-soft-purple-50 flex items-center justify-center text-primary-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3 className="font-semibold text-deep-plum text-base">Email</h3>
              <a href={`mailto:${email}`} className="text-sm text-ink hover:text-primary-purple transition-colors block font-medium">
                {email}
              </a>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center p-6 space-y-4 last:border-0">
              <div className="w-12 h-12 rounded-full bg-soft-purple-50 flex items-center justify-center text-primary-purple">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-600">
                  <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </div>
              <h3 className="font-semibold text-deep-plum text-base">Address</h3>
              <span className="text-sm text-ink font-medium leading-relaxed">
                {address}
              </span>
            </div>

          </div>
        </div>

        {/* Bulk Orders Banner */}
        <div className="bg-gradient-to-r from-deep-plum to-[#2e0854] text-white p-8 md:p-12 rounded-[2.5rem] max-w-4xl mx-auto shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary-purple/20 rounded-full filter blur-[80px] pointer-events-none"></div>
          <div className="space-y-4 relative z-10 text-center md:text-left flex-1">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white mb-2 md:mx-0 mx-auto">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold-300">
                <path d="M2 20h20"/>
                <path d="M5 17V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10"/>
                <path d="M9 17v-4"/>
                <path d="M13 17v-4"/>
                <path d="M17 17v-4"/>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-playfair font-bold text-white leading-tight">Bulk Orders & Custom Blessed Crystals</h2>
            <p className="text-sm text-lavender-mist/80 font-light leading-relaxed max-w-2xl font-inter">
              Are you looking to procure premium, authentic crystals in bulk, or need custom-blessed crystal packages for corporate events, stores, or weddings? We specialize in high-capacity sourcing, lab certification, and custom healer-activation. Let us handle the details while you share the light.
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <a 
              href={buildWhatsAppLink("Hi, I'd like to inquire about Bulk and Custom Crystal Orders")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-8 py-4 bg-gold-accent hover:bg-gold-500 text-white font-semibold rounded-full shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 text-sm cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
              </svg>
              Contact Us Now on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
