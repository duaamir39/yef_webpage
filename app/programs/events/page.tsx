"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ✅ Only fetch image field from event documents
const EVENTS_QUERY = groq`*[_type == "event"] | order(_createdAt desc) {
  _id,
  image
}`;

type EventItem = {
  _id: string;
  image?: any;
};

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data: EventItem[] = await client.fetch(EVENTS_QUERY);
        if (!mounted) return;
        setEvents(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Failed to fetch events:", err);
        if (mounted) setError(err?.message || "Failed to fetch events");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div className="py-12 text-center">Loading events…</div>;
  if (error)
    return (
      <div className="py-12 text-center text-red-600">
        Error loading events — check console for details.
      </div>
    );
  if (events.length === 0)
    return <div className="py-12 text-center">No events available.</div>;

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Event Highlights
      </h2>

      <Swiper
        spaceBetween={20}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="relative"
      >
        {events.map((ev) => (
          <SwiperSlide key={ev._id}>
        <div className="flex justify-center">
              {ev.image ? (
                <img
                  src={urlForImage(ev.image)
                    .width(1200)
                    .height(800)
                    .auto("format")
                    .url()}
                  alt="Event image"
                className="w-full max-w-3xl h-auto object-contain rounded-xl shadow-lg"
    />
              ) : (
                <div className="w-full h-64 md:h-72 lg:h-96 bg-gray-300 flex items-center justify-center">
                  No image
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
