import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router";

import { AppShell } from "@/components/layout";
import {
  ForgotPasswordPage,
  InvitationPage,
  LoginPage,
  OnboardingPage,
  RegisterPage,
  ResetPasswordPage,
  VerifyEmailPage
} from "@/modules/auth/pages";
import { EmployeeDirectoryPage, EmployeeWorkspacePage, HireEmployeePage } from "@/modules/employees/pages";
import {
  KnowledgeCenterPage,
  KnowledgeCollectionsPage,
  KnowledgeDetailPage,
  KnowledgeUploadPage,
  KnowledgeVersionsPage
} from "@/modules/knowledge/pages";
import { MarketingSubPage } from "@/modules/marketing/pages";
import { WorkforceDashboardPage } from "@/modules/workforce/pages";
import { FoundationModulePage } from "@/routes/pages/FoundationModulePage";
import { LandingPage } from "@/routes/pages/LandingPage";

const rootRoute = createRootRoute({
  component: () => <Outlet />
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage
});

const forgotRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/reset-password",
  component: ResetPasswordPage
});

const verifyEmailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/verify-email",
  component: VerifyEmailPage
});

const inviteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/invite/$token",
  component: InvitationPage
});

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/features",
  component: () => <MarketingSubPage page="features" />
});

const solutionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/solutions",
  component: () => <MarketingSubPage page="solutions" />
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: () => <MarketingSubPage page="pricing" />
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => <MarketingSubPage page="about" />
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => <MarketingSubPage page="contact" />
});

const onboardingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/onboarding",
  component: OnboardingPage
});

const appRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/app",
  component: AppShell
});

const appIndexRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/",
  component: WorkforceDashboardPage
});

const workforceRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/workforce",
  component: WorkforceDashboardPage
});

const employeesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/employees",
  component: EmployeeDirectoryPage
});

const hireEmployeeRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/employees/hire",
  component: HireEmployeePage
});

const employeeDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/employees/$employeeId",
  component: EmployeeWorkspacePage
});

const knowledgeRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/knowledge",
  component: KnowledgeCenterPage
});

const knowledgeUploadRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/knowledge/upload",
  component: KnowledgeUploadPage
});

const knowledgeCategoriesRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/knowledge/categories",
  component: KnowledgeCollectionsPage
});

const knowledgeVersionsRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/knowledge/versions",
  component: KnowledgeVersionsPage
});

const knowledgeDetailRoute = createRoute({
  getParentRoute: () => appRoute,
  path: "/knowledge/$knowledgeId",
  component: KnowledgeDetailPage
});

const moduleRoutes = [
  createRoute({
    getParentRoute: () => appRoute,
    path: "/contacts",
    component: () => <FoundationModulePage title="Contacts" description="Manage customer intelligence that powers campaigns and conversations." />
  }),
  createRoute({
    getParentRoute: () => appRoute,
    path: "/campaigns",
    component: () => <FoundationModulePage title="Campaigns" description="Assign business objectives to AI Employees and measure outcomes." />
  }),
  createRoute({
    getParentRoute: () => appRoute,
    path: "/conversations",
    component: () => <FoundationModulePage title="Conversations" description="Monitor live and historical customer conversations." />
  }),
  createRoute({
    getParentRoute: () => appRoute,
    path: "/analytics",
    component: () => <FoundationModulePage title="Analytics & Business Intelligence" description="Transform AI Workforce activity into measurable business outcomes." />
  }),
  createRoute({
    getParentRoute: () => appRoute,
    path: "/settings",
    component: () => <FoundationModulePage title="Settings" description="Configure security, notifications, integrations, billing, and workspace preferences." />
  }),
  createRoute({
    getParentRoute: () => appRoute,
    path: "/organization",
    component: () => <FoundationModulePage title="Organization Settings" description="Manage Nova Insurance users, departments, permissions, and enterprise controls." />
  }),
  createRoute({
    getParentRoute: () => appRoute,
    path: "/support",
    component: () => <FoundationModulePage title="Support" description="Access implementation guidance, documentation, and workspace support." />
  }),
  createRoute({
    getParentRoute: () => rootRoute,
    path: "/app/live",
    beforeLoad: () => {
      throw redirect({ to: "/app/conversations" });
    }
  })
];

const routeTree = rootRoute.addChildren([
  landingRoute,
  loginRoute,
  registerRoute,
  forgotRoute,
  resetPasswordRoute,
  verifyEmailRoute,
  inviteRoute,
  featuresRoute,
  solutionsRoute,
  pricingRoute,
  aboutRoute,
  contactRoute,
  onboardingRoute,
  appRoute.addChildren([
    appIndexRoute,
    workforceRoute,
    employeesRoute,
    hireEmployeeRoute,
    employeeDetailRoute,
    knowledgeRoute,
    knowledgeUploadRoute,
    knowledgeCategoriesRoute,
    knowledgeVersionsRoute,
    knowledgeDetailRoute,
    ...moduleRoutes.filter((route) => route.options.getParentRoute?.() === appRoute)
  ]),
  ...moduleRoutes.filter((route) => route.options.getParentRoute?.() === rootRoute)
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
