import HeroSection from "./components/HeroSection";
import TeamMembersSection from "./components/TeamMembersSection";
import BlogSection from "./components/BlogSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TeamMembersSection />
      <BlogSection />
    </div>
  );
}