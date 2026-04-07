import Hero from "@/components/Hero";
import Lab from "@/components/Lab";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Connect from "@/components/Connect";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <Lab />
      <Experience />
      <Education />
      <Connect />
    </main>
  );
}
