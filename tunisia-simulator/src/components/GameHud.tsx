"use client";

import { useGameStore } from "@/store/gameStore";
import { formatGameDate, formatMillions } from "@/lib/format";

/** Top bar showing the global game state: date, budget and hard currency. */
export default function GameHud() {
  const gameState = useGameStore((state) => state.gameState);

  const stats = [
    { label: "التاريخ", value: formatGameDate(gameState.currentDate) },
    { label: "الميزانية العامة", value: formatMillions(gameState.totalBudget, "TND") },
    { label: "العملة الصعبة", value: formatMillions(gameState.hardCurrency, "USD") },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/80 px-4 py-3 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-2">
        <h1 className="me-auto text-base font-semibold tracking-wide text-slate-100">
          محاكي تونس
        </h1>
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-baseline gap-2">
            <span className="text-xs text-slate-500">{stat.label}</span>
            <span className="text-sm font-semibold tabular-nums text-slate-100">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </header>
  );
}
