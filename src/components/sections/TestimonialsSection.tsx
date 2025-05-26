
import { Card, CardContent } from "@/components/ui/card";

const testimonialsData = [
  "Alex's insights were instrumental in navigating our AI strategy. Highly recommend! - CEO, Tech Solutions",
  "The mindset shift Alex facilitated in our team was transformative. We're seeing real results. - VP of HR, Innovate Corp",
  "A truly engaging speaker who brought clarity and actionable advice to complex topics. - Event Organizer",
  "Working with Alex on our change program was a game-changer. Our team adoption rates soared. - Director of Ops",
  "The 1-on-1 mentoring provided by Alex gave me the confidence and frameworks to lead effectively. - Startup Founder",
];

export default function TestimonialsSection() {
  const duplicatedTestimonials = [...testimonialsData, ...testimonialsData]; // Duplicate for seamless scroll

  return (
    <section id="testimonials" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Testimonials
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
            Hear directly from leaders I've partnered with and event attendees.
          </p>
        </div>

        <div className="overflow-hidden py-4 w-full">
          <div className="flex animate-marquee whitespace-nowrap gap-x-6 md:gap-x-8">
            {duplicatedTestimonials.map((testimonial, index) => (
              <Card key={`${testimonial.substring(0, 10)}-${index}`} className="w-72 md:w-80 flex-shrink-0 bg-card shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-sm text-foreground/80">
                  <p className="whitespace-normal leading-relaxed">"{testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
