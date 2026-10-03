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

function Modern({ cvData }: Props) {
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

  const hasProfiles =
    Boolean(cvData.github) ||
    Boolean(cvData.linkedin) ||
    Boolean(cvData.leetcode) ||
    Boolean(cvData.portfolio);

  const isSchoolEducation = (degree?: string) => {
    const value = degree?.toLowerCase() || "";

    return (
      value.includes("school") ||
      value.includes("secondary") ||
      value.includes("higher secondary") ||
      value.includes("class") ||
      value.includes("10th") ||
      value.includes("12th")
    );
  };

  return (
    <div className="bg-white text-slate-900 w-[794px] min-h-[1123px] mx-auto shadow-xl flex">

      {/* ================= LEFT SIDEBAR ================= */}

      <aside className="w-[30%] bg-slate-900 text-white p-7 shrink-0">

        {/* PROFILE PHOTO */}

        {cvData.profilePhoto && (
          <img
            src={cvData.profilePhoto}
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover mx-auto mb-5 border-2 border-slate-600"
          />
        )}

        {/* NAME */}

        <h1 className="text-xl font-bold break-words">
          {cvData.name || "Your Name"}
        </h1>

                 {cvData.professionalTitle && (
  <p>{cvData.professionalTitle}</p>
)}

        {/* CONTACT */}

        {(cvData.email ||
          cvData.phone ||
          cvData.location) && (
          <div className="mt-5 space-y-2 text-xs text-slate-300">

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
        )}

        {/* PROFILES */}

        {hasProfiles && (
          <div className="mt-7">

            <h2 className="text-xs font-bold uppercase tracking-widest text-white">
              Profiles
            </h2>

            <div className="mt-3 space-y-2 text-xs">

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
        )}

        {/* SKILLS */}

        {skills.some((skill) => skill.name?.trim()) && (
          <div className="mt-7">

            <div className="flex items-center gap-2">
  <SectionIcon type="skills" />
  <h2>Skills</h2>
</div>

            <div className="mt-3 space-y-3">

              {skills.map((skill, index) => {
                if (!skill.name?.trim()) {
                  return null;
                }

                return (
                  <div key={index}>

                    <p className="text-xs">
                      {skill.name}
                    </p>

                    {skill.level && (
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        {skill.level}
                      </p>
                    )}

                  </div>
                );
              })}

            </div>
          </div>
        )}

        {/* LANGUAGES */}

        {languages.some((language) => language.name?.trim()) && (
          <div className="mt-7">

            <div className="flex items-center gap-2">
  <SectionIcon type="languages" />
  <h2>Languages</h2>
</div>

            <div className="mt-3 space-y-2 text-xs text-slate-300">

              {languages.map((language, index) => {
                if (!language.name?.trim()) {
                  return null;
                }

                return (
                  <p key={index}>
                    {language.name}

                    {language.level && (
                      <span className="text-slate-500">
                        {" "}— {language.level}
                      </span>
                    )}
                  </p>
                );
              })}

            </div>
          </div>
        )}

      </aside>


      {/* ================= RIGHT CONTENT ================= */}

      <main className="flex-1 p-9 min-w-0">

        {/* ABOUT ME */}

        {cvData.summary?.trim() && (
          <section>

            <div className="flex items-center gap-2">
  <SectionIcon type="about" />
  <h2>About Me</h2>
</div>

            <div className="h-px bg-slate-200 mt-2" />

            <p className="text-sm text-slate-600 leading-6 mt-3">
              {cvData.summary}
            </p>

          </section>
        )}


        {/* EDUCATION */}

        {education.some(
          (edu) =>
            edu.degree?.trim() ||
            edu.college?.trim()
        ) && (
          <section className="mt-7">

           <div className="flex items-center gap-2">
  <SectionIcon type="education" />
  <h2>Education</h2>
</div>

            <div className="h-px bg-slate-200 mt-2" />

            <div className="mt-4 space-y-4">

              {education.map((edu, index) => {

                if (
                  !edu.degree?.trim() &&
                  !edu.college?.trim()
                ) {
                  return null;
                }

                const school = isSchoolEducation(
                  edu.degree
                );

                return (
                  <div key={index}>

                    <div className="flex justify-between gap-4">

                      <h3 className="font-semibold text-sm">
                        {edu.degree || "Education"}
                      </h3>

                      {(edu.startYear ||
                        edu.endYear) && (
                        <span className="text-xs text-slate-500 whitespace-nowrap">
                          {edu.startYear || ""}
                          {" - "}
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


        {/* EXPERIENCE */}

        {experiences.some(
          (experience) =>
            experience.title?.trim() ||
            experience.company?.trim()
        ) && (
          <section className="mt-7">

            <div className="flex items-center gap-2">
  <SectionIcon type="experience" />
  <h2>Experience</h2>
</div>

            <div className="h-px bg-slate-200 mt-2" />

            <div className="mt-4 space-y-5">

              {experiences.map(
                (experience, index) => {

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
                          {experience.title ||
                            "Experience"}
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

                      {(experience.company ||
                        experience.location) && (
                        <p className="text-xs text-slate-500 mt-1">
                          {experience.company}

                          {experience.location &&
                            ` • ${experience.location}`}
                        </p>
                      )}

                      {experience.description?.trim() && (
                        <p className="text-xs text-slate-600 leading-5 mt-2">
                          {experience.description}
                        </p>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          </section>
        )}


        {/* PROJECTS */}

        {projects.some(
          (project) => project.name?.trim()
        ) && (
          <section className="mt-7">

           <div className="flex items-center gap-2">
  <SectionIcon type="projects" />
  <h2>Projects</h2>
</div>

            <div className="h-px bg-slate-200 mt-2" />

            <div className="mt-4 space-y-5">

              {projects.map(
                (project, index) => {

                  if (!project.name?.trim()) {
                    return null;
                  }

                  return (
                    <div key={index}>

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="font-semibold text-sm">
                          {project.name}
                        </h3>

                        <div className="flex gap-3 shrink-0">
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

                      </div>

                      {project.description?.trim() && (
                        <p className="text-xs text-slate-600 mt-1 leading-5">
                          {project.description}
                        </p>
                      )}

                      {project.technologies?.trim() && (
                        <p className="text-xs text-slate-500 mt-2">
                          <span className="font-medium">
                            Technologies:
                          </span>{" "}
                          {project.technologies}
                        </p>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          </section>
        )}


        {/* CERTIFICATIONS */}

        {certifications.some(
          (certification) =>
            certification.name?.trim()
        ) && (
          <section className="mt-7">

           <div className="flex items-center gap-2">
  <SectionIcon type="certifications" />
  <h2>Certifications</h2>
</div>

            <div className="h-px bg-slate-200 mt-2" />

            <div className="mt-4 space-y-4">

              {certifications.map(
                (certification, index) => {

                  if (
                    !certification.name?.trim()
                  ) {
                    return null;
                  }

                  return (
                    <div key={index}>

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="font-semibold text-sm">
                          {certification.name}
                        </h3>

                        {certification.issueDate && (
                          <span className="text-xs text-slate-500 whitespace-nowrap">
                            {certification.issueDate}
                          </span>
                        )}

                      </div>

                      {certification.organization && (
                        <p className="text-xs text-slate-500 mt-1">
                          {certification.organization}
                        </p>
                      )}

                      {certification.credentialId && (
                        <p className="text-xs text-slate-500 mt-1">
                          Credential ID:{" "}
                          {certification.credentialId}
                        </p>
                      )}

                      {certification.credentialLink && (
                        <a
                          href={certification.credentialLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] text-blue-600 hover:underline inline-block mt-1"
                        >
                          View Credential
                        </a>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          </section>
        )}


        {/* ACHIEVEMENTS */}

        {achievements.some(
          (achievement) =>
            achievement.title?.trim()
        ) && (
          <section className="mt-7">

           <div className="flex items-center gap-2">
  <SectionIcon type="achievements" />
  <h2>Achievements</h2>
</div>

            <div className="h-px bg-slate-200 mt-2" />

            <div className="mt-4 space-y-4">

              {achievements.map(
                (achievement, index) => {

                  if (
                    !achievement.title?.trim()
                  ) {
                    return null;
                  }

                  return (
                    <div key={index}>

                      <h3 className="font-semibold text-sm">
                        {achievement.title}
                      </h3>

                      {achievement.description?.trim() && (
                        <p className="text-xs text-slate-600 leading-5 mt-1">
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


        {/* INTERESTS + HOBBIES */}

        {(interests.length > 0 ||
          hobbies.length > 0) && (
          <section className="mt-7 grid grid-cols-2 gap-5">

            {/* INTERESTS */}

            {interests.length > 0 && (
              <div>

               <div className="flex items-center gap-2">
  <SectionIcon type="interests" />
  <h2>Interests</h2>
</div>

                <div className="h-px bg-slate-200 mt-2" />

                <div className="flex flex-wrap gap-2 mt-3">

                  {interests.map(
                    (interest, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {interest}
                      </span>
                    )
                  )}

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

                <div className="h-px bg-slate-200 mt-2" />

                <div className="flex flex-wrap gap-2 mt-3">

                  {hobbies.map(
                    (hobby, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                      >
                        {hobby}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

          </section>
        )}

      </main>
    </div>
  );
}

export default Modern;