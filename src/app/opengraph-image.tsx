import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "La Tabla — Charcutería & Quesos Artesanales";
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
          backgroundColor: "#1a1a1a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#d4a853",
            letterSpacing: 2,
          }}
        >
          La Tabla
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#c4b5a0",
            marginTop: 16,
          }}
        >
          Charcutería & Quesos Artesanales
        </div>
        <div
          style={{
            fontSize: 18,
            color: "#8b7355",
            marginTop: 12,
          }}
        >
          Chef Stewart Heigold · Costa Rica
        </div>
      </div>
    ),
    { ...size }
  );
}
