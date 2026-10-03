import React from "react";
import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  ShieldCheck,
} from "lucide-react";

type ATSCheckerProps = {
  cvData: any;
};

type CheckItem = {
  label: string;
  score: number;
  status: "good" | "warning" | "missing";
  message: string;
};

const ATSChecker: React.FC<ATSCheckerProps> = ({ cvData }) => {
  const isFilled = (value: any) => {
    return typeof value === "string" && value.trim().length > 0;
  };

  const hasItems = (value: any) => {
    return Array.isArray(value) && value.some((item) => {
      if (typeof item === "string") return item.trim().length > 0;

      return Object.values(item || {}).some(
        (field) => typeof field === "string" && field.trim().length > 0
      );
    });
  };

  const getProjectCount = () => {
    if (!Array.isArray(cvData?.projects)) return 0;

    return cvData.projects.filter(
      (project: any) =>
        isFilled(project?.name) ||
        isFilled(project?.description) ||
        isFilled(project?.technologies)
    ).length;
  };

  const getSkillCount = () => {
    if (!Array.isArray(cvData?.skills)) return 0;

    return cvData.skills.filter(
      (skill: any) =>
        isFilled(skill?.name)
    ).length;
  };

  const getEducationCount = () => {
    if (!Array.isArray(cvData?.education)) return 0;

    return cvData.education.filter(
      (education: any) =>
        isFilled(education?.degree) ||
        isFilled(education?.college)
    ).length;
  };

  const getExperienceCount = () => {
    if (!Array.isArray(cvData?.experience)) return 0;

    return cvData.experience.filter(
      (experience: any) =>
        isFilled(experience?.title) ||
        isFilled(experience?.company)
    ).length;
  };

  const checks: CheckItem[] = [
    {
      label: "Full Name",
      score: 10,
      status: isFilled(cvData?.name) ? "good" : "missing",
      message: isFilled(cvData?.name)
        ? "Your name is present."
        : "Add your full name.",
    },

    {
      label: "Email Address",
      score: 10,
      status: isFilled(cvData?.email) ? "good" : "missing",
      message: isFilled(cvData?.email)
        ? "Email address is present."
        : "Add a professional email address.",
    },

    {
      label: "Phone Number",
      score: 10,
      status: isFilled(cvData?.phone) ? "good" : "missing",
      message: isFilled(cvData?.phone)
        ? "Phone number is present."
        : "Add your phone number.",
    },

    {
      label: "Professional Summary",
      score: 10,
      status: isFilled(cvData?.summary)
        ? "good"
        : "warning",
      message: isFilled(cvData?.summary)
        ? "Professional summary is available."
        : "Add a short professional summary.",
    },

    {
      label: "Education",
      score: 15,
      status:
        getEducationCount() > 0
          ? "good"
          : "missing",
      message:
        getEducationCount() > 0
          ? `${getEducationCount()} education ${
              getEducationCount() === 1 ? "entry" : "entries"
            } added.`
          : "Add at least one education entry.",
    },

    {
      label: "Skills",
      score: 15,
      status:
        getSkillCount() >= 3
          ? "good"
          : getSkillCount() > 0
          ? "warning"
          : "missing",
      message:
        getSkillCount() >= 3
          ? `${getSkillCount()} skills added.`
          : getSkillCount() > 0
          ? "Add a few more relevant skills."
          : "Add relevant technical or professional skills.",
    },

    {
      label: "Projects",
      score: 15,
      status:
        getProjectCount() > 0
          ? "good"
          : "warning",
      message:
        getProjectCount() > 0
          ? `${getProjectCount()} project ${
              getProjectCount() === 1 ? "added" : "added"
            }.`
          : "Add projects with descriptions and technologies.",
    },

    {
      label: "Experience",
      score: 5,
      status:
        getExperienceCount() > 0
          ? "good"
          : "warning",
      message:
        getExperienceCount() > 0
          ? "Experience information is available."
          : "Experience is optional, especially for students and freshers.",
    },

    {
      label: "LinkedIn Profile",
      score: 5,
      status: isFilled(cvData?.linkedin)
        ? "good"
        : "warning",
      message: isFilled(cvData?.linkedin)
        ? "LinkedIn profile is added."
        : "Consider adding your LinkedIn profile.",
    },

    {
      label: "GitHub Profile",
      score: 5,
      status: isFilled(cvData?.github)
        ? "good"
        : "warning",
      message: isFilled(cvData?.github)
        ? "GitHub profile is added."
        : "Consider adding GitHub if relevant to your field.",
    },
  ];

  const earnedScore = checks.reduce((total, item) => {
    if (item.status === "good") {
      return total + item.score;
    }

    if (item.status === "warning") {
      return total + Math.round(item.score * 0.5);
    }

    return total;
  }, 0);

  const maxScore = checks.reduce(
    (total, item) => total + item.score,
    0
  );

  const percentage = Math.round(
    (earnedScore / maxScore) * 100
  );

  const getScoreText = () => {
    if (percentage >= 85) return "Strong ATS readiness";
    if (percentage >= 70) return "Good ATS readiness";
    if (percentage >= 50) return "Needs some improvement";
    return "Needs improvement";
  };

  const getStatusIcon = (status: CheckItem["status"]) => {
    if (status === "good") {
      return (
        <CheckCircle2
          size={18}
          className="text-green-400"
        />
      );
    }

    if (status === "warning") {
      return (
        <AlertCircle
          size={18}
          className="text-yellow-400"
        />
      );
    }

    return (
      <XCircle
        size={18}
        className="text-red-400"
      />
    );
  };

  return (
    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/70 p-6 shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10">
            <ShieldCheck
              size={24}
              className="text-indigo-400"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              ATS Resume Check
            </h2>

            <p className="text-sm text-slate-400">
              Check your CV for ATS-friendly content
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-white">
            {percentage}%
          </div>

          <p className="text-xs text-slate-400">
            {getScoreText()}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checks */}
      <div className="space-y-3">
        {checks.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              {getStatusIcon(item.status)}

              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-200">
                  {item.label}
                </p>

                <p className="text-xs text-slate-500 mt-0.5">
                  {item.message}
                </p>
              </div>
            </div>

            <span className="text-xs text-slate-500 whitespace-nowrap">
              {item.score} pts
            </span>
          </div>
        ))}
      </div>

      {/* Tips */}
      <div className="mt-6 rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-4">
        <h3 className="text-sm font-semibold text-indigo-300 mb-2">
          ATS Tips
        </h3>

        <ul className="text-xs text-slate-400 space-y-1.5">
          <li>• Use clear and standard section headings.</li>
          <li>• Add relevant skills and technologies.</li>
          <li>• Keep project descriptions concise and specific.</li>
          <li>• Use consistent dates and formatting.</li>
          <li>• Avoid putting important information inside images.</li>
        </ul>
      </div>
    </div>
  );
};

export default ATSChecker;
