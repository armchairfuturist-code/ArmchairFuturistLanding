"use client";
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Bot, ShieldCheck, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const cases = [
    {
        icon: <TrendingUp className="h-10 w-10 text-emerald-600" />,
        title: "High-Signal Strategy",
        description: "Helping leaders pivot from linear thinking to exponential execution, prioritizing Trust Quotient (TQ) over raw IQ.",
        category: "Exponential Strategy",
        accentColor: "border-emerald-600/30 hover:border-emerald-600/50",
        iconBg: "bg-emerald-600/10"
    },
    {
        icon: <Bot className="h-10 w-10 text-cyan-600" />,
        title: "Custom AI Infrastructure",
        description: "Designing Market Immune Systems and autonomous staff built for secure, verified, and human-monitored execution.",
        category: "Autonomous Delivery Loops",
        accentColor: "border-cyan-600/30 hover:border-cyan-600/50",
        iconBg: "bg-cyan-600/10"
    },
    {
        icon: <ShieldCheck className="h-10 w-10 text-blue-600" />,
        title: "Strategic Resiliency",
        description: "Cutting burn rates and strengthening your digital moat to weather the coming dislocations.",
        category: "Operational Hardening",
        accentColor: "border-blue-600/30 hover:border-blue-600/50",
        iconBg: "bg-blue-600/10"
    }
];

export default function UseCasesSection() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) observer.observe(contentRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="use-cases" className="py-20 md:py-28 bg-secondary/30 scroll-mt-20">
            <div
                ref={contentRef}
                className={`container mx-auto px-4 md:px-6 scroll-animate ${isVisible ? 'is-visible' : ''}`}
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                        Strategy & Infrastructure (The TQ Premium)
                    </h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto font-sans text-lg">
                        Secure, verified systems for leaders who need accountable outcomes, not AI theater.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cases.map((useCase, index) => (
                        <Card
                            key={index}
                            className={`bg-card border-2 ${useCase.accentColor} transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl scroll-animate ${isVisible ? 'is-visible' : ''}`}
                            style={{ animationDelay: `${index * 110}ms` }}
                        >
                            <CardHeader>
                                <div className={`mb-4 p-4 ${useCase.iconBg} rounded-xl w-fit group-hover:scale-110 transition-transform duration-300`}>
                                    {useCase.icon}
                                </div>
                                <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-2">
                                    {useCase.category}
                                </div>
                                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                                    {useCase.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/70 leading-relaxed font-sans">
                                    {useCase.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Button
                        asChild
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 shadow-lg transition-all duration-200 hover:scale-105"
                    >
                        <a href="#connect">
                            Start Your Trust Audit. <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
