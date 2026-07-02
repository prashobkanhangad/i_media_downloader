import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Instagram Video Downloader — Free HD Downloads";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #7c3aed 0%, #db2777 50%, #f43f5e 100%)",
        color: "white",
        fontFamily: "system-ui, sans-serif",
        padding: 64,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 700,
          textAlign: "center",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
        }}
      >
        Instagram Video Downloader
      </div>
      <div
        style={{
          fontSize: 28,
          marginTop: 24,
          opacity: 0.9,
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Download Reels, Videos, Photos &amp; Stories — Free &amp; HD
      </div>
    </div>,
    { ...size },
  );
}
