"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlurFade } from "@/components/ui/blur-fade";
import { BookCallButton } from "@/components/ui/BookCallButton";
import { MessageCircle, Loader2, CheckCircle2, TriangleAlert } from "lucide-react";
import { useLeadCapture } from "@/lib/hooks/useLeadCapture";
import { validateEmailField } from "@/lib/lead-capture";
import { WHATSAPP_URL } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";
import WhatsAppGlyph from "@/components/ui/WhatsAppGlyph";
type ConnectFields = {
  name: string;
  email: string;
  message: string;
};

function validateConnect(
  data: ConnectFields,
): Partial<Record<keyof ConnectFields, string>> | null {
  const errs: Partial<Record<keyof ConnectFields, string>> = {};
  if (!data.name.trim()) errs.name = "Please enter your name.";
  const emailError = validateEmailField(
    data.email,
    "Please enter your email.",
    "That doesn't look like a valid email address.",
  );
  if (emailError) errs.email = emailError;
  if (!data.message.trim())
    errs.message = "Please tell me a little about what you're working on.";
  return Object.keys(errs).length > 0 ? errs : null;
}

export default function ConnectSection() {
  const [formOpen, setFormOpen] = useState(false);
  const {
    values: formData,
    errors: fieldErrors,
    setField,
    isLoading: loading,
    isSuccess: success,
    serverError: error,
    handleSubmit,
  } = useLeadCapture<ConnectFields>({
    endpoint: "/api/contact",
    initialValues: { name: "", email: "", message: "" },
    validate: validateConnect,
    buildBody: (v) => v,
  });

  const handleChange =
    (field: keyof ConnectFields) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setField(field, e.target.value);
    };


  return (
    <section
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
          <h2 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-tight leading-[1.05] mb-6">
            One honest conversation. You leave with a next step either way.
          </h2>
        </BlurFade>
        <BlurFade inView delay={0.15}>
          <p className="max-w-2xl mx-auto text-lg text-primary-foreground/90 mb-10 font-sans">
            You don&apos;t need to have it all figured out. You need one
            honest conversation about your next step, with someone who&apos;s
            been here before.
          </p>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="inline-flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center justify-center gap-3"
          >
            <BookCallButton
              location="connect_book_call"
              size="lg"
              icon="calendar-days"
              iconClassName="mr-2 h-5 w-5"
              className="bg-white text-primary hover:bg-white/90 shadow-lg transition-transform duration-200 whitespace-normal sm:whitespace-nowrap"
            >
              Book a Call
            </BookCallButton>
          </motion.div>
          <p className="mt-4 text-sm text-primary-foreground/85">
            15 minutes. No pitch. Most clients are self-sufficient within 8 to 10 weeks, and this call is step one or a pointer elsewhere.
          </p>
          <p className="mt-4 text-sm text-primary-foreground/85">
            Not sure if it&apos;s a fit?{" "}
            <Link
              href="/assessment"
              onClick={() => trackEvent("connect_assessment_link")}
              className="underline underline-offset-4 hover:text-white transition-colors"
            >
              Take the free assessment
            </Link>{" "}
            · or{" "}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("connect_whatsapp_link")}
              className="inline-flex items-center min-h-[44px] py-2 underline underline-offset-4 hover:text-white transition-colors"
            >
              <WhatsAppGlyph className="mr-1 h-4 w-4" />
              text me on WhatsApp. I answer personally, usually within hours.
            </a>
          </p>
        </BlurFade>
        {/* Contact Form — disclosed so the close offers two doors, not four */}
        <details className="mt-10 w-full max-w-md mx-auto group" onToggle={(e) => setFormOpen((e.target as HTMLDetailsElement).open)}>
          <summary
            className="cursor-pointer list-none inline-flex items-center gap-2 text-sm font-medium text-white underline underline-offset-4 hover:text-white/85 transition-colors [&::-webkit-details-marker]:hidden"
            role="button"
            aria-expanded={formOpen}
          >
            Prefer writing? Send a note instead
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 group-open:hidden">Expand</span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/70 hidden group-open:inline">Collapse</span>
          </summary>
        <motion.div
          className="mt-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {success ? (
            <div
              role="status"
              aria-live="polite"
              className="bg-white/10 border border-white/20 rounded-xl p-6 text-center"
            >
              <CheckCircle2 className="mx-auto h-8 w-8 text-white mb-3" aria-hidden="true" />
              <p className="text-white font-semibold text-lg">
                Message received.
              </p>
<p className="mt-1.5 text-sm text-white/80">No pitch attached, just a reply.</p>
<p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/80">Received · I reply to every note</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              <div>
                <label htmlFor="connect-name" className="block text-sm font-medium text-white mb-1">Your name</label>
                <Input
                  id="connect-name"
                  name="name"
                  placeholder="Jane Silva"
                  value={formData.name}
                  onChange={handleChange("name")}
                  required
                  autoComplete="name"
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? "connect-name-error" : undefined}
                  className={`bg-white border-white text-ink placeholder:text-graphite ${fieldErrors.name ? "ring-2 ring-white/70 focus-visible:ring-white" : ""}`}
                />
                {fieldErrors.name && (
                  <p id="connect-name-error" role="alert" className="mt-1.5 text-xs font-medium text-white flex items-center gap-1.5">
                    <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="connect-email" className="block text-sm font-medium text-white mb-1">Your email</label>
                <Input
                  id="connect-email"
                  type="email"
                  name="email"
                  placeholder="jane@studio.co"
                  value={formData.email}
                  onChange={handleChange("email")}
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? "connect-email-error" : undefined}
                  className={`bg-white border-white text-ink placeholder:text-graphite ${fieldErrors.email ? "ring-2 ring-white/70 focus-visible:ring-white" : ""}`}
                />
                {fieldErrors.email && (
                  <p id="connect-email-error" role="alert" className="mt-1.5 text-xs font-medium text-white flex items-center gap-1.5">
                    <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {fieldErrors.email}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="connect-message" className="block text-sm font-medium text-white mb-1">What's on your mind?</label>
                <Textarea
                  id="connect-message"
                  name="message"
                  placeholder="I run a small consultancy and…"
                  value={formData.message}
                  onChange={handleChange("message")}
                  required
                  rows={3}
                  maxLength={2000}
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "connect-message-error" : undefined}
                  className={`bg-white border-white text-ink placeholder:text-graphite resize-none ${fieldErrors.message ? "ring-2 ring-white/70 focus-visible:ring-white" : ""}`}
                />
                {fieldErrors.message && (
                  <p id="connect-message-error" role="alert" className="mt-1.5 text-xs font-medium text-white flex items-center gap-1.5">
                    <TriangleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    {fieldErrors.message}
                  </p>
                )}
              </div>
              {error && (
                <div role="alert" className="text-white text-sm font-medium space-y-1">
                  <p>{error}</p>
                  <p className="text-white/85 text-xs">Your message is still here — press Send again, or book a call above.</p>
                </div>
              )}
              <Button
                type="submit"
                disabled={loading}
                variant="outline"
                className="w-full bg-white border-white text-hp-electric font-semibold hover:bg-white/90 hover:text-hp-deep disabled:opacity-70 disabled:cursor-not-allowed"
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
        </details>
      </motion.div>
    </section>
  );
}


