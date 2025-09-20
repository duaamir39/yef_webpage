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

const EVENTS_QUERY = groq`*[_type == "event"] | order(date desc) {
  _id,
  title,
  date,
  description,
  image
}`;

type EventItem = {
  _id: string;
  title?: string;
  date?: string;
  description?: string;
  image?: any;
};

export default function EventsSlider() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await client.fetch(EVENTS_QUERY);
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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Our Events</h2>

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
            <div className="rounded-xl overflow-hidden shadow-lg group bg-gray-100">
              {ev.image ? (
                // plain img avoids next/image domain issues; if you want next/Image,
                // switch to <Image src={...} ... /> and ensure next.config.js is set.
                <img
                  src={urlForImage(ev.image).width(1200).height(800).auto("format").url()}
                  alt={ev.title || "Event image"}
                  className="w-full h-64 md:h-72 lg:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-64 md:h-72 lg:h-80 bg-gray-300 flex items-center justify-center">
                  No image
                </div>
              )}

              <div className="p-4 bg-white">
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  {ev.title}
                </h3>
                {ev.date && (
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(ev.date).toDateString()}
                  </p>
                )}
                {ev.description && (
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {ev.description}
                  </p>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
