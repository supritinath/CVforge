import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Edit3,
  FileText,
  Download,
  LayoutTemplate,
  Home,
} from "lucide-react";

import Classic from "../templates/Classic";
import Modern from "../templates/Modern";
import Professional from "../templates/Professional";
import Developer from "../templates/Developer";

type CVData = {
  _id?: string;

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

  interests?: string[];
  hobbies?: string[];

  education?: any[];
  skills?: any[];
  projects?: any[];
  experience?: any[];
  experiences?: any[];
  certifications?: any[];
  achievements?: any[];
  languages?: any[];

  selectedTemplate?: string;
};

function CVPreview() {
  const navigate = useNavigate();

  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // =========================================================
  // LOAD CV DATA
  // =========================================================

  useEffect(() => {
    const savedData = sessionStorage.getItem("cvData");

    if (!savedData) {
      navigate("/create-cv");
      return;
    }

    try {
      const parsedData: CVData = JSON.parse(savedData);
      setCvData(parsedData);
    } catch (error) {
      console.error("Failed to load CV data:", error);

      sessionStorage.removeItem("cvData");
      navigate("/create-cv");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />

          <p className="text-sm text-slate-400">
            Loading your CV...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // NO DATA
  // =========================================================

  if (!cvData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="text-center">
          <FileText className="mx-auto mb-4 h-12 w-12 text-slate-600" />

          <h2 className="mb-2 text-xl font-semibold text-white">
            No CV data found
          </h2>

          <p className="mb-5 text-sm text-slate-400">
            Please create your CV first.
          </p>

          <button
            type="button"
            onClick={() => navigate("/create-cv")}
            className="cursor-pointer rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-500"
          >
            Create CV
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // RENDER SELECTED TEMPLATE
  // =========================================================

  const renderTemplate = () => {
    switch (cvData.selectedTemplate) {
      case "modern":
        return <Modern cvData={cvData} />;

      case "professional":
        return <Professional cvData={cvData} />;

      case "developer":
        return <Developer cvData={cvData} />;

      case "classic":
      default:
        return <Classic cvData={cvData} />;
    }
  };

  // =========================================================
  // NAVIGATION
  // =========================================================

  // Back to Dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  // Change Template
  // Existing cvData remains in sessionStorage
  const handleChangeTemplate = () => {
    navigate("/templates");
  };

  // Edit CV
  // Existing cvData remains in sessionStorage
  // So CreateCV will load the existing data
  const handleEditCV = () => {
    navigate("/create-cv");
  };

  // =========================================================
  // DOWNLOAD
  // =========================================================

  const handleDownloadCV = () => {
    window.print();
  };

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl">

        <div className="mx-auto max-w-[1200px] px-4 py-4 sm:px-6">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* =================================================
                LOGO
            ================================================= */}

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex w-fit cursor-pointer items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/20">
                <FileText className="h-5 w-5 text-white" />
              </div>

              <span className="text-xl font-bold tracking-tight">
                CV<span className="text-blue-500">Forge</span>
              </span>
            </button>

            {/* =================================================
                ACTION BUTTONS
            ================================================= */}

            <div className="flex flex-wrap items-center justify-start gap-2 sm:justify-end sm:gap-3">

              {/* BACK TO DASHBOARD */}

              <button
                type="button"
                onClick={handleBackToDashboard}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-3.5
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-300
                  transition-all
                  duration-200
                  hover:border-slate-600
                  hover:bg-slate-800
                  hover:text-white
                  sm:px-4
                "
              >
                <Home
                  size={17}
                  className="transition-transform duration-200 group-hover:-translate-x-0.5"
                />

                <span>Dashboard</span>
              </button>

              {/* CHANGE TEMPLATE */}

              <button
                type="button"
                onClick={handleChangeTemplate}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  px-3.5
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-300
                  transition-all
                  duration-200
                  hover:border-slate-600
                  hover:bg-slate-800
                  hover:text-white
                  sm:px-4
                "
              >
                <LayoutTemplate
                  size={17}
                  className="transition-transform duration-200 group-hover:scale-105"
                />

                <span>Change Template</span>
              </button>

              {/* EDIT CV */}

              <button
                type="button"
                onClick={handleEditCV}
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-blue-500/30
                  bg-blue-500/10
                  px-3.5
                  py-2.5
                  text-sm
                  font-medium
                  text-blue-300
                  transition-all
                  duration-200
                  hover:border-blue-400/40
                  hover:bg-blue-500/20
                  hover:text-blue-200
                  sm:px-4
                "
              >
                <Edit3 size={17} />

                <span>Edit CV</span>
              </button>

              {/* DOWNLOAD CV */}

              <button
                type="button"
                onClick={handleDownloadCV}
                className="
                  group
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                  rounded-xl
                  bg-blue-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-600/20
                  transition-all
                  duration-200
                  hover:bg-blue-500
                  hover:shadow-blue-500/30
                  active:scale-[0.98]
                  sm:px-5
                "
              >
                <Download
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />

                <span>Download CV</span>
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          PAGE CONTENT
      ===================================================== */}

      <main className="px-4 py-8 sm:px-6">

        {/* TITLE */}

        <div className="mx-auto mb-7 max-w-[1200px]">

          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h1 className="text-2xl font-bold text-white">
                CV Preview
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Review your CV before downloading it.
              </p>
            </div>

            {/* CURRENT TEMPLATE */}

            <div className="w-fit rounded-lg border border-white/10 bg-slate-900 px-3 py-1.5 text-xs text-slate-400">
              Template:{" "}
              <span className="font-medium capitalize text-slate-200">
                {cvData.selectedTemplate || "classic"}
              </span>
            </div>

          </div>
        </div>

        {/* ===================================================
            CV PREVIEW
        =================================================== */}

        <div className="w-full overflow-x-auto pb-12">

          <div className="flex min-w-fit justify-center">

            <div
              id="cv-preview"
              className="shrink-0"
            >
              {renderTemplate()}
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}

export default CVPreview;
