export type Role = "admin" | "user";

export const ROLES = {
  ADMIN: "admin" as Role,
  USER: "user" as Role,
};

export interface AuthenticationResponse {
  username: string;
  email: string;
  role: Role;
  accessToken?: string;
  refreshToken?: string;
}

export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthState {
  user: AuthenticationResponse | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}
