"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CALENDAR_URL } from '@/lib/constants';
import { trackEvent } from '@/lib/analytics';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approx 500px)
      const scrollY = window.scrollY;
      const shouldShow = scrollY > 500 && !isDismissed;
      setIsVisible(shouldShow);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  const handleClick = () => {
    trackEvent('sticky_cta_click');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-6 md:w-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          <div className="bg-card border border-border rounded-full shadow-2xl p-2 pr-4 flex items-center gap-3 backdrop-blur-lg bg-opacity-95">
            <Button
              asChild
              size="sm"
              className="bg-white text-primary hover:bg-white/90 shadow-lg font-semibold rounded-full px-4"
              onClick={handleClick}
            >
              <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
                <Zap className="mr-1.5 h-4 w-4 fill-current" />
                Book Call
              </a>
            </Button>
            <span className="text-sm text-muted-foreground hidden md:inline">
              Free 15-min strategy call
            </span>
            <button
              onClick={handleDismiss}
              className="p-1.5 hover:bg-muted rounded-full transition-colors"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
