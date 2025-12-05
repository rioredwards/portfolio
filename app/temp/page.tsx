import { MainSection } from "../../components/main-section";
import { SectionHeader } from "../../components/section-header";

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section id="temp" className="mt-24">
        <MainSection orientation="left" height="tall" fill="secondary">
          <SectionHeader title="Temp Page" />
        </MainSection>
        <MainSection
          orientation="left"
          height="tall"
          fill="background"
          className="relative -mt-16"
        >
          <SectionHeader title="Temp Page" />
        </MainSection>
      </section>
    </main>
  );
}
