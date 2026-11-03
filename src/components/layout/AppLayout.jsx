import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileSidebar from "./MobileSidebar";
import { useLanguage } from "../../context/LanguageContext";

export default function AppLayout({ children, activeNav = "home", onSelectNav }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, isBengali } = useLanguage();

  const greeting = isBengali
    ? t("common.bengaliGreeting", "॥ জয় মা ত্রিপুরেশ্বরী ॥")
    : t("common.sanskritGreeting", "॥ जय माँ त्रिपुरा सुन्दरी ॥");

  return (
    <div className="h-screen h-dvh w-full bg-[#FFF8ED] text-[#2D2430] flex flex-col lg:flex-row antialiased selection:bg-[#C83B32] selection:text-white overflow-hidden">
      {/* Desktop Fixed Sidebar: 100% height of screen, 250px width, zero scroll */}
      <div className="hidden lg:block shrink-0 w-[250px] h-full z-40 overflow-hidden border-r border-[#70203A]/30">
        <Sidebar activeItem={activeNav} onSelectItem={onSelectNav} />
      </div>

      {/* Mobile Drawer */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeItem={activeNav}
        onSelectItem={onSelectNav}
      />

      {/* Main Content Area: Fixed Topbar + Contained Smooth Scroll Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Fixed Topbar Header */}
        <div className="shrink-0 z-30">
          <Topbar onToggleMobileMenu={() => setMobileMenuOpen(true)} />
        </div>

        {/* Dedicated Contained Scrollport */}
        <div className="flex-1 overflow-y-auto overscroll-contain scroll-smooth custom-scrollbar overflow-x-hidden flex flex-col">
          <main className="px-2.5 sm:px-5 lg:px-6 pt-1.5 sm:pt-2 pb-8 max-w-7xl w-full mx-auto flex-1">
            {children}

            {/* Devotional Footer Buffer */}
            <footer className="mt-8 pt-4 pb-2 border-t border-[#C79A3B]/20 text-center text-xs text-[#877E8A] flex flex-col items-center justify-center space-y-0.5 select-none">
                <div className="w-5 h-2.5 opacity-70 mb-0.5">
                  <img
                    src="/assets/temple-ornament.svg"
                    alt="Lotus"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-serif text-[11px] font-medium text-[#6F1837]">
                  {greeting}
                </p>
                <p className="text-[10px] text-[#665D6A]">
                  {t("common.footerTagline", "Mata Tripura Sundari Temple • Matabari, Udaipur, Tripura 799114")}
                </p>
              </footer>
          </main>
        </div>
      </div>
    </div>
  );
}
