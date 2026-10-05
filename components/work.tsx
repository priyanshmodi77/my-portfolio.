import type { CSSProperties } from "react";
import styles from "./sections.module.css";
import TiltCard from "./tilt-card";

type Project = {
  index: string;
  title: string;
  problem: string;
  built: string;
  tools: string;
  outcome: string;
};

// Real projects from Priyansh's resume — no invented metrics; the 7,000+
// figure below is the one stated on the resume itself.
const PROJECTS: Project[] = [
  {
    index: "01",
    title: "E-Commerce Sales & Performance Analytics",
    problem:
      "Raw Excel sales data with no structured way to track performance, trends, or customer behavior.",
    built:
      "An end-to-end analytics pipeline — Python (Pandas, NumPy) to clean and preprocess the data, SQL in MySQL for joins, aggregations and business-focused queries, and DAX-powered Power BI visualizations to surface KPIs and sales trends.",
    tools: "Python · MySQL · SQL · Power BI · Excel",
    outcome:
      "A working dashboard turning raw sales data into visible KPIs, trends, and business performance insights.",
  },
  {
    index: "02",
    title: "Customer Churn & Retention Analytics",
    problem:
      "7,000+ customer records with no clear visibility into churn patterns or which segments were at risk.",
    built:
      "Cleaned and transformed the dataset in Power Query, then built DAX measures and calculated columns to track churn rate, tenure, and monthly charges across an interactive Power BI dashboard.",
    tools: "Power BI · Power Query · DAX · Excel",
    outcome:
      "A dashboard analyzing churn by contract, tenure, and services — surfacing high-risk customers and retention-focused insights across 7,000+ records.",
  },
{
    index: "03",
    title: "Smart Online Voting System",
    problem:
      "Traditional voting workflows can involve manual voter management, candidate administration, and result handling, making the process difficult to manage efficiently.",
    built:
      "A web-based voting platform with workflows for voter registration, authentication, candidate management, vote submission, and result processing.",
    tools:
      "Next.js · React · Node.js · Mongodb · JavaScript · REST APIs",
    outcome:
      "A centralized platform that streamlined the voting workflow from user authentication and candidate management to vote submission and result processing.",
  },
];
export default function Work() {
  return (
    <section id="work" className={styles.section} aria-labelledby="work-heading">
      <div className={styles.container}>
        <h2 id="work-heading" className={styles.heading} data-reveal>
          Work
        </h2>

        <ol className={styles.projectList}>
          {PROJECTS.map((project, i) => (
            <li
              key={project.index}
              className={styles.projectItem}
              data-reveal
              style={{ "--reveal-delay": `${i * 0.08}s` } as CSSProperties}
            >
              <TiltCard className={styles.projectRow}>
                <div className={styles.projectHead}>
                  <span className={styles.projectIndex} aria-hidden="true">
                    {project.index}
                  </span>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>

                <dl className={styles.projectDetails}>
                  <div className={styles.projectDetailRow}>
                    <dt>Problem</dt>
                    <dd>{project.problem}</dd>
                  </div>
                  <div className={styles.projectDetailRow}>
                    <dt>What I Built</dt>
                    <dd>{project.built}</dd>
                  </div>
                  <div className={styles.projectDetailRow}>
                    <dt>Technologies</dt>
                    <dd>{project.tools}</dd>
                  </div>
                  <div className={styles.projectDetailRow}>
                    <dt>Outcome</dt>
                    <dd>{project.outcome}</dd>
                  </div>
                </dl>
              </TiltCard>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
