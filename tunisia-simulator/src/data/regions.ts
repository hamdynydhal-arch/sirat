import type { Region, RegionId } from "@/types/game";

/**
 * Seed data for the 24 governorates.
 * `id` stays in English kebab-case — it is the binding key to `properties.id`
 * in the GeoJSON; only the display `name` is localized (Arabic).
 * Populations are 2014 census figures (INS); infrastructure levels are
 * gameplay starting values on the 0–10 scale defined in `Region`.
 */
const REGION_LIST: readonly Region[] = [
  { id: "tunis", name: "تونس", population: 1_056_247, infrastructureLevel: 8 },
  { id: "ariana", name: "أريانة", population: 576_088, infrastructureLevel: 7 },
  { id: "ben-arous", name: "بن عروس", population: 631_842, infrastructureLevel: 7 },
  { id: "manouba", name: "منوبة", population: 379_518, infrastructureLevel: 6 },
  { id: "nabeul", name: "نابل", population: 787_920, infrastructureLevel: 6 },
  { id: "zaghouan", name: "زغوان", population: 176_945, infrastructureLevel: 4 },
  { id: "bizerte", name: "بنزرت", population: 568_219, infrastructureLevel: 5 },
  { id: "beja", name: "باجة", population: 303_032, infrastructureLevel: 4 },
  { id: "jendouba", name: "جندوبة", population: 401_477, infrastructureLevel: 3 },
  { id: "el-kef", name: "الكاف", population: 243_156, infrastructureLevel: 3 },
  { id: "siliana", name: "سليانة", population: 223_087, infrastructureLevel: 3 },
  { id: "sousse", name: "سوسة", population: 674_971, infrastructureLevel: 7 },
  { id: "monastir", name: "المنستير", population: 548_828, infrastructureLevel: 7 },
  { id: "mahdia", name: "المهدية", population: 410_812, infrastructureLevel: 5 },
  { id: "sfax", name: "صفاقس", population: 955_421, infrastructureLevel: 7 },
  { id: "kairouan", name: "القيروان", population: 570_559, infrastructureLevel: 4 },
  { id: "kasserine", name: "القصرين", population: 439_243, infrastructureLevel: 2 },
  { id: "sidi-bouzid", name: "سيدي بوزيد", population: 429_912, infrastructureLevel: 2 },
  { id: "gabes", name: "قابس", population: 374_300, infrastructureLevel: 5 },
  { id: "medenine", name: "مدنين", population: 479_520, infrastructureLevel: 5 },
  { id: "tataouine", name: "تطاوين", population: 149_453, infrastructureLevel: 3 },
  { id: "gafsa", name: "قفصة", population: 337_331, infrastructureLevel: 4 },
  { id: "tozeur", name: "توزر", population: 107_912, infrastructureLevel: 4 },
  { id: "kebili", name: "قبلي", population: 156_961, infrastructureLevel: 3 },
];

export const INITIAL_REGIONS: Record<RegionId, Region> = Object.fromEntries(
  REGION_LIST.map((region) => [region.id, region]),
) as Record<RegionId, Region>;
