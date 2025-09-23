'use client';

import { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';
import { urlForImage } from '@/sanity/lib/image';
import { groq } from 'next-sanity';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext'; 


const BLOG_POSTS_QUERY = groq`*[_type == "blog"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
  shortDescription,
}`;

const BlogSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
    <div className="relative w-full aspect-[4/3] bg-gray-200 shimmer"></div>
    <div className="p-6">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3 shimmer"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 shimmer"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 shimmer"></div>
      <div className="h-8 bg-gray-200 rounded w-24 shimmer"></div>
    </div>
  </div>
);

export default function BlogSection() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { openAuthModal } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await client.fetch(BLOG_POSTS_QUERY);
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#024da1]">Our Blogs</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? 
            Array.from({ length: 6 }).map((_, i) => <BlogSkeleton key={i} />)
          : 
            posts.map((post, idx) => (
              <div
                key={post._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl flex flex-col"
              >
                {post.mainImage && (
                  <div
                    className="relative w-full aspect-[4/3] opacity-0 fade-in"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <Image
                      src={urlForImage(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                )}

                <div
                  className="p-6 opacity-0 fade-in"
                  style={{ animationDelay: `${idx * 0.2 + 0.3}s` }}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {post.shortDescription}
                  </p>
                  <button
  onClick={() => openAuthModal(`/blog/stories/${post.slug}`)}
  className="bg-[#024da1] text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
 >
  Read More
 </button>
                </div>
              </div>
            ))}
      </div>
    </section>
  );
}
