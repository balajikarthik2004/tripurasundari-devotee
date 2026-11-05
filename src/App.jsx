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

  const [infoSubTab, setInfoSubTab] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const match = window.location.hash.match(/[?&]tab=([^&]+)/);
      if (match) return match[1];
    }
    return "history";
  });

  const [infoArticleId, setInfoArticleId] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const match =
        window.location.hash.match(/[?&]article=([^&]+)/) ||
        window.location.hash.match(/[?&]id=([^&]+)/);
      if (match) return match[1];
    }
    return null;
  });

  // Sync hash on navigation
  const handleNavSelect = (navId, extra) => {
    if (navId === "article") {
      let targetArticle = "kalyan-sagar";
      if (typeof extra === "string") {
        targetArticle = extra;
      } else if (extra?.id) {
        targetArticle = extra.id;
      } else if (extra?.articleId) {
        targetArticle = extra.articleId;
      }
      setActiveNav("info");
      setInfoSubTab("stories");
      setInfoArticleId(targetArticle);

      if (typeof window !== "undefined") {
        window.location.hash = `info?tab=stories&article=${targetArticle}`;
        const scrollable = document.querySelector(".custom-scrollbar");
        if (scrollable) {
          scrollable.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    if (navId === "info") {
      setActiveNav("info");
      let targetTab = "history";
      let targetArticle = null;

      if (typeof extra === "string") {
        if (
          ["history", "stories", "significance", "architecture", "gallery"].includes(
            extra
          )
        ) {
          targetTab = extra;
        } else {
          targetTab = "stories";
          targetArticle = extra;
        }
      } else if (extra) {
        if (extra.tab) targetTab = extra.tab;
        if (extra.articleId || extra.id) {
          targetArticle = extra.articleId || extra.id;
        }
      }

      setInfoSubTab(targetTab);
      setInfoArticleId(targetArticle);

      if (typeof window !== "undefined") {
        window.location.hash = targetArticle
          ? `info?tab=${targetTab}&article=${targetArticle}`
          : `info?tab=${targetTab}`;
        const scrollable = document.querySelector(".custom-scrollbar");
        if (scrollable) {
          scrollable.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      return;
    }

    setActiveNav(navId);

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
      const articleMatch =
        rawHash.match(/[?&]article=([^&]+)/) || rawHash.match(/[?&]id=([^&]+)/);

      if (nav === "article") {
        setActiveNav("info");
        setInfoSubTab("stories");
        setInfoArticleId(articleMatch?.[1] || "kalyan-sagar");
      } else if (nav === "info") {
        setActiveNav("info");
        if (tabMatch?.[1]) setInfoSubTab(tabMatch[1]);
        if (articleMatch?.[1]) setInfoArticleId(articleMatch[1]);
      } else if (nav) {
        setActiveNav(nav);
        if (nav === "guide" && tabMatch?.[1]) {
          setGuideSubTab(tabMatch[1]);
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
      activeNav={activeNav}
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
        <TempleInfoPage
          onNavigate={handleNavSelect}
          initialTab={infoSubTab}
          initialArticleId={infoArticleId}
        />
      ) : activeNav === "events" ? (
        <EventsPage onNavigate={handleNavSelect} />
      ) : activeNav === "home" ? (
        <Dashboard onNavigate={handleNavSelect} />
      ) : activeNav === "guide" ? (
        <VisitGuidePage onNavigate={handleNavSelect} initialTab={guideSubTab} />
      ) : (
        <ComingSoonModule navId={activeNav} onNavigate={handleNavSelect} />
      )}
    </AppLayout>
  );
}
