import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CareerCardProps {
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  badge?: string;
  Location?: string;
  imageUrl?: string;
  applyLink: string;
}

export default function CareerCard({
  title,
  slug,
  subtitle,
  description,
  badge,
  Location,
}: CareerCardProps) {
  const shortDesc =
    description.length > 150
      ? description.substring(0, 150) + "..."
      : description;

  return (
    <Card className="overflow-hidden rounded-2xl shadow-md">

      {/* Content */}
      <CardHeader className="flex justify-between">
        <div className="w-[70%]">
          <CardTitle className="text-xl font-semibold truncate">
            {title}
          </CardTitle>
          {subtitle && <CardDescription>{subtitle}</CardDescription>}
        </div>

        {badge && (
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-700 hover:bg-green-200 ml-2"
          >
            {badge}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="h-[100px]">
        {/* Badges */}
        <div className="text-gray-600 text-sm gap-2 mb-3">
          {Location}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm">{shortDesc}</p>
      </CardContent>

      {/* Footer with Buttons */}
      <CardFooter>
        <Link href={`/get-involved/careers/${slug}`} passHref>
          <Button variant="link" className="text-white px-4 bg-[#024da1] cursor-pointer hover:bg-[#013a7c]">
            View and Apply
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
