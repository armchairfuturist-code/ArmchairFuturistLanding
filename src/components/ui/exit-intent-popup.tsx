"use client";

import { useState, useEffect } from 'react';
import { X, Brain, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

export default function ExitIntentPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't show if already dismissed this session
    if (sessionStorage.getItem('exit_intent_dismissed')) return;
    // Don't show on assessment pages (they're already conversion-focused)
    if (window.location.pathname.includes('/assessment')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        trackEvent('exit_intent_shown');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('exit_intent_dismissed', 'true');
  };

  const handleAssessmentClick = () => {
    trackEvent('exit_intent_assessment_click');
  };

  const handleSubstackClick = () => {
    trackEvent('exit_intent_substack_click');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
          />
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full p-8 pointer-events-auto relative">
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 hover:bg-muted rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  Wait — before you go
                </h3>
                <p className="text-sm text-muted-foreground mb-6 font-sans leading-relaxed">
                  Take the free 3-minute AI Readiness Assessment. 9 honest questions, a personalized diagnosis, and a clear next step.
                </p>

                <div className="space-y-3">
                  <Button asChild size="lg" className="w-full font-bold" onClick={handleAssessmentClick}>
                    <a href="/assessment">
                      Take the Free Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="w-full" onClick={handleSubstackClick}>
                    <a href="https://armchairfuturist.substack.com" target="_blank" rel="noopener noreferrer">
                      Or read the newsletter first
                    </a>
                  </Button>
                </div>

                <p className="text-[10px] text-muted-foreground/50 mt-4 font-mono">
                  Free · No email required · 3 minutes
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}