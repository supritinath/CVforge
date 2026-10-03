import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowLeft } from "lucide-react";

function TemplateSelection() {
  const navigate = useNavigate();

  const selectTemplate = (template: string) => {
    try {
      const savedData = sessionStorage.getItem("cvData");

      if (!savedData) {
        navigate("/create-cv");
        return;
      }

      const cvData = JSON.parse(savedData);

      if (!cvData || typeof cvData !== "object") {
        navigate("/create-cv");
        return;
      }

      const updatedData = {
        ...cvData,
        selectedTemplate: template,
      };

      sessionStorage.setItem(
        "cvData",
        JSON.stringify(updatedData)
      );

      navigate("/cv-preview");
    } catch (error) {
      console.error("Failed to select template:", error);
      navigate("/create-cv");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-8">
      <div className="max-w-5xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between mb-10">

          {/* CVForge Logo */}

          <button
            type="button"
            onClick={() => navigate("/create-cv")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center">
              <FileText size={20} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              CV<span className="text-indigo-400">Forge</span>
            </span>
          </button>

          {/* Back */}

          <button
            type="button"
            onClick={() => navigate("/create-cv")}
            className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium transition"
          >
            <ArrowLeft size={16} />
            Back to Edit
          </button>

        </div>

        {/* ================= TITLE ================= */}

        <div className="mb-7">

          <h1 className="text-3xl font-bold">
            Choose Your Template
          </h1>

          <p className="text-slate-400 mt-2">
            Select a design for your CV. Your details will remain unchanged.
          </p>

        </div>
        

        {/* ================= TEMPLATE GRID ================= */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* ================= CLASSIC ================= */}

          <button
            type="button"
            onClick={() => selectTemplate("classic")}
            className="group text-left rounded-2xl p-4 border border-white/10 bg-white/5 hover:border-blue-500 hover:bg-blue-500/5 transition cursor-pointer"
          >

            <div className="bg-white text-slate-900 rounded-xl p-4 h-36 overflow-hidden shadow-lg">

              <div className="border-b-2 border-slate-900 pb-2">

                <div className="font-bold text-sm">
                  Your Name
                </div>

                <div className="text-[8px] text-slate-500 mt-1">
                  email@example.com • +91 XXXXX XXXXX
                </div>

              </div>

              <div className="mt-3">

                <div className="font-bold text-[9px]">
                  Education
                </div>

                <div className="border-b border-slate-200 mt-1" />

                <div className="font-semibold text-[8px] mt-2">
                  B.Tech in Computer Science
                </div>

                <div className="text-[7px] text-slate-500">
                  College / University
                </div>

              </div>

            </div>

            <div className="mt-4">

              <h3 className="font-semibold text-lg">
                📄 Classic
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Clean and traditional CV layout
              </p>

            </div>

          </button>

          {/* ================= MODERN ================= */}

          <button
            type="button"
            onClick={() => selectTemplate("modern")}
            className="group text-left rounded-2xl p-4 border border-white/10 bg-white/5 hover:border-blue-500 hover:bg-blue-500/5 transition cursor-pointer"
          >

            <div className="bg-white text-slate-900 rounded-xl h-36 overflow-hidden flex shadow-lg">

              <div className="w-1/3 bg-slate-900 p-3 text-white">

                <div className="font-bold text-[9px]">
                  YOUR
                </div>

                <div className="font-bold text-[9px]">
                  NAME
                </div>

                <div className="mt-4 text-[7px] text-slate-300">
                  CONTACT
                </div>

                <div className="mt-2 space-y-1 text-[6px] text-slate-400">
                  <div>Email</div>
                  <div>Phone</div>
                  <div>GitHub</div>
                </div>

              </div>

              <div className="flex-1 p-3">

                <div className="font-bold text-[10px]">
                  About Me
                </div>

                <div className="border-b border-slate-200 mt-1" />

                <div className="font-bold text-[9px] mt-4">
                  Experience
                </div>

                <div className="border-b border-slate-200 mt-1" />

                <div className="font-bold text-[9px] mt-4">
                  Projects
                </div>

              </div>

            </div>

            <div className="mt-4">

              <h3 className="font-semibold text-lg">
                🎨 Modern
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Stylish two-column modern design
              </p>

            </div>

          </button>

          {/* ================= PROFESSIONAL ================= */}

          <button
            type="button"
            onClick={() => selectTemplate("professional")}
            className="group text-left rounded-2xl p-4 border border-white/10 bg-white/5 hover:border-blue-500 hover:bg-blue-500/5 transition cursor-pointer"
          >

            <div className="bg-white text-slate-900 rounded-xl p-4 h-36 overflow-hidden shadow-lg">

              <div className="text-center">

                <div className="font-bold text-sm">
                  YOUR NAME
                </div>

                <div className="text-[7px] text-slate-500 mt-1">
                  Email • Phone • LinkedIn • Portfolio
                </div>

              </div>

              <div className="mt-3">

                <div className="font-bold text-[8px] uppercase tracking-wider">
                  Professional Summary
                </div>

                <div className="border-b border-slate-900 mt-1" />

                <div className="font-bold text-[8px] mt-3 uppercase">
                  Experience
                </div>

                <div className="border-b border-slate-900 mt-1" />

              </div>

            </div>

            <div className="mt-4">

              <h3 className="font-semibold text-lg">
                💼 Professional
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Formal and corporate-friendly layout
              </p>

            </div>

          </button>

          {/* ================= DEVELOPER ================= */}

          <button
            type="button"
            onClick={() => selectTemplate("developer")}
            className="group text-left rounded-2xl p-4 border border-white/10 bg-white/5 hover:border-blue-500 hover:bg-blue-500/5 transition cursor-pointer"
          >

            <div className="bg-slate-950 text-white rounded-xl p-4 h-36 overflow-hidden border border-slate-800 shadow-lg">

              <div className="font-mono">

                <div className="text-green-400 text-[9px]">
                  &lt;Your Name /&gt;
                </div>

                <div className="text-[7px] text-slate-400 mt-2">
                  Developer • React • JavaScript
                </div>

                <div className="mt-3 text-[8px]">
                  <span className="text-blue-400">
                    const
                  </span>{" "}
                  projects = [
                </div>

                <div className="text-[7px] text-slate-400 ml-3">
                  StudyHub
                </div>

                <div className="text-[8px]">
                  ];
                </div>

              </div>

            </div>

            <div className="mt-4">

              <h3 className="font-semibold text-lg">
                💻 Developer
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                Tech-focused CV for developers
              </p>

            </div>

          </button>

        </div>

      </div>
    </div>
  );
}

export default TemplateSelection;