import profileImage from "../../assets/employees/sophia/images/profile.png";
import speakingImage from "../../assets/employees/sophia/images/speaking.png";
import heroImage from "../../assets/employees/sophia/images/hero.png";
import transparentImage from "../../assets/employees/sophia/images/transparent.png";
import thumbnailImage from "../../assets/employees/sophia/images/thumbnail.png";
import previewAudio from "../../assets/employees/sophia/audio/voice-preview.mp3";
import identity from "../../assets/employees/sophia/identity.md?raw";
import biography from "../../assets/employees/sophia/biography.md?raw";
import personality from "../../assets/employees/sophia/personality.md?raw";
import speakingRules from "../../assets/employees/sophia/speaking-rules.md?raw";
import voiceDNA from "../../assets/employees/sophia/voice-dna.md?raw";
import kpis from "../../assets/employees/sophia/kpis.md?raw";
import conversation01 from "../../assets/employees/sophia/conversations/conversation-01.md?raw";

import type { HeroEmployeeAsset, HeroEmployeeConversation, HeroEmployeeKpis, Status, TranscriptLine } from "@/types";

const SOPHIA_ID = "emp_sophia";

const fallbackKpis: HeroEmployeeKpis = {
  conversationsCompleted: "14,862",
  avgConversationDuration: "5m 12s",
  conversionRate: "38%",
  appointmentsScheduled: "2,846",
  customerSatisfaction: "98%",
  firstResponseTime: "1.3 sec",
  knowledgeAccuracy: "99.2%",
  aiHealthScore: "97/100",
  conversationQuality: "96/100",
  revenueInfluenced: "₹4.8 Crore"
};

const kpiKeyMap: Record<string, keyof HeroEmployeeKpis> = {
  "Conversations Completed": "conversationsCompleted",
  "Avg Conversation Duration": "avgConversationDuration",
  "Conversion Rate": "conversionRate",
  "Appointments Scheduled": "appointmentsScheduled",
  "Customer Satisfaction": "customerSatisfaction",
  "First Response Time": "firstResponseTime",
  "Knowledge Accuracy": "knowledgeAccuracy",
  "AI Health Score": "aiHealthScore",
  "Conversation Quality": "conversationQuality",
  "Revenue Influenced": "revenueInfluenced"
};

function parseTable(markdown: string): Record<string, string> {
  return markdown.split("\n").reduce<Record<string, string>>((values, line) => {
    const cells = line.split("|").map((cell) => cell.trim()).filter(Boolean);
    if (cells.length !== 2 || cells[0] === "KPI" || cells[0] === "Metric" || cells[0].startsWith("---")) return values;
    return { ...values, [cells[0]]: cells[1] };
  }, {});
}

function parseKpis(markdown: string): HeroEmployeeKpis {
  const values = parseTable(markdown);
  return Object.entries(kpiKeyMap).reduce<HeroEmployeeKpis>((result, [label, key]) => ({
    ...result,
    [key]: values[label] ?? fallbackKpis[key]
  }), fallbackKpis);
}

function section(markdown: string, title: string): string {
  const match = markdown.match(new RegExp(`## ${title}\\n\\n([\\s\\S]*?)(?=\\n---|\\n## |$)`));
  return match?.[1]?.trim() ?? "";
}

function parseList(markdown: string): string[] {
  return markdown.split("\n").filter((line) => line.trim().startsWith("- ")).map((line) => line.replace(/^- /, "").trim());
}

function parseConversation(markdown: string): HeroEmployeeConversation {
  const conversation = section(markdown, "Conversation");
  const transcript: TranscriptLine[] = conversation
    .split(/\n---\n/)
    .map((block, index) => {
      const speaker = block.match(/### (.+)/)?.[1]?.trim() ?? "Customer";
      const text = block.replace(/### .+\n/, "").trim().replace(/\n\n/g, "\n");
      return {
        id: `sophia_conversation_01_t${index + 1}`,
        speaker,
        role: speaker === "Sophia" ? "employee" as const : "customer" as const,
        text,
        timestamp: `${String(Math.floor(index * 36 / 60)).padStart(2, "0")}:${String((index * 36) % 60).padStart(2, "0")}`
      };
    })
    .filter((line) => line.text);

  return {
    id: "sophia-conversation-01",
    scenario: section(markdown, "Scenario"),
    objective: section(markdown, "Objective"),
    participants: {
      employee: markdown.match(/AI Employee:\n(.+)/)?.[1]?.trim() ?? "Sophia",
      customer: markdown.match(/Customer:\n(.+)/)?.[1]?.trim() ?? "Mr. Rajesh Kumar"
    },
    transcript,
    analytics: parseTable(section(markdown, "Analytics")),
    knowledgeUsed: parseList(section(markdown, "Knowledge Used")),
    outcome: parseList(section(markdown, "Outcome"))
  };
}

const sophiaAsset: HeroEmployeeAsset = {
  id: SOPHIA_ID,
  name: "Sophia",
  role: "Senior AI Sales Executive",
  department: "Enterprise Sales",
  status: "active" as Status,
  profileImage,
  speakingImage,
  heroImage,
  transparentImage,
  thumbnailImage,
  previewAudio,
  identity,
  biography,
  personality,
  speakingRules,
  voiceDNA,
  KPIs: parseKpis(kpis),
  conversations: [parseConversation(conversation01)]
};

export const employeeAssetService = {
  heroEmployeeId: SOPHIA_ID,
  getHeroEmployee: (): HeroEmployeeAsset => sophiaAsset,
  getByEmployeeId: (employeeId: string): HeroEmployeeAsset | undefined => (employeeId === SOPHIA_ID ? sophiaAsset : undefined),
  getProfileImage: (employeeId: string): string | undefined => employeeAssetService.getByEmployeeId(employeeId)?.profileImage,
  getPreviewAudio: (employeeId: string): string | undefined => employeeAssetService.getByEmployeeId(employeeId)?.previewAudio,
  preloadHeroEmployeeCoreAssets: () => {
    if (typeof document === "undefined") return;
    [
      { rel: "preload", as: "image", href: sophiaAsset.profileImage },
      { rel: "preload", as: "audio", href: sophiaAsset.previewAudio }
    ].forEach((attributes) => {
      if (document.querySelector(`link[href="${attributes.href}"]`)) return;
      const link = document.createElement("link");
      link.rel = attributes.rel;
      link.as = attributes.as;
      link.href = attributes.href;
      document.head.appendChild(link);
    });
  }
};
