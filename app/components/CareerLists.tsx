import React from "react";
import CareerCard from "./CareerCard";

interface Career {
  title: string;
  slug: { current: string };
  subtitle?: string;
  description: string;
  badge?: string;
  Location?: string;
  image?: { asset: { url: string } };
  applyLink: string;
}

export default function CareerLists({ careers }: { careers: Career[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {careers.map((career) => (
        <CareerCard
          key={career.slug.current}
          title={career.title}
          slug={career.slug.current}
          subtitle={career.subtitle}
          description={career.description}
          badge={career.badge}
          Location={career.Location}
          imageUrl={career.image?.asset?.url}
          applyLink={career.applyLink}
        />
      ))}
    </div>
  );
}
