import Image from 'next/image';

const logos = [
  { src: "https://placehold.co/150x60.png", alt: "Gen AI Academy", dataAiHint: "modern tech logo" },
  { src: "https://placehold.co/150x60.png", alt: "Aragon.org", dataAiHint: "blockchain organization logo" },
  { src: "https://placehold.co/150x60.png", alt: "Culminate Strategy Group", dataAiHint: "consulting firm logo" },
  { src: "https://placehold.co/150x60.png", alt: "Techstars Accelerator", dataAiHint: "startup accelerator logo" },
  { src: "https://placehold.co/150x60.png", alt: "Launch by NTT Data", dataAiHint: "corporate innovation logo" },
];

export default function FeaturedInSection() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center text-2xl font-semibold text-foreground/90 mb-2">
          Organizations I’ve Partnered With
        </h2>
        <p className="text-center text-muted-foreground mb-10">Trusted by leaders and innovators.</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center items-center opacity-70 hover:opacity-100 transition-opacity duration-300">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={150}
                height={60}
                className="object-contain"
                data-ai-hint={logo.dataAiHint}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
