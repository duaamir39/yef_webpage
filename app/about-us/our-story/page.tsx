import Mission from "@/app/components/Mission";
import Story from "@/app/components/Story";
import Vission from "@/app/components/Vission";
import { client } from "@/sanity/lib/client";

export default async function ImpactPage() {
  const query = `*[_type == "ourStory"]{
    missionTitle,
    missionText,
    visionTitle,
    visionText,
    storyTitle,
    storyText
  }[0]`;

  const data = await client.fetch(query);

  return (
    <section className="mx-auto py-12 px-4">
      <div className="bg-[#024da1] rounded-lg">
        <Mission title={data.missionTitle} text={data.missionText} />
        <Vission title={data.visionTitle} text={data.visionText} />
      </div>
      <Story title={data.storyTitle} text={data.storyText} />
    </section>
  );
}
