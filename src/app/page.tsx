import Link from "next/link";
import { draftMode } from "next/headers";
import { getHeroContent } from "@/lib/api";

export default async function Page() {
  const { isEnabled: draftModeIsEnabled } = draftMode();
  const heroContent = await getHeroContent(draftModeIsEnabled);
  const {
    title,
    secondaryText,
    avatar: { url },
  } = heroContent;
  console.log(heroContent);

  return (
    <div className="container mx-auto px-5">
      <h1>{title}</h1>
      <h2>{secondaryText}</h2>
      <img src={url} />
    </div>
  );
}
