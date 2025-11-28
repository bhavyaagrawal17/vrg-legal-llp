import { Quote } from "lucide-react";

const testimonials = [
  {
    text: "VRG Legal helped us in a complex international litigation with ramifications in India and the USA. Our experience of international legal matters is extensive. With that as a background, our experience with VRG has been excellent. In terms of content knowledge and expertise, responsiveness and positivity of attitude, and rigour in application and follow up, we would not expect better. In addition, they have exceeded our high expectations and on occasion, 'gone the extra mile'. We are happy to recommend the firm as a highly competent and professional legal partner. ",
  
  },
  {
    text: "With an everchanging Taxation laws, accidental defaults are obvious. Therefore the best way to handle these situation is to have an expert constantly guiding you towards the best suited options for the individual which is also compliant by law. And thats where i trust VRG consultants the most. Special callout for Mr Vaibhav for his exceptional skills in this domain.",
   
  },
  {
    text: "Strongly recommend to leverage VRG legal services for expert and unbiased consultations.",
    
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      
      {/* Section Header */}
      <div className="text-center mb-14 fade-in-up">

       
        <p className="text-4xl font-bold text-[#0f1a33]">
          Testimonials
        </p>

      
        <h2 className="text-xl font-semibold text-[#0f1a33] mt-2">
          Our Clients Review
        </h2>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-4">
        {testimonials.map((item, i) => (
          <div
            key={i}
            className="
              fade-in-up
              bg-[#fdfefe]
              rounded-xl
              p-10
              text-center
              border border-black/20
              shadow-[0_10px_30px_rgba(0,0,0,0.06)]
              transition-all
              duration-300
              hover:scale-[1.03]
              hover:shadow-[0_15px_40px_rgba(0,0,0,0.14)]
              hover:border-black
            "
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {/* Quote Icon */}
            <div className="flex justify-center mb-4">
              <Quote
                size={34}
                className="text-[#f4a500] drop-shadow-[0_0_8px_rgba(244,165,0,0.4)]"
              />
            </div>

            <p className="text-[#0f1a33] text-sm mb-6 leading-relaxed">
              {item.text}
            </p>

           

          </div>
        ))}
      </div>
    </section>
  );
}
