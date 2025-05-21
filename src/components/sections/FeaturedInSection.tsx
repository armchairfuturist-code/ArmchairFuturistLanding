import Image from 'next/image';

const logos = [
  { src: "/thegenaiacademy.jpg", alt: "The GenAI Academy logo", title: "The GenAI Academy" },
  { src: "/aragonp.jpg", alt: "Aragon.org logo", title: "Aragon.org" },
  { src: "/culminate.jpg", alt: "Culminate Strategy Group logo", title: "Culminate Strategy Group" },
  { src: "/techstars.jpg", alt: "Techstars logo", title: "Techstars" },
  { src: "/launch.jpg", alt: "Launch by NTT Data logo", title: "Launch by NTT Data" },
];

export default function FeaturedInSection() {
  return (
    <section className="py-8 md:py-10 bg-background"> {/* Reduced padding */}
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-xl font-semibold text-foreground/90 mb-2"> {/* Slightly smaller heading */}
          Organizations I’ve Partnered With
        </h2>
        <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leaders and innovators.</p> {/* Slightly smaller text & less margin */}
        <div className="flex flex-wrap justify-center items-start gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10"> {/* Adjusted gap for titles */}
          {logos.map((logo, index) => (
            <div key={index} className="flex flex-col items-center w-32 text-center"> {/* Container for image and title */}
              <Image
                src={logo.src}
                alt={logo.alt}
                width={64} 
                height={64}
                className="rounded-full object-cover shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border/50"
              />
              <p className="mt-2 text-xs font-medium text-muted-foreground">{logo.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
