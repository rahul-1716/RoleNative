const LoadingScreen = ({ label = "Loading..." }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 dark:bg-slate-950">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-200 dark:border-slate-700" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-brand-600" />
      </div>
      <p className="mt-6 text-sm font-medium text-slate-600 dark:text-slate-400">{label}</p>
      <div className="mt-4 h-1 w-56 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full w-1/3 animate-loading-bar rounded-full bg-brand-600" />
      </div>
    </div>
  );
};

export default LoadingScreen;
