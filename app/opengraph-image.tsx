import { ImageResponse } from "next/og";

// Social sharing preview image (Facebook / Twitter / iMessage, etc.)
export const alt =
  "Arrowhead Explorers — Nature-Inspired Childcare in North Waterboro, Maine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #6F7A55 0%, #59623F 100%)",
          color: "#F7F3EB",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Decorative ring */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            border: "3px solid rgba(247,243,235,0.18)",
            display: "flex",
          }}
        />
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "rgba(247,243,235,0.8)",
            display: "flex",
          }}
        >
          Nature-Based Family Childcare
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 700,
            marginTop: 20,
            lineHeight: 1.05,
            display: "flex",
          }}
        >
          Arrowhead Explorers
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 24,
            color: "rgba(247,243,235,0.92)",
            display: "flex",
          }}
        >
          Growing Curious Minds Through Nature &amp; Play.
        </div>
        <div
          style={{
            fontSize: 30,
            marginTop: 40,
            color: "rgba(247,243,235,0.8)",
            display: "flex",
            alignItems: "center",
          }}
        >
          North Waterboro, Maine · Lake Arrowhead
        </div>
      </div>
    ),
    { ...size },
  );
}
