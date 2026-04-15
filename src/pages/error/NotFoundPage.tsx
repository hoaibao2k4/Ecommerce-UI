import CustomButton from "@/components/ui/button";
import { HiArrowLeft, HiHome } from "react-icons/hi2";
import { useNavigate } from "react-router";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-9xl font-extrabold text-gray-200 dark:text-gray-800 leading-none select-none">
          404
        </h1>
        
        <div className="relative -mt-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Page Not Found
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Sorry, the page you are looking for does not exist or has been moved to a new address.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          <CustomButton
            onClick={() => navigate("/")}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-indigo-200 dark:shadow-none"
          >
            <HiHome className="text-xl" />
            Back to Home
          </CustomButton>
          
          <CustomButton
            variant="secondary"
            onClick={() => navigate(-1)}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium transition-colors"
          >
            <HiArrowLeft className="text-xl" />
            Go Back
          </CustomButton>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm text-gray-400">
            If you believe this is a system error, please report it to the administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
