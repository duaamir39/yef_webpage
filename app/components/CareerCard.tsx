import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CareerCardProps {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  badge1?: string;
  badge2?: string;
  imageUrl?: string;
  applyLink: string;
}

export default function CareerCard({
  title,
  slug,
  subtitle,
  description,
  badge1,
  badge2,
  imageUrl,
  applyLink,
}: CareerCardProps) {
  
console.log(slug)

  const shortDesc =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Content */}
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>

      <CardContent>
        {/* Badges */}
        <div className="flex gap-2 mb-3">
          {badge1 && (
            <Badge variant="secondary" className="bg-blue-100 text-[#024da1] hover:bg-blue-200">
              {badge1}
            </Badge>
          )}
          {badge2 && (
            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200">
              {badge2}
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm">{shortDesc}</p>
      </CardContent>

      {/* Footer with Buttons */}
      <CardFooter className="flex gap-3">
        <Link href={`/get-involved/careers/${slug}`} passHref>
          <Button variant="link" className="text-[#024da1] px-0 cursor-pointer">
            Read More
          </Button>
        </Link>

        <a href={applyLink} target="_blank" rel="noopener noreferrer" className="ml-auto">
          <Button className="bg-[#024da1] hover:bg-[#013a7c] cursor-pointer">
            Apply Now
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}
