import {
  SectionContentWrapper,
  SlidePanel,
} from "@/components/layout";
import Welcome from "@/markdown/welcome.mdx";

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
