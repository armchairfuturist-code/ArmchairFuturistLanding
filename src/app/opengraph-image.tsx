import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Alex Myers — AI Consultant & Instructor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          padding: "80px 100px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: "120px",
            height: "6px",
            background: "#3b82f6",
            borderRadius: "3px",
            marginBottom: "40px",
          }}
        />

        {/* Main title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "700",
            color: "#ffffff",
            lineHeight: "1.1",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}
        >
          Alex Myers
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "36px",
            fontWeight: "500",
            color: "#94a3b8",
            lineHeight: "1.3",
            marginBottom: "12px",
          }}
        >
          AI Consultant & Instructor
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: "400",
            color: "#64748b",
            marginTop: "auto",
          }}
        >
          thearmchairfuturist.com
        </div>
      </div>
    ),
    { ...size },
  );
}
