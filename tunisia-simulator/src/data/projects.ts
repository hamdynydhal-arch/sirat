import type { ProjectTemplate } from "@/types/game";

/** Buildable projects offered in every region. Costs are in millions. */
export const PROJECT_TEMPLATES: readonly ProjectTemplate[] = [
  {
    id: "regional-hospital",
    name: "مستشفى جهوي",
    costTND: 180,
    costUSD: 40,
    durationMonths: 18,
    effects: { infrastructureChange: 1 },
  },
  {
    id: "highway",
    name: "طريق سريع",
    costTND: 450,
    costUSD: 120,
    durationMonths: 30,
    effects: { infrastructureChange: 2 },
  },
  {
    id: "industrial-zone",
    name: "منطقة صناعية",
    costTND: 260,
    costUSD: 90,
    durationMonths: 24,
    effects: { infrastructureChange: 2 },
  },
  {
    id: "desalination-plant",
    name: "محطة تحلية مياه",
    costTND: 320,
    costUSD: 150,
    durationMonths: 20,
    effects: { infrastructureChange: 1 },
  },
];

const TEMPLATES_BY_ID = new Map(
  PROJECT_TEMPLATES.map((template) => [template.id, template]),
);

export function getProjectTemplate(id: string): ProjectTemplate | undefined {
  return TEMPLATES_BY_ID.get(id);
}
