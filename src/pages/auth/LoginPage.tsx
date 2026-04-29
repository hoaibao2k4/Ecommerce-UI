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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const { handleLogin, isLoading } = useAuth();
  const onSubmit = (data: LoginForm) => {
    handleLogin(data);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat bg-[url('/assets/auth-bg.png')]">
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

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            id="username"
            label="Username"
            type="text"
            placeholder="Enter your username"
            error={errors.username?.message}
            {...register("username")}
          />

          <CustomInput
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <CustomButton type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </CustomButton>
        </form>
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
