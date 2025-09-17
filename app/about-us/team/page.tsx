import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PortableText } from '@portabletext/react';

const TEAM_MEMBERS_QUERY = groq`*[_type == "teamMember"] {
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
      <h1 className="text-4xl font-bold mb-8 text-center text-[#024da1]">Our Team</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member: any) => (
          <div key={member._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300">
            {member.image && (
              <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4 border-4 border-[#024da1]">
                <Image
                  src={urlForImage(member.image).url()}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            )}
            <h2 className="text-2xl font-semibold text-[#024da1]">{member.name}</h2>
            <p className="text-gray-600 mb-4">{member.title}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#024da1] text-white hover:bg-white hover:text-[#024da1] border border-[#024da1] transition-colors duration-300">Read More</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white text-black p-6 rounded-lg">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-2xl font-bold text-[#024da1]">{member.name}</DialogTitle>
                  <DialogDescription className="text-gray-600">
                    {member.title}
                  </DialogDescription>
                </DialogHeader>
                <PortableText
                  value={member.bio}
                />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
}