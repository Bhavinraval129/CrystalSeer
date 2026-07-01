export default function TestimonialsV1() {
  const testimonials = [
    {
      quote: "The Amethyst cluster I received completely shifted the energy of my meditation space. The quality is simply unmatched.",
      author: "Elena R.",
      role: "Reiki Master"
    },
    {
      quote: "My tarot reading was deeply intuitive. It brought me a sense of peace and clarity I had been searching for for months.",
      author: "Marcus T.",
      role: "Spiritual Seeker"
    },
    {
      quote: "You can truly feel the love and care that goes into sourcing these stones. They vibrate with such a high frequency.",
      author: "Sophia L.",
      role: "Sound Healer"
    }
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-soft-purple-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl md:text-4xl font-playfair font-medium text-gray-900 mb-16">
          Whispers from the <i className="text-soft-purple-600">Soul</i>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-soft-purple-50/50 border border-soft-purple-100 hover:shadow-xl hover:shadow-soft-purple-100/50 transition-all duration-500 backdrop-blur-sm">
              <div className="text-soft-purple-300 text-4xl font-serif mb-4">"</div>
              <p className="font-playfair text-lg text-gray-700 italic mb-8 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-soft-purple-200 flex items-center justify-center text-soft-purple-700 font-inter font-medium">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-inter font-medium text-gray-900 text-sm">{testimonial.author}</h4>
                  <p className="font-inter text-xs text-soft-purple-600 uppercase tracking-wider">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
