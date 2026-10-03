import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // ================= FORM STATES =================

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    // Required fields
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://cvforge-production-a933.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go to dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">

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

      {/* ================= LOGIN AREA ================= */}

      <main className="relative flex-1 flex items-center justify-center px-6 py-10 overflow-hidden">

        {/* Background Glow */}

        <div className="absolute inset-0 pointer-events-none">

          <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />

          <div className="absolute bottom-[-200px] right-[-100px] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />

        </div>

        {/* LOGIN CONTENT */}

        <div className="relative w-full max-w-md">

          {/* HEADING */}

          <div className="text-center mb-8">

            <h1 className="text-3xl font-bold">
              Welcome back
            </h1>

            <p className="text-slate-400 text-sm mt-2">
              Sign in to continue building your CV
            </p>

          </div>

          {/* LOGIN CARD */}

          <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-7 shadow-2xl">

            <form
              className="space-y-5"
              onSubmit={handleLogin}
            >

              {/* EMAIL */}

              <div>

                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-lg bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />

                </div>

              </div>

              {/* PASSWORD */}

              <div>

                <div className="flex items-center justify-between mb-2">

                  <label className="text-sm font-medium text-slate-300">
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    Forgot password?
                  </button>

                </div>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 rounded-lg bg-slate-950 border border-white/10 text-white placeholder:text-slate-600 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white cursor-pointer"
                  >

                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                  </button>

                </div>

              </div>

              {/* ERROR */}

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* SIGN IN */}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition flex items-center justify-center gap-2 cursor-pointer"
              >

                {loading ? "Signing in..." : "Sign In"}

                {!loading && <ArrowRight size={18} />}

              </button>

            </form>

            {/* DIVIDER */}

            <div className="flex items-center gap-3 my-6">

              <div className="flex-1 h-px bg-white/10" />

              <span className="text-xs text-slate-500">
                OR
              </span>

              <div className="flex-1 h-px bg-white/10" />

            </div>

            {/* GOOGLE */}

            <button
              type="button"
              className="w-full py-3 rounded-lg border border-white/10 bg-slate-950 hover:bg-slate-800 transition font-medium flex items-center justify-center gap-2 cursor-pointer"
            >

              <FcGoogle className="text-xl" />

              Continue with Google

            </button>

            {/* SIGNUP */}

            <p className="text-center text-sm text-slate-400 mt-6">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
              >
                Create account
              </button>

            </p>

          </div>

          {/* COPYRIGHT */}

          <div className="text-center mt-5">

            <p className="text-xs text-slate-500">
              © 2026 CVForge. Build your future, one CV at a time.
            </p>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Login;