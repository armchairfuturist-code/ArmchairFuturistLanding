
"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from 'lucide-react';

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
    text: "I have worked with Alex for the past two years at Aragon across several roles as the team lead. It's not every day you come across someone who combines a strong work ethic with an impressive attention to detail, but that's exactly what Alex does. He also has the ability to get on with anyone on the team and was a valuable asset throughout several Org changes which kept the team engaged and as informed as they could be.\n\nHe has an incredibly open-minded approach to challenges and his skill to build consensus in our team has been invaluable alongside being able to take initiatives and projects from ideation to completion with very little input. This was crucial in our small team as different projects would often pop up and Alex was the first to step up. Alex's dedication and insight enhanced our team dynamics and he was flexible with whatever task was thrown his way. His experience as an Agile coach only added to his skill set in the team helping all of our operations remain agile and efficient.\n\nHe would undoubtedly be a valuable asset to any team he joins. I look forward to what ever challenge he take on next.",
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
    text: "Alex really made a huge difference in the operations at Aragon, ensuring every member of the team felt heard and seen — rare in many tech companies today.\n\nHe also ensured that each member was focused on their personal development and helped us adapt our skills as the organization’s needs shifted.\n\nHe would make a great addition to any project. ",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/Sepehr.jpg",
    name: "Sepehr S.",
    title: "Co-Founder & Sr. Software Engineer",
    text: "If you're looking for someone who makes a difference, look no further than Alex. As our HR guy at Aragon, he was nothing short of amazing. But it's not just his HR smarts that set him apart; it's his incredible positive energy. Alex has this way of making everyone feel upbeat and ready to tackle any challenge. His enthusiasm is just infectious! Alex's deep understanding of Scrum methodologies has been a game-changer for us. He's got this incredible ability to integrate Scrum tactics seamlessly into our HR functions, ramping up our team efficiency and cooperation. It's impressive how he applies these agile practices, streamlining our workflows and fostering a more dynamic team environment. Alex's mix of vibrant energy and expertise in Scrum hasn't just revolutionized our HR department; it's electrified our entire workplace atmosphere.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/marco.jpg",
    name: "Marco",
    title: "Sr. Product Designer",
    text: "Alex possesses a rare combination of professionalism, compassion, and unwavering respect for both the job at hand and the individuals involved.\n\nAs an Agile Coach and People Operation at Aragon, Alex demonstrated an unparalleled ability to drive us to a leaner approach, fostering an environment of collaboration and efficiency. Alex's commitment to fostering a culture of continuous improvement and adaptability was truly commendable, making a significant impact on our team's success., and at a personal level, always allowing me to feel respected and understood.\n\nThe honest and fair approach to managing human resources challenges, coupled with a genuine concern for the well-being of the team, created a positive and inclusive workplace environment.\n\nAlex's dedication to cultivating a harmonious balance between agile methodologies and people-focused operations is truly commendable. I wholeheartedly recommend Alex for any organization seeking a professional who not only excels in their role but also brings a human touch to every aspect of their work.",
    dataAiHint: "profile person"
  },
  {
    imageSrc: "/Evan.jpg",
    name: "Evan H.",
    title: "Head of Strategy",
    text: "Alex was one of the most significant members of the Aragon team throughout 2022 and 2023. He is extraordinarily proactive, doesn't wait to be told what to do, and will always give his ear to bounce ideas off of - now matter how esoteric they might be! If anyone needs this kind of dynamic energy on their team, it is an absolute no brainer that they should speak with Alex.\n\nA little bit on our background working together - while he initially joined to help our teams with Agile, Scrum, etc., the reality was that we were in a small and constantly changing environment, so the needs of every contributor evolved as much. He took this as an opportunity to flexibly do a little bit of everything across the entire organization without getting comfortable doing just what he was hired for. When he eventually evolved into a more Human Resources-related role, he was a natural. (Note to HR professionals: there is also something nice about having someone with a background in Agile to better understand the culture of working rather than just culture in the abstract)\n\nHe also led the planning for several of our companywide offsites, and they were widely considered by attendees as some of the best ones we've had.",
    dataAiHint: "profile person"
  }
];

const PREVIEW_LINE_HEIGHT = 'max-h-28'; // Approx 4 lines, adjust as needed
const EXPANDED_MAX_HEIGHT = 'max-h-[1000px]'; // Sufficiently large for full text

export default function TestimonialsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const duplicatedTestimonials = testimonialsData.length > 0 ? [...testimonialsData, ...testimonialsData] : [];

  if (testimonialsData.length === 0) {
    return null;
  }

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-secondary scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Testimonials
          </h2>
        </div>

        <div className="overflow-hidden py-4 w-full">
          <div className="flex items-start animate-marquee whitespace-nowrap gap-x-6 md:gap-x-8">
            {duplicatedTestimonials.map((testimonial, index) => {
              // Use original index for expansion state, even with duplicated items
              const originalIndex = index % testimonialsData.length;
              const isExpanded = expandedIndex === originalIndex;
              
              // Estimate if text is longer than preview height
              // This is a rough estimate; more sophisticated logic might be needed for perfect accuracy
              // A simpler way is to always show "Read More" if content is likely to be long.
              const needsReadMore = testimonial.text.length > 200; // Adjust character count as needed

              return (
                <Card 
                  key={`${testimonial.name}-${index}`} 
                  className="w-80 md:w-96 flex-shrink-0 bg-card shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
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
                  <CardContent className="p-4 md:p-6 pt-0 text-sm text-foreground/80 flex-grow flex flex-col">
                    <div 
                      className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? EXPANDED_MAX_HEIGHT : PREVIEW_LINE_HEIGHT}`}
                    >
                      <p className="whitespace-normal leading-relaxed">
                        {testimonial.text.split('\n\n').map((paragraph, i) => (
                          <span key={i} className="block mb-2 last:mb-0">{paragraph}</span>
                        ))}
                      </p>
                      {!isExpanded && needsReadMore && (
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                      )}
                    </div>
                    {needsReadMore && (
                       <Button 
                        variant="link" 
                        size="sm" 
                        className="mt-2 self-start px-0 text-primary hover:text-accent"
                        onClick={() => toggleExpand(originalIndex)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Show Less" : "Read More"}
                        {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

