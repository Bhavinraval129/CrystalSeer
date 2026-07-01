export default function TestimonialsV3() {
  const testimonials = [
    {
      quote: "The Amethyst cluster completely shifted the energy of my space. The quality is unmatched.",
      author: "Elena R.",
      role: "Reiki Master",
      rating: 5
    },
    {
      quote: "My tarot reading was deeply intuitive. It brought me a sense of peace and clarity I had been searching for.",
      author: "Marcus T.",
      role: "Client",
      rating: 5
    },
    {
      quote: "You can truly feel the care that goes into sourcing these stones. They vibrate with a high frequency.",
      author: "Sophia L.",
      role: "Sound Healer",
      rating: 5
    }
  ];

  return (
    <section className="py-24 bg-ocean-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-16 border-b border-ocean-blue-200 pb-8">
          <h2 className="text-4xl md:text-5xl font-cormorant font-bold text-ocean-blue-950">
            Client Voices
          </h2>
          <div className="flex gap-2">
            <button className="w-12 h-12 border border-ocean-blue-300 flex items-center justify-center hover:bg-ocean-blue-950 hover:text-white transition-colors">
              ←
            </button>
            <button className="w-12 h-12 border border-ocean-blue-300 flex items-center justify-center hover:bg-ocean-blue-950 hover:text-white transition-colors">
              →
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white p-10 border border-ocean-blue-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-6 text-ocean-blue-600">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="font-lato text-lg text-ocean-blue-900 mb-8 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-cormorant font-bold text-xl text-ocean-blue-950">{testimonial.author}</p>
                <p className="font-lato uppercase tracking-widest text-xs font-bold text-ocean-blue-400 mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
