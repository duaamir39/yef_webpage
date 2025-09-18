import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { toPlainText } from '@portabletext/react';

const TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember"] | order(_createdAt desc) [0...3] {
  _id,
  name,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  bio
}`;

export const revalidate = 60;

export default async function TeamPage() {
  const teamMembers = await client.fetch(TEAM_MEMBERS_QUERY);


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#024da1]">Our Team</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member: any) => (
          <div 
            key={member._id} 
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col"
          >
            {member.image && (
              <div className="relative w-full aspect-[4/3]"> 
                <Image
                  src={urlForImage(member.image).url()}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="top" 
                  className="w-full h-full"
                />
              </div>
            )}
            
            <div className="p-6 text-center flex-grow flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{member.name}</h2>
                <p className="text-sm text-gray-600 my-2">{member.title}</p>
              </div>
              {member.bio && (
                <Link href={`/about-us/team/${member.slug}`}>
                  <p className="text-sm text-gray-500 my-2 line-clamp-2 hover:underline focus:outline-none cursor-pointer">
                    {toPlainText(member.bio)}
                  </p>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}