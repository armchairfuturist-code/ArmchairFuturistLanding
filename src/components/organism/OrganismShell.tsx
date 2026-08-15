"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { OrganismCanvas } from "@/components/organism/OrganismCanvas";

const chapters = [
  { id: "signal", label: "Signal" },
  { id: "learn", label: "Learn" },
  { id: "build", label: "Build" },
  { id: "connect", label: "Connect" },
];

const cards = [
  {
    id: "learn",
    index: "01",
    label: "LEARN",
    title: "See the machine clearly.",
    copy: "Build the mental models that turn AI from a magic trick into a tool you can actually direct.",
    accent: "#7bb4ff",
  },
  {
    id: "build",
    index: "02",
    label: "BUILD",
    title: "Make it touch your work.",
    copy: "We prototype on real workflows, then ship the useful parts. No theatre. No mystery layer.",
    accent: "#3d8dff",
  },
  {
    id: "connect",
    index: "03",
    label: "CONNECT",
    title: "Keep the signal human.",
    copy: "A calm place for sharp thinking, better decisions, and the conversations that make technology matter.",
    accent: "#b4d4ff",
  },
];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useAudioPulse(enabled: boolean) {
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const audio = new AudioContextClass();
    audioRef.current = audio;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = 54;
    gain.gain.value = 0.015;
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    return () => {
      oscillator.stop();
      audio.close();
      audioRef.current = null;
    };
  }, [enabled]);
}

export function OrganismShell() {
  const [activeChapter, setActiveChapter] = useState("signal");
  const [soundOn, setSoundOn] = useState(false);

  useAudioPulse(soundOn);

  useEffect(() => {
    const elements = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveChapter(visible.target.id);
      },
      { rootMargin: "-25% 0px -55%", threshold: [0.15, 0.4, 0.7] },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="organism-site">
      <section id="signal" className="organism-hero">
        <div className="organism-hero__wash" aria-hidden="true" />
        <OrganismCanvas className="organism-canvas" />
        <div className="organism-noise" aria-hidden="true" />
        <div className="organism-topline">
          <span className="organism-mark">A / F</span>
          <span>AN INTELLIGENCE STUDIO FOR HUMANS</span>
          <button className="organism-sound" type="button" onClick={() => setSoundOn((value) => !value)} aria-pressed={soundOn}>
            {soundOn ? <Volume2 size={14} aria-hidden="true" /> : <VolumeX size={14} aria-hidden="true" />}
            <span>{soundOn ? "Sound on" : "Sound off"}</span>
          </button>
        </div>
        <div className="organism-hero__copy">
          <p className="organism-kicker"><span /> AI literacy &amp; implementation</p>
          <h1>AI won&apos;t replace you.<br /><em>Someone using AI better will.</em></h1>
          <p className="organism-deck">A partner in learning. Mental models, live prototypes, and useful systems for people who want to stay fully human in a machine-shaped future.</p>
          <div className="organism-actions">
            <button type="button" className="organism-button organism-button--primary" onClick={() => scrollToId("learn")}>Enter the organism <ArrowDown size={17} aria-hidden="true" /></button>
            <button type="button" className="organism-button organism-button--quiet" onClick={() => scrollToId("connect")}>Talk to Alex <ArrowUpRight size={16} aria-hidden="true" /></button>
          </div>
        </div>
        <div className="organism-status"><span className="status-dot" /> system awake <span>40+ systems deployed</span><span>10–20 hrs reclaimed / week</span></div>
        <div className="organism-hero__hint"><span>Scroll to mutate</span><ArrowDown size={14} aria-hidden="true" /></div>
      </section>

      <nav className="organism-nav" aria-label="Story chapters">
        <div className="organism-nav__line" />
        <div className="organism-nav__items">
          {chapters.map((chapter) => (
            <button key={chapter.id} type="button" className={activeChapter === chapter.id ? "is-active" : ""} onClick={() => scrollToId(chapter.id)}>
              <span className="organism-nav__number">0{chapters.indexOf(chapter) + 1}</span>
              <span>{chapter.label}</span>
            </button>
          ))}
        </div>
      </nav>

      <section className="organism-intro organism-section" aria-labelledby="learn-title">
        <div className="organism-section__meta"><span>THE POINT</span><span>01 / 04</span></div>
        <div className="organism-intro__body">
          <p className="organism-kicker"><span /> A different kind of tech company</p>
          <h2 id="learn-title">Technology should make<br /><em>more room for thought.</em></h2>
          <p>Most AI experiences add noise. This one removes it. Learn what is happening under the hood, make it useful in the real world, and keep the parts that make you more capable—not less human.</p>
        </div>
        <div className="organism-quote">“The future belongs to the people who can move between wonder and rigour.”<span>— A / F field note 001</span></div>
      </section>

      <section id="learn" className="organism-story organism-section" aria-labelledby="story-title">
        <div className="organism-section__meta"><span>THE PROTOCOL</span><span>02 / 04</span></div>
        <div className="organism-story__heading"><p className="organism-kicker"><span /> Three ways in</p><h2 id="story-title">The system listens<br /><em>before it responds.</em></h2></div>
        <div className="organism-cards">
          {cards.map((card) => <article key={card.id} id={card.id} className="organism-card" style={{ "--card-accent": card.accent } as React.CSSProperties}>
            <div className="organism-card__top"><span>{card.index}</span><span>{card.label}</span></div>
            <div className="organism-card__orb" aria-hidden="true" />
            <h3>{card.title}</h3>
            <p>{card.copy}</p>
            <button type="button" onClick={() => scrollToId("connect")}>Follow the thread <ArrowUpRight size={15} aria-hidden="true" /></button>
          </article>)}
        </div>
      </section>

      <section className="organism-manifesto organism-section" aria-labelledby="manifesto-title">
        <div className="organism-section__meta"><span>THE BELIEF</span><span>03 / 04</span></div>
        <h2 id="manifesto-title">The goal is not<br /><em>more technology.</em></h2>
        <p>It is sharper attention. Better questions. A little more time returned to the work only a person can do.</p>
        <div className="organism-manifesto__signal"><span>HUMAN CAPABILITY</span><div><i /><i /><i /><i /><i /><i /><i /></div><strong>rising</strong></div>
      </section>

      <section id="connect" className="organism-contact organism-section" aria-labelledby="contact-title">
        <div className="organism-contact__glow" aria-hidden="true" />
        <div className="organism-section__meta"><span>THE INVITATION</span><span>04 / 04</span></div>
        <div className="organism-contact__body"><p className="organism-kicker"><span /> Signal received</p><h2 id="contact-title">Bring a question.<br /><em>Leave with a system.</em></h2><p>No pressure. No pitch. Just a clear look at what AI could unlock in your work—and what it should never touch.</p><button type="button" className="organism-button organism-button--primary" onClick={() => window.location.hash = "contact"}>Start a conversation <ArrowUpRight size={17} aria-hidden="true" /></button></div>
        <div className="organism-contact__footer"><span>THE ARMCHAIR FUTURIST</span><span>BUILT FOR THE NEXT 10 YEARS</span><span>© 2026</span></div>
      </section>
    </main>
  );
}
