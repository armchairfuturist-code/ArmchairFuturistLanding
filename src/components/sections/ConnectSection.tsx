import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarDays, Mic } from 'lucide-react';

export default function ConnectSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
          Let’s Talk About the Future — <span className="text-accent">Your Future.</span>
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 mb-10">
          Whether you're shaping AI strategy, rethinking your organization, or seeking an engaging speaker, let's co-create meaningful outcomes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-105">
             <a href="https://cal.com/alex-myers/discovery" target="_blank" rel="noopener noreferrer">
              <CalendarDays className="mr-2 h-5 w-5" />
              Schedule a Discovery Call
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground shadow-lg transition-transform duration-200 hover:scale-105">
            <a href="mailto:alex@alexmyers.co?subject=Speaking Invitation Request"> {/* Replace with actual email or contact form link */}
              <Mic className="mr-2 h-5 w-5" />
              Invite Me to Speak
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
