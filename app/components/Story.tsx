import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface StoryProps {
  title: string;
  text: string;
}

const Story: FC<StoryProps> = ({ title, text }) => {
  return (
    <Card className="bg-transparent md:max-w-4xl mx-auto text-gray-800 rounded-2xl shadow-none border-none">
      <CardContent className="p-8 text-center">
        <h2 className="text-4xl font-bold text-[#024da1]">{title}</h2>

        <div className="w-40 h-1 bg-[#024da1] mx-auto mt-4 rounded-full"></div>

        <p className="text-lg leading-relaxed mt-4">{text}</p>
      </CardContent>
    </Card>
  );
};

export default Story;
