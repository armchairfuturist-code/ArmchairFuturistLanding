import Image from 'next/image';

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "The GenAI Academy" },
  { src: "/aragonp.jpg", alt: "Aragon Association" },
  { src: "/culminate.jpg", alt: "Culminate Strategy Group" },
  { src: "/techstars.jpg", alt: "Techstars" },
  { src: "/launch.jpg", alt: "Launch by NTT Data" },
];

export default function FeaturedInSection() {
  return (
    <section className="py-8 md:py-10 bg-background"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-xl font-semibold text-foreground/90 mb-2"> {/* Slightly smaller heading */}
          Organizations I’ve Partnered With
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leaders and innovators.</p> {/* Slightly smaller text & less margin */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8"> {/* Reduced gap */}
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              {/* Image itself is now circular */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={64} // Adjusted size for the circular image
                height={64}
                className="rounded-full object-cover shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border/50"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
