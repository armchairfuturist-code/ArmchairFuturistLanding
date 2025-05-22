
import Image from 'next/image';

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "The GenAI Academy logo" },
  { src: "/aragonp.jpg", alt: "Aragon.org logo" },
  { src: "/culminate.jpg", alt: "Culminate Strategy Group logo" },
  { src: "/techstars.jpg", alt: "Techstars logo" },
  { src: "/launch.jpg", alt: "Launch by NTT Data logo" },
  { src: "/kemin.jpg", alt: "Kemin logo" },
  { src: "/shiftdsm.jpg", alt: "Shift DSM logo" },
];

export default function FeaturedInSection() {
  return (
    <section className="py-8 md:py-10 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="font-heading text-center text-2xl font-semibold text-foreground/90 mb-8">
          Organizations I’ve Partnered With
        </h2>
        {/* <p className="text-center text-base text-muted-foreground mb-8">
          Trusted by leaders and innovators.
        </p> */}
        <div className="overflow-hidden py-4 w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-x-6 md:gap-x-8">
            {/* Render logos twice for seamless scroll */}
            {[...logos, ...logos].map((logo, index) => (
              <div key={`${logo.alt}-${index}`} className="flex flex-col items-center w-32 text-center flex-shrink-0">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={64}
                  height={64}
                  className="rounded-full object-cover shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border/50 grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

