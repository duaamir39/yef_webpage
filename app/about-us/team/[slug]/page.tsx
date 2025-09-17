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

export async function generateStaticParams() {
  const slugs = await client.fetch(
    groq`*[_type == "teamMember" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug: string) => ({ slug }));
}

export default async function TeamMemberPage({ params }: { params: { slug: string } }) {
  const member = await client.fetch(TEAM_MEMBER_QUERY, { slug: params.slug });

  if (!member) {
    return <div className="text-center py-12 text-red-600 font-semibold">Team member not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 flex flex-col md:flex-row items-center md:items-start md:space-x-12">
      {/* Image */}
      <div className="relative w-full h-[300px] mb-8 md:mb-0 md:w-1/3 md:h-[400px] flex-shrink-0">
        {member.image && (
          <Image
            src={urlForImage(member.image).url()}
            alt={member.name}
            fill
            className="rounded-lg shadow-lg object-cover border-4 border-[#024da1]"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col text-center md:text-left md:w-2/3">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{member.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{member.title}</p>
        <div className="prose lg:prose-xl text-gray-700">
          <PortableText value={member.bio} />
        </div>
      </div>
    </div>
  );
}