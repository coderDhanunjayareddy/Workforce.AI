import { Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Seo } from "@/components/shared/Seo";
import { Button } from "@/components/ui";

import {
  BusinessImpactSection,
  ComparisonSection,
  FaqSection,
  FeatureGrid,
  FinalCta,
  HeroVisual,
  IndustriesSection,
  MarketingFooter,
  MarketingNav,
  MarketingSection,
  PlatformOverview,
  PricingPreview,
  ProductIntro,
  TestimonialsSection,
  TrustBar,
  WorkflowSection
} from "../components";

export function MarketingLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)]">
      <Seo
        title="Workforce AI | Build Your Digital Workforce"
        description="Hire, train, deploy, and manage AI Employees that automate customer conversations, qualify leads, support customers, and scale operations."
      />
      <MarketingNav />
      <main>
        <MarketingSection className="grid min-h-[calc(100vh-4rem)] items-center gap-12 lg:grid-cols-[1fr_0.95fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--ai-accent)]">Enterprise AI Workforce Platform</p>
            <h1 className="mt-4 font-display text-5xl font-semibold leading-tight text-[var(--text-primary)] lg:text-6xl">
              Build Your Digital Workforce
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--text-secondary)]">
              Hire, train, deploy and manage AI Employees that automate customer conversations, qualify leads, support customers and scale operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/register">
                <Button size="lg">
                  Hire Your First AI Employee
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary">
                  <CalendarCheck className="h-5 w-5" />
                  Book Live Demo
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-[var(--text-secondary)]">
              Trusted by forward-thinking organizations preparing customer operations for digital workforce scale.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, delay: 0.05 }}>
            <HeroVisual />
          </motion.div>
        </MarketingSection>
        <TrustBar />
        <ProductIntro />
        <FeatureGrid />
        <WorkflowSection />
        <PlatformOverview />
        <IndustriesSection />
        <BusinessImpactSection />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingPreview />
        <FaqSection />
        <FinalCta />
      </main>
      <MarketingFooter />
    </div>
  );
}
