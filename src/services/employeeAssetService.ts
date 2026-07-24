import sophiaProfileImage from "../../assets/employees/sophia/images/profile.png";
import sophiaSpeakingImage from "../../assets/employees/sophia/images/speaking.png";
import sophiaHeroImage from "../../assets/employees/sophia/images/hero.png";
import sophiaTransparentImage from "../../assets/employees/sophia/images/transparent.png";
import sophiaThumbnailImage from "../../assets/employees/sophia/images/thumbnail.png";
import sophiaPreviewAudio from "../../assets/employees/sophia/audio/voice-preview.mp3";
import sophiaIdentity from "../../assets/employees/sophia/identity.md?raw";
import sophiaBiography from "../../assets/employees/sophia/biography.md?raw";
import sophiaPersonality from "../../assets/employees/sophia/personality.md?raw";
import sophiaSpeakingRules from "../../assets/employees/sophia/speaking-rules.md?raw";
import sophiaVoiceDNA from "../../assets/employees/sophia/voice-dna.md?raw";
import sophiaKpis from "../../assets/employees/sophia/kpis.md?raw";
import sophiaConversation01 from "../../assets/employees/sophia/conversations/conversation-01.md?raw";
import emmaProfileImage from "../../assets/employees/emma/images/profile.png";
import emmaSpeakingImage from "../../assets/employees/emma/images/speaking.png";
import emmaHeroImage from "../../assets/employees/emma/images/hero.png";
import emmaTransparentImage from "../../assets/employees/emma/images/transparent.png";
import emmaThumbnailImage from "../../assets/employees/emma/images/thumbnail.png";
import emmaPreviewAudio from "../../assets/employees/emma/audio/voice-preview.mp3";
import emmaIdentity from "../../assets/employees/emma/identity.md?raw";
import emmaBiography from "../../assets/employees/emma/biography.md?raw";
import emmaPersonality from "../../assets/employees/emma/personality.md?raw";
import emmaSpeakingRules from "../../assets/employees/emma/speaking-rules.md?raw";
import emmaVoiceDNA from "../../assets/employees/emma/voice-dna.md?raw";
import emmaKpis from "../../assets/employees/emma/kpis.md?raw";
import emmaConversation01 from "../../assets/employees/emma/conversations/conversation-01.md?raw";

import type { HeroEmployeeAsset, HeroEmployeeConversation, HeroEmployeeKpis, Status, TranscriptLine } from "@/types";

const SOPHIA_ID = "emp_sophia";
const EMMA_ID = "emp_emma";

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
  "Revenue Influenced": "revenueInfluenced",
  "Customers Assisted": "customersAssisted",
  "Avg Resolution Time": "avgResolutionTime",
  "First Contact Resolution": "firstContactResolution",
  "Renewal Assistance": "renewalAssistance",
  "Retention Contribution": "retentionContribution",
  "Escalation Rate": "escalationRate"
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
  return Object.entries(kpiKeyMap).reduce<HeroEmployeeKpis>((result, [label, key]) => {
    const value = values[label];
    return value ? { ...result, [key]: value } : result;
  }, {});
}

function section(markdown: string, title: string): string {
  const match = markdown.match(new RegExp(`## ${title}\\n\\n([\\s\\S]*?)(?=\\n---|\\n## |$)`));
  return match?.[1]?.trim() ?? "";
}

function parseList(markdown: string): string[] {
  return markdown.split("\n").filter((line) => line.trim().startsWith("- ")).map((line) => line.replace(/^- /, "").trim());
}

