"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { BlurFade } from '@/components/ui/blur-fade';
import { Marquee } from '@/components/ui/marquee';
import { motion, AnimatePresence } from 'motion/react';

interface Testimonial {
  imageSrc: string;
  name: string;
  title: string;
  text: string;
  dataAiHint?: string;
}

const testimonialsData: Testimonial[] = [
  {
    imageSrc: "/shannon-myers.jpg",
    name: "Shannon Myers",
    title: "Founder of The Integrative Practitioner",
    text: "I knew Alex was brilliant, but working with him transformed my business. He helped me reclaim 20 hours per week through AI optimization and launch a website that landed a deal within an hour. Beyond the metrics, Alex provides balance. In a world of AI noise, he helps entrepreneurs use tech with a soul-led focus. If your digital presence doesn't feel like your Authentic Self, you don't need a developer—you need a Tech Sherpa.",
    dataAiHint: "profile person"
  },
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
    text: "Alex has a strong work ethic and real attention to detail. He's open-minded about how to approach problems, and he's good at getting people on the same page. I'd work with him again without hesitating.",
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
    text: "Alex's energy is contagious - he walks into a room and people actually want to work. His understanding of Scrum is deep and practical, and it made a real difference in how our HR department operates. The whole team runs better when he's involved.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/marco.jpg",
    name: "Marco",
    title: "Sr. Product Designer",
    text: "Alex is professional and genuinely cares about the people he works with. He pushed our team toward continuous improvement without making it feel forced. I'd recommend him to any organization that values both competence and decency.",
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
    text: "Alex is the best SCRUM master I've worked with. He catches risks early and nothing slips past him. He also genuinely cares about helping the people around him grow, which is rare. Great to work with.",
    dataAiHint: "profile person"
  }
];

// Featured testimonials for spotlight carousel
const featuredTestimonials = testimonialsData.slice(0, 3);

function FeaturedTestimonialCarousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % featuredTestimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);

  return (
    <div className="max-w-3xl mx-auto mb-12">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative bg-card rounded-2xl border border-border p-8 md:p-10 shadow-xl"
        >
          <Quote className="h-10 w-10 text-primary/20 mb-4" />
          <p className="text-lg md:text-xl text-foreground/90 font-sans leading-relaxed mb-8">
            "{featuredTestimonials[current].text}"
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={featuredTestimonials[current].imageSrc}
                  alt={`Profile picture of ${featuredTestimonials[current].name}`}
                  fill
                  sizes="56px"
                  className="rounded-full object-cover border-2 border-primary/30"
                  data-ai-hint={featuredTestimonials[current].dataAiHint || "profile person"}
                />
              </div>
              <div>
                <p className="text-base font-bold text-primary">{featuredTestimonials[current].name}</p>
                <p className="text-sm text-muted-foreground font-sans">{featuredTestimonials[current].title}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className="p-2 rounded-full hover:bg-muted transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="flex justify-center gap-1 mt-4">
            {featuredTestimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-primary' : 'w-2 bg-muted'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

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
            What Do Clients Say About Working With Alex Myers?
          </h2>
          <p className="mt-3 text-muted-foreground font-sans text-base max-w-xl mx-auto">
            Testimonials from executives, founders, and operators across tech, strategy, and change management.
          </p>
        </div>
      </BlurFade>

      {/* Featured testimonial carousel */}
      <FeaturedTestimonialCarousel />

      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <p className="absolute bottom-2 right-4 z-10 text-[10px] text-muted-foreground/40 font-mono pointer-events-none select-none">hover to pause</p>
        <Marquee pauseOnHover className="[--duration:70s] [--gap:1.5rem] md:[--gap:2rem]">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://thearmchairfuturist.com/#org",
          "name": "The Armchair Futurist - Alex Myers",
          "review": testimonialsData.map((t) => ({
            "@type": "Review",
            "author": { "@type": "Person", "name": t.name },
            "reviewBody": t.text,
          })),
        }),
      }} />
    </section>
  );
}
