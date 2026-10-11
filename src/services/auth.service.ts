import { mockApi } from "@/mocks/mockApi";
import { session } from "@/mocks/mockData";
import type { Session } from "@/types";
import { apiRequest, backendEnabled } from "./apiClient";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput extends LoginInput {
  firstName: string;
  lastName: string;
  organizationName: string;
}

export interface ResetPasswordInput {
  token: string;
  password: string;
}

export interface InvitationInput {
  token: string;
  password: string;
}

export const authService = {
  login: (input: LoginInput) =>
    backendEnabled ? apiRequest<Session>("/auth/login", { method: "POST", body: JSON.stringify(input) }) : mockApi<Session>(() => ({
      ...session,
      user: { ...session.user, email: input.email }
    })),
  register: (input: RegisterInput) =>
    backendEnabled ? Promise.reject(new Error("Registration is not available for this client workspace. Contact the workspace owner.")) : mockApi<Session>(() => ({
      ...session,
      verified: false,
      organizationId: undefined,
      user: {
        ...session.user,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email
      }
    })),
  logout: () => mockApi(() => ({ success: true })),
  forgotPassword: (email: string) => backendEnabled ? Promise.reject(new Error("Password recovery is managed by the workspace owner.")) : mockApi(() => ({ email, sent: true })),
  resetPassword: (input: ResetPasswordInput) =>
    backendEnabled ? Promise.reject(new Error("Password changes are managed by the workspace owner.")) : mockApi(() => ({ token: input.token, updated: true })),
  verifyEmail: (token: string) =>
    backendEnabled ? Promise.reject(new Error("Email verification is not available for this client workspace.")) : mockApi<Session>(() => ({ ...session, token, verified: true })),
  acceptInvitation: (input: InvitationInput) =>
    backendEnabled ? Promise.reject(new Error("Invitations are not available for this client workspace.")) : mockApi<Session>(() => ({ ...session, token: input.token, verified: true })),
  refreshSession: () => backendEnabled ? Promise.reject(new Error("Please sign in again to renew your session.")) : mockApi<Session>(() => session),
  getCurrentUser: () => mockApi(() => session.user)
};
