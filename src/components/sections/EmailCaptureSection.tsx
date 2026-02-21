"use client";
import { useEffect, useRef, useState } from 'react';
import { Mail, Download, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const benefits = [
    "10 diagnostic questions to expose your AI accountability gaps",
    "The 3-pillar Trust Quotient framework explained",
    "A prioritized action list to reclaim 10-20 hours a week",
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function EmailCaptureSection() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState<FormState>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsContentVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (contentRef.current) observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }
        setErrorMsg('');
        setFormState('loading');

        try {
            await new Promise((res) => setTimeout(res, 800));
            window.open(
                `https://armchairfuturist.substack.com/subscribe?email=${encodeURIComponent(email)}`,
                '_blank'
            );
            setFormState('success');
        } catch {
            setFormState('error');
            setErrorMsg('Something went wrong. Please try again.');
        }
    };

    return (
        <section
            id="free-audit"
            className="py-16 md:py-20 bg-gradient-to-br from-primary/5 via-background to-primary/5 border-y border-border/40 scroll-mt-20"
        >
            <div
                ref={contentRef}
                className={`container mx-auto px-4 md:px-6 max-w-4xl scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
            >
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* Left — value proposition */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-5">
                            <Download className="w-3 h-3" />
                            <span>Free Checklist</span>
                        </div>
                        <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-primary mb-4">
                            The AI Trust Audit Checklist
                        </h2>
                        <p className="text-foreground/70 font-sans leading-relaxed mb-6">
                            Not ready to book a call yet? Get my free diagnostic — 10 questions that expose where your AI stack is creating risk instead of results.
                        </p>
                        <ul className="space-y-3">
                            {benefits.map((benefit) => (
                                <li key={benefit} className="flex items-start gap-3 text-sm text-foreground/80">
                                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — form */}
                    <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
                        {formState === 'success' ? (
                            <div className="flex flex-col items-center text-center py-6 gap-4">
                                <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                                    <CheckCircle2 className="h-7 w-7 text-green-500" />
                                </div>
                                <h3 className="text-xl font-bold text-primary font-heading">Almost there!</h3>
                                <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                                    A Substack tab has opened — confirm your subscription there to receive the AI Trust Audit Checklist directly in your inbox.
                                </p>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <h3 className="font-heading text-lg font-bold text-foreground">Get it free, instantly</h3>
                                </div>
                                <p className="text-xs text-muted-foreground mb-6 font-sans">
                                    Subscribe on Substack — join 500+ leaders getting weekly high-signal AI insights. Unsubscribe any time.
                                </p>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="email-capture" className="sr-only">Email address</label>
                                        <input
                                            id="email-capture"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="you@company.com"
                                            className="w-full h-11 px-4 rounded-lg border border-border bg-background text-foreground text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                                            disabled={formState === 'loading'}
                                            required
                                        />
                                        {errorMsg && (
                                            <p className="mt-1.5 text-xs text-destructive">{errorMsg}</p>
                                        )}
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full h-11 font-bold"
                                        disabled={formState === 'loading'}
                                    >
                                        {formState === 'loading' ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Opening Substack…
                                            </>
                                        ) : (
                                            <>
                                                <Download className="mr-2 h-4 w-4" />
                                                Get the Checklist on Substack
                                            </>
                                        )}
                                    </Button>
                                    <p className="text-[10px] text-muted-foreground/50 text-center font-mono">
                                        No spam. No fluff. Unsubscribe in one click.
                                    </p>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
