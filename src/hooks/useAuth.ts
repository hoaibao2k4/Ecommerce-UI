import {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} from "@/stores/api/apiAuth";
import { logout, setCredentials } from "@/stores/slices/authSlice";
import type { RootState } from "@/stores/store";
import type { LoginForm, RegisterForm } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getErrorMessage } from "@/utils/errorHelper";
import toast from "react-hot-toast";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useSelector(
    (state: RootState) => state.auth,
  );

  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [registerMutation, { isLoading: isRegisterLoading }] =
    useRegisterMutation();
  const [logoutMutation, { isLoading: isLogoutLoading }] = useLogoutMutation();

  const handleLogin = async (data: LoginForm) => {
    try {
      const res = await loginMutation(data).unwrap();
      dispatch(setCredentials(res));
      toast.success(`Welcome back, ${res.username}!`);
      if (res.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleRegister = async (data: RegisterForm) => {
    try {
      await registerMutation(data).unwrap();
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleLogout = async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logout());
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    handleLogin,
    handleLogout,
    handleRegister,
    isAuthenticated,
    isAdmin,
    isLoading: isLoginLoading || isRegisterLoading || isLogoutLoading,
  };
};
