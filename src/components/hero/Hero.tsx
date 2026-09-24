import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { person } from "@/content/profile";
import { FlapLink } from "@/components/flap/FlapButton";
import HeroBoard from "./HeroBoard";
import RepairAgent from "./RepairAgent";

export default function Hero() {
  return (
    <section id="hero" className="hero" aria-labelledby="hero-name">
      <div className="container-page">
        <h1 id="hero-name" className="sr-only">
          {person.name}
        </h1>
        <HeroBoard />
        <div className="hero-foot">
          <div className="hero-introduction">
            <p className="hero-statement">{person.statement}</p>
            <div className="hero-actions">
              <FlapLink variant="primary" href={`mailto:${person.email}`} label={`Email me at ${person.email}`}>
                <Mail aria-hidden="true" size={18} strokeWidth={2} />
                Email me
              </FlapLink>
              <FlapLink href={person.resume} label="Resume, PDF, opens in a new tab" external>
                <FileText aria-hidden="true" size={18} strokeWidth={2} />
                Resume
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2} />
              </FlapLink>
            </div>
          </div>
          <RepairAgent />
        </div>
      </div>
    </section>
  );
}
