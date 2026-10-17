import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Durgesh Kanzariya — Full-Stack & ML Engineer";
export const size = {
  width: 1200,
  height: 630,
};
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
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#080810",
          color: "#F0F0F8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Ambient background glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(79, 142, 255, 0.18)",
            filter: "blur(120px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "-150px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "rgba(168, 85, 247, 0.15)",
            filter: "blur(120px)",
          }}
        />

        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "20px",
              fontFamily: "monospace",
              color: "#94A3B8",
            }}
          >
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "#4F8EFF",
              }}
            />
            durgeshkanzariya.dev
          </div>
          <div
            style={{
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(79, 142, 255, 0.3)",
              backgroundColor: "rgba(79, 142, 255, 0.08)",
              color: "#4F8EFF",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            Available for Roles · 2026
          </div>
        </div>

        {/* Main headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "68px",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#FFFFFF",
            }}
          >
            Durgesh Kanzariya
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#94A3B8",
              fontWeight: 400,
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            Full-Stack & Machine Learning Engineer building distributed backends, Flutter mobile apps, and predictive AI systems.
          </div>
        </div>

        {/* Bottom tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            zIndex: 10,
          }}
        >
          {["FastAPI", "React", "Next.js", "Flutter", "Python", "XGBoost", "ModernBERT"].map((tag) => (
            <div
              key={tag}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#E2E8F0",
                fontSize: "16px",
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
