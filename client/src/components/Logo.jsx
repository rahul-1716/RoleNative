const Logo = ({ light = false, size = "md" }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-9 w-9",
    lg: "h-11 w-11",
  };
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`flex items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm ${sizes[size]}`}
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-1/2 w-1/2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 18l6-6-6-6" />
          <path d="M8 6l-6 6 6 6" />
        </svg>
      </span>
      <span
        className={`text-xl font-bold tracking-tight ${light ? "text-white" : "text-slate-900 dark:text-white"}`}
      >
        Talent<span className="text-brand-600">Edge</span>
      </span>
    </div>
  );
};

export default Logo;
