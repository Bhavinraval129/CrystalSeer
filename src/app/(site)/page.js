"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { problemCategories } from "@/data/problemCategories";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { buildWhatsAppLink } from "@/utils/whatsapp";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [bestsellers, setBestsellers] = useState([]);
  const [loadingBestsellers, setLoadingBestsellers] = useState(true);

  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const supabase = createClient();
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("is_best_seller", true)
          .eq("has_details", true)
          .limit(3);
        if (data) {
          setBestsellers(data.map(p => {
            let price = 0;
            let compareAtPrice = 0;
            let rating = 5;
            if (p.specs) {
              price = parseFloat(p.specs.price || "0");
              compareAtPrice = parseFloat(p.specs.compareAtPrice || "0");
              rating = parseFloat(p.specs.rating || "5");
            }
            return {
              id: p.id,
              name: p.name,
              slug: p.id,
              price,
              compareAtPrice,
              rating,
              imageUrls: [p.image]
            };
          }));
        }
      } catch (err) {
        console.error("Error fetching bestsellers:", err);
      } finally {
        setLoadingBestsellers(false);
      }
    }
    fetchBestsellers();
  }, []);

  const promises = [
    {
      title: "100% Lab Certified",
      description: "Every stone in our collection comes with an official certificate of authenticity.",
      icon: "🔬",
      gradient: "from-soft-purple-100 to-gold-50"
    },
    {
      title: "Moon-Phase Blessed",
      description: "Attuned overnight on natural cedar altars under peak Full Moon cycles.",
      icon: "🌕",
      gradient: "from-gold-50 to-soft-purple-100"
    },
    {
      title: "Healer Activated",
      description: "Infused with specific Reiki intentions by certified energy practitioners.",
      icon: "🧘",
      gradient: "from-soft-purple-100 to-soft-purple-200"
    },
    {
      title: "Ethically Sourced",
      description: "Hand-selected directly from conscious, family-operated mines in Brazil & India.",
      icon: "🤝",
      gradient: "from-gold-100 to-soft-purple-50"
    }
  ];

  const faqs = [
    {
      q: "How do I know which crystal aligns with my energy?",
      a: "You can browse our crystals by intent (stress relief, wealth, love) or explore by crystal type. For a highly personalized recommendation, you can book a consultation with our healers via WhatsApp."
    },
    {
      q: "Are all your crystals lab-certified and authentic?",
      a: "Yes, 100%. Every crystal in our collection is authentic and comes with a lab certification report. We partner directly with ethically run family mines."
    },
    {
      q: "What does 'Healer-Activated' and 'Moon-Blessed' mean?",
      a: "Our spiritual practitioners cleanse each crystal with Himalayan pink salt to wash away previous emotional loads, then place them under the Full Moon to attune them to peak high-vibrational frequencies."
    },
    {
      q: "How does the Tarot and Numerology booking work?",
      a: "When you click 'Book Now', you will be redirected to WhatsApp to secure your slot. Tarot sessions are held live over calls, while Numerology sessions include a comprehensive PDF blueprint followed by a counseling review call."
    }
  ];

  const handleFAQToggle = (idx) => {
    setActiveFAQ(activeFAQ === idx ? null : idx);
  };

  const nextTestimonial = () => {
    setActiveTestimonial((activeTestimonial + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length);
  };

  const heroExploreLink = "/shop/crystal-type";
  const heroWhatsAppMsg = buildWhatsAppLink("Hi, I'd like to book a reading");

  // Sliding Hero Banners
  const slides = [
    {
      tabLabel: "✧ Ethereal Crystals",
      badge: "✧ Awaken Your Inner Light",
      title: (
        <>
          Ethereal Crystals <br />& Mystic Healing
        </>
      ),
      description: "Discover our curated collection of ethically sourced crystals, tarot readings, and personalized numerology designed to elevate your spiritual resonance.",
      image: "/hero_amethyst.png",
      imgTitle: "Premium Amethyst",
      btnPrimary: { text: "Explore Collection", href: "/shop/crystal-type" },
      btnSecondary: { text: "Book a Reading", href: buildWhatsAppLink("Hi, I'd like to book a reading") }
    },
    {
      tabLabel: "✧ Sacred Quartz",
      badge: "✧ Attuned & Moon-Blessed",
      title: (
        <>
          Sacred Quartz <br />& Spiritual Energy
        </>
      ),
      description: "Every specimen is hand-selected, cleansed with Himalayan pink salt, and charged under the peak full moon to attune to high-vibrational healing.",
      image: "/hero_quartz.png",
      imgTitle: "Clear Quartz Point",
      btnPrimary: { text: "Shop New Arrivals", href: "/shop/crystal-type" },
      btnSecondary: { text: "Book a Reading", href: buildWhatsAppLink("Hi, I'd like to book a reading") }
    },
    {
      tabLabel: "✧ Live Tarot Guidance",
      badge: "✧ Divine Insights & Clarity",
      title: (
        <>
          Mystic Tarot <br />& Cosmic Blueprints
        </>
      ),
      description: "Unveil your soul path and align your energy. Book live personal readings with certified practitioners for deep, transformative clarity.",
      image: "/hero_tarot.png",
      imgTitle: "Tarot & Crystal Grid",
      btnPrimary: { text: "Schedule Session", href: buildWhatsAppLink("Hi, I'd like to book a reading") },
      btnSecondary: { text: "View Services", href: "/services" }
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide, slides.length]);

  return (
    <div className="min-h-screen">
      
      {/* 1. Hero Section (Redesigned Full-Bleed sliding carousel with bottom tabs) */}
      <section className="relative w-full h-[90vh] lg:h-[90vh] min-h-[680px] sm:min-h-[700px] bg-deep-plum overflow-hidden flex items-stretch">

        {/* Slide progress dots — top right */}
        <div className="absolute top-6 right-6 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > currentSlide ? 1 : -1); setCurrentSlide(idx); }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`rounded-full transition-all duration-400 cursor-pointer ${
                currentSlide === idx
                  ? "w-5 h-2 bg-gold-300"
                  : "w-2 h-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>

        {/* Carousel Tabs Navigation (At the bottom of the banner) */}
        <div className="absolute bottom-0 left-0 right-0 z-30 grid grid-cols-3 border-t border-white/10 overflow-x-auto no-scrollbar">
          {slides.map((slide, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentSlide ? 1 : -1);
                setCurrentSlide(idx);
              }}
              className={`py-3 sm:py-4 lg:py-5 px-2 sm:px-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 sm:gap-1 border-r border-white/10 last:border-r-0 ${
                currentSlide === idx 
                  ? "bg-white text-deep-plum font-semibold shadow-inner" 
                  : "bg-deep-plum/60 backdrop-blur-sm text-white/80 hover:text-white hover:bg-deep-plum/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span className="font-playfair text-[10px] sm:text-sm lg:text-base tracking-wide font-medium">
                {slide.tabLabel}
              </span>
              <span className={`text-[7px] sm:text-[9px] uppercase tracking-widest font-inter ${
                currentSlide === idx ? "text-primary-purple/80 font-medium" : "text-white/40"
              }`}>
                {slide.imgTitle}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentSlide}
            variants={{
              enter: (dir) => ({
                opacity: 0,
                scale: 1.05
              }),
              center: {
                opacity: 1,
                scale: 1,
                transition: {
                  opacity: { duration: 0.6, ease: "easeOut" },
                  scale: { duration: 0.8, ease: "easeOut" },
                  staggerChildren: 0.12,
                  delayChildren: 0.1
                }
              },
              exit: (dir) => ({
                opacity: 0,
                scale: 0.98,
                transition: {
                  opacity: { duration: 0.4, ease: "easeIn" },
                  scale: { duration: 0.4, ease: "easeIn" }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            custom={direction}
            className="absolute inset-0 flex items-stretch"
          >
            {/* Full-bleed background image */}
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].imgTitle}
              fill
              className="object-cover object-center pointer-events-none z-0"
              priority
            />
            {/* Gradient wash overlays to protect text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-deep-plum/90 via-deep-plum/45 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-plum/90 via-transparent to-deep-plum/30 z-10 pointer-events-none" />

            {/* Content container aligned with max-w-7xl page grid */}
            <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-24 flex items-center h-full relative z-20">
              <div className="max-w-2xl w-full space-y-4 sm:space-y-6 text-left pt-24 pb-28 sm:py-32">
                <motion.div
                  variants={{
                    enter: { y: 24, opacity: 0 },
                    center: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
                  }}
                  className="text-gold-300 text-[10px] sm:text-sm font-semibold tracking-widest uppercase font-inter"
                >
                  {slides[currentSlide].badge}
                </motion.div>
                
                <motion.h1
                  variants={{
                    enter: { y: 24, opacity: 0 },
                    center: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
                  }}
                  className="text-3xl sm:text-5xl lg:text-7xl font-playfair font-semibold leading-tight text-white"
                >
                  {slides[currentSlide].title}
                </motion.h1>
                
                <motion.p
                  variants={{
                    enter: { y: 24, opacity: 0 },
                    center: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
                  }}
                  className="text-sm sm:text-lg text-white/85 max-w-xl leading-relaxed font-light font-inter"
                >
                  {slides[currentSlide].description}
                </motion.p>
                
                <motion.div
                  variants={{
                    enter: { y: 24, opacity: 0 },
                    center: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 14 } }
                  }}
                  className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 sm:pt-4"
                >
                  <Link
                    href={slides[currentSlide].btnPrimary.href}
                    className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-btn text-white rounded-full font-medium transition-all shadow-lg text-center w-full sm:w-auto cursor-pointer hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                  >
                    {slides[currentSlide].btnPrimary.text}
                  </Link>
                  {slides[currentSlide].btnSecondary.href.startsWith("http") ? (
                    <a
                      href={slides[currentSlide].btnSecondary.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-full font-medium transition-all text-center w-full sm:w-auto cursor-pointer hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                      </svg>
                      {slides[currentSlide].btnSecondary.text}
                    </a>
                  ) : (
                    <Link
                      href={slides[currentSlide].btnSecondary.href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-full font-medium transition-all text-center w-full sm:w-auto cursor-pointer hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
                    >
                      {slides[currentSlide].btnSecondary.text}
                    </Link>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 2. Scroll-Down Section starts here: Promise cards (Upgrade to Promise Cards from Arrkamrut layout) */}
      <section className="py-24 bg-white border-y border-lavender-mist relative z-20">
        <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-50 border border-gold-200 rounded-full text-gold-700 text-xs font-semibold uppercase tracking-wider">
              ✦ Authenticity Pledge
            </span>
            <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-deep-plum pb-3">The Cleansing Promise</h2>
            <div className="w-16 h-px bg-gold-accent mx-auto"></div>
            <p className="text-sm text-ink/75 max-w-md mx-auto font-light leading-relaxed mt-2">
              Every crystal is attuned to carry maximum positive frequencies before leaving our temple.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {promises.map((p, idx) => (
              <div key={idx} className={`group relative p-8 rounded-3xl bg-gradient-to-br ${p.gradient} border border-white hover:shadow-premium-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
                <div className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-white/30 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="w-12 h-12 rounded-2xl bg-white shadow flex items-center justify-center text-primary-purple mb-6 transition-transform duration-300 group-hover:scale-110">
                  <span className="text-2xl">{p.icon}</span>
                </div>
                <h3 className="font-playfair text-lg font-bold text-deep-plum mb-2">{p.title}</h3>
                <p className="font-inter text-xs text-ink/70 leading-relaxed font-light">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by Intent Grid (Replaces Shop by Problem, styled with premium category cards) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold-600 text-sm block">✧ Healing Intents</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-deep-plum pb-3">Shop by Intent</h2>
          <div className="w-16 h-px bg-gold-accent mx-auto"></div>
          <p className="text-ink/70 max-w-2xl mx-auto font-light mt-2 font-inter">Find specialized crystals attuning to your emotional, physical, and financial blockages.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {problemCategories.map(cat => (
            <Link key={cat.id} href={`/shop/problem/${cat.slug}`} className="glass-card rounded-[2rem] overflow-hidden flex flex-col group h-full hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 border border-white">
              <div className="relative h-64 w-full bg-lavender-mist">
                <Image src={cat.imageUrl} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-8 flex flex-col justify-between flex-grow bg-gradient-to-b from-white to-soft-purple-50/30">
                <div className="space-y-3">
                  <h3 className="text-2xl font-playfair font-semibold text-deep-plum">{cat.name}</h3>
                  <p className="text-sm text-ink/80 leading-relaxed font-light font-inter">{cat.description}</p>
                </div>
                <div className="pt-6 text-primary-purple font-medium text-sm inline-flex items-center group-hover:translate-x-1 transition-transform cursor-pointer">
                  Explore Intent →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Bestsellers Gems Grid (Upgraded styling) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold-600 text-sm block">✧ Customer Favorites</span>
          <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-deep-plum pb-3">Bestselling Gems</h2>
          <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loadingBestsellers ? (
            <div className="col-span-3 text-center py-10">
              <div className="w-10 h-10 border-4 border-soft-purple-200 border-t-primary-purple rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            bestsellers.map(product => (
              <div key={product.id} className="glass-card rounded-3xl overflow-hidden flex flex-col justify-between group hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300 border border-white">
                <Link href={`/product/${product.slug}`} className="block">
                  <div className="relative h-72 w-full bg-lavender-mist">
                    <Image src={product.imageUrls[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <span className="absolute top-4 left-4 bg-primary-purple text-white text-[9px] uppercase font-bold tracking-widest px-3 py-1 rounded-full">Bestseller</span>
                  </div>
                  <div className="p-6 text-center space-y-2 bg-gradient-to-b from-white to-soft-purple-50/20">
                    <h3 className="text-xl font-playfair font-semibold text-deep-plum group-hover:text-primary-purple transition-colors">{product.name}</h3>
                    <div className="flex justify-center items-center gap-1 text-gold-500 text-sm">
                      {"★".repeat(Math.round(product.rating))}
                      <span className="text-xs text-ink/60 ml-1">({product.rating})</span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-6 pt-2 bg-gradient-to-b from-white to-soft-purple-50/20">
                  <a 
                    href={buildWhatsAppLink(`Hi, I'd like to order ${product.name}`)}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-3 inline-flex items-center justify-center gap-2 bg-gradient-btn text-white rounded-xl font-semibold tracking-wide text-xs shadow-md cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                    </svg>
                    Order on WhatsApp
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. Cleansing Rituals Section (Sourcing Story - Dark Ethereal Wash) */}
      <section className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #3b203b 0%, #5d395d 40%, #2a122a 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-80 h-80 opacity-5" style={{ background: "radial-gradient(circle, #faf7ed 0%, transparent 70%)" }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-10" style={{ background: "radial-gradient(ellipse, #bd8933 0%, transparent 70%)" }}></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 text-center max-w-3xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 text-gold-400 text-xs font-semibold uppercase tracking-wider">
            🌙 Our Sourcing Promise
          </div>
          
          <h2 className="text-3xl md:text-5xl font-playfair font-semibold text-white leading-tight">
            Rooted in <span className="text-gold-300">Ethical Wisdom</span>
          </h2>
          
          <p className="text-sm md:text-base text-white/70 leading-relaxed font-light max-w-2xl mx-auto font-inter">
            At CRYSTALSEER, we believe in the timeless connection between earth crystals and human alignment. Every cluster is bathed in Himalayan pink salt and charged overnight under full moon phases to cleanse preceding energies and raise vibrations to peak healing attunement.
          </p>
          
          <div className="pt-4">
            <Link href="/about" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-xs text-gray-900 shadow-md group transition-transform duration-300 hover:scale-[1.02] cursor-pointer" style={{ background: "linear-gradient(135deg, #e7d8aa 0%, #dbbf7d 100%)" }}>
              Read Our Rituals Story
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Mystical Services Section (Upgraded layout with glass-cards) */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-gold-600 text-sm block">✧ Intuitive Guides</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-deep-plum pb-3">Mystical Services</h2>
            <div className="w-16 h-px bg-gold-accent mx-auto mb-4"></div>
            <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed text-sm font-inter">
              Consult with the cosmos. Book direct WhatsApp reading appointments with our guides.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {services.map(srv => {
              const bookingText = srv.slug === "tarot-card-reading" 
                ? "Hi, I'd like to book a Tarot Card reading"
                : "Hi, I'd like to book a Numerology session";
              return (
                <div key={srv.slug} className="glass-card rounded-[2rem] p-10 border border-lavender-mist flex flex-col justify-between h-[450px] hover:shadow-premium-hover transition-all duration-300">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <span className="text-5xl">{srv.slug === 'tarot-card-reading' ? '🃏' : '🔢'}</span>
                      <span className="px-3 py-1 bg-gold-50 text-gold-700 border border-gold-200 rounded-full text-xs uppercase tracking-wider font-semibold">Live Guidance</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-deep-plum">{srv.title}</h3>
                    <p className="text-ink/75 leading-relaxed font-light text-xs font-inter">{srv.longDescription}</p>
                  </div>
                  <div className="flex gap-4">
                    <Link href={`/services/${srv.slug}`} className="flex-1 py-3 text-center bg-white border border-soft-purple-200 text-soft-purple-800 hover:bg-soft-purple-100 rounded-xl font-semibold text-xs transition-colors cursor-pointer">
                      Learn More
                    </Link>
                    <a 
                      href={buildWhatsAppLink(bookingText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 text-center bg-gradient-btn text-white rounded-xl font-semibold text-xs shadow-md inline-flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
                      </svg>
                      Book Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="py-24 bg-soft-purple-50/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <span className="text-gold-600 text-sm block">✧ Blessed Vibrations</span>
            <h2 className="text-4xl md:text-5xl font-playfair font-semibold text-deep-plum pb-3">Spiritual Reviews</h2>
            <div className="w-16 h-px bg-gold-accent mx-auto"></div>
          </div>

          {/* Testimonial card */}
          <div className="relative max-w-3xl mx-auto">
            <div className="bg-white rounded-3xl border border-lavender-mist shadow-sm px-8 sm:px-14 py-12 text-center min-h-[280px] flex flex-col items-center justify-center relative overflow-hidden">
              {/* Decorative large open-quote */}
              <span className="absolute top-4 left-8 font-playfair text-8xl leading-none text-soft-purple-200 select-none pointer-events-none" aria-hidden="true">&ldquo;</span>

              {testimonials.map((test, idx) => (
                <div
                  key={test.id}
                  className={`transition-all duration-700 absolute inset-0 flex flex-col items-center justify-center space-y-5 px-8 sm:px-14 py-12 ${
                    activeTestimonial === idx ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-4"
                  }`}
                >
                  <div className="text-gold-400 text-sm tracking-widest">{"★".repeat(test.rating)}</div>
                  <blockquote className="font-playfair text-lg md:text-xl text-ink leading-relaxed italic max-w-2xl">
                    {test.quote}
                  </blockquote>
                  <div className="pt-2">
                    <h4 className="font-semibold text-deep-plum text-sm">{test.customerName}</h4>
                    <p className="text-[10px] text-primary-purple uppercase tracking-widest mt-1">{test.credential}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevTestimonial}
                className="w-9 h-9 rounded-full border border-soft-purple-300 flex items-center justify-center text-soft-purple-700 hover:bg-soft-purple-100 hover:border-soft-purple-400 transition-all focus:outline-none cursor-pointer"
                aria-label="Previous testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    aria-label={`Testimonial ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                      activeTestimonial === idx
                        ? "w-5 h-2 bg-primary-purple"
                        : "w-2 h-2 bg-soft-purple-200 hover:bg-soft-purple-400"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="w-9 h-9 rounded-full border border-soft-purple-300 flex items-center justify-center text-soft-purple-700 hover:bg-soft-purple-100 hover:border-soft-purple-400 transition-all focus:outline-none cursor-pointer"
                aria-label="Next testimonial"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ Accordion */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-gold-600 text-sm block">✧ Common Questions</span>
          <h2 className="text-4xl font-playfair font-semibold text-deep-plum pb-3">FAQ</h2>
          <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                activeFAQ === idx
                  ? "bg-white border-soft-purple-300 shadow-sm"
                  : "bg-white border-lavender-mist hover:border-soft-purple-200"
              }`}
            >
              <button
                onClick={() => handleFAQToggle(idx)}
                className="w-full flex justify-between items-center text-left px-6 py-5 font-playfair text-base font-medium text-deep-plum focus:outline-none hover:text-primary-purple transition-colors cursor-pointer gap-4"
              >
                <span>{faq.q}</span>
                <span
                  className={`flex-shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    activeFAQ === idx
                      ? "bg-primary-purple border-primary-purple text-white rotate-45"
                      : "border-soft-purple-300 text-primary-purple"
                  }`}
                  aria-hidden="true"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="6" y1="0" x2="6" y2="12"/>
                    <line x1="0" y1="6" x2="12" y2="6"/>
                  </svg>
                </span>
              </button>
              <div className={`transition-all duration-300 overflow-hidden ${
                activeFAQ === idx ? "max-h-48" : "max-h-0"
              }`}>
                <p className="px-6 pb-5 text-sm text-ink/75 font-light leading-relaxed font-inter">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. WhatsApp Ordering Banner (Upgrade to soft gradient wash CTA banner from Arrkamrut layout) */}
      <section className="py-24 relative overflow-hidden border-t border-lavender-mist" style={{ background: "linear-gradient(135deg, #fdfafc 0%, #f8f1f8 50%, #faf7ed 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #f0e1f0 0%, transparent 70%)" }}></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #faf7ed 0%, transparent 70%)" }}></div>
        </div>
        
        <div className="container mx-auto px-6 text-center max-w-2xl relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-soft-purple-100 text-soft-purple-700 text-xs font-semibold uppercase tracking-wider border border-soft-purple-200">
            ✨ Quick & Easy Ordering
          </div>
          
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-deep-plum tracking-tight pb-3">
            Ready to Experience <span className="text-primary-purple">Nature's Gems?</span>
          </h2>
          <div className="w-16 h-px bg-gold-accent mx-auto"></div>
          
          <p className="text-xs md:text-sm text-ink/70 leading-relaxed font-light max-w-md mx-auto mt-4 font-inter">
            Have questions about crystal configurations or want to place a quick prefilled order? Chat with us directly on WhatsApp for personal guidance.
          </p>
          
          <div className="pt-2">
            <a 
              href={buildWhatsAppLink("Hi, I'd like to ask a general question about your crystals")} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-sm shadow-lg hover:shadow-premium-hover transition-all duration-300 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.437.002 9.861-4.416 9.864-9.859.002-2.637-1.019-5.114-2.88-6.974C16.392 1.912 13.91 1.9 11.278 1.9c-5.44 0-9.866 4.418-9.869 9.861-.001 1.502.411 2.97 1.19 4.282L1.57 20.316l4.287-1.121 1.62.959z" />
              </svg>
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
