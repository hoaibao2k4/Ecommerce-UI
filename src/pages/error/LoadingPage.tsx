import LoadingSpinner from "@/components/ui/loading";

const LoadingPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
};

export default LoadingPage;
