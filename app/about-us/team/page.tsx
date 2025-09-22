'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { toPlainText } from '@portabletext/react';

const TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember"] {
  _id,
  name,
  title,
  "slug": slug.current,
  "image": image.asset->url,
  bio
}`;

const TeamMemberSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
    <div className="relative w-full aspect-[4/3] bg-gray-200 shimmer"></div>
    <div className="p-6 text-center flex-grow flex flex-col justify-between">
      <div className="flex-grow">
        <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-2 shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto my-2 shimmer"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-full my-2 shimmer"></div>
    </div>
  </div>
);

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const data = await client.fetch(TEAM_MEMBERS_QUERY);
        setTeamMembers(data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center text-[#024da1]">Our Team</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index}>
              <TeamMemberSkeleton />
            </div>
          ))
        ) : (
          teamMembers.map((member: any, idx) => (
            <div
              key={member._id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex flex-col"
            >
              {member.image && (
                <div
                  className="relative w-full aspect-[4/3] opacity-0 fade-in"
                  style={{ animationDelay: `${idx * 0.2}s` }}
                >
                  <Image
                    src={urlForImage(member.image).url()}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
              )}

              <div
                className="p-6 text-center flex-grow flex flex-col justify-between opacity-0 fade-in"
                style={{ animationDelay: `${idx * 0.2 + 0.5}s` }}
              >
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
          ))
        )}
      </div>
    </div>
  );
}
