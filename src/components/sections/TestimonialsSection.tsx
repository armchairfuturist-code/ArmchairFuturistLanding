
import Image from 'next/image';
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Testimonial {
  imageSrc: string;
  name: string;
  title: string;
  text: string;
  dataAiHint?: string;
}

const testimonialsData: Testimonial[] = [
  {
    imageSrc: "/Alexaragon.jpg",
    name: "Alex A.", 
    title: "COO at Aragon.org",
    text: "I have worked with Alex for the past two years at Aragon across several roles as the team lead. It's not every day you come across someone who combines a strong work ethic with an impressive attention to detail, but that's exactly what Alex does. He also has the ability to get on with anyone on the team and was a valuable asset throughout several Org changes which kept the team engaged and as informed as they could be. \n\nHe has an incredibly open-minded approach to challenges and his skill to build consensus in our team has been invaluable alongside being able to take initiatives and projects from ideation to completion with very little input. This was crucial in our small team as different projects would often pop up and Alex was the first to step up. Alex's dedication and insight enhanced our team dynamics and he was flexible with whatever task was thrown his way. His experience as an Agile coach only added to his skill set in the team helping all of our operations remain agile and efficient.\n\nHe would undoubtedly be a valuable asset to any team he joins. I look forward to what ever challenge he take on next.",
  },
  {
    imageSrc: "/Karrie.jpg",
    name: "Karrie S.",
    title: "CEO at Culminate Strategy Group",
    text: "Alex is one of the best change and program management professionals I've run across in transformation. He approaches each initiative with an eye toward the future technologies and how they impact the organization, productivity, and value creation. He's also just a high EQ leader who loves mentoring and coaching others into the next best version of themselves.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/tessa.jpg",
    name: "Tessa M.", // Placeholder last initial, user can update
    title: "Marketing Strategist",
    text: "Alex really made a huge difference in the operations at Aragon, ensuring every member of the team felt heard and seen — rare in many tech companies today.\n\nHe also ensured that each member was focused on their personal development and helped us adapt our skills as the organization’s needs shifted.\n\nHe would make a great addition to any project. ",
    dataAiHint: "profile person"
  },
];

export default function TestimonialsSection() {
  // Duplicate for seamless scroll, ensure this matches the number of actual testimonials
  const duplicatedTestimonials = testimonialsData.length > 0 ? [...testimonialsData, ...testimonialsData] : []; 

  if (testimonialsData.length === 0) {
    return null; // Or some placeholder if no testimonials exist
  }

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Testimonials
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Hear directly from leaders I've partnered with.
          </p>
        </div>

        <div className="overflow-hidden py-4 w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-x-6 md:gap-x-8">
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card key={`${testimonial.name}-${index}`} className="w-80 md:w-96 flex-shrink-0 bg-card shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4 p-4 md:p-6">
                  <div className="relative h-14 w-14 md:h-16 md:w-16 shrink-0">
                    <Image
                      src={testimonial.imageSrc}
                      alt={`Profile picture of ${testimonial.name}`}
                      fill
                      className="rounded-full object-cover border-2 border-primary/20"
                      data-ai-hint={testimonial.dataAiHint || "profile person"}
                    />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-primary">{testimonial.name}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6 pt-0 text-sm text-foreground/80 flex-grow">
                  <p className="whitespace-normal leading-relaxed">"{testimonial.text.split('\n\n').map((paragraph, i) => (
                    <span key={i} className="block mb-2 last:mb-0">{paragraph}</span>
                  ))}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
