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

function Developer({ cvData }: Props) {
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

  return (
    <div className="bg-slate-950 text-slate-100 w-[794px] min-h-[1123px] mx-auto p-10 shadow-xl font-mono">

      {/* ================= HEADER ================= */}

      <div className="border border-slate-800 rounded-xl p-6">

        <div className="flex items-start justify-between gap-6">

          <div className="min-w-0">

            <p className="text-green-400 text-sm">
              &lt;developer&gt;
            </p>

            <h1 className="text-3xl font-bold mt-3 text-white break-words">
              {cvData.name || "Your Name"}
            </h1>

            {cvData.professionalTitle && (
  <p>{cvData.professionalTitle}</p>
)}

 

            {(cvData.email ||
              cvData.phone ||
              cvData.location) && (
              <p className="text-slate-500 text-xs mt-4">
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
              </p>
            )}

            {/* PROFESSIONAL PROFILES */}

            <div className="flex flex-wrap gap-4 text-xs mt-3">

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
              className="w-30 h-30 rounded-full object-cover border border-slate-700 shrink-0 mt-3"
            />
          )}

        </div>

      </div>

      {/* ================= ABOUT ================= */}

      {cvData.summary?.trim() && (
        <section className="mt-6">

          <p className="text-green-400 text-sm">
            // about_me
          </p>

          <p className="text-sm text-slate-300 leading-6 mt-2">
            {cvData.summary}
          </p>

        </section>
      )}

      {/* ================= SKILLS ================= */}

      {skills.some(
        (skill) => skill.name?.trim()
      ) && (
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            const skills = [
          </p>

          <div className="ml-5 mt-2 space-y-1">

            {skills.map((skill, index) => {

              if (!skill.name?.trim()) {
                return null;
              }

              return (
                <p
                  key={index}
                  className="text-sm"
                >
                  <span className="text-cyan-400">
                    "{skill.name}"
                  </span>

                  {skill.level && (
                    <span className="text-slate-500">
                      {" "}
                      // {skill.level}
                    </span>
                  )}
                </p>
              );
            })}

          </div>

          <p className="text-green-400 text-sm">
            ];
          </p>

        </section>
      )}

      {/* ================= PROJECTS ================= */}

      {projects.some(
        (project) => project.name?.trim()
      ) && (
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            const projects = [
          </p>

          <div className="ml-5 mt-3 space-y-5">

            {projects.map((project, index) => {

              if (!project.name?.trim()) {
                return null;
              }

              return (
                <div key={index}>

                  <p className="text-yellow-400 text-sm">
                    {"{"}
                  </p>

                  <div className="ml-4">

                    <p className="text-sm">
                      <span className="text-purple-400">
                        name:
                      </span>{" "}

                      <span className="text-cyan-400">
                        "{project.name}"
                      </span>
                    </p>

                    {project.description?.trim() && (
                      <p className="text-xs text-slate-400 leading-5 mt-1">
                        {project.description}
                      </p>
                    )}

                    {project.technologies?.trim() && (
                      <p className="text-xs text-green-400 mt-1">
                        technologies:{" "}
                        {project.technologies}
                      </p>
                    )}

                    <div className="flex flex-wrap gap-3 mt-2">
{project.projectLink && (
  <a
    href={project.projectLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-blue-600 hover:underline"
  >
    <SectionIcon type="portfolio" size={10} />
    <span>Live</span>
  </a>
)}

{project.githubLink && (
  <a
    href={project.githubLink}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-0.5 text-[12px] text-slate-500 hover:text-blue-600 hover:underline"
  >
    <FaGithub size={10} />
    <span>GitHub</span>
  </a>
)}
                    </div>

                  </div>

                  <p className="text-yellow-400 text-sm">
                    {"},"}
                  </p>

                </div>
              );
            })}

          </div>

          <p className="text-green-400 text-sm">
            ];
          </p>

        </section>
      )}

      {/* ================= EDUCATION ================= */}

      {education.some(
        (edu) =>
          edu.degree?.trim() ||
          edu.college?.trim()
      ) && (
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            education:
          </p>

          <div className="ml-5 mt-3 space-y-4">

            {education.map((edu, index) => {

              if (
                !edu.degree?.trim() &&
                !edu.college?.trim()
              ) {
                return null;
              }

              const degree =
                edu.degree?.trim() || "Education";

              const isSchool =
                degree.toLowerCase().includes("school") ||
                degree.toLowerCase().includes("secondary") ||
                degree.toLowerCase().includes("higher secondary") ||
                degree.toLowerCase().includes("class") ||
                degree.toLowerCase().includes("10th") ||
                degree.toLowerCase().includes("12th");

              return (
                <div key={index}>

                  <p className="text-sm text-white">
                    {edu.degree}
                  </p>

                  {edu.college && (
                    <p className="text-xs text-slate-400">
                      {edu.college}

                      {edu.location &&
                        ` • ${edu.location}`}
                    </p>
                  )}

                  {(edu.startYear ||
                    edu.endYear) && (
                    <p className="text-xs text-slate-500">
                      {edu.startYear || ""}
                      {" - "}
                      {edu.endYear || ""}
                    </p>
                  )}

           
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

      {/* ================= EXPERIENCE ================= */}

      {experiences.some(
        (experience) =>
          experience.title?.trim() ||
          experience.company?.trim()
      ) && (
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            experience:
          </p>

          <div className="ml-5 mt-3 space-y-5">

            {experiences.map((experience, index) => {

              if (
                !experience.title?.trim() &&
                !experience.company?.trim()
              ) {
                return null;
              }

              return (
                <div key={index}>

                  <p className="text-white text-sm">
                    {experience.title}
                  </p>

                  {experience.company && (
                    <p className="text-cyan-400 text-xs">
                      {experience.company}

                      {experience.location &&
                        ` • ${experience.location}`}
                    </p>
                  )}

                  {(experience.startDate ||
                    experience.endDate ||
                    experience.current) && (
                    <p className="text-slate-500 text-xs">
                      {experience.startDate || ""}
                      {" - "}
                      {experience.current
                        ? "Present"
                        : experience.endDate || ""}
                    </p>
                  )}

                  {experience.description?.trim() && (
                    <p className="text-slate-400 text-xs leading-5 mt-1">
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
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            certifications:
          </p>

          <div className="ml-5 mt-3 space-y-3">

            {certifications.map((cert, index) => {

              if (!cert.name?.trim()) {
                return null;
              }

              return (
                <div key={index}>

                  <p className="text-sm text-white">
                    {cert.name}
                  </p>

                  {cert.organization && (
                    <p className="text-xs text-cyan-400">
                      {cert.organization}
                    </p>
                  )}

                  {cert.issueDate && (
                    <p className="text-xs text-slate-500">
                      {cert.issueDate}
                    </p>
                  )}

                  {cert.credentialId && (
                    <p className="text-xs text-slate-500">
                      Credential ID:{" "}
                      {cert.credentialId}
                    </p>
                  )}

                  {cert.credentialLink && (
                    <a
                      href={cert.credentialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[10px] text-blue-400 hover:underline"
                    >
                      credential_link
                    </a>
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
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            achievements:
          </p>

          <div className="ml-5 mt-3 space-y-3">

            {achievements.map(
              (achievement, index) => {

                if (
                  !achievement.title?.trim()
                ) {
                  return null;
                }

                return (
                  <div key={index}>

                    <p className="text-sm text-white">
                      {achievement.title}
                    </p>

                    {achievement.description?.trim() && (
                      <p className="text-xs text-slate-400 leading-5 mt-1">
                        {achievement.description}
                      </p>
                    )}

                  </div>
                );
              }
            )}

          </div>

        </section>
      )}

      {/* ================= LANGUAGES ================= */}

      {languages.some(
        (language) => language.name?.trim()
      ) && (
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            languages:
          </p>

          <div className="ml-5 mt-3 space-y-1">

            {languages.map((language, index) => {

              if (!language.name?.trim()) {
                return null;
              }

              return (
                <p
                  key={index}
                  className="text-sm"
                >
                  <span className="text-cyan-400">
                    "{language.name}"
                  </span>

                  {language.level && (
                    <span className="text-slate-500">
                      {" "}
                      // {language.level}
                    </span>
                  )}
                </p>
              );
            })}

          </div>

        </section>
      )}

      {/* ================= INTERESTS ================= */}

      {interests.length > 0 && (
        <section className="mt-7">

          <p className="text-green-400 text-sm">
            interests:
          </p>

          <p className="text-sm text-slate-300 mt-2">
            {interests.join(" • ")}
          </p>

        </section>
      )}

      {/* ================= HOBBIES ================= */}

      {hobbies.length > 0 && (
        <section className="mt-5">

          <p className="text-green-400 text-sm">
            hobbies:
          </p>

          <p className="text-sm text-slate-300 mt-2">
            {hobbies.join(" • ")}
          </p>

        </section>
      )}

      {/* ================= FOOTER ================= */}

      <p className="text-green-400 text-sm mt-8">
        &lt;/developer&gt;
      </p>

    </div>
  );
}

export default Developer;