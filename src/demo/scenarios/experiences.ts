import type { DemoExperience } from "../types/demo.types";

export const demoExperiences: DemoExperience[] = [
  {
    id: "executive",
    title: "Executive Overview",
    durationLabel: "Five minutes",
    description: "A focused leadership story covering business impact, AI Workforce, live Conversations and Analytics.",
    scenarioIds: ["welcome", "dashboard", "employees", "liveCalls", "analytics", "closing"],
    autoPlay: true
  },
  {
    id: "investor",
    title: "Investor Walkthrough",
    durationLabel: "Ten minutes",
    description: "The complete end-to-end platform narrative across Workforce, Knowledge, Campaigns, Conversations and outcomes.",
    scenarioIds: ["welcome", "dashboard", "employees", "workspace", "knowledge", "contacts", "campaigns", "liveCalls", "analytics", "closing"],
    autoPlay: true
  },
  {
    id: "explore",
    title: "Explore Freely",
    durationLabel: "Self-guided",
    description: "Keep Sophia and the demo controller available while navigating modules at your own pace.",
    scenarioIds: ["welcome", "dashboard", "employees", "workspace", "knowledge", "contacts", "campaigns", "liveCalls", "analytics", "closing"],
    autoPlay: false
  }
];
