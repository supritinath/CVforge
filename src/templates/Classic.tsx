import React from "react";
import SectionIcon from "../components/SectionIcon";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
type Education = {
  degree?: string;
  college?: string;
  location?: string;
  startYear?: string;
  endYear?: string;
  score?: string;
};

type Skill = {
  name?: string;
  level?: string;
};

type Project = {
  name?: string;
  description?: string;
  technologies?: string;
  projectLink?: string;
  githubLink?: string;
};

type Experience = {
  title?: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
};

type Certification = {
  name?: string;
  organization?: string;
  issueDate?: string;
  credentialId?: string;
  credentialLink?: string;
};

type Achievement = {
  title?: string;
  description?: string;
};

type Language = {
  name?: string;
  level?: string;
};

type CVData = {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;

  github?: string;
  linkedin?: string;
  leetcode?: string;
  portfolio?: string;

  summary?: string;
  professionalTitle?: string;
  profilePhoto?: string;

  education?: Education[];
  skills?: Skill[];
  projects?: Project[];
  experiences?: Experience[];
  certifications?: Certification[];
  achievements?: Achievement[];
  languages?: Language[];

  interests?: string[];
  hobbies?: string[];
};

type Props = {
  cvData: CVData;
};

function Classic({ cvData }: Props) {
  const education = Array.isArray(cvData.education)
    ? cvData.education
    : [];

  const skills = Array.isArray(cvData.skills)
    ? cvData.skills
    : [];

  const projects = Array.isArray(cvData.projects)
    ? cvData.projects
    : [];

  const experiences = Array.isArray(cvData.experiences)
    ? cvData.experiences
    : [];

  const certifications = Array.isArray(cvData.certifications)
    ? cvData.certifications
    : [];

  const achievements = Array.isArray(cvData.achievements)
    ? cvData.achievements
    : [];

  const languages = Array.isArray(cvData.languages)
    ? cvData.languages
    : [];

  const interests = Array.isArray(cvData.interests)
    ? cvData.interests.filter(Boolean)
    : [];

  const hobbies = Array.isArray(cvData.hobbies)
    ? cvData.hobbies.filter(Boolean)
    : [];

    const handleDownloadCV = () => {
  window.print();
};

  return (
    <div className="bg-white text-slate-900 w-[794px] min-h-[1123px] mx-auto p-12 shadow-xl">

      {/* ================= HEADER ================= */}

      <div className="flex items-start justify-between border-b-2 border-slate-900 pb-5">

        <div className="min-w-0">

          <h1 className="text-3xl font-bold break-words">
            {cvData.name || "Your Name"}
          </h1>

          {cvData.professionalTitle && (
  <p>{cvData.professionalTitle}</p>
)}

          <div className="text-sm text-slate-600 mt-2 space-y-1">

           {cvData.email && (
  <a
    href={`mailto:${cvData.email}`}
    className="flex items-center gap-1.5 hover:underline"
  >
    <SectionIcon type="email" size={14} />
    <span>{cvData.email}</span>
  </a>
)}

           {cvData.phone && (
  <div className="flex items-center gap-1.5">
    <SectionIcon type="phone" size={14} />
    <span>{cvData.phone}</span>
  </div>
)}

          {cvData.location && (
  <div className="flex items-center gap-1.5">
    <SectionIcon type="location" size={14} />
    <span>{cvData.location}</span>
  </div>
)}

          </div>

          {/* SOCIAL / PROFESSIONAL PROFILES */}

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 mt-3">

           {cvData.github && (
  <a
    href={cvData.github}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-1.5 hover:underline"
  >
    <FaGithub size={14} />
    <span>GitHub</span>
  </a>
)}

{cvData.linkedin && (
  <a
    href={cvData.linkedin}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-1.5 hover:underline"
  >
    <FaLinkedin size={14} />
    <span>LinkedIn</span>
  </a>
)}

{cvData.leetcode && (
  <a
    href={cvData.leetcode}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-1.5 hover:underline"
  >
    <SiLeetcode size={14} />
    <span>LeetCode</span>
  </a>
)}

{cvData.portfolio && (
  <a
    href={cvData.portfolio}
    target="_blank"
    rel="noreferrer"
    className="flex items-center gap-1.5 hover:underline"
  >
    <SectionIcon type="portfolio" size={14} />
    <span>Portfolio</span>
  </a>
)}

          </div>

        </div>

        {/* PROFILE PHOTO */}

        {cvData.profilePhoto && (
          <img
            src={cvData.profilePhoto}
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover border border-slate-300 ml-6 shrink-0"
          />
        )}

      </div>

      {/* ================= SUMMARY ================= */}

      {cvData.summary?.trim() && (
        <section className="mt-6">

          <div className="flex items-center gap-2">
  <SectionIcon type="about" />
  <h2>About Me</h2>
</div>

          <p className="text-sm text-slate-700 mt-3 leading-6">
            {cvData.summary}
          </p>

        </section>
      )}

      {/* ================= EDUCATION ================= */}

      {education.some(
        (edu) =>
          edu.degree?.trim() ||
          edu.college?.trim()
      ) && (
        <section className="mt-6">

          <div className="flex items-center gap-2">
  <SectionIcon type="education" />
  <h2>Education</h2>
</div>

          <div className="mt-3 space-y-4">

            {education.map((edu, index) => {

              if (
                !edu.degree?.trim() &&
                !edu.college?.trim()
              ) {
                return null;
              }

              const degree = edu.degree?.trim() || "Education";

              const isSchool =
                degree.toLowerCase().includes("school") ||
                degree.toLowerCase().includes("secondary") ||
                degree.toLowerCase().includes("higher secondary") ||
                degree.toLowerCase().includes("class") ||
                degree.toLowerCase().includes("10th") ||
                degree.toLowerCase().includes("12th");

              return (
                <div key={index}>

                  <div className="flex justify-between gap-4">

                    <h3 className="font-semibold text-sm">
                      {edu.degree}
                    </h3>

                    {(edu.startYear || edu.endYear) && (
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {edu.startYear || ""}
                        {edu.startYear || edu.endYear ? " - " : ""}
                        {edu.endYear || ""}
                      </span>
                    )}

                  </div>

                  {edu.college && (
                    <p className="text-xs text-slate-600">
                      {edu.college}

                      {edu.location &&
                        `  ${edu.location}`}
                    </p>
                  )}

               {edu.score && (
  <p className="text-xs text-slate-600 mt-1">
    {edu.score}
  </p>
)}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= SKILLS ================= */}

      {skills.some(
        (skill) => skill.name?.trim()
      ) && (
        <section className="mt-6">

          <div className="flex items-center gap-2">
  <SectionIcon type="skills" />
  <h2>Skills</h2>
</div>

          <div className="flex flex-wrap gap-2 mt-3">

            {skills.map((skill, index) => {

              if (!skill.name?.trim()) {
                return null;
              }

              return (
                <span
                  key={index}
                  className="text-xs border border-slate-300 px-3 py-1 rounded"
                >
                  {skill.name}
                </span>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= PROJECTS ================= */}

      {projects.some(
        (project) => project.name?.trim()
      ) && (
        <section className="mt-6">

         <div className="flex items-center gap-2">
  <SectionIcon type="projects" />
  <h2>Projects</h2>
</div>

          <div className="mt-3 space-y-4">

            {projects.map((project, index) => {

              if (!project.name?.trim()) {
                return null;
              }

              return (
                <div key={index}>

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="font-semibold text-sm">
                      {project.name}
                    </h3>

                 <div className="flex items-center gap-3 mt-1 text-[10px]">
  {project.projectLink && (
    <a
      href={project.projectLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-slate-500 hover:text-blue-600 hover:underline"
    >
      <SectionIcon type="portfolio" size={11} />
      <span>Live</span>
    </a>
  )}

  {project.githubLink && (
    <a
      href={project.githubLink}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-900 hover:underline"
    >
      <FaGithub size={11} />
      <span>GitHub</span>
    </a>
  )}
</div>
                  </div>

                  {project.description?.trim() && (
                    <p className="text-xs text-slate-700 mt-1 leading-5">
                      {project.description}
                    </p>
                  )}

                  {project.technologies?.trim() && (
                    <p className="text-xs text-slate-500 mt-1">
                      Technologies: {project.technologies}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= EXPERIENCE ================= */}

      {experiences.some(
        (experience) =>
          experience.title?.trim() ||
          experience.company?.trim()
      ) && (
        <section className="mt-6">

         <div className="flex items-center gap-2">
  <SectionIcon type="experience" />
  <h2>Experience</h2>
</div>

          <div className="mt-3 space-y-4">

            {experiences.map((experience, index) => {

              if (
                !experience.title?.trim() &&
                !experience.company?.trim()
              ) {
                return null;
              }

              return (
                <div key={index}>

                  <div className="flex justify-between gap-4">

                    <h3 className="font-semibold text-sm">
                      {experience.title}
                    </h3>

                    {(experience.startDate ||
                      experience.endDate ||
                      experience.current) && (
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {experience.startDate || ""}
                        {" - "}
                        {experience.current
                          ? "Present"
                          : experience.endDate || ""}
                      </span>
                    )}

                  </div>

                  {experience.company && (
                    <p className="text-xs text-slate-600">
                      {experience.company}

                      {experience.location &&
                        ` • ${experience.location}`}
                    </p>
                  )}

                  {experience.description?.trim() && (
                    <p className="text-xs text-slate-700 mt-1 leading-5">
                      {experience.description}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= CERTIFICATIONS ================= */}

      {certifications.some(
        (cert) => cert.name?.trim()
      ) && (
        <section className="mt-6">

          <div className="flex items-center gap-2">
  <SectionIcon type="certifications" />
  <h2>Certifications</h2>
</div>

          <div className="mt-3 space-y-2">

            {certifications.map((cert, index) => {

              if (!cert.name?.trim()) {
                return null;
              }

              return (
                <div key={index}>

                  <div className="flex flex-wrap items-center gap-2">

                    <p className="font-semibold text-sm">
                      {cert.name}
                    </p>

                    {cert.credentialLink && (
                      <a
                        href={cert.credentialLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] text-blue-600 underline"
                      >
                        Credential
                      </a>
                    )}

                  </div>

                  <p className="text-xs text-slate-600">

                    {cert.organization}

                    {cert.issueDate &&
                      ` • ${cert.issueDate}`}

                  </p>

                  {cert.credentialId && (
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Credential ID: {cert.credentialId}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= ACHIEVEMENTS ================= */}

      {achievements.some(
        (achievement) =>
          achievement.title?.trim()
      ) && (
        <section className="mt-6">

         <div className="flex items-center gap-2">
  <SectionIcon type="achievements" />
  <h2>Achievements</h2>
</div>

          <div className="mt-3 space-y-2">

            {achievements.map((achievement, index) => {

              if (!achievement.title?.trim()) {
                return null;
              }

              return (
                <div key={index}>

                  <p className="font-semibold text-sm">
                    {achievement.title}
                  </p>

                  {achievement.description?.trim() && (
                    <p className="text-xs text-slate-700 mt-1">
                      {achievement.description}
                    </p>
                  )}

                </div>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= LANGUAGES ================= */}

      {languages.some(
        (language) => language.name?.trim()
      ) && (
        <section className="mt-6">

          <div className="flex items-center gap-2">
  <SectionIcon type="languages" />
  <h2>Languages</h2>
</div>

          <div className="flex flex-wrap gap-3 mt-3">

            {languages.map((language, index) => {

              if (!language.name?.trim()) {
                return null;
              }

              return (
                <span
                  key={index}
                  className="text-xs"
                >
                  {language.name}
                  {language.level
                    ? ` (${language.level})`
                    : ""}
                </span>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= INTERESTS & HOBBIES ================= */}

      {(interests.length > 0 ||
        hobbies.length > 0) && (
        <section className="mt-6 grid grid-cols-2 gap-8">

          {/* INTERESTS */}

          {interests.length > 0 && (
            <div>

             <div className="flex items-center gap-2">
  <SectionIcon type="interests" />
  <h2>Interests</h2>
</div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">

                {interests.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs text-slate-700"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>
          )}

          {/* HOBBIES */}

          {hobbies.length > 0 && (
            <div>

              <div className="flex items-center gap-2">
  <SectionIcon type="hobbies" />
  <h2>Hobbies</h2>
</div>

              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-3">

                {hobbies.map((item, index) => (
                  <span
                    key={index}
                    className="text-xs text-slate-700"
                  >
                    {item}
                  </span>
                ))}

              </div>

            </div>
          )}

        </section>
      )}

    </div>
  );
}

export default Classic;