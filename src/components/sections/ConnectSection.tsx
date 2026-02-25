"use client";
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { trackConversion } from '@/lib/analytics';
import { BlurFade } from '@/components/ui/blur-fade';
import { motion } from 'framer-motion';

export default function ConnectSection() {
  return (
    <section id="connect" className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground scroll-mt-20">
      <motion.div
        className="container mx-auto px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <BlurFade inView>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            Ready to reclaim 10–20 hours a week? Let&apos;s audit your AI stack.
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/80 mb-10 font-sans">
            One focused call. I&apos;ll identify exactly where your AI systems are leaking value and what to do about it - no obligation, no deck.
          </p>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="inline-block"
          >
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg transition-transform duration-200">
              <a href="https://calendar.app.google/nAHHwNMfhDvXGv7P7" target="_blank" rel="noopener noreferrer" onClick={() => trackConversion('connect_book_call')}>
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a Free Strategy Call
              </a>
            </Button>
          </motion.div>
        </BlurFade>
      </motion.div>
    </section>
  );
}
