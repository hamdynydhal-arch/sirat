import type { Region, RegionId } from "@/types/game";

/**
 * Seed data for the 24 governorates.
 * Populations are 2014 census figures (INS); infrastructure levels are
 * gameplay starting values on the 0–10 scale defined in `Region`.
 */
const REGION_LIST: readonly Region[] = [
  { id: "tunis", name: "Tunis", population: 1_056_247, infrastructureLevel: 8 },
  { id: "ariana", name: "Ariana", population: 576_088, infrastructureLevel: 7 },
  { id: "ben-arous", name: "Ben Arous", population: 631_842, infrastructureLevel: 7 },
  { id: "manouba", name: "Manouba", population: 379_518, infrastructureLevel: 6 },
  { id: "nabeul", name: "Nabeul", population: 787_920, infrastructureLevel: 6 },
  { id: "zaghouan", name: "Zaghouan", population: 176_945, infrastructureLevel: 4 },
  { id: "bizerte", name: "Bizerte", population: 568_219, infrastructureLevel: 5 },
  { id: "beja", name: "Béja", population: 303_032, infrastructureLevel: 4 },
  { id: "jendouba", name: "Jendouba", population: 401_477, infrastructureLevel: 3 },
  { id: "el-kef", name: "El Kef", population: 243_156, infrastructureLevel: 3 },
  { id: "siliana", name: "Siliana", population: 223_087, infrastructureLevel: 3 },
  { id: "sousse", name: "Sousse", population: 674_971, infrastructureLevel: 7 },
  { id: "monastir", name: "Monastir", population: 548_828, infrastructureLevel: 7 },
  { id: "mahdia", name: "Mahdia", population: 410_812, infrastructureLevel: 5 },
  { id: "sfax", name: "Sfax", population: 955_421, infrastructureLevel: 7 },
  { id: "kairouan", name: "Kairouan", population: 570_559, infrastructureLevel: 4 },
  { id: "kasserine", name: "Kasserine", population: 439_243, infrastructureLevel: 2 },
  { id: "sidi-bouzid", name: "Sidi Bouzid", population: 429_912, infrastructureLevel: 2 },
  { id: "gabes", name: "Gabès", population: 374_300, infrastructureLevel: 5 },
  { id: "medenine", name: "Médenine", population: 479_520, infrastructureLevel: 5 },
  { id: "tataouine", name: "Tataouine", population: 149_453, infrastructureLevel: 3 },
  { id: "gafsa", name: "Gafsa", population: 337_331, infrastructureLevel: 4 },
  { id: "tozeur", name: "Tozeur", population: 107_912, infrastructureLevel: 4 },
  { id: "kebili", name: "Kébili", population: 156_961, infrastructureLevel: 3 },
];

export const INITIAL_REGIONS: Record<RegionId, Region> = Object.fromEntries(
  REGION_LIST.map((region) => [region.id, region]),
) as Record<RegionId, Region>;
