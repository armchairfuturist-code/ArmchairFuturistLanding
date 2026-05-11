"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, MessageCircle } from 'lucide-react';
import { trackConversion } from "@/lib/analytics";
import { BlurFade } from "@/components/ui/blur-fade";
import { motion } from "motion/react";
import { CALENDAR_URL } from "@/lib/constants";

export default function ConnectSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">(
    "idle",
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Contact form error:", error);
      alert("Failed to send message. Please try again or reach out directly.");
      setFormStatus("idle");
    }
  };

  return (
    <section
      id="connect"
      className="py-20 md:py-24 bg-usvc-blue text-primary-foreground scroll-mt-20"
    >
      <motion.div
        className="container mx-auto px-4 md:px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <BlurFade inView>
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl mb-6">
            You&apos;re not behind. You&apos;re exactly where you need to be.
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/90 mb-10 font-sans">
            The edge of change is real, and it&apos;s okay to feel the weight
            of it. You don&apos;t need to have it all figured out. You just
            need a conversation with someone who&apos;s been here before. 15
            minutes. No pitch. Just clarity on your next step.
          </p>
        </BlurFade>
        <BlurFade inView delay={0.25}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="inline-flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 shadow-lg transition-transform duration-200"
            >
              <a
                href={CALENDAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion("connect_book_call")}
              >
                <CalendarDays className="mr-2 h-5 w-5" />
                Book a Call
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              <a
                href="https://wa.me/15157706902"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Questions? Text Me on WhatsApp
              </a>
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-primary-foreground/85">
            Join 40+ leaders who've reclaimed 10-20 hrs/week
          </p>
        </BlurFade>
        {/* Contact Form */}
        <motion.div
          className="mt-10 w-full max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {formStatus === "sent" ? (
            <div className="bg-white/10 border border-white/20 rounded-xl p-6 text-center">
              <p className="text-white font-semibold text-lg">
                Thanks! I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <p className="text-primary-foreground/80 text-sm text-center mb-4">
                Or tell me what&apos;s on your mind and I&apos;ll write back
              </p>
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
              />
              <Textarea
                placeholder="What's on your mind?"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={3}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 resize-none"
              />
              <Button
                type="submit"
                disabled={formStatus === "sending"}
                variant="outline"
                className="w-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white"
              >
                {formStatus === "sending" ? "Sending..." : "Send"}
              </Button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
