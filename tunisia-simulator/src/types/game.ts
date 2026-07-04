/**
 * Core simulation entities for the Tunisia grand-strategy game.
 *
 * These types are the single source of truth for game data shapes;
 * the Zustand store, seed data, and components all derive from them.
 */

/** Slugs for Tunisia's 24 governorates, matching `properties.id` in the GeoJSON. */
export const REGION_IDS = [
  "ariana",
  "beja",
  "ben-arous",
  "bizerte",
  "el-kef",
  "gabes",
  "gafsa",
  "jendouba",
  "kairouan",
  "kasserine",
  "kebili",
  "mahdia",
  "manouba",
  "medenine",
  "monastir",
  "nabeul",
  "sfax",
  "sidi-bouzid",
  "siliana",
  "sousse",
  "tataouine",
  "tozeur",
  "tunis",
  "zaghouan",
] as const;

export type RegionId = (typeof REGION_IDS)[number];

/** Global state of the running simulation. */
export interface GameState {
  /** Current in-game date, ISO 8601 (`YYYY-MM-DD`). */
  currentDate: string;
  /** Total state budget, in million TND. */
  totalBudget: number;
  /** Hard-currency (foreign exchange) reserves, in million USD. */
  hardCurrency: number;
}

/** One of the 24 governorates. */
export interface Region {
  id: RegionId;
  name: string;
  population: number;
  /** Development level of the governorate, 0 (none) to 10 (fully developed). */
  infrastructureLevel: number;
}

/** Region-level consequences of a completed project. */
export interface ProjectEffects {
  /** Applied to `Region.infrastructureLevel` on completion (clamped to 0–10). */
  infrastructureChange: number;
}

/** A buildable development project as offered in the build menu. */
export interface ProjectTemplate {
  id: string;
  /** Display name (Arabic). */
  name: string;
  /** Cost in million TND, deducted from `GameState.totalBudget`. */
  costTND: number;
  /** Cost in million USD, deducted from `GameState.hardCurrency`. */
  costUSD: number;
  /** Construction time in in-game months. */
  durationMonths: number;
  /** Recurring upkeep in million TND per month once the project is completed. */
  maintenanceCostTND: number;
  effects: ProjectEffects;
}

/** A project under construction in a specific region. */
export interface ActiveProject {
  /** Unique per construction; several instances of one template may coexist. */
  instanceId: string;
  /** References `ProjectTemplate.id`. */
  projectId: string;
  regionId: RegionId;
  monthsRemaining: number;
}

/** A finished project; kept in state because it incurs monthly maintenance. */
export interface CompletedProject {
  instanceId: string;
  /** References `ProjectTemplate.id`. */
  projectId: string;
  regionId: RegionId;
}
