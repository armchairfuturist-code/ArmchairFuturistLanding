"use client";
import { useEffect, useRef, useCallback } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function useTextScramble(
  text: string,
  options?: { speed?: number; chars?: string; trigger?: boolean }
) {
  const { speed = 30, chars = CHARS, trigger = true } = options ?? {};
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const queueRef = useRef<number[]>([]);
  const currentRef = useRef(text);

  const scramble = useCallback(() => {
    const queue = queueRef.current;
    const old = currentRef.current;
    const newText = text;
    const len = Math.max(old.length, newText.length);
    queue.length = 0;
    for (let i = 0; i < len; i++) {
      const from = old[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queue.push(start, end, chars.indexOf(to));
    }
    cancelAnimationFrame(frameRef.current);

    let frame = 0;
    const update = () => {
      let output = "";
      let complete = 0;
      for (let i = 0; i < queue.length; i += 3) {
        const [start, end, charIndex] = [queue[i], queue[i + 1], queue[i + 2]];
        if (frame >= end) {
          complete++;
          output += text[Math.floor(i / 3)] || "";
        } else if (frame >= start) {
          if (charIndex >= 0 && Math.random() < 0.28) {
            output += chars[charIndex];
          } else {
            output += text[Math.floor(i / 3)] || "";
          }
        } else {
          output += old[Math.floor(i / 3)] || "";
        }
      }
      if (ref.current) ref.current.textContent = output;
      currentRef.current = output;
      if (complete < queue.length / 3) {
        frameRef.current = requestAnimationFrame(update);
      } else {
        if (ref.current) ref.current.textContent = text;
      }
      frame++;
    };
    update();
  }, [text, chars]);

  useEffect(() => {
    if (trigger) scramble();
    return () => cancelAnimationFrame(frameRef.current);
  }, [trigger, scramble]);

  return ref;
}
