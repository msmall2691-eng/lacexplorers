import { NoticeBar } from "@/components/NoticeBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Programs } from "@/components/Programs";
import { Activities } from "@/components/Activities";
import { Gallery } from "@/components/Gallery";
import { PartTime } from "@/components/PartTime";
import { AdventureClub } from "@/components/AdventureClub";
import { DailyRhythm } from "@/components/DailyRhythm";
import { Tuition } from "@/components/Tuition";
import { ParentInfo } from "@/components/ParentInfo";
import { FAQ } from "@/components/FAQ";
import { Interest } from "@/components/Interest";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <NoticeBar />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Programs />
        <Activities />
        <Gallery />
        <PartTime />
        <AdventureClub />
        <DailyRhythm />
        <Tuition />
        <ParentInfo />
        <FAQ />
        <Interest />
      </main>
      <Footer />
    </>
  );
}
