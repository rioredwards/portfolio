import "@/app/resume.css";

export function ResumeContent() {
  return (
    <article className="resume" aria-label="Resume">
      {/* Header */}
      <header className="header">
        <div>
          <h2 className="name">RIO EDWARDS</h2>
          <p className="role">SOFTWARE ENGINEER</p>
        </div>
        <address className="contact" aria-label="Contact info">
          <p>
            <a href="mailto:rioredwards@gmail.com">rioredwards@gmail.com</a>
          </p>
          <p>(971) 420-5276</p>
          <p>
            <a href="https://linkedin.com/in/rio-edwards">
              linkedin.com/in/rio-edwards
            </a>
          </p>
        </address>
      </header>

      <hr className="hr" />

      {/* Summary */}
      <p className="summary">
        {`Detail-oriented full-stack engineer building maintainable, user-centric solutions.`}
      </p>

      <hr className="hr" />

      {/* Experience */}
      <section>
        <h3 className="section-title">EXPERIENCE</h3>

        <div className="entry">
          <div className="entry-header">
            <p className="entry-title">
              <strong>Co-founder &amp; Software Engineer</strong>, Experiential
            </p>
            <p className="entry-meta">Jul 2024 - Nov 2025</p>
          </div>
          <ul className="bullets">
            <li>
              Developed a HIPAA-compliant file management system for a team of
              30+ professionals.
            </li>
            <li>
              Led the development of 3 full-stack applications from conception
              to delivery.
            </li>
            <li>
              Rapidly gained proficiency in mobile and cloud development to meet
              project demands.
            </li>
          </ul>
        </div>

        <div className="entry">
          <div className="entry-header">
            <p className="entry-title">
              <strong>Cohort Instructional Lead</strong>, Code The Dream
            </p>
            <p className="entry-meta">Jan 2024 - Jun 2025</p>
          </div>
          <ul className="bullets">
            <li>
              Taught 200+ students core web technologies including JavaScript
              and React.
            </li>
            <li>
              Produced 40+ hours of video lectures, all available on my YouTube
              channel.
            </li>
            <li>
              Reviewed 100+ assignments, giving tailored feedback to ensure
              students&apos; success.
            </li>
          </ul>
        </div>

        <div className="entry">
          <div className="entry-header">
            <p className="entry-title">
              <strong>Frontend Engineer</strong>, Code For PDX
            </p>
            <p className="entry-meta">Sep 2023 - Nov 2024</p>
          </div>
          <ul className="bullets">
            <li>
              Implemented dozens of responsive React components, optimized for
              accessibility.
            </li>
            <li>
              Applied agile methodologies, TDD, and CI/CD to enforce safe,
              scalable code.
            </li>
            <li>
              Participated in project planning and code reviews, driving team
              success.
            </li>
          </ul>
        </div>
      </section>

      <hr className="hr" />

      {/* Skills */}
      <section>
        <h3 className="section-title">SKILLS</h3>
        <dl className="skills-grid">
          <dt>Languages</dt>
          <dd>JavaScript, TypeScript, Swift, SQL, HTML, CSS</dd>
          <dt>Frameworks &amp; Libraries</dt>
          <dd>React, React Native, Next.js, Node.js, Express</dd>
          <dt>Additional Tools &amp; Platforms</dt>
          <dd>AWS, Firebase, Supabase</dd>
        </dl>
      </section>

      <hr className="hr" />

      {/* Education */}
      <section>
        <h3 className="section-title">EDUCATION</h3>

        <div className="entry">
          <div className="entry-header">
            <p className="entry-title">
              <strong>AWS Certified Cloud Practitioner,</strong> AWS
            </p>
            <p className="entry-meta">Aug 2024</p>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <p className="entry-title">
              <strong>Fullstack Certificate</strong>, Alchemy Code Lab
            </p>
            <p className="entry-meta">Feb 2023</p>
          </div>
        </div>

        <div className="entry">
          <div className="entry-header">
            <p className="entry-title">
              <strong>Associate of General Studies</strong>, Portland Community
              College
            </p>
            <p className="entry-meta">Mar 2022</p>
          </div>
        </div>
      </section>
    </article>
  );
}
