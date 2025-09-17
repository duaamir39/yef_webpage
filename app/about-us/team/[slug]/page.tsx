import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

const TEAM_MEMBER_QUERY = groq`*[_type == "teamMember" && slug.current == $slug][0] {
  _id,
  name,
  title,
  "image": image.asset->url,
  bio
}`;

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`*[_type == "teamMember" && defined(slug.current)][].slug.current`);
  return slugs.map((slug: any) => ({ slug }));
}

export default async function TeamMemberPage({ params }: { params: any }) {
  const member = await client.fetch(TEAM_MEMBER_QUERY, { slug: params.slug });

  if (!member) {
    return <div>Team member not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#024da1] flex-shrink-0">
        <Image
          src={urlForImage(member.image).url()}
          alt={member.name}
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col text-center md:text-left">
        <h1 className="text-4xl font-bold text-[#024da1] mb-2">{member.name}</h1>
        <p className="text-2xl text-gray-600 mb-6">{member.title}</p>
        <div className="prose lg:prose-xl">
          <PortableText value={member.bio} />
        </div>
      </div>
    </div>
  );
}