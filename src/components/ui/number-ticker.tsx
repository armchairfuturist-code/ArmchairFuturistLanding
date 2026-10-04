"use client"

import { ComponentPropsWithoutRef, useEffect, useMemo, useRef } from "react"
import { useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

/** One formatter per (locale, decimals), not one per frame. */
function useFormatter(decimalPlaces: number) {
  return useMemo(
    () =>
      Intl.NumberFormat("en-US", {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }),
    [decimalPlaces]
  )
}

/**
 * A figure that springs to each new value.
 *
 * NumberTicker below counts up once when it scrolls into view. This one
 * re-animates every time `value` changes, which is what a live calculation
 * needs — a reader stepping a counter up and down should see the number
 * move, not teleport.
 *
 * The motion value is initialised to `value`, never to zero, so the first
 * render shows the real figure. Starting at zero would make the number
 * visibly jump to its own value on mount.
 */
export function AnimatedNumber({
  value,
  decimalPlaces = 0,
  suffix = "",
  className,
  ...props
}: Omit<ComponentPropsWithoutRef<"span">, "children"> & {
  value: number
  decimalPlaces?: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const format = useFormatter(decimalPlaces)
  const reduced = useReducedMotion() ?? false

  const motionValue = useMotionValue(value)
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 220 })

  useEffect(() => {
    if (reduced) {
      if (ref.current) {
        ref.current.textContent = format.format(value) + suffix
      }
      return
    }
    motionValue.set(value)
  }, [value, reduced, motionValue, format, suffix])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = format.format(Number(latest.toFixed(decimalPlaces))) + suffix
        }
      }),
    [springValue, format, decimalPlaces, suffix]
  )

  return (
    <span ref={ref} className={cn("tabular-nums", className)} {...props}>
      {format.format(value) + suffix}
    </span>
  )
}

interface NumberTickerProps extends ComponentPropsWithoutRef<"span"> {
  value: number
  startValue?: number
  direction?: "up" | "down"
  delay?: number
  decimalPlaces?: number
  suffix?: string
}

export function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
  suffix = "",
  ...props
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === "down" ? value : startValue)
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  })
  const isInView = useInView(ref, { once: true, margin: "0px" })
  const reduced = useReducedMotion() ?? false
  const formatter = useFormatter(decimalPlaces)

  const format = (n: number) => formatter.format(Number(n.toFixed(decimalPlaces))) + suffix

  useEffect(() => {
    if (isInView) {
      // Reduced motion: show the final figure immediately, no count-up.
      if (reduced) {
        if (ref.current) {
          ref.current.textContent = format(
            direction === "down" ? startValue : value
          )
        }
        return
      }
      const timer = setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value)
      }, delay * 1000)
      return () => clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue, isInView, delay, value, direction, startValue, reduced, decimalPlaces, suffix])

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = format(Number(latest))
        }
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [springValue, decimalPlaces, suffix]
  )

  return (
    <span
      ref={ref}
      className={cn(
        "inline-block tracking-wider text-foreground tabular-nums",
        className
      )}
      {...props}
    >
      {startValue}
    </span>
  )
}
