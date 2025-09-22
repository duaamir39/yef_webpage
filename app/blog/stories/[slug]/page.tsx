'use client';

import { use, useEffect, useState } from 'react';
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

// Skeleton loader
const BlogPostSkeleton = () => (
  <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
    <div className="flex flex-col items-center">
      <div className="h-10 bg-gray-200 rounded w-2/3 mb-6 shimmer"></div>
      <div className="relative w-full max-w-3xl aspect-[4/3] mb-8 bg-gray-200 shimmer rounded-lg"></div>
      <div className="space-y-4 w-full">
        <div className="h-4 bg-gray-200 rounded w-full shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 shimmer"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 shimmer"></div>
      </div>
    </div>
  </div>
);

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // ✅ unwrap params

  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await client.fetch(POST_QUERY, { slug });
        setPost(data);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (isLoading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return <div className="text-center py-12 text-red-600 font-semibold">Blog post not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 max-w-4xl">
      <div className="flex flex-col items-center">
        {/* Title fade-in first */}
        <h1
          className="text-4xl font-bold text-gray-800 mb-6 text-center opacity-0 fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          {post.title}
        </h1>

        {/* Image fade-in second */}
        {post.mainImage && (
          <div
            className="relative w-full max-w-3xl aspect-[4/3] mb-8 opacity-0 fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title}
              fill
              className="object-cover rounded-lg shadow-lg"
            />
          </div>
        )}

        {/* Body fade-in last */}
        <div
          className="prose lg:prose-xl text-gray-700 opacity-0 fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <PortableText value={post.body} />
        </div>
      </div>
    </div>
  );
}
