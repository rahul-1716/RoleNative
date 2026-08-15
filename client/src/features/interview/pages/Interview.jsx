import React, { useState } from "react";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate, useParams } from "react-router";
import Logo from "../../../components/Logo";
import Button from "../../../components/Button";
import ThemeToggle from "../../../components/ThemeToggle";
import LoadingScreen from "../../../components/LoadingScreen";

const NAV_ITEMS = [
  {
    id: "technical",
    label: "Technical Questions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    id: "behavioral",
    label: "Behavioral Questions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    id: "roadmap",
    label: "Road Map",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <polygon points="3 11 22 2 13 21 11 13 3 11" />
      </svg>
    ),
  },
];

const scoreConfig = (score) => {
  if (score >= 80)
    return { color: "#34d399", text: "Strong match for this role" };
  if (score >= 60)
    return { color: "#fbbf24", text: "Good match, some gaps to close" };
  return { color: "#f87171", text: "Significant gaps to address" };
};

const ScoreRing = ({ value }) => {
  const { color, text } = scoreConfig(value);
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg width="132" height="132" viewBox="0 0 132 132">
          <circle cx="66" cy="66" r={r} fill="none" stroke="#e2e8f0" strokeWidth="10" className="dark:stroke-slate-700" />
          <circle
            cx="66"
            cy="66"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            transform="rotate(-90 66 66)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}%</span>
        </div>
      </div>
      <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">{text}</p>
    </div>
  );
};

const QuestionCard = ({ item, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start gap-3 px-5 py-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
      >
        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
          Q{index + 1}
        </span>
        <span className="flex-1 text-sm font-medium leading-relaxed text-slate-800 dark:text-slate-100">
          {item.question}
        </span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform dark:text-slate-500 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="space-y-4 border-t border-slate-100 bg-slate-50/50 px-5 py-4 dark:border-slate-800 dark:bg-slate-800/40">
          <div>
            <span className="inline-flex rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
              Intention
            </span>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.intention}</p>
          </div>
          <div>
            <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              Model Answer
            </span>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const RoadMapDay = ({ day }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center gap-3">
      <span className="rounded-lg bg-brand-600 px-2.5 py-1 text-xs font-bold text-white">
        Day {day.day}
      </span>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{day.focus}</h3>
    </div>
    <ul className="mt-4 space-y-2.5">
      {day.tasks.map((task, i) => (
        <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
          {task}
        </li>
      ))}
    </ul>
  </div>
);

const skillSeverity = {
  low: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-900",
  high: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-900",
};

const Interview = () => {
  const [activeNav, setActiveNav] = useState("technical");
  const { interviewId } = useParams();
  const { report, loading, downloadResumePdf } = useInterview(interviewId);
  const navigate = useNavigate();

  if (loading || !report) {
    return <LoadingScreen label="Loading your interview plan..." />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to home
            </button>
          </div>
        </div>
      </header>

      {/* Report title */}
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {report.title || "Interview Preparation Report"}
        </h1>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[240px_1fr_280px] sm:px-6">
        {/* Left nav */}
        <aside className="lg:block">
          <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
              Sections
            </p>
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveNav(item.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                    activeNav === item.id
                      ? "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                  }`}
                >
                  <span className={activeNav === item.id ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="mt-3 border-t border-slate-100 pt-3 dark:border-slate-800">
              <Button
                variant="secondary"
                className="w-full"
                onClick={() => downloadResumePdf(interviewId)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Resume
              </Button>
            </div>
          </div>
        </aside>

        {/* Center content */}
        <main className="min-w-0">
          {activeNav === "technical" && (
            <section className="animate-fade-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Technical Questions</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {report.technicalQuestions.length} questions
                </span>
              </div>
              <div className="space-y-3">
                {report.technicalQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "behavioral" && (
            <section className="animate-fade-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Behavioral Questions</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {report.behavioralQuestions.length} questions
                </span>
              </div>
              <div className="space-y-3">
                {report.behavioralQuestions.map((q, i) => (
                  <QuestionCard key={i} item={q} index={i} />
                ))}
              </div>
            </section>
          )}

          {activeNav === "roadmap" && (
            <section className="animate-fade-in">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preparation Road Map</h2>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  {report.preparationPlan.length}-day plan
                </span>
              </div>
              <div className="space-y-3">
                {report.preparationPlan.map((day) => (
                  <RoadMapDay key={day.day} day={day} />
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Right sidebar */}
        <aside>
          <div className="sticky top-20 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-center text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Match Score
              </p>
              <div className="mt-4">
                <ScoreRing value={report.matchScore} />
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Skill Gaps
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {report.skillGaps.map((gap, i) => (
                  <span
                    key={i}
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${skillSeverity[gap.severity] || skillSeverity.low}`}
                  >
                    {gap.skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Interview;
