import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  Briefcase,
  Award,
  Trophy,
  Languages,
  Heart,
  Palette,
  Globe,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

// =========================================================
// TYPES
// =========================================================

type Education = {
  degree: string;
  college: string;
  location: string;
  startYear: string;
  endYear: string;
  score: string;
};

type Skill = {
  name: string;
  level: string;
};

type Project = {
  name: string;
  description: string;
  technologies: string;
  projectLink: string;
  githubLink: string;
};

type Experience = {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
};

type Certification = {
  name: string;
  organization: string;
  issueDate: string;
  credentialId: string;
  credentialLink: string;
};

type Achievement = {
  title: string;
  description: string;
};

type Language = {
  name: string;
  level: string;
};

// =========================================================
// COMPONENT
// =========================================================

function CreateCV() {
  const navigate = useNavigate();

  // =========================================================
  // PERSONAL INFORMATION
  // =========================================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [leetcode, setLeetcode] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const [summary, setSummary] = useState("");
  const [professionalTitle, setProfessionalTitle] = useState("");

  // =========================================================
  // TEMPLATE
  // =========================================================

  const [selectedTemplate, setSelectedTemplate] =
    useState<string>("classic");

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const [profilePhoto, setProfilePhoto] = useState("");

  // =========================================================
  // INTERESTS & HOBBIES
  // =========================================================

  const [interests, setInterests] = useState<string[]>([]);
  const [hobbies, setHobbies] = useState<string[]>([]);

  const [interestInput, setInterestInput] = useState("");
  const [hobbyInput, setHobbyInput] = useState("");

  // =========================================================
  // CURRENT STEP
  // =========================================================

  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Personal",
    "Education",
    "Skills",
    "Projects",
    "Experience",
    "Additional",
  ];

  // =========================================================
  // EDUCATION
  // =========================================================

  const [education, setEducation] = useState<Education[]>([
    {
      degree: "",
      college: "",
      location: "",
      startYear: "",
      endYear: "",
      score: "",
    },
  ]);

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string,
  ) => {
    setEducation((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        degree: "",
        college: "",
        location: "",
        startYear: "",
        endYear: "",
        score: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducation((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const [skills, setSkills] = useState<Skill[]>([
    {
      name: "",
      level: "Intermediate",
    },
  ]);

  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string,
  ) => {
    setSkills((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addSkill = () => {
    setSkills((prev) => [
      ...prev,
      {
        name: "",
        level: "Intermediate",
      },
    ]);
  };

  const removeSkill = (index: number) => {
    setSkills((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // PROJECTS
  // =========================================================

  const [projects, setProjects] = useState<Project[]>([
    {
      name: "",
      description: "",
      technologies: "",
      projectLink: "",
      githubLink: "",
    },
  ]);

  const handleProjectChange = (
    index: number,
    field: keyof Project,
    value: string,
  ) => {
    setProjects((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        technologies: "",
        projectLink: "",
        githubLink: "",
      },
    ]);
  };

  const removeProject = (index: number) => {
    setProjects((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    },
  ]);

  const handleExperienceChange = <K extends keyof Experience>(
    index: number,
    field: K,
    value: Experience[K],
  ) => {
    setExperiences((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        current: false,
        description: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // CERTIFICATIONS
  // =========================================================

  const [certifications, setCertifications] = useState<
    Certification[]
  >([
    {
      name: "",
      organization: "",
      issueDate: "",
      credentialId: "",
      credentialLink: "",
    },
  ]);

  const handleCertificationChange = <
    K extends keyof Certification
  >(
    index: number,
    field: K,
    value: Certification[K],
  ) => {
    setCertifications((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addCertification = () => {
    setCertifications((prev) => [
      ...prev,
      {
        name: "",
        organization: "",
        issueDate: "",
        credentialId: "",
        credentialLink: "",
      },
    ]);
  };

  const removeCertification = (index: number) => {
    setCertifications((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // ACHIEVEMENTS
  // =========================================================

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      title: "",
      description: "",
    },
  ]);

  const handleAchievementChange = <
    K extends keyof Achievement
  >(
    index: number,
    field: K,
    value: Achievement[K],
  ) => {
    setAchievements((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addAchievement = () => {
    setAchievements((prev) => [
      ...prev,
      {
        title: "",
        description: "",
      },
    ]);
  };

  const removeAchievement = (index: number) => {
    setAchievements((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // LANGUAGES
  // =========================================================

  const [languages, setLanguages] = useState<Language[]>([
    {
      name: "",
      level: "Intermediate",
    },
  ]);

  const handleLanguageChange = <K extends keyof Language>(
    index: number,
    field: K,
    value: Language[K],
  ) => {
    setLanguages((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addLanguage = () => {
    setLanguages((prev) => [
      ...prev,
      {
        name: "",
        level: "Intermediate",
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    setLanguages((prev) => {
      if (prev.length === 1) {
        return prev;
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  // =========================================================
  // LOAD SAVED CV DATA
  // =========================================================

  useEffect(() => {
    const savedData = sessionStorage.getItem("cvData");

    if (!savedData) {
      return;
    }

    try {
      const data = JSON.parse(savedData);

      // -------------------------------------------------------
      // PERSONAL
      // -------------------------------------------------------

      setName(
        typeof data.name === "string"
          ? data.name
          : "",
      );

      setEmail(
        typeof data.email === "string"
          ? data.email
          : "",
      );

      setPhone(
        typeof data.phone === "string"
          ? data.phone
          : "",
      );

      setLocation(
        typeof data.location === "string"
          ? data.location
          : "",
      );

      setGithub(
        typeof data.github === "string"
          ? data.github
          : "",
      );

      setLinkedin(
        typeof data.linkedin === "string"
          ? data.linkedin
          : "",
      );

      setLeetcode(
        typeof data.leetcode === "string"
          ? data.leetcode
          : "",
      );

      setPortfolio(
        typeof data.portfolio === "string"
          ? data.portfolio
          : "",
      );

      setSummary(
        typeof data.summary === "string"
          ? data.summary
          : "",
      );

      setProfessionalTitle(
        typeof data.professionalTitle === "string"
          ? data.professionalTitle
          : "",
      );

      // -------------------------------------------------------
      // TEMPLATE
      // -------------------------------------------------------

      setSelectedTemplate(
        typeof data.selectedTemplate === "string"
          ? data.selectedTemplate
          : "classic",
      );

      // -------------------------------------------------------
      // PROFILE PHOTO
      // -------------------------------------------------------

      setProfilePhoto(
        typeof data.profilePhoto === "string"
          ? data.profilePhoto
          : "",
      );

      // -------------------------------------------------------
      // INTERESTS
      // -------------------------------------------------------

      setInterests(
        Array.isArray(data.interests)
          ? data.interests.filter(
              (item: unknown): item is string =>
                typeof item === "string",
            )
          : [],
      );

      // -------------------------------------------------------
      // HOBBIES
      // -------------------------------------------------------

      setHobbies(
        Array.isArray(data.hobbies)
          ? data.hobbies.filter(
              (item: unknown): item is string =>
                typeof item === "string",
            )
          : [],
      );

      // -------------------------------------------------------
      // EDUCATION
      // -------------------------------------------------------

      if (
        Array.isArray(data.education) &&
        data.education.length > 0
      ) {
        setEducation(data.education);
      }

      // -------------------------------------------------------
      // SKILLS
      // -------------------------------------------------------

      if (
        Array.isArray(data.skills) &&
        data.skills.length > 0
      ) {
        setSkills(data.skills);
      }

      // -------------------------------------------------------
      // PROJECTS
      // -------------------------------------------------------

      if (
        Array.isArray(data.projects) &&
        data.projects.length > 0
      ) {
        setProjects(data.projects);
      }

      // -------------------------------------------------------
      // EXPERIENCE
      // IMPORTANT:
      // Backend field is "experience", not "experiences"
      // -------------------------------------------------------

      if (
        Array.isArray(data.experience) &&
        data.experience.length > 0
      ) {
        setExperiences(data.experience);
      }

      // -------------------------------------------------------
      // CERTIFICATIONS
      // -------------------------------------------------------

      if (
        Array.isArray(data.certifications) &&
        data.certifications.length > 0
      ) {
        setCertifications(data.certifications);
      }

      // -------------------------------------------------------
      // ACHIEVEMENTS
      // -------------------------------------------------------

      if (
        Array.isArray(data.achievements) &&
        data.achievements.length > 0
      ) {
        setAchievements(data.achievements);
      }

      // -------------------------------------------------------
      // LANGUAGES
      // -------------------------------------------------------

      if (
        Array.isArray(data.languages) &&
        data.languages.length > 0
      ) {
        setLanguages(data.languages);
      }
    } catch (error) {
      console.error(
        "Failed to restore CV data:",
        error,
      );
    }
  }, []);

  // =========================================================
  // PROFILE PHOTO
  // =========================================================

  const handleProfilePhoto = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    // Allow only image files
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setProfilePhoto(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  // =========================================================
  // SAVE CV + GO TO TEMPLATE SELECTION
  // =========================================================

  const handlePreview = async () => {
    try {
      const token = localStorage.getItem("token");

      // User must be logged in
      if (!token) {
        navigate("/login");
        return;
      }

      // -------------------------------------------------------
      // CREATE CV DATA
      // -------------------------------------------------------

      const cvData = {
        name,
        email,
        phone,
        location,

        github,
        linkedin,
        leetcode,
        portfolio,

        summary,
        professionalTitle,

        selectedTemplate,

        profilePhoto,

        interests,
        hobbies,

        education,
        skills,
        projects,

        // IMPORTANT:
        // Backend field name is "experience"
        experience: experiences,

        certifications,
        achievements,
        languages,
      };

      // -------------------------------------------------------
      // CHECK WHETHER THIS IS EDIT OR NEW CV
      // -------------------------------------------------------

      const savedCV = sessionStorage.getItem("cvData");

      let existingCVId: string | null = null;

      if (savedCV) {
        try {
          const parsedCV = JSON.parse(savedCV);

          if (
            parsedCV &&
            typeof parsedCV._id === "string" &&
            parsedCV._id.trim() !== ""
          ) {
            existingCVId = parsedCV._id;
          }
        } catch (error) {
          console.error(
            "Invalid saved CV data:",
            error,
          );
        }
      }

      // -------------------------------------------------------
      // CREATE OR UPDATE
      // -------------------------------------------------------

      const url = existingCVId
        ? `http://localhost:5000/api/cvs/${existingCVId}`
        : "http://localhost:5000/api/cvs";

      const method = existingCVId
        ? "PUT"
        : "POST";

      // -------------------------------------------------------
      // SEND REQUEST
      // -------------------------------------------------------

      const response = await fetch(url, {
        method,

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(cvData),
      });

      // -------------------------------------------------------
      // READ RESPONSE
      // -------------------------------------------------------

      const data = await response.json();

      // -------------------------------------------------------
      // HANDLE BACKEND ERROR
      // -------------------------------------------------------

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to save CV",
        );

        return;
      }

      // -------------------------------------------------------
      // SAVE LATEST BACKEND CV
      // -------------------------------------------------------

      if (data.cv) {
        sessionStorage.setItem(
          "cvData",
          JSON.stringify(data.cv),
        );
      }

      // -------------------------------------------------------
      // GO TO TEMPLATE SELECTION
      // -------------------------------------------------------

      navigate("/templates");
    } catch (error) {
      console.error(
        "Save CV error:",
        error,
      );

      alert(
        "Unable to save CV. Please make sure the backend is running.",
      );
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">

        {/* =====================================================
            PAGE TITLE
        ===================================================== */}

        <h1 className="text-3xl font-bold">
          Create Your CV
        </h1>

        <p className="text-slate-400 mt-2">
          Add your details and build your professional CV.
        </p>

        {/* =====================================================
            STEP PROGRESS
        ===================================================== */}

        <div className="mb-8 mt-8">
          <div className="flex items-center justify-between">

            {steps.map((step, index) => {
              const stepNumber = index + 1;

              const isCompleted =
                currentStep > stepNumber;

              const isActive =
                currentStep === stepNumber;

              return (
                <React.Fragment key={step}>

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                            ? "bg-blue-600 text-white"
                            : "bg-slate-800 text-slate-500 border border-white/10"
                      }`}
                    >
                      {stepNumber}
                    </div>

                    <span
                      className={`mt-2 text-xs ${
                        isActive || isCompleted
                          ? "text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {step}
                    </span>

                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-px mx-2 mt-[-18px] ${
                        currentStep > stepNumber
                          ? "bg-green-500"
                          : "bg-white/10"
                      }`}
                    />
                  )}

                </React.Fragment>
              );
            })}

          </div>
        </div>

        {/* =====================================================
            FORM CARD
        ===================================================== */}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          {/* ===================================================
              STEP 1 - PERSONAL
          =================================================== */}

          {currentStep === 1 && (
            <>

              <h2 className="text-xl font-semibold mb-5">
                Personal Information
              </h2>

              {/* PROFILE PHOTO */}

              <div className="mb-6">

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Profile Picture{" "}
                  <span className="text-slate-500">
                    (Optional)
                  </span>
                </label>

                <div className="flex items-center gap-5">

                  <div className="w-24 h-24 rounded-full border border-white/10 bg-slate-800 overflow-hidden flex items-center justify-center shrink-0">

                    {profilePhoto ? (
                      <img
                        src={profilePhoto}
                        alt="Profile Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-slate-500" />
                    )}

                  </div>

                  <div>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      id="profilePhoto"
                      className="hidden"
                      onChange={handleProfilePhoto}
                    />

                    <label
                      htmlFor="profilePhoto"
                      className="inline-block cursor-pointer px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition"
                    >
                      Upload Photo
                    </label>

                    <p className="text-xs text-slate-500 mt-2">
                      JPG, PNG or JPEG • Optional
                    </p>

                    {profilePhoto && (
                      <button
                        type="button"
                        onClick={() =>
                          setProfilePhoto("")
                        }
                        className="text-xs text-red-400 hover:text-red-300 mt-2"
                      >
                        Remove Photo
                      </button>
                    )}

                  </div>

                </div>

              </div>

              <div className="space-y-4">

                {/* NAME */}

                <div>

                  <label className="block text-sm text-slate-300 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* PROFESSIONAL TITLE */}

                <div>

                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Professional Title
                  </label>

                  <input
                    type="text"
                    value={professionalTitle}
                    onChange={(e) =>
                      setProfessionalTitle(
                        e.target.value,
                      )
                    }
                    placeholder="e.g. B.Tech CSE Student • Developer"
                    className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-indigo-500"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <Mail size={18} />
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="example@gmail.com"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* PHONE */}

                <div>

                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <Phone size={18} />
                    Phone
                  </label>

                  <input
                    type="text"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="Enter phone number"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* LOCATION */}

                <div>

                  <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <MapPin size={18} />
                    Location
                  </label>

                  <input
                    type="text"
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="Kolkata, West Bengal"
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                  />

                </div>

                {/* PROFESSIONAL PROFILES */}

                <div>

                  <label className="block text-sm font-medium mb-3">
                    Professional Profiles
                  </label>

                  <div className="space-y-3">

                    {/* GITHUB */}

                    <div>

                      <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <FaGithub size={18} />
                        GitHub
                      </label>

                      <input
                        type="url"
                        value={github}
                        onChange={(e) =>
                          setGithub(e.target.value)
                        }
                        placeholder="GitHub URL"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    {/* LINKEDIN */}

                    <div>

                      <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <FaLinkedin size={18} />
                        LinkedIn
                      </label>

                      <input
                        type="url"
                        value={linkedin}
                        onChange={(e) =>
                          setLinkedin(e.target.value)
                        }
                        placeholder="LinkedIn URL"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    {/* LEETCODE */}

                    <div>

                      <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <SiLeetcode size={18} />
                        LeetCode
                      </label>

                      <input
                        type="url"
                        value={leetcode}
                        onChange={(e) =>
                          setLeetcode(e.target.value)
                        }
                        placeholder="LeetCode URL"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    {/* PORTFOLIO */}

                    <div>

                      <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <Globe size={18} />
                        Portfolio
                      </label>

                      <input
                        type="url"
                        value={portfolio}
                        onChange={(e) =>
                          setPortfolio(e.target.value)
                        }
                        placeholder="Portfolio Website URL"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>

                </div>

                {/* ABOUT ME */}

                <div>

                  <h2 className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                    <User size={20} />
                    About Me
                  </h2>

                  <textarea
                    value={summary}
                    onChange={(e) =>
                      setSummary(e.target.value)
                    }
                    placeholder="Write a short professional summary..."
                    rows={4}
                    className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                  />

                </div>

              </div>

            </>
          )}

          {/* ===================================================
              STEP 2 - EDUCATION
          =================================================== */}

          {currentStep === 2 && (
            <>

              <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
                <GraduationCap size={20} />
                Education
              </h2>

              {education.map((edu, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl p-5 mb-5"
                >

                  <div className="space-y-4">

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Degree
                      </label>

                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "degree",
                            e.target.value,
                          )
                        }
                        placeholder="B.Tech in Computer Science"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Institution Name
                      </label>

                      <input
                        type="text"
                        value={edu.college}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "college",
                            e.target.value,
                          )
                        }
                        placeholder="College / University"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Location
                      </label>

                      <input
                        type="text"
                        value={edu.location}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "location",
                            e.target.value,
                          )
                        }
                        placeholder="Kolkata, West Bengal"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                      <div>

                        <label className="block text-sm text-slate-300 mb-2">
                          Start Year
                        </label>

                        <input
                          type="text"
                          value={edu.startYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "startYear",
                              e.target.value,
                            )
                          }
                          placeholder="2023"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                      </div>

                      <div>

                        <label className="block text-sm text-slate-300 mb-2">
                          End Year
                        </label>

                        <input
                          type="text"
                          value={edu.endYear}
                          onChange={(e) =>
                            handleEducationChange(
                              index,
                              "endYear",
                              e.target.value,
                            )
                          }
                          placeholder="2027"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                      </div>

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Score
                      </label>

                      <input
                        type="text"
                        value={edu.score}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "score",
                            e.target.value,
                          )
                        }
                        placeholder="CGPA 7.5 / Percentage 85%"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>

                  {education.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeEducation(index)
                      }
                      className="mt-4 text-red-400 text-sm hover:text-red-300"
                    >
                      Remove Education
                    </button>
                  )}

                </div>
              ))}

              <button
                type="button"
                onClick={addEducation}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                + Add Education
              </button>

            </>
          )}

          {/* ===================================================
              STEP 3 - SKILLS
          =================================================== */}

          {currentStep === 3 && (
            <>

              <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
                <Code2 size={20} />
                Skills
              </h2>

              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl p-5 mb-5"
                >

                  <div className="grid sm:grid-cols-2 gap-4">

                    <div>

                      <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <Code2 size={20} />
                        Skill
                      </label>

                      <input
                        type="text"
                        value={skill.name}
                        onChange={(e) =>
                          handleSkillChange(
                            index,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="React.js"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Skill Level
                      </label>

                      <select
                        value={skill.level}
                        onChange={(e) =>
                          handleSkillChange(
                            index,
                            "level",
                            e.target.value,
                          )
                        }
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      >
                        <option value="Beginner">
                          Beginner
                        </option>

                        <option value="Intermediate">
                          Intermediate
                        </option>

                        <option value="Advanced">
                          Advanced
                        </option>
                      </select>

                    </div>

                  </div>

                  {skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(index)
                      }
                      className="mt-4 text-red-400 text-sm hover:text-red-300"
                    >
                      Remove Skill
                    </button>
                  )}

                </div>
              ))}

              <button
                type="button"
                onClick={addSkill}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                + Add Skill
              </button>

            </>
          )}

          {/* ===================================================
              STEP 4 - PROJECTS
          =================================================== */}

          {currentStep === 4 && (
            <>

              <h2 className="flex items-center gap-2 text-xl font-semibold mb-5">
                <FolderGit2 size={20} />
                Projects
              </h2>

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl p-5 mb-5"
                >

                  <div className="space-y-4">

                    <div>

                      <label className="flex items-center gap-2 text-sm text-slate-300 mb-2">
                        <FolderGit2 size={20} />
                        Project Name
                      </label>

                      <input
                        type="text"
                        value={project.name}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "name",
                            e.target.value,
                          )
                        }
                        placeholder="StudyHub"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Project Description
                      </label>

                      <textarea
                        value={project.description}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Describe your project..."
                        rows={4}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Technologies Used
                      </label>

                      <input
                        type="text"
                        value={project.technologies}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "technologies",
                            e.target.value,
                          )
                        }
                        placeholder="React, Node.js, MongoDB"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Project Link
                      </label>

                      <input
                        type="text"
                        value={project.projectLink}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "projectLink",
                            e.target.value,
                          )
                        }
                        placeholder="https://..."
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        GitHub Link
                      </label>

                      <input
                        type="text"
                        value={project.githubLink}
                        onChange={(e) =>
                          handleProjectChange(
                            index,
                            "githubLink",
                            e.target.value,
                          )
                        }
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                  </div>

                  {projects.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeProject(index)
                      }
                      className="mt-4 text-red-400 text-sm hover:text-red-300"
                    >
                      Remove Project
                    </button>
                  )}

                </div>
              ))}

              <button
                type="button"
                onClick={addProject}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                + Add Project
              </button>

            </>
          )}

          {/* ===================================================
              STEP 5 - EXPERIENCE
          =================================================== */}

          {currentStep === 5 && (
            <>

              <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                <Briefcase size={20} />
                Experience / Internship
              </h2>

              <p className="text-sm text-slate-400 mb-5">
                Optional — Add your internship, job, or work experience.
              </p>

              {experiences.map((experience, index) => (
                <div
                  key={index}
                  className="border border-white/10 rounded-xl p-5 mb-5"
                >

                  <div className="space-y-4">

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Job / Internship Title
                      </label>

                      <input
                        type="text"
                        value={experience.title}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="Frontend Developer Intern"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Company / Organization
                      </label>

                      <input
                        type="text"
                        value={experience.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "company",
                            e.target.value,
                          )
                        }
                        placeholder="Company name"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Location
                      </label>

                      <input
                        type="text"
                        value={experience.location}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "location",
                            e.target.value,
                          )
                        }
                        placeholder="Kolkata, India / Remote"
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                      />

                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">

                      <div>

                        <label className="block text-sm text-slate-300 mb-2">
                          Start Date
                        </label>

                        <input
                          type="text"
                          value={experience.startDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "startDate",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. June 2025"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                      </div>

                      <div>

                        <label className="block text-sm text-slate-300 mb-2">
                          End Date
                        </label>

                        <input
                          type="text"
                          value={experience.endDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "endDate",
                              e.target.value,
                            )
                          }
                          placeholder="e.g. August 2026"
                          disabled={experience.current}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 disabled:opacity-50"
                        />

                      </div>

                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">

                      <input
                        type="checkbox"
                        checked={experience.current}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "current",
                            e.target.checked,
                          )
                        }
                        className="w-4 h-4"
                      />

                      <span className="text-sm text-slate-300">
                        I currently work here
                      </span>

                    </label>

                    <div>

                      <label className="block text-sm text-slate-300 mb-2">
                        Description
                      </label>

                      <textarea
                        value={experience.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "description",
                            e.target.value,
                          )
                        }
                        placeholder="Describe your responsibilities, work, or achievements..."
                        rows={4}
                        className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                      />

                    </div>

                  </div>

                  {experiences.length > 1 && (
                    <button
                      type="button"
                      onClick={() =>
                        removeExperience(index)
                      }
                      className="mt-4 text-red-400 text-sm hover:text-red-300"
                    >
                      Remove Experience
                    </button>
                  )}

                </div>
              ))}

              <button
                type="button"
                onClick={addExperience}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                + Add Experience
              </button>

            </>
          )}

          {/* ===================================================
              STEP 6 - ADDITIONAL
          =================================================== */}

          {currentStep === 6 && (
            <>

              {/* CERTIFICATIONS */}

              <div>

                <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Award size={20} />
                  Certifications
                </h2>

                <p className="text-sm text-slate-400 mb-5">
                  Optional — Add certificates or courses you have completed.
                </p>

                {certifications.map(
                  (certification, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-xl p-5 mb-5"
                    >

                      <div className="space-y-4">

                        <input
                          type="text"
                          value={certification.name}
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                          placeholder="Certificate Name"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                          type="text"
                          value={
                            certification.organization
                          }
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "organization",
                              e.target.value,
                            )
                          }
                          placeholder="Issuing Organization"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                          type="text"
                          value={
                            certification.issueDate
                          }
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "issueDate",
                              e.target.value,
                            )
                          }
                          placeholder="Issue Date e.g. September 2026"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                          type="text"
                          value={
                            certification.credentialId
                          }
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "credentialId",
                              e.target.value,
                            )
                          }
                          placeholder="Credential ID (Optional)"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                          type="text"
                          value={
                            certification.credentialLink
                          }
                          onChange={(e) =>
                            handleCertificationChange(
                              index,
                              "credentialLink",
                              e.target.value,
                            )
                          }
                          placeholder="Credential Link (Optional)"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                      </div>

                      {certifications.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeCertification(index)
                          }
                          className="mt-4 text-red-400 text-sm"
                        >
                          Remove Certification
                        </button>
                      )}

                    </div>
                  ),
                )}

                <button
                  type="button"
                  onClick={addCertification}
                  className="text-blue-400 text-sm font-medium"
                >
                  + Add Certification
                </button>

              </div>

              {/* ACHIEVEMENTS */}

              <div className="border-t border-white/10 mt-8 pt-8">

                <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Trophy size={20} />
                  Achievements
                </h2>

                <p className="text-sm text-slate-400 mb-5">
                  Optional — Add your achievements.
                </p>

                {achievements.map(
                  (achievement, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-xl p-5 mb-5"
                    >

                      <div className="space-y-4">

                        <input
                          type="text"
                          value={achievement.title}
                          onChange={(e) =>
                            handleAchievementChange(
                              index,
                              "title",
                              e.target.value,
                            )
                          }
                          placeholder="Achievement Title"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <textarea
                          value={
                            achievement.description
                          }
                          onChange={(e) =>
                            handleAchievementChange(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                          placeholder="Describe your achievement..."
                          rows={3}
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                        />

                      </div>

                      {achievements.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeAchievement(index)
                          }
                          className="mt-4 text-red-400 text-sm"
                        >
                          Remove Achievement
                        </button>
                      )}

                    </div>
                  ),
                )}

                <button
                  type="button"
                  onClick={addAchievement}
                  className="text-blue-400 text-sm font-medium"
                >
                  + Add Achievement
                </button>

              </div>

              {/* INTERESTS */}

              <div className="border-t border-white/10 mt-8 pt-8">

                <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Heart size={20} />
                  Interests
                </h2>

                <p className="text-sm text-slate-400 mb-5">
                  Optional — Add your professional or personal interests.
                </p>

                <div className="flex gap-3">

                  <input
                    type="text"
                    value={interestInput}
                    onChange={(e) =>
                      setInterestInput(
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Web Development"
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        interestInput.trim()
                      ) {
                        e.preventDefault();

                        setInterests((prev) => [
                          ...prev,
                          interestInput.trim(),
                        ]);

                        setInterestInput("");
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      if (!interestInput.trim()) {
                        return;
                      }

                      setInterests((prev) => [
                        ...prev,
                        interestInput.trim(),
                      ]);

                      setInterestInput("");
                    }}
                    className="cursor-pointer px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium"
                  >
                    Add
                  </button>

                </div>

                {interests.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">

                    {interests.map(
                      (interest, index) => (
                        <div
                          key={`${interest}-${index}`}
                          className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1.5"
                        >

                          <span className="text-sm text-blue-300">
                            {interest}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setInterests((prev) =>
                                prev.filter(
                                  (_, i) =>
                                    i !== index,
                                ),
                              )
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>

                        </div>
                      ),
                    )}

                  </div>
                )}

              </div>

              {/* HOBBIES */}

              <div className="border-t border-white/10 mt-8 pt-8">

                <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Palette size={20} />
                  Hobbies
                </h2>

                <p className="text-sm text-slate-400 mb-5">
                  Optional — Add your hobbies and activities.
                </p>

                <div className="flex gap-3">

                  <input
                    type="text"
                    value={hobbyInput}
                    onChange={(e) =>
                      setHobbyInput(
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Reading"
                    className="flex-1 bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                    onKeyDown={(e) => {
                      if (
                        e.key === "Enter" &&
                        hobbyInput.trim()
                      ) {
                        e.preventDefault();

                        setHobbies((prev) => [
                          ...prev,
                          hobbyInput.trim(),
                        ]);

                        setHobbyInput("");
                      }
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => {
                      if (!hobbyInput.trim()) {
                        return;
                      }

                      setHobbies((prev) => [
                        ...prev,
                        hobbyInput.trim(),
                      ]);

                      setHobbyInput("");
                    }}
                    className="cursor-pointer px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 font-medium"
                  >
                    Add
                  </button>

                </div>

                {hobbies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">

                    {hobbies.map(
                      (hobby, index) => (
                        <div
                          key={`${hobby}-${index}`}
                          className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1.5"
                        >

                          <span className="text-sm text-purple-300">
                            {hobby}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              setHobbies((prev) =>
                                prev.filter(
                                  (_, i) =>
                                    i !== index,
                                ),
                              )
                            }
                            className="text-red-400 hover:text-red-300"
                          >
                            ×
                          </button>

                        </div>
                      ),
                    )}

                  </div>
                )}

              </div>

              {/* LANGUAGES */}

              <div className="border-t border-white/10 mt-8 pt-8">

                <h2 className="flex items-center gap-2 text-xl font-semibold mb-2">
                  <Languages size={20} />
                  Languages
                </h2>

                <p className="text-sm text-slate-400 mb-5">
                  Optional — Add the languages you know.
                </p>

                {languages.map(
                  (language, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-xl p-5 mb-5"
                    >

                      <div className="grid sm:grid-cols-2 gap-4">

                        <input
                          type="text"
                          value={language.name}
                          onChange={(e) =>
                            handleLanguageChange(
                              index,
                              "name",
                              e.target.value,
                            )
                          }
                          placeholder="English"
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <select
                          value={language.level}
                          onChange={(e) =>
                            handleLanguageChange(
                              index,
                              "level",
                              e.target.value,
                            )
                          }
                          className="w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                        >

                          <option value="Basic">
                            Basic
                          </option>

                          <option value="Intermediate">
                            Intermediate
                          </option>

                          <option value="Fluent">
                            Fluent
                          </option>

                          <option value="Native">
                            Native
                          </option>

                        </select>

                      </div>

                      {languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeLanguage(index)
                          }
                          className="mt-4 text-red-400 text-sm"
                        >
                          Remove Language
                        </button>
                      )}

                    </div>
                  ),
                )}

                <button
                  type="button"
                  onClick={addLanguage}
                  className="text-blue-400 text-sm font-medium"
                >
                  + Add Language
                </button>

              </div>

            </>
          )}

          {/* ===================================================
              PREVIOUS / CONTINUE / CHOOSE TEMPLATE
          =================================================== */}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">

            {/* LEFT BUTTON */}

            {currentStep === 1 ? (
              <button
                type="button"
                onClick={() =>
                  navigate("/dashboard")
                }
                className="cursor-pointer px-5 py-2.5 rounded-lg font-medium transition bg-slate-800 text-white hover:bg-slate-700"
              >
                ← Back to Dashboard
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setCurrentStep((prev) =>
                    Math.max(1, prev - 1),
                  )
                }
                className="cursor-pointer px-5 py-2.5 rounded-lg font-medium transition bg-slate-800 text-white hover:bg-slate-700"
              >
                Previous
              </button>
            )}

            {/* RIGHT BUTTON */}

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentStep((prev) =>
                    Math.min(
                      steps.length,
                      prev + 1,
                    ),
                  )
                }
                className="cursor-pointer px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
              >
                Continue
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePreview}
                className="cursor-pointer px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition"
              >
                Choose Template
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
}

export default CreateCV;

