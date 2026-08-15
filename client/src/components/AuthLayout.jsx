import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const FEATURES = [
  {
    title: "Tailored to your profile",
    text: "Reports built from your resume, self-description, and the target job description.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.3-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    title: "Real interview questions",
    text: "Technical and behavioral questions with the intent behind them and model answers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Structured roadmap",
    text: "A practical day-by-day plan to close skill gaps before your interview.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
];

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <ThemeToggle className="fixed right-4 top-4 z-20" />

      <aside className="hidden w-[45%] flex-col justify-between bg-slate-900 p-12 lg:flex dark:bg-slate-950 dark:border-r dark:border-slate-800">
        <Logo light />

        <div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Walk in prepared.
            <br />
            Walk out confident.
          </h2>
          <p className="mt-3 max-w-md text-base text-slate-400">
            Interview preparation reports generated from your actual profile and
            the role you're targeting.
          </p>

          <ul className="mt-10 space-y-6">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-brand-300">
                  {f.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} RoleNative. All rights reserved.
        </p>
      </aside>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
