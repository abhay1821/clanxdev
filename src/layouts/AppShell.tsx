import { useEffect, useState } from "react";
import { Sidebar } from "../components/layout/Sidebar";
import { TopHeader } from "../components/layout/TopHeader";
import { ComingSoonPage } from "../pages/ComingSoonPage";
import { GamificationPage } from "../pages/GamificationPage";

function MainContent({ selectedItem }: { selectedItem: string }) {
  if (selectedItem === "Gamification") {
    return <GamificationPage />;
  }
  return <ComingSoonPage title={selectedItem} />;
}

export function AppShell() {
  const [selectedItem, setSelectedItem] = useState("Gamification");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    function closeIfDesktop() {
      if (mq.matches) setMobileNavOpen(false);
    }
    mq.addEventListener("change", closeIfDesktop);
    return () => mq.removeEventListener("change", closeIfDesktop);
  }, []);

  return (
    <div className="min-h-screen bg-brand-content">
      {mobileNavOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] md:hidden"
          onClick={() => setMobileNavOpen(false)}
        />
      ) : null}

      <Sidebar
        selectedItem={selectedItem}
        onSelectItem={setSelectedItem}
        mobileOpen={mobileNavOpen}
        onMobileClose={() => setMobileNavOpen(false)}
      />

      <div className="flex min-h-screen flex-col md:ml-sidebar">
        <TopHeader
          selectedItem={selectedItem}
          onMenuClick={() => setMobileNavOpen(true)}
        />
        <main className="flex w-full flex-1 items-start justify-center p-4 md:p-8">
          <MainContent selectedItem={selectedItem} />
        </main>
      </div>
    </div>
  );
}
