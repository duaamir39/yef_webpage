"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { GraduationCap, School, Users, Flag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// ✅ Achievement type
type Achievement = {
  title: string;
  cover: string;
  description: string;
  images: string[];
};

export default function ImpactPage() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [selected, setSelected] = useState<Achievement | null>(null);

  // ✅ Achievements Data
  const achievements: Achievement[] = [
    {
      title: "Seminar: Reclaiming Nature",
      cover: "/achievements/seminar1.jpg",
      description:
        "YEF proudly organized a seminar at Federal Urdu University on “Reclaiming Nature & Biodiversity Awareness,” engaging youth on environmental preservation with inspiring talks from our leaders.",
      images: [
        "/achievements/seminar1.jpg",
        "/achievements/seminar2.jpg",
        "/achievements/seminar3.jpg",
      ],
    },
    {
      title: "Plantation Drive",
      cover: "/achievements/plantation1.jpg",
      description:
        "After the seminar, YEF collaborated with Federal Urdu University students for a meaningful Plantation Drive—every plant a promise for a greener tomorrow.",
      images: [
        "/achievements/plantation1.jpg",
        "/achievements/plantation2.jpg",
      ],
    },
    {
      title: "Hearts & Mind Talks 2025",
      cover: "/achievements/speaker1.jpg",
      description:
        "Our Co-Founder & COO, Usama Akhtar, was invited as Guest Speaker at Hearts & Mind Talks 2025, where he shared his inspiring journey and vision of leadership through empathy.",
      images: ["/achievements/speaker1.jpg", "/achievements/speaker2.jpg"],
    },
    {
      title: "Teachers Training Workshop",
      cover: "/achievements/teachers1.jpg",
      description:
        "YEF successfully conducted Day 1 of its 3-Day Teachers Training Workshop at Gulshan Public School, empowering teachers with MS Office skills and preparing them for AI & Graphic Design sessions ahead.",
      images: ["/achievements/teachers1.jpg", "/achievements/teachers2.jpg"],
    },
    {
      title: "Marka-e-Haq Closing Ceremony",
      cover: "/achievements/marka1.jpg",
      description:
        "YEF proudly participated in the Marka-e-Haq closing ceremony at Arts Council Karachi, onboarding passionate volunteers while also celebrating culture with a soulful Qawali performance.",
      images: ["/achievements/marka1.jpg", "/achievements/marka2.jpg"],
    },
    {
      title: "Jashn-e-Umeed",
      cover: "/achievements/jashn1.jpg",
      description:
        "YEF, in collaboration with Youth Parliament and TMC Chanesar, organized “Jashn-e-Umeed” on 10th August 2025 with orphanage children—celebrating Independence Day with joy, gifts, and unity.",
      images: ["/achievements/jashn1.jpg", "/achievements/jashn2.jpg"],
    },
    {
      title: "Independence Day at SSUET",
      cover: "/achievements/ssuet1.jpg",
      description:
        "YEF celebrated Pakistan’s 78th Independence Day with a cake cutting and plantation drive at SSUET, joined by CEO Adil Zaman, CMO Abrar ul Haq, and passionate youth volunteers.",
      images: ["/achievements/ssuet1.jpg", "/achievements/ssuet2.jpg"],
    },
    {
      title: "Dar-ul-Sukun Visit",
      cover: "/achievements/darulsukun1.jpg",
      description:
        "YEF visited Dar-ul-Sukun, spending a heartwarming day with special children—sharing gifts, games, and joy while learning values of gratitude, resilience, and humanity.",
      images: [
        "/achievements/darulsukun1.jpg",
        "/achievements/darulsukun2.jpg",
      ],
    },
    {
      title: "Beach Cleaning Drive",
      cover: "/achievements/beach1.jpg",
      description:
        "YEF successfully conducted a Beach Cleaning Drive at Sea View Karachi under its Cleanliness initiative, aligning with UN SDGs for clean water, sustainability, and climate action.",
      images: ["/achievements/beach1.jpg", "/achievements/beach2.jpg"],
    },
  ];

  return (
    <div className="flex flex-col space-y-20">
      {/* Hero Section */}
      <section
        className="relative h-[450px] flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
            Empowering Youth, Shaping Futures
          </h1>
          <p className="text-lg leading-relaxed opacity-90">
            Since our founding in 2024, Youth Evolution Foundation has been
            driving education, sustainability, and unity across Pakistan—
            equipping young people with the tools to create lasting global
            change.
          </p>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section ref={ref} className="px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Card className="text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="pt-8">
              <GraduationCap className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
              <p className="text-3xl font-extrabold text-gray-900">
                {inView && <CountUp start={0} end={1500} duration={0.5} />}+
              </p>
              <p className="text-gray-600">
                Students Empowered with digital and life skills
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="pt-8">
              <School className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
              <p className="text-3xl font-extrabold text-gray-900">
                {inView && <CountUp start={0} end={5} duration={0.5} />}
              </p>
              <p className="text-gray-600">
                Schools Supported with resources, workshops, and training
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="pt-8">
              <Users className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
              <p className="text-3xl font-extrabold text-gray-900">
                {inView && <CountUp start={0} end={50} duration={0.5} />}+
              </p>
              <p className="text-gray-600">
                Volunteers driving community-led change
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="pt-8">
              <Flag className="mx-auto h-12 w-12 text-indigo-600 mb-4" />
              <p className="text-2xl font-extrabold text-gray-900">
                {inView && <CountUp start={0} end={100} duration={0.5} />}%
              </p>
              <p className="text-gray-600">
                Projects Across Pakistan bringing education and sustainability
                initiatives to diverse communities
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Our Achievements</h2>
          <p className="text-gray-600 mt-4">
            Celebrating milestones that highlight our journey of empowering
            youth and building communities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition"
              onClick={() => setSelected(a)}
            >
              <img
                src={a.cover}
                alt={a.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {a.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden relative">
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>

              {/* Swiper with Images */}
              <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                navigation
                modules={[Pagination, Navigation]}
                className="w-full h-80"
              >
                {selected.images.map((img, i) => (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      alt={selected.title}
                      className="w-full h-80 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Description */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{selected.title}</h3>
                <p className="text-gray-700">{selected.description}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Rest of your sections (Stories, What We Do, Transparency, CTA) */}
      {/* ... paste them here exactly as you already had ... */}
    </div>
  );
}


      {/* What We Do */}
      <section className="px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          What We Do
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <Card className="p-8 text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent>
              <p className="text-4xl mb-4">📚</p>
              <h3 className="font-semibold text-xl mb-2">Education</h3>
              <p className="text-gray-600 text-sm">
                Supporting schools with resources and training.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8 text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent>
              <p className="text-4xl mb-4">💻</p>
              <h3 className="font-semibold text-xl mb-2">Digital Skills</h3>
              <p className="text-gray-600 text-sm">
                Courses in technology, coding, and modern skills.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8 text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent>
              <p className="text-4xl mb-4">🌱</p>
              <h3 className="font-semibold text-xl mb-2">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Promoting eco-friendly practices in schools & communities.
              </p>
            </CardContent>
          </Card>
          <Card className="p-8 text-center shadow-md hover:shadow-lg transition rounded-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent>
              <p className="text-4xl mb-4">🤝</p>
              <h3 className="font-semibold text-xl mb-2">Unity</h3>
              <p className="text-gray-600 text-sm">
                Creating safe spaces where youth collaborate & lead.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Transparency */}
      <section
        className="bg-gray-50 py-16 px-6"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-white/90 rounded-3xl shadow-xl p-12 max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-4xl font-bold text-gray-800">
            Transparency & Accountability
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We believe in trust and clarity. Every donation directly contributes
            to programs that uplift youth and strengthen communities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="p-8 shadow-sm rounded-2xl bg-white">
              <CardContent>
                <p className="text-3xl font-extrabold text-indigo-600">85%</p>
                <p className="text-gray-600">Programs</p>
              </CardContent>
            </Card>
            <Card className="p-8 shadow-sm rounded-2xl bg-white">
              <CardContent>
                <p className="text-3xl font-extrabold text-indigo-600">10%</p>
                <p className="text-gray-600">Training & Operations</p>
              </CardContent>
            </Card>
            <Card className="p-8 shadow-sm rounded-2xl bg-white">
              <CardContent>
                <p className="text-3xl font-extrabold text-indigo-600">5%</p>
                <p className="text-gray-600">Outreach</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
<section className="text-center py-20 px-6 bg-gradient-to-r from-indigo-800 to-indigo-900 text-white">
  <h2 className="text-4xl font-extrabold mb-8 tracking-tight">
    Join Us in Building a Brighter Future
  </h2>
  <div className="flex justify-center gap-6 flex-wrap">
    <Button className="bg-white text-indigo-800 hover:bg-gray-100 rounded-xl px-6 py-3 text-lg font-semibold shadow-lg transition">
      Donate Now
    </Button>
    <Button className="bg-indigo-600 hover:bg-indigo-500 rounded-xl px-6 py-3 text-lg font-semibold shadow-lg transition">
      Volunteer With Us
    </Button>
    <Button className="bg-white text-indigo-800 hover:bg-gray-100 rounded-xl px-6 py-3 text-lg font-semibold shadow-lg transition">
      Partner With YEF
    </Button>
  </div>
</section>
