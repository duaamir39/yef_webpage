import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import React from "react";

interface CareerPageProps {
  params: { slug: string };
}

async function getCareer(slug: string) {
  const query = `*[_type == "career" && slug.current == $slug][0]{
    title,
    subtitle,
    description,
    badge1,
    badge2,
    "image": image{asset->{url}},
    applyLink
  }`;

  return client.fetch(query, { slug });
}

export default async function careerDetailsPage({ params }: CareerPageProps) {
  const career = await getCareer(params.slug);

  return (
    <div className="max-w-3xl mx-auto p-6">
      
      {/* Image */}
      {career.image && (
        <div className="relative w-full aspect-[16/9] mb-6">
          <Image
            src={career.image?.asset?.url}
            alt={career.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      {/* Title + subtitle */}
      <h1 className="text-3xl font-bold text-[#024da1]">{career.title}</h1>
      {career.subtitle && (
        <p className="text-gray-500 mt-1">{career.subtitle}</p>
      )}

      {/* Badges */}
      <div className="flex gap-2 mt-3">
        {career.badge1 && (
          <Badge className="bg-blue-100 text-[#024da1] hover:bg-blue-200">
            {career.badge1}
          </Badge>
        )}
        {career.badge2 && (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
            {career.badge2}
          </Badge>
        )}
      </div>

      {/* Description */}
      <div className="mt-6 text-gray-700 leading-relaxed">
        {career.description}
      </div>

      {/* Apply Button */}
      <div className="mt-8">
        <a href={career.applyLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#024da1] hover:bg-[#013a7c]">Apply Now</Button>
        </a>
      </div>
    </div>
  );
}
