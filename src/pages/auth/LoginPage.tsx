import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema } from "@/schemas/authSchema";
import { type LoginForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function LoginPage() {
  const { handleKeycloakLogin } = useAuth();
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/assets/auth-bg.png')" }}
    >
      <div className="bg-white/80 backdrop-blur-md w-full max-w-md space-y-8 p-8 rounded-2xl shadow-2xl border border-white/20">
        <div className="text-center">
          <Badge variant="info" className="mb-2">
            v0.1.0 Beta
          </Badge>
          <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-2 text-muted sm:text-sm">
            Please enter your account to sign in.
          </p>
        </div>

        <div className="space-y-6 mt-8">
          <CustomButton 
            onClick={handleKeycloakLogin} 
            className="w-full flex items-center justify-center gap-2"
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
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
            </svg>
            Sign In with Keycloak SSO
          </CustomButton>
        </div>
        <div className="text-center text-sm">
          <span className="text-muted">Don't have an account? </span>
          <Link
            to="/register"
            className="font-medium text-primary hover:text-primary-hover underline underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
