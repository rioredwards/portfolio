import { HomeClient } from "@/components/home-client";
import { getAllProjectContent } from "@/lib/get-project-markdown";

export default async function Home() {
  const projectContentMap = await getAllProjectContent();

  return <HomeClient projectContentMap={projectContentMap} />;
}
