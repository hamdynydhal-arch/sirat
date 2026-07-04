"use client";

import { useGameStore } from "@/store/gameStore";
import { formatNumber } from "@/lib/format";

/**
 * Placeholder detail panel for the selected governorate.
 * Renders as a bottom sheet on mobile; on desktop it is a static column at
 * inline-start (the physical right edge in RTL) and slides in from there.
 */
export default function RegionSidebar() {
  const region = useGameStore((state) =>
    state.selectedRegionId ? state.regions[state.selectedRegionId] : null,
  );
  const selectRegion = useGameStore((state) => state.selectRegion);

  if (!region) {
    return null;
  }

  return (
    <aside
      aria-label={`تفاصيل ولاية ${region.name}`}
      className="fixed inset-x-0 bottom-0 z-10 max-h-[70dvh] animate-slide-in-up overflow-y-auto rounded-t-2xl border-t border-slate-700 bg-slate-900/95 p-5 shadow-2xl backdrop-blur md:static md:z-auto md:max-h-none md:w-80 md:shrink-0 md:animate-slide-in-right md:rounded-none md:border-e md:border-t-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">{region.name}</h2>
          <p className="text-sm text-slate-400">ولاية</p>
        </div>
        <button
          type="button"
          onClick={() => selectRegion(null)}
          aria-label="إغلاق اللوحة"
          className="rounded-full p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100"
        >
          <svg viewBox="0 0 20 20" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M4.3 4.3a1 1 0 0 1 1.4 0L10 8.6l4.3-4.3a1 1 0 1 1 1.4 1.4L11.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4L10 11.4l-4.3 4.3a1 1 0 0 1-1.4-1.4L8.6 10 4.3 5.7a1 1 0 0 1 0-1.4Z" />
          </svg>
        </button>
      </div>

      <dl className="mt-6 space-y-5">
        <div>
          <dt className="text-xs text-slate-400">عدد السكان</dt>
          <dd className="mt-1 text-lg font-medium tabular-nums text-slate-100">
            {formatNumber(region.population)}
          </dd>
        </div>
        <div>
          <dt className="text-xs text-slate-400">مستوى البنية التحتية</dt>
          <dd className="mt-2 flex items-center gap-3">
            <div className="flex flex-1 gap-1" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span
                  key={i}
                  className={`h-2 flex-1 rounded-sm ${
                    i < region.infrastructureLevel
                      ? "bg-emerald-500"
                      : "bg-slate-700"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium tabular-nums text-slate-100">
              {region.infrastructureLevel}/10
            </span>
          </dd>
        </div>
      </dl>

      <section className="mt-8 rounded-lg border border-dashed border-slate-700 p-4">
        <h3 className="text-sm font-semibold text-slate-300">المشاريع</h3>
        <p className="mt-1 text-sm text-slate-500">
          لا توجد مشاريع نشطة حاليًا. ستتوفر إدارة المشاريع في المرحلة الثانية.
        </p>
      </section>
    </aside>
  );
}