function parseConversation(markdown: string, employeeName: string, idPrefix: string): HeroEmployeeConversation {
  const conversation = section(markdown, "Conversation");
  const transcript: TranscriptLine[] = conversation
    .split(/\n---\n/)
    .map((block, index) => {
      const speaker = block.match(/### (.+)/)?.[1]?.trim() ?? "Customer";
      const text = block.replace(/### .+\n/, "").trim().replace(/\n\n/g, "\n");
      return {
        id: `${idPrefix}_conversation_01_t${index + 1}`,
        speaker,
        role: speaker === employeeName ? "employee" as const : "customer" as const,
        text,
        timestamp: `${String(Math.floor(index * 36 / 60)).padStart(2, "0")}:${String((index * 36) % 60).padStart(2, "0")}`
      };
    })
    .filter((line) => line.text);

  return {
    id: `${idPrefix}-conversation-01`,
    scenario: section(markdown, "Scenario"),
    objective: section(markdown, "Objective"),
    participants: {
      employee: markdown.match(/AI Employee:\n(.+)/)?.[1]?.trim() ?? employeeName,
      customer: markdown.match(/Customer:\n(.+)/)?.[1]?.trim() ?? "Customer"
    },
    transcript,
    analytics: parseTable(section(markdown, "Analytics")),
    knowledgeUsed: parseList(section(markdown, "Knowledge Used")),
    outcome: parseList(section(markdown, "Outcome"))
  };
}

function createAsset(input: Omit<HeroEmployeeAsset, "KPIs" | "conversations"> & { kpis: string; conversation: string }): HeroEmployeeAsset {
  return {
    ...input,
    KPIs: parseKpis(input.kpis),
    conversations: [parseConversation(input.conversation, input.name, input.name.toLowerCase())]
  };
}

const sophiaAsset = createAsset({
  id: SOPHIA_ID,
  name: "Sophia",
  role: "Senior AI Sales Executive",
  department: "Enterprise Sales",
  status: "active" as Status,
  profileImage: sophiaProfileImage,
  speakingImage: sophiaSpeakingImage,
  heroImage: sophiaHeroImage,
  transparentImage: sophiaTransparentImage,
  thumbnailImage: sophiaThumbnailImage,
  previewAudio: sophiaPreviewAudio,
  identity: sophiaIdentity,
  biography: sophiaBiography,
  personality: sophiaPersonality,
  speakingRules: sophiaSpeakingRules,
  voiceDNA: sophiaVoiceDNA,
  kpis: sophiaKpis,
  conversation: sophiaConversation01
});

const emmaAsset = createAsset({
  id: EMMA_ID,
  name: "Emma",
  role: "Senior Customer Success Specialist",
  department: "Customer Success",
  status: "active" as Status,
  profileImage: emmaProfileImage,
  speakingImage: emmaSpeakingImage,
  heroImage: emmaHeroImage,
  transparentImage: emmaTransparentImage,
  thumbnailImage: emmaThumbnailImage,
  previewAudio: emmaPreviewAudio,
  identity: emmaIdentity,
  biography: emmaBiography,
  personality: emmaPersonality,
  speakingRules: emmaSpeakingRules,
  voiceDNA: emmaVoiceDNA,
  kpis: emmaKpis,
  conversation: emmaConversation01
});

const employeeAssets = [sophiaAsset, emmaAsset];

export const employeeAssetService = {
  heroEmployeeId: SOPHIA_ID,
  customerSuccessHeroEmployeeId: EMMA_ID,
  getHeroEmployee: (): HeroEmployeeAsset => sophiaAsset,
  getCustomerSuccessHeroEmployee: (): HeroEmployeeAsset => emmaAsset,
  getAssets: (): HeroEmployeeAsset[] => employeeAssets,
  getByEmployeeId: (employeeId: string): HeroEmployeeAsset | undefined => employeeAssets.find((asset) => asset.id === employeeId),
  getByEmployeeName: (employeeName: string): HeroEmployeeAsset | undefined => employeeAssets.find((asset) => asset.name.toLowerCase() === employeeName.toLowerCase()),
  getProfileImage: (employeeId: string): string | undefined => employeeAssetService.getByEmployeeId(employeeId)?.profileImage,
  getThumbnailImage: (employeeId: string): string | undefined => employeeAssetService.getByEmployeeId(employeeId)?.thumbnailImage,
  getThumbnailImageByName: (employeeName: string): string | undefined => employeeAssetService.getByEmployeeName(employeeName)?.thumbnailImage,
  getPreviewAudio: (employeeId: string): string | undefined => employeeAssetService.getByEmployeeId(employeeId)?.previewAudio,
  preloadHeroEmployeeCoreAssets: () => {
    if (typeof document === "undefined") return;
    employeeAssets.flatMap((asset) => [
      { rel: "preload", as: "image", href: asset.profileImage },
      { rel: "preload", as: "audio", href: asset.previewAudio }
    ]).forEach((attributes) => {
      if (document.querySelector(`link[href="${attributes.href}"]`)) return;
      const link = document.createElement("link");
      link.rel = attributes.rel;
      link.as = attributes.as;
      link.href = attributes.href;
      document.head.appendChild(link);
    });
  }
};
