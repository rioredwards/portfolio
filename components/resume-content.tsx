import "@/app/resume.css";
import { parseInlineMarkdown } from "@/lib/parse-inline-markdown";
import { formatResumeDate, Resume, ResumeProject } from "@/lib/resume";

interface ResumeContentProps {
  data: Resume;
}

function ProjectItem({ title, description, tech, url }: ResumeProject) {
  return (
    <>
      {url ? (
        <a href={url}>
          <strong>{parseInlineMarkdown(title)}</strong>
        </a>
      ) : (
        <strong>{parseInlineMarkdown(title)}</strong>
      )}
      ,<em className="entry-skills">{tech.join(", ")}</em>
      {description && (
        <span className="entry-tech">{parseInlineMarkdown(description)}</span>
      )}
    </>
  );
}

export function ResumeContent({ data }: ResumeContentProps) {
  const { basics, summary, experience, education, skills, projects } = data;

  return (
    <article className="resume" aria-label="Resume">
      {/* Header */}
      <header className="header">
        <div>
          <h2 className="name">{basics.name.toUpperCase()}</h2>
          <p className="role">{basics.title.toUpperCase()}</p>
        </div>
        <address className="contact" aria-label="Contact info">
          <p>
            <a href={`mailto:${basics.email}`}>{basics.email}</a>
          </p>
          <p>{basics.phone}</p>
          <p>
            <a href={basics.linkedIn}>
              {basics.linkedIn.replace(/^https?:\/\//, "")}
            </a>
          </p>
        </address>
      </header>

      <hr className="hr" />

      {/* Summary */}
      <p className="summary">{parseInlineMarkdown(summary)}</p>

      <hr className="hr" />

      {/* Experience */}
      <section className="experience">
        <h3 className="section-title">EXPERIENCE</h3>
        {experience.map((job) => (
          <div key={`${job.name}-${job.startDate}`} className="entry">
            <div className="entry-header">
              <div className="entry-title-block">
                <span className="entry-position">
                  <strong>{job.title}</strong>
                </span>
                <span className="entry-company">{job.name}</span>
              </div>
              <p className="entry-meta">
                {formatResumeDate(job.startDate)}
                {job.endDate && ` - ${formatResumeDate(job.endDate)}`}
              </p>
            </div>

            <ul className="bullets">
              {"highlights" in job &&
                job.highlights.map((highlight, i) => (
                  <li key={i}>{parseInlineMarkdown(highlight)}</li>
                ))}
              {"projects" in job &&
                job.projects.map((project, i) => (
                  <li key={i}>
                    <ProjectItem {...project} />
                  </li>
                ))}
            </ul>
          </div>
        ))}
        {/* Projects */}
        <div className="entry">
          <div className="entry-header">
            <div className="entry-title-block">
              <span className="entry-position">
                <strong>Personal Projects</strong>
              </span>
            </div>
          </div>

          <ul className="bullets">
            {projects.map((project, i) => (
              <li key={i}>
                <ProjectItem {...project} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Skills */}
      <>
        <hr className="hr" />
        <section className="skills">
          <h3 className="section-title">SKILLS</h3>
          {/* Just the Core Skills, no categories - Saves space */}
          {Array.isArray(skills) && (
            <div className="skill-row">
              <dt>Core Skills</dt>
              <dd>{skills.join(", ")}</dd>
            </div>
          )}
          {/* Categories - More detailed */}
          {typeof skills === "object" && (
            <dl className="skills-grid">
              {Object.entries(skills).map(([category, skills]) => (
                <div key={category} className="skill-row">
                  <dt>{category}</dt>
                  <dd>{skills.join(", ")}</dd>
                </div>
              ))}
            </dl>
          )}
        </section>
      </>

      <hr className="hr" />

      {/* Education & Certificates */}
      <section className="education">
        <h3 className="section-title">EDUCATION</h3>
        {education.map((item) => {
          return (
            <div key={item.institution} className="entry">
              <div className="entry-header">
                <p className="entry-title">
                  <strong>{item.institution}</strong>
                </p>
                <p className="entry-meta">{formatResumeDate(item.date)}</p>
              </div>
            </div>
          );
        })}
      </section>
    </article>
  );
}
