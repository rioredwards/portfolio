import "@/app/resume.css";
import {
  Resume,
  ResumeCertificate,
  ResumeEducation,
  formatResumeDate,
} from "@/lib/resume";

interface ResumeContentProps {
  data: Resume;
}

export function ResumeContent({ data }: ResumeContentProps) {
  const { basics, work, education, certificates, skills } = data;

  // Combine certificates and education for display
  const allEducation: (ResumeEducation | ResumeCertificate)[] = [
    ...(certificates ?? []),
    ...(education ?? []),
  ];

  return (
    <article className="resume" aria-label="Resume">
      {/* Header */}
      <header className="header">
        <div>
          <h2 className="name">{basics.name.toUpperCase()}</h2>
          <p className="role">{basics.label.toUpperCase()}</p>
        </div>
        <address className="contact" aria-label="Contact info">
          <p>
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
          </p>
          {basics.phone && <p>{basics.phone}</p>}
          {basics.profiles?.map((profile) => (
            <p key={profile.network}>
              <a href={profile.url}>
                {profile.url.replace(/^https?:\/\//, "")}
              </a>
            </p>
          ))}
        </address>
      </header>

      <hr className="hr" />

      {/* Summary */}
      {basics.summary && <p className="summary">{basics.summary}</p>}

      <hr className="hr" />

      {/* Experience */}
      {work && work.length > 0 && (
        <section>
          <h3 className="section-title">EXPERIENCE</h3>
          {work.map((job) => (
            <div key={`${job.name}-${job.startDate}`} className="entry">
              <div className="entry-header">
                <p className="entry-title">
                  <strong>{job.position}</strong>, {job.name}
                </p>
                <p className="entry-meta">
                  {formatResumeDate(job.startDate)}
                  {job.endDate && ` - ${formatResumeDate(job.endDate)}`}
                </p>
              </div>
              {job.highlights && job.highlights.length > 0 && (
                <ul className="bullets">
                  {job.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}

      <hr className="hr" />

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section>
          <h3 className="section-title">SKILLS</h3>
          <dl className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.name} className="skill-row">
                <dt>{skill.name}</dt>
                <dd>{skill.keywords?.join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <hr className="hr" />

      {/* Education & Certificates */}
      {allEducation.length > 0 && (
        <section>
          <h3 className="section-title">EDUCATION</h3>
          {allEducation.map((item) => {
            const isCert = "issuer" in item;
            const title = isCert ? item.name : `${item.studyType}`;
            const subtitle = isCert ? item.issuer : item.institution;
            const area = !isCert && item.area ? ` in ${item.area}` : "";
            const date = isCert ? item.date : item.endDate;

            return (
              <div key={title + subtitle} className="entry">
                <div className="entry-header">
                  <p className="entry-title">
                    <strong>
                      {title}
                      {area},
                    </strong>{" "}
                    {subtitle}
                  </p>
                  {date && (
                    <p className="entry-meta">{formatResumeDate(date)}</p>
                  )}
                </div>
              </div>
            );
          })}
        </section>
      )}
    </article>
  );
}
