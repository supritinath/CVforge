import React from "react";
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="border-t border-white/10 bg-slate-950">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-3 gap-10">

          {/* BRAND */}

          <div>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center">
                <FileText size={19} />
              </div>

              <span className="text-xl font-bold text-white">
                CV<span className="text-indigo-400">Forge</span>
              </span>
            </button>

            <p className="text-sm text-slate-500 mt-4 max-w-sm leading-relaxed">
              Create a professional CV easily and present your skills,
              education and projects with confidence.
            </p>

          </div>


          {/* PRODUCT */}

          <div>

            <h3 className="text-sm font-semibold text-white mb-4">
              Product
            </h3>

            <div className="space-y-3 text-sm text-slate-500">

              <button
                onClick={() => navigate("/templates")}
                className="block hover:text-white transition cursor-pointer"
              >
                Templates
              </button>

              <button
                onClick={() => navigate("/create-cv")}
                className="block hover:text-white transition cursor-pointer"
              >
                Create CV
              </button>

            </div>

          </div>


          {/* ACCOUNT */}

          <div>

            <h3 className="text-sm font-semibold text-white mb-4">
              Account
            </h3>

            <div className="space-y-3 text-sm text-slate-500">

              <button
                onClick={() => navigate("/login")}
                className="block hover:text-white transition cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="block hover:text-white transition cursor-pointer"
              >
                Sign Up
              </button>

            </div>

          </div>

        </div>


        {/* BOTTOM */}

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">

          <p className="text-xs text-slate-600">
            © 2026 CVForge. All rights reserved.
          </p>

          <p className="text-xs text-slate-600">
            Build your future with a better CV.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;