/**
 * ROI Calculator — deep module.
 * Pure assumptions + projection. Section is a thin UI adapter.
 */

export interface AutomationTask {
  id: string;
  label: string;
  hoursPerWeek: number;
  description: string;
}

export interface ROIInput {
  /** Selected automation task ids */
  selectedIds: string[];
  teamSize: number;
  /** Optional override catalog (defaults to COMMON_AUTOMATIONS) */
  catalog?: AutomationTask[];
}

export interface ROIProjection {
  hoursPerWeek: number;
  hoursPerMonth: number;
  hoursPerYear: number;
  teamHoursPerYear: number;
  selectedCount: number;
  hasResults: boolean;
}

export const COMMON_AUTOMATIONS: AutomationTask[] = [
  {
    id: "email-triage",
    label: "Email triage & drafting",
    hoursPerWeek: 5,
    description: "Sorting, prioritizing, and drafting responses to routine emails",
  },
  {
    id: "meeting-notes",
    label: "Meeting notes & action items",
    hoursPerWeek: 3,
    description: "Transcribing, summarizing, and distributing meeting outcomes",
  },
  {
    id: "data-entry",
    label: "Data entry & CRM updates",
    hoursPerWeek: 4,
    description: "Manual data transfer between systems and CRM maintenance",
  },
  {
    id: "reporting",
    label: "Report generation",
    hoursPerWeek: 3,
    description: "Compiling data from multiple sources into weekly/monthly reports",
  },
  {
    id: "scheduling",
    label: "Scheduling & calendar management",
    hoursPerWeek: 2,
    description: "Coordinating meetings, managing conflicts, sending reminders",
  },
  {
    id: "client-queries",
    label: "Client query responses",
    hoursPerWeek: 6,
    description: "Answering repetitive questions via email, chat, or phone",
  },
  {
    id: "document-creation",
    label: "Document & template creation",
    hoursPerWeek: 3,
    description: "Drafting proposals, contracts, and standard documents",
  },
  {
    id: "social-media",
    label: "Social media & content drafting",
    hoursPerWeek: 4,
    description: "Writing posts, scheduling content, responding to comments",
  },
];

export const ROI_DEFAULTS = {
  teamSize: 1,
  minTeamSize: 1,
} as const;

/**
 * Project time savings from selected automation tasks.
 * Pure — no React, no DOM. Safe to unit test.
 */
export function calculateROI(input: ROIInput): ROIProjection {
  const catalog = input.catalog ?? COMMON_AUTOMATIONS;
  const teamSize = Math.max(ROI_DEFAULTS.minTeamSize, Math.floor(input.teamSize) || 1);
  const selected = new Set(input.selectedIds);

  const hoursPerWeek = catalog
    .filter((a) => selected.has(a.id))
    .reduce((sum, a) => sum + a.hoursPerWeek, 0);

  const hoursPerMonth = hoursPerWeek * 4;
  const hoursPerYear = hoursPerWeek * 52;
  const teamHoursPerYear = hoursPerYear * teamSize;
  const selectedCount = selected.size;

  return {
    hoursPerWeek,
    hoursPerMonth,
    hoursPerYear,
    teamHoursPerYear,
    selectedCount,
    hasResults: selectedCount > 0,
  };
}

export function toggleSelection(
  current: ReadonlySet<string> | string[],
  id: string,
): Set<string> {
  const next = new Set(current);
  if (next.has(id)) next.delete(id);
  else next.add(id);
  return next;
}

export function clampTeamSize(size: number, min = ROI_DEFAULTS.minTeamSize): number {
  if (!Number.isFinite(size)) return min;
  return Math.max(min, Math.floor(size));
}
