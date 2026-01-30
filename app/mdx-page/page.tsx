import Welcome from "@/markdown/welcome.mdx";
import { SectionContentWrapper } from "../../components/section-content-wrapper";
import { SlidePanel } from "../../components/slide-panel";

export default function Page() {
  return (
    <div className="">
      <SlidePanel
        orientation="left"
        decorationHeight="tall"
        fill="background"
        previousDecorationHeight="tall"
      >
        <SectionContentWrapper className="">
          <article className="prose">
            <Welcome />
          </article>
        </SectionContentWrapper>
      </SlidePanel>
    </div>
  );
}
