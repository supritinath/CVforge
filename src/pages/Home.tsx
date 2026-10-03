import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  PenLine,
  Download,
  ArrowRight,
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ================= NAVBAR ================= */}

      <nav className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          {/* LOGO */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
              <FileText size={20} />
            </div>

            <span className="text-xl font-bold">
              CV<span className="text-indigo-400">Forge</span>
            </span>
          </button>

        </div>
      </nav>


      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="max-w-3xl mx-auto text-center">

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build a CV that
            <span className="text-indigo-400">
              {" "}represents you.
            </span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Create a professional CV even if you're a beginner.
            Add your education, skills and projects and present
            them professionally.
          </p>

          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">

            {/* LOGIN */}

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="cursor-pointer w-full sm:w-auto px-7 py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 font-semibold flex items-center justify-center gap-2 transition"
            >
              Login
              <ArrowRight size={18} />
            </button>


            {/* SIGN UP */}

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="cursor-pointer w-full sm:w-auto px-7 py-3.5 rounded-xl border border-white/15 hover:bg-white/5 font-semibold transition"
            >
              Sign up
            </button>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="how-it-works"
        className="max-w-6xl mx-auto px-6 pb-24"
      >

        <div className="grid md:grid-cols-3 gap-6">

          <FeatureCard
            icon={<FileText />}
            title="Easy CV Builder"
            description="Enter your information section by section with a simple and clean interface."
          />

          <FeatureCard
            icon={<PenLine />}
            title="Smart Suggestions"
            description="Improve your CV wording and create professional descriptions from your details."
          />

          <FeatureCard
            icon={<Download />}
            title="Ready to Download"
            description="Preview your CV and download a polished version when you're done."
          />

        </div>

      </section>

    </div>
  );
}


/* ================= FEATURE CARD ================= */

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">

      <div className="w-11 h-11 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5">
        {icon}
      </div>

      <h3 className="text-lg font-semibold mb-2">
        {title}
      </h3>

      <p className="text-slate-400 text-sm leading-relaxed">
        {description}
      </p>

    </div>
  );
}

export default Home;