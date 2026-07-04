import { create } from "zustand";
import type { GameState, Project, Region, RegionId } from "@/types/game";
import { INITIAL_REGIONS } from "@/data/regions";

const INITIAL_GAME_STATE: GameState = {
  currentDate: "2026-01-01",
  totalBudget: 5_000,
  hardCurrency: 2_400,
};

interface GameStore {
  gameState: GameState;
  regions: Record<RegionId, Region>;
  projects: readonly Project[];
  selectedRegionId: RegionId | null;
  selectRegion: (id: RegionId | null) => void;
}

export const useGameStore = create<GameStore>()((set) => ({
  gameState: INITIAL_GAME_STATE,
  regions: INITIAL_REGIONS,
  projects: [],
  selectedRegionId: null,
  selectRegion: (id) => set({ selectedRegionId: id }),
}));
