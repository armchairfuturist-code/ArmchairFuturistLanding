"use client";
import { useRef, useState, useEffect } from 'react';
import { Compass, Activity, Users, User } from 'lucide-react';

export default function NavigatorSection() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isContentVisible, setIsContentVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsContentVisible(true);
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-secondary/30 overflow-hidden relative">
            <div
                ref={contentRef}
                className={`container mx-auto px-4 md:px-6 relative z-10 scroll-animate ${isContentVisible ? 'is-visible' : ''}`}
            >
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 text-primary">
                        The Navigator
                    </h2>
                    <p className="text-lg md:text-xl text-foreground/80 leading-relaxed font-sans max-w-3xl mx-auto">
                        AI adoption usually stalls because of technical noise and outdated mindsets. Whether you're a solo operator or leading a team, I provide the <strong className="text-primary">'High-TQ' (Trust Quotient)</strong> guidance that lets you ignore the distractions and focus on your deep work while I manage the technical implications and strategic evolution.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
                    {/* The Cavalier */}
                    <div className="bg-card border border-destructive/20 p-8 rounded-2xl relative overflow-hidden group hover:border-destructive/40 transition-all duration-300 shadow-lg hover:shadow-xl">
                        <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Activity size={80} className="text-destructive" />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-destructive/10 rounded-lg">
                                <Activity className="w-6 h-6 text-destructive" />
                            </div>
                            <h3 className="text-2xl font-bold text-destructive">The Cavalier</h3>
                        </div>
                        <p className="text-foreground/70 mb-6 font-sans leading-relaxed">
                            Building randomly. Chasing every new model release. Creating technical debt and security vulnerabilities without a long-term strategy.
                        </p>
                        <ul className="space-y-3 text-sm text-foreground/60">
                            <li className="flex gap-3 items-center">
                                <span className="text-destructive font-bold">✕</span>
                                <span>Reactive to hype cycles</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-destructive font-bold">✕</span>
                                <span>Fragile, unmaintained systems</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-destructive font-bold">✕</span>
                                <span>High noise, low signal</span>
                            </li>
                        </ul>
                    </div>

                    {/* The Unmoored -> The Strategist */}
                    <div className="bg-card border border-primary/30 p-8 rounded-2xl relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ring-1 ring-primary/10">
                        <div className="absolute top-4 right-4 opacity-10">
                            <Compass size={80} className="text-primary" />
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Compass className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary">The Strategist</h3>
                        </div>
                        <p className="text-foreground/80 mb-6 font-sans leading-relaxed">
                            I ensure your technology is high-signal and low-noise, allowing you to focus on your clients while I manage the technical implications.
                        </p>
                        <ul className="space-y-3 text-sm text-foreground/70">
                            <li className="flex gap-3 items-center">
                                <span className="text-primary font-bold">✓</span>
                                <span>High-Signal Futuring</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-primary font-bold">✓</span>
                                <span>Secure, adaptable architecture</span>
                            </li>
                            <li className="flex gap-3 items-center">
                                <span className="text-primary font-bold">✓</span>
                                <span>Zero-noise stewardship</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Audience Indicators */}
                <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-8 text-center">
                    <div className="flex items-center gap-3 text-foreground/60">
                        <User className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">Solo Operators & Founders</span>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-border"></div>
                    <div className="flex items-center gap-3 text-foreground/60">
                        <Users className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">Teams & Organizations</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
