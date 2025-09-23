import CareerLists from '@/app/components/CareerLists'
import { client } from "@/sanity/lib/client";
import React from 'react'

export default async function page() {

  const query = `*[_type == "career"]{
      title,
      slug,
      subtitle,
      description,
      badge1,
      badge2,
      "image": image{asset->{url}},
      applyLink
    }`
    
  const careers = await client.fetch(query);
  
  return (
     <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#024da1]">Careers & Internships</h1>
      <CareerLists careers={careers} />
    </main>
  )
}
