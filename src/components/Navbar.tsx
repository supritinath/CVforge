import React from "react";
import { FileText, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("cvData");
    navigate("/login");
  };

  return (
    <nav className="border-b border-white/10 bg-slate-950">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500">
            <FileText size={20} />
          </div>

          <span className="text-xl font-bold text-white">
            CV<span className="text-indigo-400">Forge</span>
          </span>
        </button>

        {/* NAVIGATION */}
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">

          <button
            type="button"
            onClick={() => navigate("/")}
            className="transition hover:text-white"
          >
            Home
          </button>

          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="transition hover:text-white"
          >
            Templates
          </button>

          <button
            type="button"
            onClick={() =>
              document
                .getElementById("how-it-works")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="transition hover:text-white"
          >
            How It Works
          </button>

        </div>

        {/* LOGOUT */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut size={17} />
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
