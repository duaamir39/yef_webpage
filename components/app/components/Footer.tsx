'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const footerNavItems = [
  {
    title: 'About Us',
    links: [
      { name: 'Our Story', path: '/about-us/our-story' },
      { name: 'Team & Leadership', path: '/about-us/team' },
      { name: 'Partners', path: '/about-us/partners' },
      { name: 'Impact', path: '/about-us/impact' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { name: 'Projects', path: '/programs/projects' },
      { name: 'Events', path: '/programs/events' },
      { name: 'Courses', path: '/programs/courses' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { name: 'Volunteer', path: '/get-involved/volunteer' },
      { name: 'Membership', path: '/get-involved/membership' },
      { name: 'Careers', path: '/get-involved/careers' },
    ],
  },
  {
    title: 'Media',
    links: [
      { name: 'Blog', path: '/blog/stories' },
      { name: 'Gallery', path: '/blog/gallery' },
    ],
  },
];

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    console.log('Subscribing with email:', email);
    setEmail('');
  };

  return (
    <footer className="bg-[white] border-t-2 border-[#024da1] text-[#024da1] py-10 px-4 mt-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
        {/* Left Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <div className="flex items-center">
            <Image src="/images/logo.jpeg" alt="YEF Logo" width={50} height={50} className="mr-2" />
            <h3 className="text-xl font-bold">Youth Evolution Foundation</h3>
          </div>
          <p className="text-sm max-w-sm">
            Empowering the youth for a better future by providing them with skills and opportunities to thrive.
          </p>
          <div className="flex space-x-2">
            <a href="https://www.facebook.com/people/Youth-Evolution-Foundation/61571368734643/" target="_blank" rel="noopener noreferrer">
              <Facebook className="text-[#024da1] hover:text-[#1565c0]" />
            </a>
            <a href="https://www.instagram.com/youthevolutionfoundation/?hl=en" target="_blank" rel="noopener noreferrer">
              <Instagram className="text-[#024da1] hover:text-[#1565c0]" />
            </a>
            <a href="https://www.linkedin.com/company/youth-evolution-foundation/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <Linkedin className="text-[#024da1] hover:text-[#1565c0]" />
            </a>
          </div>
        </div>

        {/* Center Column - Nav Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
          {footerNavItems.map((section) => (
            <div key={section.title} className="text-center md:text-left">
              <h4 className="text-lg font-bold mb-2">{section.title}</h4>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.path} className="text-sm hover:underline">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Right Column - Newsletter & Donate */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h4 className="text-lg font-bold">Stay Updated</h4>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-xs">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white border-[#024da1] focus:border-[#013a7c] focus-visible:ring-0"
            />
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full max-w-xs">
            <Button
              onClick={handleSubscribe}
              className="bg-[#024da1] hover:bg-[#013a7c] text-white font-bold"
            >
              Subscribe
            </Button>
            <Button asChild className="w-full sm:w-auto bg-[#024da1] hover:bg-[#013a7c] text-white font-bold">
              <Link href="/donate">Donate</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8 pt-4 border-t border-gray-300">
        &copy; {new Date().getFullYear()} Youth Evolution Foundation. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;