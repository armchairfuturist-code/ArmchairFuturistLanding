"use client";

/**
 * Click-to-play YouTube facade.
 *
 * Nothing loads from YouTube until the visitor presses play: no player JS,
 * no cookies, no player chrome. The iframe mounts on click, into the
 * youtube-nocookie player. The credit link beside the frame is the
 * no-JavaScript path to the source.
 *
 * The whole poster is the button; the blue control at the top-left is its
 * visible label. The poster frame is downloaded into /public and served
 * locally, never hotlinked from i.ytimg.com.
 */

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export interface VideoFacadeProps {
  /** YouTube video id. */
  videoId: string;
  /** Accessible name for the embedded player. */
  title: string;
  /** Poster frame in /public. */
  posterSrc: string;
  /** Visible label on the play control. */
  playLabel?: string;
  /** Second offset to start playback at, so the sample opens on its point. */
  startAt?: number;
  /** Analytics event fired on play, with `location` as the only param. */
  analyticsEvent?: string;
  className?: string;
}

export function VideoFacade({
  videoId,
  title,
  posterSrc,
  playLabel = "Watch the episode",
  startAt,
  analyticsEvent,
  className,
}: VideoFacadeProps) {
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    if (analyticsEvent) {
      trackEvent(analyticsEvent, { location: "homepage_about" });
    }
    setPlaying(true);
  };

  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${
    startAt ? `&start=${startAt}` : ""
  }`;

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-hp-xl bg-ink-soft",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={embedSrc}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={handlePlay}
          className="group absolute inset-0 block w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hp-bright"
        >
          <Image
            src={posterSrc}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 56vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="absolute left-3 top-3 inline-flex h-11 w-11 items-center justify-center gap-2 rounded bg-hp-electric text-sm font-semibold uppercase tracking-[0.7px] text-white transition-colors duration-150 group-hover:bg-hp-bright md:left-5 md:top-5 md:w-auto md:px-6">
            <Play className="h-4 w-4 shrink-0" aria-hidden="true" />
            {/* Label shows from md up; below that the poster is too narrow to
                fit it without covering the artwork's own title, so the
                control is icon-only and the name stays sr-only. */}
            <span className="sr-only md:not-sr-only">{playLabel}</span>
          </span>
        </button>
      )}
    </div>
  );
}
