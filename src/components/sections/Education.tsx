import { education } from "@/content/profile";

export default function Education() {
  return (
    <section id="education" className="education" aria-labelledby="education-heading">
      <div className="container-page edu-layout">
        <h2 id="education-heading" className="h-section">
          {education.heading}
        </h2>
        <ul className="edu-list">
          {education.degrees.map((d) => (
            <li key={d.title} className="edu-item">
              <p className="edu-years tabular">{d.years}</p>
              <div>
                <h3 className="edu-title">{d.title}</h3>
                <p className="edu-school">{d.school}</p>
                {d.inProgress && (
                  <p className="edu-progress">
                    <span className="lamp" aria-hidden="true" />
                    In progress
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="edu-certs">
          <h3 className="edu-sub">Certifications</h3>
          <ul className="edu-cert-list">
            {education.certifications.map((c) => (
              <li key={c.title}>
                <span className="edu-cert-year tabular">{c.year}</span>
                <span>
                  {c.title}
                  <span className="edu-cert-issuer">{c.issuer}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
