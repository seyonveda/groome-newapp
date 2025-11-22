// src/components/BannerCarousel.tsx
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { getPublicUrl } from "../lib/storage";
import { useNavigate } from "react-router-dom";

// Type describing a row in your "banners" table
export type BannerRecord = {
  id: number;
  title?: string | null;
  image_path?: string | null;
  target_url?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  is_active?: boolean | null;
  position?: number | null;
  metadata?: any | null;
};

// Type for what UI actually needs
type BannerUI = {
  id: number;
  title?: string | null;
  imageUrl: string;
  target_url?: string | null;
};

export default function BannerCarousel() {
  const [banners, setBanners] = useState<BannerUI[]>([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBanners() {
      try {
        const { data, error } = await supabase
          .from("banners")
          .select("*")
          .eq("is_active", true)
          .order("position", { ascending: true });

        if (error) {
          console.error("Error loading banners:", error);
          return;
        }
        if (!mounted || !data) return;

        // Treat rows as BannerRecord[]
        const rows = data as BannerRecord[];

        // Convert storage path -> public URL
        const mapped = await Promise.all(
          rows.map(async (b: BannerRecord): Promise<BannerUI> => {
            const rawPath = b.image_path ?? "";
            let imageUrl = "";

            try {
              // your helper getPublicUrl("banners/2025/abc.jpg")
              imageUrl = rawPath ? await getPublicUrl(rawPath) : "";
            } catch {
              try {
                const { data: urlData } = supabase.storage.from("banners").getPublicUrl(rawPath);
                imageUrl = urlData?.publicUrl ?? "";
              } catch {
                imageUrl = rawPath;
              }
            }

            return {
              id: b.id,
              title: b.title ?? null,
              imageUrl: imageUrl,
              target_url: b.target_url ?? null,
            };
          })
        );

        setBanners(mapped.filter((m) => m.imageUrl)); // keep only banners with proper URLs
      } catch (err) {
        console.error("Unexpected error loading banners:", err);
      }
    }

    loadBanners();

    return () => {
      mounted = false;
    };
  }, []);

  // Auto slide
  useEffect(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }

    if (banners.length > 1) {
      intervalRef.current = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [banners]);

  const goPrev = () => setIndex((i) => (i - 1 + banners.length) % banners.length);
  const goNext = () => setIndex((i) => (i + 1) % banners.length);
  const onClickBanner = (targetUrl?: string | null) => {
    if (!targetUrl) return;
    if (targetUrl.startsWith("/")) navigate(targetUrl);
    else window.open(targetUrl, "_blank");
  };

  if (!banners.length) return null;

  return (
    <div className="banner-carousel" style={{ position: "relative", overflow: "hidden" }}>
      <div
        className="banner-track"
        style={{
          display: "flex",
          transition: "transform 400ms ease",
          transform: `translateX(-${index * 100}%)`,
        }}
      >
        {banners.map((b) => (
          <div
            key={b.id}
            className="banner-slide"
            style={{
              minWidth: "100%",
              cursor: b.target_url ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#000",
            }}
            onClick={() => onClickBanner(b.target_url)}
          >
            <img
              src={b.imageUrl}
              alt={b.title ?? "Banner"}
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          {/* Prev button */}
          <button
            aria-label="Previous banner"
            onClick={goPrev}
            style={{
              position: "absolute",
              left: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            ◀
          </button>

          {/* Next button */}
          <button
            aria-label="Next banner"
            onClick={goNext}
            style={{
              position: "absolute",
              right: 8,
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0,0,0,0.5)",
              color: "#fff",
              border: "none",
              padding: "8px 10px",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
        </>
      )}

      {/* Slide dots */}
      {banners.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 8,
          }}
        >
          {banners.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                border: "none",
                background: i === index ? "#fff" : "rgba(255,255,255,0.5)",
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}