import { testimonials } from "@/data/testimonials";

export const metadata = {
  title: "Our Journey | Crystal Seer",
  description: "Explore the timeline and milestones of Crystal Seer, from a personal home altar to a global sanctuary of healing.",
};

export default function OurJourneyPage() {
  const milestones = [
    {
      year: "2021",
      title: "The Seed of Intent",
      description: "Our founder started Crystal Seer from a single wooden home altar. Blessing crystals for friends under full moon phases, she realized the profound need for truly authentic, high-vibration gems.",
      icon: "🌱"
    },
    {
      year: "2022",
      title: "Establishing Direct Mines",
      description: "Frustrated by the low-vibrational mass market, we traveled to Brazil, Uruguay, and Madagascar to establish direct mining partnerships with ethical family-run quarries.",
      icon: "🤝"
    },
    {
      year: "2023",
      title: "The Temple Sanctuary",
      description: "We opened our small physical temple sanctuary in New York for local aura cleansings and walk-in crystal matching, attuning over 1,000 collectors in our first year.",
      icon: "🏛️"
    },
    {
      year: "2024",
      title: "Mystical Digital Attunement",
      description: "Launched our Tarot and Numerology interactive reading platforms, enabling seekers worldwide to connect directly with master healers over virtual sessions.",
      icon: "🔮"
    },
    {
      year: "2026",
      title: "10,000+ Blessed Connections",
      description: "Today, we stand as a premier digital sanctuary. Every crystal is still hand-cleansed, moon-blessed, and Reiki-infused, guiding seekers toward their inner light.",
      icon: "✨"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <span className="text-gold-600 text-sm block">✧ The Spiritual Path</span>
        <h1 className="text-4xl md:text-6xl font-playfair font-semibold text-deep-plum font-bold">Our Journey</h1>
        <div className="w-16 h-px bg-gold-accent mx-auto"></div>
        <p className="text-ink/75 max-w-xl mx-auto font-light leading-relaxed text-sm">
          A timeline of how we grew from a humble home blessing ritual into a global family of conscious spiritual seekers.
        </p>
      </div>

      {/* Timeline Section */}
      <div className="relative border-l border-soft-purple-300 ml-4 md:ml-32 space-y-16 max-w-3xl mx-auto">
        {milestones.map((m, idx) => (
          <div key={idx} className="relative pl-8 md:pl-12 group">
            
            {/* Timeline Dot Icon */}
            <span className="absolute -left-6 top-1.5 w-12 h-12 rounded-full bg-white border border-soft-purple-300 flex items-center justify-center text-xl shadow-sm z-10 group-hover:border-primary-purple transition-colors">
              {m.icon}
            </span>

            {/* Year Badge for Desktop */}
            <span className="hidden md:block absolute -left-32 top-3 w-20 text-right font-playfair text-2xl font-bold text-primary-purple">
              {m.year}
            </span>

            {/* Content Card */}
            <div className="glass-card rounded-[1.5rem] p-8 border border-lavender-mist space-y-3">
              <span className="inline-block md:hidden font-playfair text-xl font-bold text-primary-purple mb-1">
                {m.year}
              </span>
              <h3 className="text-xl font-playfair font-bold text-deep-plum">{m.title}</h3>
              <p className="text-xs text-ink/75 leading-relaxed font-light">
                {m.description}
              </p>
            </div>

          </div>
        ))}
      </div>

      {/* Sourcing Pledge Block */}
      <div className="mt-24 p-8 md:p-12 bg-white border border-lavender-mist rounded-[2rem] text-center space-y-6 max-w-3xl mx-auto">
        <span className="text-3xl block">🙏</span>
        <h3 className="font-playfair text-2xl font-bold text-deep-plum">Our Continued Promise</h3>
        <p className="text-xs text-ink/80 leading-relaxed font-light max-w-xl mx-auto">
          No matter how large our community grows, our core rituals will never be compromised. Every crystal will always be ethically sourced, cleansed in Himalayan salt, and charged under the full moon.
        </p>
      </div>

      {/* Reviews Section */}
      <div className="mt-32 space-y-16">
        <div className="text-center space-y-4">
          <span className="text-gold-600 text-sm block">✧ Blessed Vibrations</span>
          <h2 className="text-3xl md:text-5xl font-playfair font-bold text-deep-plum">Spiritual Reviews</h2>
          <div className="w-16 h-px bg-gold-accent mx-auto"></div>
          <p className="text-ink/75 max-w-2xl mx-auto font-light leading-relaxed text-xs">
            Read comments from Reiki masters, sound therapists, and seekers who have joined us along our path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {testimonials.map(test => (
            <div key={test.id} className="p-8 rounded-[2rem] bg-white border border-lavender-mist hover:shadow-xl hover:border-soft-lilac transition-all duration-400 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex gap-1 text-gold-500 text-base">
                  {"★".repeat(test.rating)}
                </div>
                <blockquote className="font-playfair text-sm text-ink/80 italic leading-relaxed">
                  "{test.quote}"
                </blockquote>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-4 border-t border-lavender-mist/50">
                <div className="w-8 h-8 rounded-full bg-lavender-mist flex items-center justify-center text-primary-purple font-semibold font-playfair shadow-inner text-sm">
                  {test.customerName.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-deep-plum text-xs">{test.customerName}</h4>
                  <p className="text-[10px] text-primary-purple uppercase tracking-wider font-semibold">{test.credential}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
