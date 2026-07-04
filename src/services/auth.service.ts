import { mockApi } from "@/mocks/mockApi";
import { session } from "@/mocks/mockData";
import type { Session } from "@/types";

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
    mockApi<Session>(() => ({
      ...session,
      user: { ...session.user, email: input.email }
    })),
  register: (input: RegisterInput) =>
    mockApi<Session>(() => ({
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
  forgotPassword: (email: string) => mockApi(() => ({ email, sent: true })),
  resetPassword: (input: ResetPasswordInput) =>
    mockApi(() => ({ token: input.token, updated: true })),
  verifyEmail: (token: string) =>
    mockApi<Session>(() => ({ ...session, token, verified: true })),
  acceptInvitation: (input: InvitationInput) =>
    mockApi<Session>(() => ({ ...session, token: input.token, verified: true })),
  refreshSession: () => mockApi<Session>(() => session),
  getCurrentUser: () => mockApi(() => session.user)
};
