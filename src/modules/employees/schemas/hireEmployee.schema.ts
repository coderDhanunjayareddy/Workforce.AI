import { z } from "zod";

export const hireEmployeeSchema = z.object({
  name: z.string().min(2, "Employee name is required."),
  department: z.string().min(1, "Choose a department."),
  role: z.string().min(2, "Role is required."),
  voice: z.string().min(2, "Voice is required."),
  language: z.string().min(2, "Language is required."),
  accent: z.string().min(2, "Accent is required."),
  tone: z.string().min(2, "Tone is required."),
  speakingSpeed: z.string().min(2, "Speaking speed is required."),
  personality: z.array(z.string()).min(1, "Choose at least one working style."),
  responsibilities: z.array(z.string()).min(1, "Choose at least one responsibility."),
  knowledge: z.array(z.string()).min(1, "Choose at least one knowledge source."),
  tools: z.array(z.string()).min(1, "Choose at least one tool."),
  policies: z.array(z.string()).min(1, "Choose at least one policy area.")
});

export type HireEmployeeFormValues = z.infer<typeof hireEmployeeSchema>;
