import CareerHero from "@/app/components/CareerHero";
import CareerLists from "@/app/components/CareerLists";
import WhyWorkWithUs from "@/app/components/WhyWorkWithUs";
import { client } from "@/sanity/lib/client";
import React from "react";

export default async function page() {
  const query = `*[_type == "career"]{ 
    title, 
    slug, 
    subtitle, 
    description, 
    badge, 
    category, 
    Location, 
    "image": image{asset->{url}}, applyLink }`;

  const careers = await client.fetch(query);
  return (
    <main className="">
      <CareerHero />
      <WhyWorkWithUs />
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#024da1]">
          Similar Openings
        </h1>
        <CareerLists careers={careers} />
      </div>
    </main>
  );
}
