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
    <section className="py-10 md:py-12 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl font-semibold text-foreground/90 mb-2">
          Organizations I’ve Partnered With
        </h2>
        <p className="text-center text-muted-foreground mb-10">Trusted by leaders and innovators.</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-10">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center">
              <div className="w-20 h-20 p-2 rounded-full bg-background flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-border/50">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={60}
                  height={60}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
