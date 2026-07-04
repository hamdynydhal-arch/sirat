import GameHud from "@/components/GameHud";
import RegionSidebar from "@/components/RegionSidebar";
import TunisiaMap from "@/components/TunisiaMap";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <GameHud />
      {/* overflow-x-clip contains the sidebar's slide-in animation */}
      <div className="flex flex-1 overflow-x-clip">
        {/* DOM-first in an RTL row = pinned to the physical right edge on desktop */}
        <RegionSidebar />
        <main className="flex flex-1 items-center justify-center p-4">
          <TunisiaMap className="h-auto max-h-[82dvh] w-full max-w-md" />
        </main>
      </div>
    </div>
  );
}
