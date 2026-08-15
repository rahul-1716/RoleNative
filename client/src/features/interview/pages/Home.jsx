import React, { useState, useRef } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate } from "react-router";
import Logo from "../../../components/Logo";
import Button from "../../../components/Button";
import ThemeToggle from "../../../components/ThemeToggle";
import LoadingScreen from "../../../components/LoadingScreen";

const CONTACT_LINKS = [
  {
    label: "LinkedIn",
    handle: "rahul17nishad",
    href: "https://www.linkedin.com/in/rahul17nishad/",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    handle: "rahul-1716",
    href: "https://github.com/rahul-1716",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026a9.564 9.564 0 0 1 2.504-.337 9.57 9.57 0 0 1 2.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
];

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const { user, handleLogout } = useAuth();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [error, setError] = useState("");
  const [generating, setGenerating] = useState(false);
  const [fileName, setFileName] = useState("");
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    setError("");
    if (!jobDescription.trim()) {
      setError("Please paste the job description first.");
      return;
    }
    const resumeFile = resumeInputRef.current.files[0];
    if (!resumeFile && !selfDescription.trim()) {
      setError("Please upload a resume or fill in your self-description.");
      return;
    }
    setGenerating(true);
    try {
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      navigate(`/interview/${data._id}`);
    } catch (err) {
      setError(
        err?.response?.data?.error ||
          err?.message ||
          "Failed to generate the report. Please try again.",
      );
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <LoadingScreen label="Loading your interview plan..." />;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            {user?.username && (
              <span className="hidden text-sm font-medium text-slate-600 dark:text-slate-400 sm:block">
                {user.username}
              </span>
            )}
            <ThemeToggle />
            <Button variant="ghost" onClick={handleLogout}>
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        {/* Hero */}
        <section className="max-w-3xl animate-slide-up">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Create your{" "}
            <span className="text-brand-600">custom interview plan</span>
          </h1>
          <p className="mt-3 text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Let our AI analyze the job requirements and your unique profile to
            build a winning interview strategy — questions, model answers, and a
            day-by-day roadmap.
          </p>
        </section>

        {/* Generator card */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="grid md:grid-cols-2">
            {/* Left — Job Description */}
            <div className="border-b border-slate-200 p-6 md:border-b-0 md:border-r md:p-8 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                  Target Job Description
                </h2>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                  Required
                </span>
              </div>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                maxLength={5000}
                placeholder={`Paste the full job description here...\ne.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design..."`}
                className="mt-4 h-64 w-full resize-none rounded-lg border border-slate-300 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
              />
              <p className="mt-2 text-right text-xs text-slate-400 dark:text-slate-500">
                {jobDescription.length} / 5000 chars
              </p>
            </div>

            {/* Right — Profile */}
            <div className="p-6 md:p-8">
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                Your Profile
              </h2>

              {/* Resume upload */}
              <div className="mt-4">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Upload Resume{" "}
                  <span className="ml-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                    Best results
                  </span>
                </p>
                <label
                  htmlFor="resume"
                  className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 text-center transition hover:border-brand-400 hover:bg-brand-50/40 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-brand-500 dark:hover:bg-brand-900/20"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7 text-slate-400 dark:text-slate-500"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Click to upload or drag &amp; drop
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    PDF or DOCX (Max 5MB)
                  </span>
                  <input
                    ref={resumeInputRef}
                    hidden
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf,.docx"
                    onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  />
                </label>
                {fileName && (
                  <p className="mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {fileName} selected
                  </p>
                )}
              </div>

              {/* OR divider */}
              <div className="my-5 flex items-center gap-3">
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
                <span className="text-xs font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
                  or
                </span>
                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
              </div>

              {/* Self description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Quick Self-Description
                </label>
                <textarea
                  id="selfDescription"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  className="mt-2 h-28 w-full resize-none rounded-lg border border-slate-300 bg-slate-50 p-3.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
                />
              </div>

              <p className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-relaxed text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 h-4 w-4 shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Either a resume or a self-description is required to generate a
                personalized plan.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col items-center gap-3 border-t border-slate-200 bg-slate-50/50 px-6 py-5 sm:flex-row sm:justify-between md:px-8 dark:border-slate-800 dark:bg-slate-800/40">
            <span className="text-xs text-slate-400 dark:text-slate-500">
              AI-powered strategy generation · takes ~30 seconds
            </span>
            <div className="w-full sm:w-auto">
              {error && (
                <p className="mb-2 rounded-lg border border-red-200 bg-red-50 px-3.5 py-2 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
                  {error}
                </p>
              )}
              <Button
                className="w-full sm:w-auto"
                onClick={handleGenerateReport}
                disabled={generating}
              >
                {generating ? (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="h-4 w-4 animate-spin"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                    </svg>
                    Generate My Interview Strategy
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        {/* Recent reports */}
        {reports.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Plans
            </h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <li
                  key={report._id}
                  onClick={() => navigate(`/interview/${report._id}`)}
                  className="cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-500"
                >
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {report.title || "Untitled Position"}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                    {new Date(report.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <span
                    className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                      report.matchScore >= 80
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
                        : report.matchScore >= 60
                          ? "bg-amber-50 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                          : "bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    }`}
                  >
                    {report.matchScore}% match
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Contact */}
        <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Get in touch
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-500 dark:text-slate-400">
            Questions about this project or want to collaborate? Find me on
            LinkedIn or check out my other work on GitHub.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-5 transition hover:border-brand-300 hover:bg-brand-50/40 dark:border-slate-800 dark:hover:border-brand-500 dark:hover:bg-brand-900/20"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white transition group-hover:bg-brand-600 dark:bg-slate-800">
                  {link.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {link.label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {link.handle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-slate-400 sm:flex-row sm:px-6 dark:text-slate-500">
          <p>© {new Date().getFullYear()} RoleNative. Built with care.</p>
          <div className="flex gap-6">
            <a
              href="#"
              className="transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="transition hover:text-slate-600 dark:hover:text-slate-300"
            >
              Help Center
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
