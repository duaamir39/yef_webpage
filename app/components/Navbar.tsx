'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, ChevronDown, X } from 'lucide-react';

interface NavItem {
  name: string;
  path?: string;
  dropdown?: NavItem[];
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  {
    name: 'About Us',
    dropdown: [
      { name: 'Vision & Mission', path: '/about-us/our-story' },
      { name: 'Team & Leadership', path: '/about-us/team' },
      { name: 'Partners', path: '/about-us/partners' },
      { name: 'Impact', path: '/about-us/impact' },
    ],
  },
  {
    name: 'Programs',
    dropdown: [
      { name: 'Projects', path: '/programs/projects' },
      { name: 'Events', path: '/programs/events' },
      { name: 'Courses', path: '/programs/courses' },
    ],
  },
  {
    name: 'Get Involved',
    dropdown: [
      { name: 'Volunteer', path: '/get-involved/volunteer' },
      { name: 'Membership', path: '/get-involved/membership' },
      { name: 'Careers', path: '/get-involved/careers' },
      { name: 'login', path: '/get-involved/login' },
    ],
  },
  {
    name: 'Media',
    dropdown: [
      { name: 'Blog', path: '/blog/stories' },
      { name: 'Gallery', path: '/blog/gallery' },
    ],
  },
  { name: 'Contact Us', path: '/contact-us' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[white] border-b-2 border-[#024da1]">
      <nav className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/images/logo.jpeg"
            alt="YEF Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-lg font-bold text-[#024da1]">
            Youth Evolution Foundation
          </span>
        </div>

        <div className="hidden lg:flex items-center space-x-2">
          {navItems.map((item) =>
            item.path ? (
              <div key={item.name} className="relative group">
                <Link href={item.path}>
                  <Button
                    variant="ghost"
                    className={`text-[#024da1] hover:text-[#013a7c] hover:bg-transparent`}
                  >
                    {item.name}
                  </Button>
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 bg-[#013a7c] transition-all duration-300 transform scale-x-0 group-hover:scale-x-100"></div>
              </div>
            ) : (
              <DropdownMenu key={item.name}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-[#024da1] hover:text-[#013a7c] hover:bg-transparent">
                    {item.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.dropdown?.map((subItem) => (
                    <DropdownMenuItem key={subItem.name} asChild>
                      <Link href={subItem.path || '#'}>{subItem.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )
          )}
          <Button asChild className="bg-[#024da1] hover:bg-[#013a7c]">
            <Link href="/donate">Donate</Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] sm:w-[300px] p-4">
            <div className="flex flex-col items-center space-y-4">
              {navItems.map((item) => (
                <div key={item.name} className="w-full">
                  {item.path ? (
                    <Button
                      variant="ghost"
                      className="w-full text-center text-[#024da1] hover:text-[#013a7c]"
                      asChild
                      onClick={handleLinkClick}
                    >
                      <Link href={item.path}>{item.name}</Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-between text-[#024da1] hover:text-[#013a7c]"
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.name ? null : item.name
                          )
                        }
                      >
                        {item.name}
                        <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300" />
                      </Button>
                      {mobileDropdown === item.name && (
                        <div className="flex flex-col pl-4 mt-2 space-y-2">
                          {item.dropdown?.map((subItem) => (
                            <Button
                              key={subItem.name}
                              variant="ghost"
                              className="w-full justify-start text-[#024da1] hover:text-[#013a7c]"
                              asChild
                              onClick={handleLinkClick}
                            >
                              <Link href={subItem.path || '#'}>
                                {subItem.name}
                              </Link>
                            </Button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <Button asChild className="w-full bg-[#024da1] hover:bg-[#013a7c]">
                <Link href="/donate" onClick={handleLinkClick}>Donate</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;