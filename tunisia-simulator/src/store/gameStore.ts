import { create } from "zustand";
import type {
  ActiveProject,
  GameState,
  Region,
  RegionId,
} from "@/types/game";
import { INITIAL_REGIONS } from "@/data/regions";
import { getProjectTemplate } from "@/data/projects";

const INITIAL_GAME_STATE: GameState = {
  currentDate: "2026-01-01",
  totalBudget: 5_000,
  hardCurrency: 2_400,
};

const MAX_INFRASTRUCTURE_LEVEL = 10;

/** Game dates always sit on the 1st of the month, so this never skips/clamps days. */
function addOneMonth(isoDate: string): string {
  const date = new Date(`${isoDate}T00:00:00Z`);
  date.setUTCMonth(date.getUTCMonth() + 1);
  return date.toISOString().slice(0, 10);
}

interface GameStore {
  gameState: GameState;
  regions: Record<RegionId, Region>;
  activeProjects: readonly ActiveProject[];
  selectedRegionId: RegionId | null;
  selectRegion: (id: RegionId | null) => void;
  /**
   * Starts a project in a region if the budget and hard currency cover it.
   * Returns whether construction actually started.
   */
  startProject: (projectId: string, regionId: RegionId) => boolean;
  /** Advances the game by one month and progresses/completes active projects. */
  advanceTime: () => void;
}

export const useGameStore = create<GameStore>()((set, get) => ({
  gameState: INITIAL_GAME_STATE,
  regions: INITIAL_REGIONS,
  activeProjects: [],
  selectedRegionId: null,

  selectRegion: (id) => set({ selectedRegionId: id }),

  startProject: (projectId, regionId) => {
    const template = getProjectTemplate(projectId);
    if (!template) {
      return false;
    }
    const { gameState } = get();
    if (
      gameState.totalBudget < template.costTND ||
      gameState.hardCurrency < template.costUSD
    ) {
      return false;
    }
    set((state) => ({
      gameState: {
        ...state.gameState,
        totalBudget: state.gameState.totalBudget - template.costTND,
        hardCurrency: state.gameState.hardCurrency - template.costUSD,
      },
      activeProjects: [
        ...state.activeProjects,
        {
          instanceId: crypto.randomUUID(),
          projectId,
          regionId,
          monthsRemaining: template.durationMonths,
        },
      ],
    }));
    return true;
  },

  advanceTime: () =>
    set((state) => {
      const ticked = state.activeProjects.map((project) => ({
        ...project,
        monthsRemaining: project.monthsRemaining - 1,
      }));
      const completed = ticked.filter((project) => project.monthsRemaining <= 0);

      let regions = state.regions;
      if (completed.length > 0) {
        regions = { ...regions };
        for (const project of completed) {
          const template = getProjectTemplate(project.projectId);
          if (!template) {
            continue;
          }
          const region = regions[project.regionId];
          regions[project.regionId] = {
            ...region,
            infrastructureLevel: Math.min(
              MAX_INFRASTRUCTURE_LEVEL,
              Math.max(
                0,
                region.infrastructureLevel + template.effects.infrastructureChange,
              ),
            ),
          };
        }
      }

      return {
        gameState: {
          ...state.gameState,
          currentDate: addOneMonth(state.gameState.currentDate),
        },
        activeProjects: ticked.filter((project) => project.monthsRemaining > 0),
        regions,
      };
    }),
}));
