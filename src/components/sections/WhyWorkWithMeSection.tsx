
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, BrainCircuit, ScanSearch, GraduationCap, Crown, TrendingUp, ShieldCheck, DollarSign, Zap, UserMinus, UserCog, UserCheck, UserRoundSearch, HeartHandshake, FlaskConical, ClipboardList } from 'lucide-react';

const howWeHelpData = [
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Cultivating the Four Essential Mindsets for AI Success",
    content: "We guide your organization in understanding and fostering these key mindset segments, identified through AI-driven language analysis and developmental psychology:",
    subPoints: [
      { icon: <UserMinus className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Resistant (5-10%):</strong> Those deeply skeptical. We help leaders manage this group with compassion and accountability." },
      { icon: <UserCog className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Reluctant (70-75%):</strong> The cautious majority. We design tailored communications and training to build confidence." },
      { icon: <UserCheck className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Resilient (15%):</strong> Adaptable employees who quickly experiment. We empower them as change agents." },
      { icon: <UserRoundSearch className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Results (5%):</strong> Natural second order thinkers. Identifying and liberating these talents accelerates success." },
    ]
  },
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: "Embedding Second Order Thinking and Emotional Intelligence (EQ)",
    content: "We help leaders and teams evolve from first order (linear, control-driven) to second order thinking—holistic, adaptive, and emotionally mature approaches essential for navigating AI’s complexity. This shift enables:",
    subPoints: [
      { text: "Embracing uncertainty and iterative experimentation." },
      { text: "Anticipating AI’s ripple effects on workflows and strategy." },
      { text: "Leading with psychological safety, fostering innovation and ethical AI use." },
    ]
  },
  {
    icon: <ScanSearch className="h-8 w-8 text-primary" />,
    title: "Leveraging AI-Powered Psychological Assessment",
    content: "Using AI to analyze language from existing employee communications, we provide frictionless, data-driven insights into mindset distributions. This enables:",
    subPoints: [
      { text: "Targeted interventions tailored to each mindset segment." },
      { text: "Avoiding the “lowest common denominator” approach." },
      { text: "Annual rescoring to track psychological growth and adapt strategies." },
    ]
  },
  {
    icon: <GraduationCap className="h-8 w-8 text-primary" />,
    title: "Designing AI Adoption as an Organizational Learning Challenge",
    content: "Not just a technical rollout. We help you:",
    subPoints: [
      { text: "Build pilot teams from Resilient and Results segments for rapid testing." },
      { text: "Showcase quick wins to convert Reluctant employees." },
      { text: "Manage Resistant employees with clear expectations." },
      { text: "Avoid “talent hoarding” by enabling high performers to spread innovation." },
      { text: "Integrate AI into workflows with user-centric design." },
    ]
  },
  {
    icon: <Crown className="h-8 w-8 text-primary" />,
    title: "Partnering Leadership, Lab, and Crowd",
    content: "We emphasize the triad for sustainable AI transformation:",
    subPoints: [
      { icon: <Crown className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Leadership:</strong> Setting AI vision, modeling use, creating safe spaces." },
      { icon: <FlaskConical className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Lab:</strong> Centralized teams building and iterating AI solutions." },
      { icon: <Users className="h-5 w-5 text-accent mr-2 shrink-0" />, text: "<strong>Crowd:</strong> Empowered employees discovering and sharing AI use cases." },
    ]
  }
];

const whyItMattersData = [
  {
    icon: <TrendingUp className="h-6 w-6 text-primary" />,
    title: "Unlock Real Organizational Performance",
    content: "Move beyond isolated productivity gains to systemic transformation."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
    title: "Future-Proof Your Workforce",
    content: "Equip your people with the mindsets and skills to thrive alongside AI."
  },
  {
    icon: <DollarSign className="h-6 w-6 text-primary" />,
    title: "Maximize AI ROI",
    content: "Accelerate adoption and scale by focusing on the right people and cultural shifts."
  },
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Lead with Confidence",
    content: "Navigate complexity with emotionally intelligent leadership and adaptive strategies."
  }
];

export default function WhyWorkWithMeSection() {
  return (
    <section id="how-we-help" className="py-12 md:py-24 bg-background scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            How We Help: Mindset-Centered AI Adoption Advisory
          </h2>
          <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
            Our advisory offering addresses these challenges head-on by focusing on the people and mindsets that drive successful AI adoption, blending cutting-edge AI-powered psychological insights with proven change leadership.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-16">
          {howWeHelpData.map((item) => (
            <Card key={item.title} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <CardTitle className="text-xl font-semibold text-primary">{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{item.content}</p>
                {item.subPoints && item.subPoints.length > 0 && (
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {item.subPoints.map((subPoint, i) => (
                      <li key={i} className="flex items-start">
                        {subPoint.icon || <ClipboardList className="h-5 w-5 text-accent mr-2 shrink-0 mt-0.5" />}
                        <span dangerouslySetInnerHTML={{ __html: subPoint.text }} />
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12 mt-16 md:mt-24">
          <h3 className="font-heading text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Why This Matters
          </h3>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {whyItMattersData.map((item) => (
             <Card key={item.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
             <CardHeader className="items-center text-center">
               <div className="p-3 rounded-full bg-primary/10 mb-2">
                 {item.icon}
               </div>
               <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
             </CardHeader>
             <CardContent className="text-center">
               <p className="text-sm text-muted-foreground">{item.content}</p>
             </CardContent>
           </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
