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
import HeritageArticlePage from "./pages/HeritageArticlePage";
import ComingSoonModule from "./components/common/ComingSoonModule";

export default function App() {
  const [activeNav, setActiveNav] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "").toLowerCase().split("?")[0].split("/")[0];
      if (hash) return hash;
    }
    return "home";
  });

  const [guideSubTab, setGuideSubTab] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const match = window.location.hash.match(/[?&]tab=([^&]+)/);
      if (match) return match[1];
    }
    return "reach";
  });

  const [selectedArticleId, setSelectedArticleId] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const match = window.location.hash.match(/[?&]id=([^&]+)/);
      if (match) return match[1];
    }
    return "kalyan-sagar";
  });

  // Sync hash on navigation
  const handleNavSelect = (navId, extra) => {
    setActiveNav(navId);

    if (navId === "article") {
      let targetArticle = "kalyan-sagar";
      if (typeof extra === "string") {
        targetArticle = extra;
      } else if (extra?.id) {
        targetArticle = extra.id;
      }
      setSelectedArticleId(targetArticle);

      if (typeof window !== "undefined") {
        window.location.hash = `article?id=${targetArticle}`;
        const scrollable = document.querySelector(".custom-scrollbar");
        if (scrollable) {
          scrollable.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    if (navId === "guide") {
      let targetTab = "reach";
      if (typeof extra === "string") {
        targetTab = extra;
      } else if (extra?.tab) {
        targetTab = extra.tab;
      }
      setGuideSubTab(targetTab);

      if (typeof window !== "undefined") {
        window.location.hash = `guide?tab=${targetTab}`;
        const scrollable = document.querySelector(".custom-scrollbar");
        if (scrollable) {
          scrollable.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

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
      const rawHash = window.location.hash.replace("#", "").toLowerCase();
      const nav = rawHash.split("?")[0].split("/")[0];
      const tabMatch = rawHash.match(/[?&]tab=([^&]+)/);
      const idMatch = rawHash.match(/[?&]id=([^&]+)/);

      if (nav) {
        setActiveNav(nav);
        if (nav === "guide" && tabMatch?.[1]) {
          setGuideSubTab(tabMatch[1]);
        }
        if (nav === "article" && idMatch?.[1]) {
          setSelectedArticleId(idMatch[1]);
        }
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
    <AppLayout
      activeNav={activeNav === "article" ? "home" : activeNav}
      onSelectNav={handleNavSelect}
    >
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
        <VisitGuidePage onNavigate={handleNavSelect} initialTab={guideSubTab} />
      ) : activeNav === "article" ? (
        <HeritageArticlePage
          articleId={selectedArticleId}
          onNavigate={handleNavSelect}
        />
      ) : (
        <ComingSoonModule navId={activeNav} onNavigate={handleNavSelect} />
      )}
    </AppLayout>
  );
}
