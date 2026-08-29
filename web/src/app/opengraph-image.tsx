import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Mahout — A personal operating system, guided by Future You";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #F7F6FB 0%, #E9E6FF 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 400,
            color: "#5636D3",
            margin: 0,
            marginBottom: 16,
          }}
        >
          Mahout
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#505763",
            margin: 0,
            maxWidth: 600,
            textAlign: "center",
          }}
        >
          A personal operating system—guided by Future You.
        </p>
      </div>
    ),
    { ...size }
  );
}
