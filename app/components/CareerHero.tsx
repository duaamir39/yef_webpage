import { client } from "@/sanity/lib/client";
import React from "react";

export default async function CareerHero() {
  const query = `*[_type == "careerHero"][0]{
  heading,
  subheading,
  "imageUrl": image.asset->url
}`;

  const careerHeroDetails = await client.fetch(query);

  return (
    <section
      className="relative bg-cover bg-center h-[400px] flex items-center justify-center"
      style={{ backgroundImage: `url("${careerHeroDetails.imageUrl}")` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60"></div>

      {/* Text */}
      <div className="relative text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {careerHeroDetails.heading}
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          {careerHeroDetails.subheading}
        </p>
      </div>
    </section>
  );
}
