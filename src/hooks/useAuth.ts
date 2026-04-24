import { useGetMeQuery, useLogoutAllMutation } from "@/stores/api/apiAuth";
import { logout, setCredentials } from "@/stores/slices/authSlice";
import type { RootState } from "@/stores/store";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

export const useAuth = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, isAuthenticated, isAdmin } = useSelector((state: RootState) => state.auth);

  // skip call api me if on login or register page
  const skipFetchMe = ["/login", "/register"].includes(location.pathname);

  // Fetch user info from /auth/me
  const {
    data: userData,
    error,
    isLoading: isFetchingMe,
    isSuccess,
  } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: skipFetchMe, // turn off loop
  });

  const [logoutAllMutation, { isLoading: isLogoutLoading }] = useLogoutAllMutation();

  useEffect(() => {
    if (isSuccess && userData) {
      if (userData.authenticated === false) {
        dispatch(logout());
      } else {
        dispatch(setCredentials(userData));
      }
    }
    if (error) {
      dispatch(logout());
      if (!skipFetchMe && (error as unknown as { status: number }).status === 401) {
        console.warn("Session expired or blacklisted.");
      }
    }
  }, [isSuccess, userData, error, dispatch, skipFetchMe]);

  const handleLogoutAll = async () => {
    try {
      await logoutAllMutation().unwrap();
      dispatch(logout());
      toast.success("Logout successfully!");
      // clear cookie and state
      globalThis.location.href = "/";
    } catch (error: unknown) {
      let errorMessage = "Logout failed!";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "object" && error !== null && "data" in error) {
        // Handle RTK Query error structure
        const rtkError = error as { data: { message?: string } };
        errorMessage = rtkError.data.message || errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  const handleKeycloakLogin = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    globalThis.location.href = `${apiUrl}/oauth2/authorization/keycloak`;
  };

  return {
    userData,
    user,
    handleKeycloakLogin,
    handleLogoutAll,
    isAuthenticated,
    isAdmin,
    isLoading: isFetchingMe || isLogoutLoading,
  };
};
