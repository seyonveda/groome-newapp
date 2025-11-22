// src/components/BannerCarousel.tsx
import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabaseClient"; // matches your screenshot
import { getPublicUrl } from "../lib/storage"; // matches your screenshot
import { useNavigate } from "react-router-dom";

type BannerRecord = {
  id: number;
  title?: string | null;
  image_path?: string | null; // path stored in supabase storage
  target_url?: string | null;
  start_at?: string | null;
  end_at?: string | null;
  is_active?: boolean | null;
  position?: number | null;
  metadata?: any | null;
};

export default function BannerCarousel() {
  const [banners, setBanners] = useState<
    Array<{ id: number; title?: string | null; imageUrl: string; target_url?: string | null }>
  >([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadBanners() {
      try {
        // Adjust table name / filters as needed. This fetches active banners ordered by position.
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

        // Convert storage path -> public URL using your helper
        const mapped = await Promise.all(
          data.map(async (b) => {
            // If image_path is already a full URL, keep it.
            const rawPath = b.image_path ?? "";
            let imageUrl = "";

            // If helper exists and expects (bucket, path) or (path) adjust accordingly.
            // Here we assume image_path is like "banners/2025/abc.jpg" and getPublicUrl(path) returns a full url.
            try {
              imageUrl = rawPath ? await getPublicUrl(rawPath) : "";
            } catch (err) {
              // fallback: if helper throws or not available, try to build from supabase storage
              try {
                const { data: urlData } = supabase.storage.from("banners").getPublicUrl(rawPath);
                imageUrl = urlData?.publicUrl ?? "";
              } catch (e) {
                imageUrl = rawPath; // fallback to whatever is stored
              }
            }

            return {
              id: b.id,
              title: b.title ?? null,
              imageUrl: imageUrl || "",
              target_url: b.target_url ?? null,
            };
          })
        );

        setBanners(mapped.filter((m) => m.imageUrl));
      } catch (err) {
        console.error("Unexpected error loading banners:", err);
      }
    }

    loadBanners();

    return () => {
      mounted = false;
    };
  }, []);

  // Auto-advance every 5s
  useEffect(() => {
    // clear existing
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

  const goPrev = () => {
    setIndex((i) => (i - 1 + banners.length) % banners.length);
  };
  const goNext = () => {
    setIndex((i) => (i + 1) % banners.length);
  };

  const onClickBanner = (targetUrl?: string | null) => {
    if (!targetUrl) return;
    // If targetUrl is an internal route (starts with /) use navigate
    if (targetUrl.startsWith("/")) {
      navigate(targetUrl);
    } else {
      // otherwise open in new tab
      window.open(targetUrl, "_blank");
    }
  };

  if (!banners.length) {
    return null; // or a placeholder skeleton
  }

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
            role={b.target_url ? "link" : undefined}
          >
            <img
              src={b.imageUrl}
              alt={b.title ?? "Banner"}
              style={{ width: "100%", height: "auto", objectFit: "cover", display: "block" }}
            />
          </div>
        ))}
      </div>

      {/* Prev / Next */}
      {banners.length > 1 && (
        <>
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

      {/* Dots */}
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