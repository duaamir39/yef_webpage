'use client';

import { use, useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

const TEAM_MEMBER_QUERY = groq`*[_type == "teamMember" && slug.current == $slug][0] {
  _id,
  name,
  title,
  "slug": slug.current,
  image,
  bio
}`;

// Skeleton for single team member page
const TeamMemberSkeleton = () => (
  <div className="container mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row items-center md:items-start md:space-x-12">
    <div className="relative w-2/3 md:w-1/3 mb-8 md:mb-0 aspect-[4/3] flex-shrink-0 bg-gray-200 shimmer"></div>
    <div className="flex flex-col text-center md:text-left md:w-2/3">
      <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto md:mx-0 mb-4 shimmer"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3 mx-auto md:mx-0 mb-6 shimmer"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 shimmer"></div>
      </div>
    </div>
  </div>
);

export default function TeamMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // ✅ unwrap params

  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await client.fetch(TEAM_MEMBER_QUERY, { slug });
        setMember(data);
      } catch (error) {
        console.error('Failed to fetch team member:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [slug]);

  if (isLoading) {
    return <TeamMemberSkeleton />;
  }

  if (!member) {
    return <div className="text-center py-12 text-red-600 font-semibold">Team member not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row items-center md:items-start md:space-x-12">
      {/* Image fades in first */}
      <div
        className="relative w-2/3 md:w-1/3 mb-8 md:mb-0 aspect-[4/3] flex-shrink-0 overflow-hidden rounded-2xl bg-white opacity-0 fade-in"
        style={{ animationDelay: '0.2s' }}
      >
        {member.image && (
          <Image
            src={urlForImage(member.image).url()}
            alt={member.name}
            fill
            className="object-contain"
          />
        )}
      </div>

      {/* Text fades in after image */}
      <div
        className="flex flex-col text-center md:text-left md:w-2/3 opacity-0 fade-in"
        style={{ animationDelay: '1s' }}
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{member.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{member.title}</p>
        <div className="prose lg:prose-xl text-gray-700">
          <PortableText value={member.bio} />
        </div>
      </div>
    </div>
  );
}
