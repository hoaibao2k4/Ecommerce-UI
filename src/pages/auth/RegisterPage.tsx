import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/schemas/authSchema";
import type { RegisterForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function RegisterPage() {
  const { handleKeycloakLogin } = useAuth();
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-[url('/assets/auth-bg.png')]">
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md space-y-8 p-10 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Please fill in the details below to register
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <CustomButton
            onClick={handleKeycloakLogin}
            className="w-full py-3 flex items-center justify-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
            Sign Up with Keycloak SSO
          </CustomButton>
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-primary hover:text-primary-hover"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
