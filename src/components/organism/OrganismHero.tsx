"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Volume2, VolumeX } from "lucide-react";
import { OrganismCanvas } from "@/components/organism/OrganismCanvas";
import { WHATSAPP_URL } from "@/lib/constants";

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

export function OrganismHero() {
  const [soundOn, setSoundOn] = useState(false);
  useAudioPulse(soundOn);

  return (
    <section className="organism-hero">
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
        <p className="organism-deck">A partner in learning. We build the mental models that make AI make sense, then test them live on your real work. When you&apos;d rather have it built, I build it.</p>
        <div className="organism-actions">
          <button type="button" className="organism-button organism-button--primary" onClick={() => scrollToId("services")}>See coaching &amp; services <ArrowDown size={17} aria-hidden="true" /></button>
          <button type="button" className="organism-button organism-button--quiet" onClick={() => scrollToId("contact")}>Talk to Alex <ArrowUpRight size={16} aria-hidden="true" /></button>
        </div>
        <a className="organism-hero__whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Or message on WhatsApp <ArrowUpRight size={13} aria-hidden="true" /></a>
      </div>
      <div className="organism-status"><span className="status-dot" /> system awake <span>40+ systems deployed</span><span>10–20 hrs reclaimed / week</span></div>
      <div className="organism-hero__hint"><span>Scroll to explore</span><ArrowDown size={14} aria-hidden="true" /></div>
    </section>
  );
}
