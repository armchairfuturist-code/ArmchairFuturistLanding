import Link from "next/link";
import { ArrowLeft, Home, Brain, BookOpen, Mail } from "lucide-react";

export const metadata = {
  title: "Page Not Found",
  description: "We couldn't find the page you were looking for. Try the free AI assessment or explore other resources.",
};

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-cloud px-4 py-20">
      <div className="max-w-2xl w-full text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
          404 Error
        </p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-primary mb-5">
          Page Not Found
        </h1>
        <p className="text-lg text-foreground/70 font-sans leading-relaxed mb-10 max-w-xl mx-auto">
          We couldn&apos;t find this page. It may have been moved or the link
          you followed might be incomplete.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-colors"
          >
            <Brain className="mr-2 h-4 w-4" />
            Take the Free AI Assessment
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-border text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-sm text-muted-foreground uppercase tracking-widest font-mono mb-6">
            Or explore
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
            <li>
              <Link
                href="/#services"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Services</div>
                  <div className="text-xs text-muted-foreground">Coaching & advisory</div>
                </div>
              </Link>
            </li>
            <li>
              <Link
                href="/#case-studies"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Case Studies</div>
                  <div className="text-xs text-muted-foreground">Real client outcomes</div>
                </div>
              </Link>
            </li>
            <li>
              <a
                href="mailto:armchairfuturist@gmail.com"
                className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
              >
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="font-medium text-foreground">Email Alex</div>
                  <div className="text-xs text-muted-foreground">Direct line</div>
                </div>
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground text-sm inline-flex items-center gap-1 transition-colors"
          >
            <ArrowLeft size={14} />
            Or browse the homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
