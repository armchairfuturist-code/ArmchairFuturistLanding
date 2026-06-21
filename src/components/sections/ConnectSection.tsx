"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { CalendarDays, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useFormSubmission } from "@/lib/hooks/useFormSubmission";
import { isValidEmail } from "@/lib/email-utils";
import { WHATSAPP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

export default function ConnectSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { loading, success, error, submit } = useFormSubmission({
    endpoint: "/api/contact",
    validateEmail: false,
  });

  const validate = (data: typeof formData): FieldErrors => {
    const errs: FieldErrors = {};
    if (!data.name.trim()) errs.name = "Please enter your name.";
    if (!data.email.trim()) errs.email = "Please enter your email.";
    else if (!isValidEmail(data.email)) errs.email = "That doesn't look like a valid email address.";
    if (!data.message.trim()) errs.message = "Please tell me a little about what you're working on.";
    return errs;
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...formData, [field]: e.target.value };
    setFormData(next);
    if (touched[field]) {
      // Re-validate just this field as the user types once they've blurred it.
      const errs = validate(next);
      setFieldErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(formData);
    setFieldErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(formData);
    setFieldErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length > 0) return;
    await submit(formData);
  };



  return (
    <section
      id="connect"
      className="py-20 md:py-24 bg-hp-electric text-primary-foreground scroll-mt-20"
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
            <BookCallButton
              location="connect_book_call"
              size="lg"
              icon="calendar-days"
              iconClassName="mr-2 h-5 w-5"
              className="bg-white text-primary hover:bg-white/90 shadow-lg transition-transform duration-200"
            >
              Book a Call
            </BookCallButton>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white transition-all duration-200"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Questions? Text Me on WhatsApp
              </a>
            </Button>
          </motion.div>
          <p className="mt-4 text-sm text-primary-foreground/85">
            15 minutes. No pitch. Just clarity.
          </p>
          <p className="mt-2 text-sm text-primary-foreground/75">
            Not sure if it&apos;s a fit?{" "}
            <Link
              href="/assessment"
              onClick={() => trackEvent("connect_assessment_link")}
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Take the 3-minute assessment
            </Link>{" "}
            first.
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
          {success ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
            >
              <CheckCircle2 className="mx-auto h-8 w-8 text-white mb-3" aria-hidden="true" />
              <p className="text-white font-semibold text-lg">
                Thanks! I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <p className="text-primary-foreground/80 text-sm text-center mb-4">
                Or tell me what&apos;s on your mind and I&apos;ll write back
              </p>
              <div>
                <label htmlFor="connect-name" className="sr-only">Your name</label>
                <Input
                  id="connect-name"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange("name")}
                  onBlur={handleBlur("name")}
                  required
                  autoComplete="name"
                  aria-invalid={touched.name && !!fieldErrors.name}
                  aria-describedby={touched.name && fieldErrors.name ? "connect-name-error" : undefined}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${touched.name && fieldErrors.name ? "border-red-300 focus-visible:ring-red-300/50" : ""}`}
                />
                {touched.name && fieldErrors.name && (
                  <p id="connect-name-error" role="alert" className="mt-1.5 text-xs text-red-200">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="connect-email" className="sr-only">Your email</label>
                <Input
                  id="connect-email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  required
                  autoComplete="email"
                  aria-invalid={touched.email && !!fieldErrors.email}
                  aria-describedby={touched.email && fieldErrors.email ? "connect-email-error" : undefined}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 ${touched.email && fieldErrors.email ? "border-red-300 focus-visible:ring-red-300/50" : ""}`}
                />
                {touched.email && fieldErrors.email && (
                  <p id="connect-email-error" role="alert" className="mt-1.5 text-xs text-red-200">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="connect-message" className="sr-only">What's on your mind?</label>
                <Textarea
                  id="connect-message"
                  name="message"
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={handleChange("message")}
                  onBlur={handleBlur("message")}
                  required
                  rows={3}
                  aria-invalid={touched.message && !!fieldErrors.message}
                  aria-describedby={touched.message && fieldErrors.message ? "connect-message-error" : undefined}
                  className={`bg-white/20 border-white/30 text-white placeholder:text-white/60 resize-none ${touched.message && fieldErrors.message ? "border-red-300 focus-visible:ring-red-300/50" : ""}`}
                />
                {touched.message && fieldErrors.message && (
                  <p id="connect-message-error" role="alert" className="mt-1.5 text-xs text-red-200">
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              {error && (
                <p role="alert" className="text-red-200 text-sm">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                variant="outline"
                className="w-full bg-transparent border-white/40 text-white hover:bg-white/10 hover:border-white disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  "Send"
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
