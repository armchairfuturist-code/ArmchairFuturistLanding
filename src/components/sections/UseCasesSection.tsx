"use client";
import { useEffect, useRef, useState } from 'react';
import { TrendingUp, Code2, Shield, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const cases = [
    {
        icon: <TrendingUp className="h-10 w-10 text-green-500" />,
        title: "High-Signal Strategy",
        description: "Helping founders and teams pivot to scalable, tech-resilient business models that cut through the noise.",
        category: "Strategic Partner",
        accentColor: "border-green-500/30 hover:border-green-500/50",
        iconBg: "bg-green-500/10"
    },
    {
        icon: <Code2 className="h-10 w-10 text-purple-500" />,
        title: "Frictionless Web Design",
        description: "Rapid deployment of high-value sites that focus on utility, conversion, and long-term adaptability.",
        category: "Web & Growth",
        accentColor: "border-purple-500/30 hover:border-purple-500/50",
        iconBg: "bg-purple-500/10"
    },
    {
        icon: <Shield className="h-10 w-10 text-blue-500" />,
        title: "Adaptable Systems",
        description: "Custom AI engines built for decision intelligence and secure, human-monitored execution.",
        category: "Custom Infrastructure",
        accentColor: "border-blue-500/30 hover:border-blue-500/50",
        iconBg: "bg-blue-500/10"
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
                        Strategic Tech Focus
                    </h2>
                    <p className="text-foreground/70 max-w-2xl mx-auto font-sans text-lg">
                        From strategic oversight to tactical implementation, every engagement is designed for maximum signal and zero noise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cases.map((useCase, index) => (
                        <Card
                            key={index}
                            className={`bg-card border-2 ${useCase.accentColor} transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl`}
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
                            Schedule Your Trust Audit <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                    </Button>
                </div>
            </div>
        </section>
    );
}
