import { Card, CardContent } from "@/components/ui/card";
import { FC } from "react";

interface VisionProps {
  title: string;
  text: string;
}

const Vission: FC<VisionProps> = ({ title, text }) => {
  return (
    <Card className="bg-transparent md:max-w-4xl mx-auto text-white rounded-2xl border-none shadow-none">
      <CardContent className="pb-8 text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg leading-relaxed">
          {text}
        </p>
      </CardContent>
    </Card>
  );
};

export default Vission;
