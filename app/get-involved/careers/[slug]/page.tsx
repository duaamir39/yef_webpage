import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { notFound } from "next/navigation"; // optional fallback

interface CareerPageProps {
  params: Promise<{ slug: string }>;
}

async function getCareer(slug: string) {
  const query = `*[_type == "career" && slug.current == $slug][0]{
    title,
    subtitle,
    description,
    badge,
    Location,
    "image": image.asset->url,
    applyLink
  }`;
  return client.fetch(query, { slug });
}

export default async function CareerDetailsPage({ params }: CareerPageProps) {
  const { slug } = await params; // ✅ await params (important)
  const career = await getCareer(slug);

  if (!career) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-6">
      {career.image && (
        <div className="relative w-full aspect-[16/9] mb-6">
          <Image
            src={career.image}
            alt={career.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      <h1 className="text-3xl font-bold text-[#024da1]">{career.title}</h1>
      {career.subtitle && <p className="text-gray-500 mt-1">{career.subtitle}</p>}

      <div className="flex gap-2 mt-3">
        {career.badge && (
          <Badge className="bg-blue-100 text-[#024da1] hover:bg-blue-200">
            {career.badge}
          </Badge>
        )}
        {career.Location && (
          <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-200">
            {career.Location}
          </Badge>
        )}
      </div>

      <div className="mt-6 text-gray-700 leading-relaxed">{career.description}</div>

      <div className="mt-8">
        <a href={career.applyLink} target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#024da1] hover:bg-[#013a7c] cursor-pointer">
            Apply Now
          </Button>
        </a>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic"; // optional
