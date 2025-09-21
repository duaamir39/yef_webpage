import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { groq } from "next-sanity";
import Image from "next/image";

const GALLERY_QUERY = groq`*[_type == "gallery"] {
  _id,
  title,
  image,
  shortDescription
}`;

export const revalidate = 60;

export default async function GalleryPage() {
  const galleryItems = await client.fetch(GALLERY_QUERY);

  return (
    <>
      {/* Hero section with background */}
     <div className="relative h-screen w-screen flex items-center justify-center text-white">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center"
    style={{ backgroundImage: "url('/images/camera.png')" }}
  ></div>

  {/* Blue Overlay (#024da1) */}
  <div
    className="absolute inset-0"
    style={{ backgroundColor: "rgba(2, 77, 161, 0.6)" }} // 60% opacity
  ></div>

  {/* Text */}
  <h4 className="relative text-6xl font-bold">Gallery</h4>
</div>

      {/* Media Section */}
      <div className="min-h-screen px-8">
        <h3 className="mt-5 text-center text-4xl font-bold font-serif">Media</h3>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {galleryItems.map((item: any) => (
            <div
              key={item._id}
              className="max-w-sm mx-auto grid"
            >
              <div className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                {item.image && (
                  <Image
                    src={urlForImage(item.image).url()}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-black text-lg font-semibold break-words">
                    {item.shortDescription}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}