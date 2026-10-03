import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FileText,
  Plus,
  Download,
  Edit3,
  Eye,
  User,
  Clock3,
  LogOut,
  Trash2,
  X,
} from "lucide-react";

// =========================================================
// TYPES
// =========================================================

type UserData = {
  id: string;
  name: string;
  email: string;
};

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
  selectedTemplate?: string;
  profilePhoto?: string;

  education?: unknown[];
  skills?: unknown[];
  projects?: unknown[];
  experience?: unknown[];
  certifications?: unknown[];
  achievements?: unknown[];
  languages?: unknown[];
  interests?: string[];
  hobbies?: string[];

  createdAt?: string;
  updatedAt?: string;
};

// =========================================================
// COMPONENT
// =========================================================

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<UserData | null>(null);

  // Latest CV
  const [cvData, setCvData] = useState<CVData | null>(null);

  // All CVs
  const [cvs, setCvs] = useState<CVData[]>([]);

  const [loading, setLoading] = useState(true);

  // Delete modal
  const [deleteCVId, setDeleteCVId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // =========================================================
  // LOAD USER + CVS
  // =========================================================

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // =====================================================
        // USER
        // =====================================================

        const userResponse = await fetch(
          "https://cvforge-production-a933.up.railway.app/api/auth/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = await userResponse.json();

        if (!userResponse.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          sessionStorage.removeItem("cvData");
          sessionStorage.removeItem("cvLastUpdated");

          navigate("/login");
          return;
        }

        setUser(userData.user);

        localStorage.setItem(
          "user",
          JSON.stringify(userData.user)
        );

        // =====================================================
        // LOAD ALL CVS
        // =====================================================

        const cvResponse = await fetch(
          "https://cvforge-production-a933.up.railway.app/api/cvs",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const cvResult = await cvResponse.json();

        if (!cvResponse.ok) {
          console.error(
            "Failed to fetch CVs:",
            cvResult.message
          );

          setCvs([]);
          setCvData(null);
          return;
        }

        const backendCVs: CVData[] = Array.isArray(
          cvResult.cvs
        )
          ? cvResult.cvs
          : [];

        setCvs(backendCVs);

        // =====================================================
        // SELECT LATEST CV
        // =====================================================

        if (backendCVs.length > 0) {
          const latestCV = backendCVs[0];

          setCvData(latestCV);

          sessionStorage.setItem(
            "cvData",
            JSON.stringify(latestCV)
          );

          if (latestCV.updatedAt) {
            sessionStorage.setItem(
              "cvLastUpdated",
              latestCV.updatedAt
            );
          }
        } else {
          setCvData(null);

          sessionStorage.removeItem("cvData");
          sessionStorage.removeItem("cvLastUpdated");
        }
      } catch (error) {
        console.error(
          "Dashboard loading error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [navigate]);

  // =========================================================
  // CREATE NEW CV
  // =========================================================

  const handleCreateNewCV = () => {
    sessionStorage.removeItem("cvData");
    sessionStorage.removeItem("cvLastUpdated");

    navigate("/create-cv");
  };

  // =========================================================
  // EDIT CV
  // =========================================================

  const handleEditCV = (cv: CVData) => {
    sessionStorage.setItem(
      "cvData",
      JSON.stringify(cv)
    );

    if (cv.updatedAt) {
      sessionStorage.setItem(
        "cvLastUpdated",
        cv.updatedAt
      );
    }

    navigate("/create-cv");
  };

  // =========================================================
  // VIEW CV
  // =========================================================

  const handleViewCV = (cv: CVData) => {
    sessionStorage.setItem(
      "cvData",
      JSON.stringify(cv)
    );

    if (cv.updatedAt) {
      sessionStorage.setItem(
        "cvLastUpdated",
        cv.updatedAt
      );
    }

    navigate("/cv-preview");
  };

  // =========================================================
  // DOWNLOAD
  // =========================================================

  const handleDownload = (cv: CVData) => {
    sessionStorage.setItem(
      "cvData",
      JSON.stringify(cv)
    );

    if (cv.updatedAt) {
      sessionStorage.setItem(
        "cvLastUpdated",
        cv.updatedAt
      );
    }

    navigate("/cv-preview");
  };

  // =========================================================
  // OPEN DELETE MODAL
  // =========================================================

  const openDeleteModal = (cvId?: string) => {
    if (!cvId) return;

    setDeleteCVId(cvId);
  };

  // =========================================================
  // DELETE CV
  // =========================================================

  const handleDeleteCV = async () => {
    if (!deleteCVId) return;

    const token = localStorage.getItem("token");

    if (!token) {
      setDeleteCVId(null);
      navigate("/login");
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(
        `https://cvforge-production-a933.up.railway.app/api/cvs/${deleteCVId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Delete CV error:",
          data.message
        );

        setIsDeleting(false);
        return;
      }

      // Remove deleted CV from list
      const updatedCVs = cvs.filter(
        (cv) => cv._id !== deleteCVId
      );

      setCvs(updatedCVs);

      // =====================================================
      // IF DELETED CV WAS CURRENT CV
      // =====================================================

      if (cvData?._id === deleteCVId) {
        if (updatedCVs.length > 0) {
          const nextLatestCV = updatedCVs[0];

          setCvData(nextLatestCV);

          sessionStorage.setItem(
            "cvData",
            JSON.stringify(nextLatestCV)
          );

          if (nextLatestCV.updatedAt) {
            sessionStorage.setItem(
              "cvLastUpdated",
              nextLatestCV.updatedAt
            );
          }
        } else {
          setCvData(null);

          sessionStorage.removeItem("cvData");
          sessionStorage.removeItem("cvLastUpdated");
        }
      }

      // Close modal
      setDeleteCVId(null);
    } catch (error) {
      console.error(
        "Delete CV error:",
        error
      );
    } finally {
      setIsDeleting(false);
    }
  };

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    sessionStorage.removeItem("cvData");
    sessionStorage.removeItem("cvLastUpdated");

    navigate("/login");
  };

  // =========================================================
  // CV INFORMATION
  // =========================================================

  const hasCV = cvs.length > 0;

  const cvTitle =
    cvData?.professionalTitle ||
    (cvData?.name
      ? `${cvData.name}'s CV`
      : "My CV");

  const templateName =
    cvData?.selectedTemplate || "Classic";

  // =========================================================
  // PROFILE COMPLETION
  // =========================================================

  const profileCompletion = useMemo(() => {
    if (!cvData) return 0;

    let score = 0;

    if (cvData.name?.trim()) score += 10;
    if (cvData.email?.trim()) score += 10;
    if (cvData.phone?.trim()) score += 10;
    if (cvData.location?.trim()) score += 5;
    if (cvData.professionalTitle?.trim()) score += 10;
    if (cvData.summary?.trim()) score += 10;

    if (
      Array.isArray(cvData.education) &&
      cvData.education.length > 0
    ) {
      score += 15;
    }

    if (
      Array.isArray(cvData.skills) &&
      cvData.skills.length > 0
    ) {
      score += 10;
    }

    if (
      Array.isArray(cvData.projects) &&
      cvData.projects.length > 0
    ) {
      score += 10;
    }

    if (
      Array.isArray(cvData.experience) &&
      cvData.experience.length > 0
    ) {
      score += 5;
    }

    if (
      cvData.github?.trim() ||
      cvData.linkedin?.trim() ||
      cvData.portfolio?.trim() ||
      cvData.leetcode?.trim()
    ) {
      score += 5;
    }

    return Math.min(score, 100);
  }, [cvData]);

  // =========================================================
  // LAST UPDATED
  // =========================================================

  const getUpdatedText = (cv?: CVData | null) => {
    const dateValue =
      cv?.updatedAt ||
      sessionStorage.getItem("cvLastUpdated");

    if (!dateValue) {
      return "Not updated yet";
    }

    const updatedDate = new Date(dateValue);

    if (Number.isNaN(updatedDate.getTime())) {
      return "Recently";
    }

    return updatedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />

          <p className="mt-4 text-sm text-slate-400">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="absolute right-[-120px] top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />

        <div className="absolute bottom-[-150px] left-1/3 h-96 w-96 rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="relative z-10 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* LOGO */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 shadow-lg shadow-indigo-600/20">
              <FileText size={20} />
            </div>

            <span className="text-xl font-bold tracking-tight">
              CV
              <span className="text-indigo-400">
                Forge
              </span>
            </span>
          </button>

          {/* USER + LOGOUT */}

          <div className="flex items-center gap-4">

            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user?.name || "User"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.email || ""}
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/20 bg-indigo-500/10">
              <User
                size={18}
                className="text-indigo-400"
              />
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-300 transition hover:border-white/20 hover:bg-slate-800 hover:text-white"
            >
              <LogOut size={17} />

              <span className="hidden sm:inline">
                Logout
              </span>
            </button>

          </div>
        </div>
      </nav>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8">

        {/* WELCOME */}

        <section className="mb-8 overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/15 via-slate-900/80 to-slate-950 p-6 shadow-2xl shadow-indigo-950/20 sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-indigo-400">
                Your CV workspace
              </p>

              <h1 className="text-2xl font-bold sm:text-3xl">
                Welcome back,{" "}
                {user?.name?.split(" ")[0] ||
                  "there"}
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Manage your CV, update your information,
                and create a professional resume with
                CVForge.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCreateNewCV}
              className="flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              <Plus size={18} />

              {hasCV
                ? "Create New CV"
                : "Create Your CV"}
            </button>

          </div>
        </section>

        {/* ===================================================
            OVERVIEW
        =================================================== */}

        <section>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">
              Your Overview
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              A quick look at your CV activity.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* TOTAL CVS */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-indigo-500/10 p-3">
                  <FileText
                    size={21}
                    className="text-indigo-400"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Total CVs
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {cvs.length}
                  </h3>
                </div>

              </div>

              <p className="mt-4 text-xs text-slate-500">
                {hasCV
                  ? "CVs saved in your workspace"
                  : "No CV created yet"}
              </p>

            </div>

            {/* LAST UPDATED */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-purple-500/10 p-3">
                  <Clock3
                    size={21}
                    className="text-purple-400"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Last Updated
                  </p>

                  <h3 className="mt-1 text-lg font-bold">
                    {hasCV
                      ? getUpdatedText(cvData)
                      : "No activity"}
                  </h3>
                </div>

              </div>

              <p className="mt-4 text-xs text-slate-500">
                Based on your saved CV
              </p>

            </div>

            {/* PROFILE */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-sm">

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-pink-500/10 p-3">
                  <User
                    size={21}
                    className="text-pink-400"
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Profile
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {profileCompletion}%
                  </h3>
                </div>

              </div>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">

                <div
                  className="h-full rounded-full bg-pink-500 transition-all duration-500"
                  style={{
                    width: `${profileCompletion}%`,
                  }}
                />

              </div>

            </div>

          </div>
        </section>

        {/* ===================================================
            MAIN AREA
        =================================================== */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* RECENT CV */}

          <section className="lg:col-span-2">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 backdrop-blur-sm">

              <div className="border-b border-slate-800 px-6 py-5">

                <h2 className="text-lg font-semibold">
                  Your CV
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Open your saved CV to preview, edit or
                  download it.
                </p>

              </div>

              {hasCV ? (

                <div className="space-y-4 px-6 py-6">

                  {/* LATEST CV */}

                  {cvData && (
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10">
                          <FileText
                            size={22}
                            className="text-indigo-400"
                          />
                        </div>

                        <div>
                          <h3 className="font-medium">
                            {cvTitle}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">

                            <span>
                              {templateName} Template
                            </span>

                            <span>•</span>

                            <span>
                              Updated{" "}
                              {getUpdatedText(
                                cvData
                              )}
                            </span>

                          </div>
                        </div>

                      </div>

                      <div className="flex items-center gap-2">

                        {/* PREVIEW */}

                        <button
                          type="button"
                          title="Preview CV"
                          onClick={() =>
                            handleViewCV(
                              cvData
                            )
                          }
                          className="cursor-pointer rounded-lg border border-white/5 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                          <Eye size={18} />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          title="Edit CV"
                          onClick={() =>
                            handleEditCV(
                              cvData
                            )
                          }
                          className="cursor-pointer rounded-lg border border-white/5 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                          <Edit3 size={18} />
                        </button>

                        {/* DOWNLOAD */}

                        <button
                          type="button"
                          title="Download CV"
                          onClick={() =>
                            handleDownload(
                              cvData
                            )
                          }
                          className="cursor-pointer rounded-lg border border-white/5 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                        >
                          <Download size={18} />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          title="Delete CV"
                          onClick={() =>
                            openDeleteModal(
                              cvData._id
                            )
                          }
                          className="cursor-pointer rounded-lg border border-red-500/20 p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </div>
                  )}

                  {/* OTHER SAVED CVS */}

                  {cvs.length > 1 && (

                    <div className="border-t border-white/10 pt-5">

                      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
                        Other Saved CVs
                      </p>

                      <div className="space-y-2">

                        {cvs.slice(1).map(
                          (cv, index) => (

                            <div
                              key={
                                cv._id ||
                                index
                              }
                              className="flex flex-col gap-3 rounded-xl border border-white/5 bg-slate-950/60 p-4 sm:flex-row sm:items-center sm:justify-between"
                            >

                              <div>

                                <p className="text-sm font-medium">
                                  {cv.professionalTitle ||
                                    cv.name ||
                                    "Untitled CV"}
                                </p>

                                <p className="mt-1 text-xs text-slate-500">
                                  {cv.selectedTemplate ||
                                    "Classic"}{" "}
                                  Template
                                  {" • "}
                                  Updated{" "}
                                  {getUpdatedText(
                                    cv
                                  )}
                                </p>

                              </div>

                              <div className="flex items-center gap-2">

                                {/* PREVIEW */}

                                <button
                                  type="button"
                                  title="Preview CV"
                                  onClick={() =>
                                    handleViewCV(
                                      cv
                                    )
                                  }
                                  className="cursor-pointer rounded-lg border border-white/5 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                  <Eye
                                    size={17}
                                  />
                                </button>

                                {/* EDIT */}

                                <button
                                  type="button"
                                  title="Edit CV"
                                  onClick={() =>
                                    handleEditCV(
                                      cv
                                    )
                                  }
                                  className="cursor-pointer rounded-lg border border-white/5 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                  <Edit3
                                    size={17}
                                  />
                                </button>

                                {/* DOWNLOAD */}

                                <button
                                  type="button"
                                  title="Download CV"
                                  onClick={() =>
                                    handleDownload(
                                      cv
                                    )
                                  }
                                  className="cursor-pointer rounded-lg border border-white/5 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
                                >
                                  <Download
                                    size={17}
                                  />
                                </button>

                                {/* DELETE */}

                                <button
                                  type="button"
                                  title="Delete CV"
                                  onClick={() =>
                                    openDeleteModal(
                                      cv._id
                                    )
                                  }
                                  className="cursor-pointer rounded-lg border border-red-500/20 p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
                                >
                                  <Trash2
                                    size={17}
                                  />
                                </button>

                              </div>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>

              ) : (

                <div className="px-6 py-12 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10">
                    <FileText
                      size={26}
                      className="text-indigo-400"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-semibold">
                    No CV yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                    You haven't created a CV yet. Start
                    adding your information and create your
                    first professional CV.
                  </p>

                  <button
                    type="button"
                    onClick={handleCreateNewCV}
                    className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500"
                  >
                    <Plus size={18} />
                    Create CV
                  </button>

                </div>
              )}

            </div>
          </section>

          {/* PROFILE COMPLETION */}

          <aside>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 backdrop-blur-sm">

              <div className="flex items-start gap-3">

                <div className="rounded-xl bg-indigo-500/10 p-3">
                  <User
                    size={20}
                    className="text-indigo-400"
                  />
                </div>

                <div>

                  <h3 className="font-semibold">
                    Profile Completion
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {hasCV
                      ? "Complete more sections to make your CV more informative."
                      : "Create a CV to start completing your profile."}
                  </p>

                </div>

              </div>

              <div className="mt-5">

                <div className="mb-2 flex justify-between text-xs">

                  <span className="text-slate-400">
                    Completion
                  </span>

                  <span className="font-semibold">
                    {profileCompletion}%
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                    style={{
                      width: `${profileCompletion}%`,
                    }}
                  />

                </div>

              </div>

              <button
                type="button"
                onClick={handleCreateNewCV}
                className="mt-5 w-full cursor-pointer rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                {hasCV
                  ? "Complete Your CV"
                  : "Start Your CV"}
              </button>

            </div>

          </aside>

        </div>
      </main>

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}

      {deleteCVId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl shadow-black/40">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => setDeleteCVId(null)}
              disabled={isDeleting}
              className="absolute right-4 top-4 cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={18} />
            </button>

            {/* ICON */}

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
              <Trash2
                size={25}
                className="text-red-400"
              />
            </div>

            {/* TITLE */}

            <h2 className="mt-5 text-center text-xl font-semibold text-white">
              Delete CV?
            </h2>

            {/* DESCRIPTION */}

            <p className="mt-2 text-center text-sm leading-6 text-slate-400">
              Are you sure you want to delete this CV?
              This action cannot be undone.
            </p>

            {/* BUTTONS */}

            <div className="mt-6 flex gap-3">

              <button
                type="button"
                onClick={() =>
                  setDeleteCVId(null)
                }
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-xl border border-white/10 bg-slate-800 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteCV}
                disabled={isDeleting}
                className="flex-1 cursor-pointer rounded-xl bg-red-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting
                  ? "Deleting..."
                  : "Delete CV"}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Dashboard;