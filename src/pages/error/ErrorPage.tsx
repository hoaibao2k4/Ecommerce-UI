import CustomButton from "@/components/ui/button";
import { HiArrowPath, HiHome } from "react-icons/hi2";
import { useNavigate } from "react-router";

interface ErrorPageProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorPage = ({ 
  message = "An error occurred during data processing. Please try again later.", 
  onRetry 
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="max-w-md w-full">
        <div className="mb-6 inline-flex p-4 rounded-full bg-red-50 text-red-500 shadow-inner">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3">
          Oops! Something went wrong
        </h2>
        
        <p className="text-slate-500 mb-8 leading-relaxed">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <CustomButton
              onClick={onRetry}
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
            >
              <HiArrowPath className="text-lg" />
              Try Again
            </CustomButton>
          )}
          
          <CustomButton
            variant="secondary"
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95"
          >
            <HiHome className="text-lg" />
            Back to Home
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
