"use client";
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { Marquee } from '@/components/ui/marquee';

interface Testimonial {
  imageSrc: string;
  name: string;
  title: string;
  text: string;
  dataAiHint?: string;
}

const testimonialsData: Testimonial[] = [
  {
    imageSrc: "/stephan-kerby.jpg",
    name: "Stephan Kerby",
    title: "Co-Founder, Mindscape Psychedelic Institute",
    text: "Alex is a fantastic communicator who made the website redesign process effortless. I'm thrilled with the outcome and the creative ideas Alex brought to the project that I never would have thought of.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/Alexaragon.jpg",
    name: "Alex A.",
    title: "COO at Aragon.org",
    text: "It's not every day you come across someone who combines a strong work ethic with an impressive attention to detail, but that's exactly what Alex does. He has an incredibly open-minded approach to challenges and his skill to build consensus has been invaluable. He would undoubtedly be a valuable asset to any team he joins.",
    dataAiHint: "profile person"
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
    name: "Tessa M.",
    title: "Marketing Strategist",
    text: "I had the pleasure of meeting Alex through Lunchclub. We talked about the future and Web3, and it was then that I realized I might have found myself a Web3 mentor. Alex is calm, patient, and is very generous with his knowledge. Alex is a great mentor and I would recommend him to anyone who wants to do a deep dive into Web3.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/Sepehr.jpg",
    name: "Sepehr S.",
    title: "Co-Founder & Sr. Software Engineer",
    text: "If you're looking for someone who makes a difference, look no further than Alex. His incredible positive energy makes everyone feel upbeat and ready to tackle any challenge. Alex's deep understanding of Scrum methodologies has been a game-changer for us - his mix of vibrant energy and expertise hasn't just revolutionized our HR department; it's electrified our entire workplace atmosphere.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/marco.jpg",
    name: "Marco",
    title: "Sr. Product Designer",
    text: "Alex possesses a rare combination of professionalism, compassion, and unwavering respect for both the job at hand and the individuals involved. His commitment to fostering a culture of continuous improvement and adaptability was truly commendable. I wholeheartedly recommend Alex for any organization seeking a professional who not only excels in their role but also brings a human touch to every aspect of their work.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/Evan.jpg",
    name: "Evan H.",
    title: "Head of Strategy",
    text: "Alex was one of the most significant members of the Aragon team throughout 2022 and 2023. He is extraordinarily proactive, doesn't wait to be told what to do, and will always give his ear to bounce ideas off of. If anyone needs this kind of dynamic energy on their team, it is an absolute no brainer that they should speak with Alex.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/Lia-Savillo.webp",
    name: "Lia S.",
    title: "Marketing Strategist",
    text: "Alex really made a huge difference in the operations at Aragon, ensuring every member of the team felt heard and seen - rare in many tech companies today. He also ensured that each member was focused on their personal development and helped us adapt our skills as the organization's needs shifted. He would make a great addition to any project.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/jasper.jpg",
    name: "Jasper",
    title: "Sr. Manager - Launch by NTT Data",
    text: "Alex has been one of the most engaging and positive SCRUM masters I have ever worked with. He raises risks when they come up and nothing ever really goes unnoticed by him. He not only focuses on the business at hand but also focuses on the growth of everyone around him and elevates everyone. It has been a true pleasure working with him.",
    dataAiHint: "profile person"
  }
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-none w-80 md:w-96 bg-card rounded-xl border border-border/50 shadow-md p-5 md:p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Quote className="h-5 w-5 text-primary/30 shrink-0" />
      <p className="text-sm text-foreground/80 font-sans leading-relaxed line-clamp-7">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-border/30">
        <div className="relative h-10 w-10 shrink-0">
          <Image
            src={testimonial.imageSrc}
            alt={`Profile picture of ${testimonial.name}`}
            fill
            sizes="40px"
            className="rounded-full object-cover border-2 border-primary/20"
            data-ai-hint={testimonial.dataAiHint || "profile person"}
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-primary leading-tight">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground font-sans">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-12 md:py-24 bg-secondary scroll-mt-20 overflow-hidden">
      <BlurFade inView>
        <div className="container mx-auto px-4 md:px-6 text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            What Leaders Say After Working With Alex
          </h2>
          <p className="mt-3 text-muted-foreground font-sans text-base max-w-xl mx-auto">
            Testimonials from executives, founders, and operators across tech, strategy, and change management.
          </p>
        </div>
      </BlurFade>

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <p className="absolute bottom-2 right-4 z-10 text-[10px] text-muted-foreground/40 font-mono pointer-events-none select-none">hover to pause</p>
        <Marquee pauseOnHover className="[--duration:70s] [--gap:1.5rem] md:[--gap:2rem]">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
