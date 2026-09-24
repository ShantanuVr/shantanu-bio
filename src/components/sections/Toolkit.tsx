import { toolkit } from "@/content/profile";

export default function Toolkit() {
  return (
    <section id="toolkit" className="toolkit" aria-labelledby="toolkit-heading">
      <div className="container-page">
        <h2 id="toolkit-heading" className="h-section">
          {toolkit.heading}
        </h2>
        <div className="toolkit-rows">
          {toolkit.groups.map((group) => (
            <div key={group.name} className="toolkit-row">
              <h3 className="toolkit-name">{group.name}</h3>
              <ul className="toolkit-list">
                {group.tools.map((tool) => (
                  <li key={tool}>{tool}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
