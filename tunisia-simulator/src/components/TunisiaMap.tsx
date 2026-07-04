"use client";

import { useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import type { FeatureCollection, Geometry } from "geojson";
import governoratesJson from "@/data/tunisia-governorates.json";
import { useGameStore } from "@/store/gameStore";
import type { RegionId } from "@/types/game";

interface GovernorateProperties {
  id: RegionId;
  name: string;
  iso: string;
}

const governorates = governoratesJson as unknown as FeatureCollection<
  Geometry,
  GovernorateProperties
>;

// Tunisia is roughly twice as tall as it is wide under Mercator.
const MAP_WIDTH = 480;
const MAP_HEIGHT = 920;
const MAP_PADDING = 12;

// The GeoJSON is static, so project it once at module load rather than per render.
const projection = geoMercator().fitExtent(
  [
    [MAP_PADDING, MAP_PADDING],
    [MAP_WIDTH - MAP_PADDING, MAP_HEIGHT - MAP_PADDING],
  ],
  governorates,
);
const pathGenerator = geoPath(projection);

const shapes = governorates.features.map((feature) => ({
  id: feature.properties.id,
  name: feature.properties.name,
  d: pathGenerator(feature) ?? "",
}));

export interface TunisiaMapProps {
  /** Controlled selection; omit to bind the map to the global game store. */
  selectedRegionId?: RegionId | null;
  onRegionSelect?: (id: RegionId | null) => void;
  className?: string;
}

export default function TunisiaMap({
  selectedRegionId,
  onRegionSelect,
  className,
}: TunisiaMapProps) {
  const storeSelectedId = useGameStore((state) => state.selectedRegionId);
  const storeSelectRegion = useGameStore((state) => state.selectRegion);
  const regions = useGameStore((state) => state.regions);
  const [hoveredId, setHoveredId] = useState<RegionId | null>(null);

  const selectedId =
    selectedRegionId !== undefined ? selectedRegionId : storeSelectedId;
  const selectRegion = onRegionSelect ?? storeSelectRegion;

  const toggleRegion = (id: RegionId) => {
    selectRegion(id === selectedId ? null : id);
  };

  const highlighted = shapes.filter(
    (shape) => shape.id === hoveredId || shape.id === selectedId,
  );

  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      role="group"
      aria-label="خريطة ولايات تونس الأربع والعشرين"
      className={`touch-manipulation select-none ${className ?? ""}`}
    >
      {shapes.map((shape) => {
        const isSelected = shape.id === selectedId;
        const isHovered = shape.id === hoveredId;
        const fill = isSelected
          ? "fill-emerald-500/90"
          : isHovered
            ? "fill-amber-400/90"
            : "fill-slate-700 hover:fill-amber-400/90";
        return (
          <path
            key={shape.id}
            d={shape.d}
            role="button"
            tabIndex={0}
            aria-label={`ولاية ${regions[shape.id]?.name ?? shape.name}`}
            aria-pressed={isSelected}
            className={`cursor-pointer stroke-slate-900 outline-none transition-[fill] duration-150 ${fill}`}
            onClick={() => toggleRegion(shape.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleRegion(shape.id);
              }
            }}
            onMouseEnter={() => setHoveredId(shape.id)}
            onMouseLeave={() =>
              setHoveredId((current) => (current === shape.id ? null : current))
            }
            onFocus={() => setHoveredId(shape.id)}
            onBlur={() =>
              setHoveredId((current) => (current === shape.id ? null : current))
            }
          />
        );
      })}
      {/* Redraw highlighted borders on top so they aren't hidden by neighbours. */}
      {highlighted.map((shape) => (
        <path
          key={`outline-${shape.id}`}
          d={shape.d}
          className={`pointer-events-none fill-none stroke-2 ${
            shape.id === selectedId ? "stroke-emerald-200" : "stroke-amber-200"
          }`}
        />
      ))}
    </svg>
  );
}
