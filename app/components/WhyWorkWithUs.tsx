import { Users, BookOpen, Handshake } from "lucide-react";

export default function WhyWorkWithUs() {
  const cards = [
    {
      icon: Users,
      title: "Community Impact",
      description:
        "Make a difference by working on impactful projects that benefit society.",
    },
    {
      icon: BookOpen,
      title: "Learning Opportunities",
      description:
        "Workshops, training, and mentorship for interns & volunteers.",
    },
    {
      icon: Handshake,
      title: "Collaborative Culture",
      description:
        "We value teamwork and innovation to create lasting impact.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-10 text-[#024da1]">Why Work With Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="p-6 bg-white shadow-md rounded-2xl hover:shadow-lg transition"
              >
                <div className="flex justify-center mb-4">
                  <Icon className="w-10 h-10 text-[#024da1]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
