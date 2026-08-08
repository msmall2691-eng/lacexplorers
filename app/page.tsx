import { NoticeBar } from "@/components/NoticeBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { DailyRhythm } from "@/components/DailyRhythm";
import { Programs } from "@/components/Programs";
import { Philosophy } from "@/components/Philosophy";
import { Adventures } from "@/components/Adventures";
import { Tuition } from "@/components/Tuition";
import { FAQ } from "@/components/FAQ";
import { Interest } from "@/components/Interest";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <div id="top" aria-hidden="true" />
      <NoticeBar />
      <Navbar />
      <main>
        <Hero />
        <About />
        <DailyRhythm />
        <Programs />
        <Philosophy />
        <Adventures />
        <Tuition />
        <FAQ />
        <Interest />
      </main>
      <Footer />
    </>
  );
}
