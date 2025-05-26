
import Image from 'next/image';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For potential use with initials if no image

interface Testimonial {
  imageSrc: string;
  name: string;
  title: string;
  text: string;
  dataAiHint?: string;
}

// Placeholder data for 8 testimonials.
// YOU WILL NEED TO REPLACE THESE WITH ACTUAL DATA FROM LINKEDIN.
const testimonialsData: Testimonial[] = [
  {
    imageSrc: "/Alexaragon.jpg",
    name: "Alex A.", // Placeholder name, please update if needed
    title: "COO at Aragon.org",
    text: "I have worked with Alex for the past two years at Aragon across several roles as the team lead. It's not every day you come across someone who combines a strong work ethic with an impressive attention to detail, but that's exactly what Alex does. He also has the ability to get on with anyone on the team and was a valuable asset throughout several Org changes which kept the team engaged and as informed as they could be. \n\nHe has an incredibly open-minded approach to challenges and his skill to build consensus in our team has been invaluable alongside being able to take initiatives and projects from ideation to completion with very little input. This was crucial in our small team as different projects would often pop up and Alex was the first to step up. Alex's dedication and insight enhanced our team dynamics and he was flexible with whatever task was thrown his way. His experience as an Agile coach only added to his skill set in the team helping all of our operations remain agile and efficient.\n\nHe would undoubtedly be a valuable asset to any team he joins. I look forward to what ever challenge he take on next.",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "John Smith",
    title: "VP of Engineering, FutureTech",
    text: "The mindset transformation Alex facilitated within our engineering teams was remarkable. We're now approaching AI not just as a tool, but as a catalyst for innovation.",
    dataAiHint: "profile man",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "Emily White",
    title: "Director of Operations, Global Corp",
    text: "Working with Alex on our change management program for AI integration was a game-changer. His approach is both deeply empathetic and incredibly effective.",
    dataAiHint: "profile person",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "Michael Brown",
    title: "Founder, StartupX",
    text: "Alex's 1-on-1 mentoring provided me with the clarity and strategic frameworks needed to lead my team through significant technological shifts. Highly recommended.",
    dataAiHint: "profile developer",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "Sarah Green",
    title: "Lead Product Manager, NextGen Apps",
    text: "Alex has a unique talent for cutting through the hype and delivering actionable advice. His speaking engagements are both thought-provoking and inspiring.",
    dataAiHint: "profile designer",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "David Lee",
    title: "CTO, Data Driven Inc.",
    text: "The AI-powered psychological assessment approach Alex uses provided invaluable insights into our team's readiness for change, allowing us to tailor our strategy effectively.",
    dataAiHint: "profile engineer",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "Linda Chen",
    title: "Head of People, Culture First Ltd.",
    text: "Alex helped us not just adopt AI, but to build a culture that embraces continuous learning and innovation. His focus on 'second order thinking' has been transformative.",
    dataAiHint: "profile hr",
  },
  {
    imageSrc: "https://placehold.co/64x64.png",
    name: "Robert Garcia",
    title: "Strategy Lead, Visionary Co.",
    text: "If you're looking for a partner to navigate the human side of AI and digital transformation, Alex is the expert you need. His guidance is both strategic and practical.",
    dataAiHint: "profile executive",
  },
];

export default function TestimonialsSection() {
  // Duplicate for seamless scroll, ensure this matches the number of actual testimonials
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData]; 

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
