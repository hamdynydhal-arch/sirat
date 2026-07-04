import GameHud from "@/components/GameHud";
import RegionSidebar from "@/components/RegionSidebar";
import TunisiaMap from "@/components/TunisiaMap";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <GameHud />
      <main className="flex flex-1 items-center justify-center p-4 md:pr-84">
        <TunisiaMap className="h-auto max-h-[82dvh] w-full max-w-md" />
      </main>
      <RegionSidebar />
    </div>
  );
}
