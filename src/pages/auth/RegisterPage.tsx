import CustomButton from "@/components/ui/button";
import CustomInput from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema } from "@/schemas/authSchema";
import type { RegisterForm } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { handleRegister, isLoading } = useAuth();
  const onSubmit = (data: RegisterForm) => {
    handleRegister(data);
  };
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

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            id="username"
            label="Username"
            placeholder="johndoe"
            type="text"
            error={errors.username?.message}
            {...register("username")}
          />

          <CustomInput
            id="email"
            label="Email Address"
            placeholder="name@example.com"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />

          <CustomInput
            id="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            error={errors.password?.message}
            {...register("password")}
          />

          <CustomInput
            id="confirm-password"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <div className="pt-4">
            <CustomButton
              className="w-full py-3"
              variant="primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </CustomButton>
          </div>
        </form>

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
