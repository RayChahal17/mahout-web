import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "North Star — Future You, built as a system";
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
          background: "linear-gradient(180deg, #FFF4DC 0%, #F7F6FB 50%, #E9E6FF 100%)",
          fontFamily: "system-ui, sans-serif",
          border: "2px solid #D8A85B",
        }}
      >
        <h1
          style={{
            fontSize: 56,
            fontWeight: 400,
            color: "#5636D3",
            margin: 0,
            marginBottom: 16,
          }}
        >
          North Star
        </h1>
        <p
          style={{
            fontSize: 24,
            color: "#505763",
            margin: 0,
            maxWidth: 560,
            textAlign: "center",
          }}
        >
          Future You, built as a system. Not a chatbot—an inner guide with receipts.
        </p>
      </div>
    ),
    { ...size }
  );
}
