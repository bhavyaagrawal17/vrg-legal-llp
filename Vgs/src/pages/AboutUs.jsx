import { Scale } from "lucide-react";
 import { ImageWithFallback } from "../components/figma/ImageWithFallback";


export function AboutUs() {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center">
      


      {/* Right Column - Content */}
      <div className="flex items-center  px-8 py-16 md:px-16 lg:px-24">
        <div className="max-w-lg">
          {/* Headline */}
          <h1 className="font-bold font-sans text-[40px] text-center mb-3">
            About Our Firm
          </h1>

          {/* Decorative Line with Scales Icon */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex-1 h-px bg-foreground/20"></div>
            <div className="mx-6">
              <Scale className="w-10 h-20 text-foreground/60" />
            </div>
            <div className="flex-1 h-px bg-foreground/20"></div>
          </div>

          {/* Body Text */}
          <div className="font-sans space-y-6 text-center text-[20px]">
            <p>
              VRG Legal LLP is a full-service law firm committed to delivering precise, effective, and ethical legal solutions. Our team of experienced professionals provides comprehensive services across litigation, corporate law, arbitration, compliance, and advisory.
</p>
            <p>
            With a client-focused approach and unwavering integrity, we strive to achieve practical outcomes while upholding the highest standards of professionalism.
            </p>
           
          </div>
        </div>
      </div>
      </section>
   
  );
}

export default AboutUs