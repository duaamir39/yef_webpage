import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

const POST_QUERY = groq`*[_type == "blog" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  body,
}`;

export async function generateStaticParams() {
  const slugs = await client.fetch(groq`*[_type == "blog" && defined(slug.current)][].slug.current`);
  return slugs.map((slug: string) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(POST_QUERY, { slug: params.slug });

  if (!post) {
    return <div className="text-center py-12 text-red-600 font-semibold">Blog post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{post.title}</h1>
        
        {post.mainImage && (
          <div className="relative w-full max-w-3xl aspect-[4/3] mb-8">
  <Image
    src={urlForImage(post.mainImage).url()}
    alt={post.title}
    fill
    className="object-cover rounded-lg shadow-lg"
  />
</div>

        )}

        <div className="prose lg:prose-xl text-gray-700">
          <PortableText value={post.body} />
        </div>
      </div>
    </div>
  );
}