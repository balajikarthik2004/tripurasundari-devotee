import React, { useState, useEffect } from "react";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import DarshanPage from "./pages/DarshanPage";
import PoojaPage from "./pages/PoojaPage";
import DonationsPage from "./pages/DonationsPage";
import PrasadPage from "./pages/PrasadPage";
import AccommodationPage from "./pages/AccommodationPage";
import TempleInfoPage from "./pages/TempleInfoPage";
import EventsPage from "./pages/EventsPage";
import VisitGuidePage from "./pages/VisitGuidePage";
import ComingSoonModule from "./components/common/ComingSoonModule";

export default function App() {
  const [activeNav, setActiveNav] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash) return hash;
    }
    return "home";
  });

  // Sync hash on navigation
  const handleNavSelect = (navId) => {
    setActiveNav(navId);
    if (typeof window !== "undefined") {
      window.location.hash = navId;
      const scrollable = document.querySelector(".custom-scrollbar");
      if (scrollable) {
        scrollable.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (hash) {
        setActiveNav(hash);
      } else {
        setActiveNav("home");
      }
      const scrollable = document.querySelector(".custom-scrollbar");
      if (scrollable) {
        scrollable.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <AppLayout activeNav={activeNav} onSelectNav={handleNavSelect}>
      {activeNav === "darshan" ? (
        <DarshanPage onNavigate={handleNavSelect} />
      ) : activeNav === "pooja" ? (
        <PoojaPage onNavigate={handleNavSelect} />
      ) : activeNav === "donations" ? (
        <DonationsPage onNavigate={handleNavSelect} />
      ) : activeNav === "prasad" ? (
        <PrasadPage onNavigate={handleNavSelect} />
      ) : activeNav === "accommodation" ? (
        <AccommodationPage onNavigate={handleNavSelect} />
      ) : activeNav === "info" ? (
        <TempleInfoPage onNavigate={handleNavSelect} />
      ) : activeNav === "events" ? (
        <EventsPage onNavigate={handleNavSelect} />
      ) : activeNav === "home" ? (
        <Dashboard onNavigate={handleNavSelect} />
      ) : activeNav === "guide" ? (
        <VisitGuidePage onNavigate={handleNavSelect} />
      ) : (
        <ComingSoonModule navId={activeNav} onNavigate={handleNavSelect} />
      )}
    </AppLayout>
  );
}
