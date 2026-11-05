import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Heart,
  Info,
  Image as ImageIcon,
  Tag,
  Share2,
  CheckCircle2,
  Check,
} from "lucide-react";
import {
  templeHistoryMilestones,
  templeGalleryImages,
} from "../data/templePortalData";
import { heritageArticles } from "../data/heritageArticlesData";
import { useLanguage } from "../context/LanguageContext";

export default function TempleInfoPage({
  onNavigate,
  initialTab = "history",
  initialArticleId = null,
}) {
  const { t } = useLanguage();

  // Active section tab: 'history' | 'stories' | 'significance' | 'architecture' | 'kalyan-sagar' | 'gallery'
  const [activeTab, setActiveTab] = useState(initialTab || "history");

  // Selected article for deep reading inside the 'stories' tab
  const [selectedArticleId, setSelectedArticleId] = useState(initialArticleId);
  const [copied, setCopied] = useState(false);

  // Sync when initialTab or initialArticleId change
  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
    if (initialArticleId) {
      setSelectedArticleId(initialArticleId);
    }
  }, [initialTab, initialArticleId]);

  const activeArticle =
    heritageArticles.find((a) => a.id === selectedArticleId) || null;

  const handleSelectStory = (articleId) => {
    setSelectedArticleId(articleId);
    setActiveTab("stories");
    if (typeof window !== "undefined") {
      window.location.hash = `info?tab=stories&article=${articleId}`;
      const scrollable = document.querySelector(".custom-scrollbar");
      if (scrollable) {
        scrollable.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handleShareStory = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const navTabs = [
    { id: "history", label: "History", icon: BookOpen },
    { id: "stories", label: "Heritage Stories (8)", icon: Sparkles },
    { id: "significance", label: "Divine Significance", icon: Sparkles },
    { id: "architecture", label: "Architecture (Kurma Peeth)", icon: MapPin },
    { id: "gallery", label: "Photo Gallery", icon: ImageIcon },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
      {/* Devotional Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs text-[#877E8A] px-1 select-none flex-wrap"
      >
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
        >
          <span className="group-hover:underline">{t("nav.home", "Home")}</span>
        </button>
        <span className="text-[#C79A3B]">•</span>
        <button
          type="button"
          onClick={() => {
            setActiveTab("history");
            setSelectedArticleId(null);
          }}
          className="hover:text-[#6F1837] font-semibold text-[#6F1837] cursor-pointer"
        >
          {t("nav.info", "Temple Information")}
        </button>

        {activeTab === "stories" && (
          <>
            <span className="text-[#C79A3B]">•</span>
            <button
              type="button"
              onClick={() => setSelectedArticleId(null)}
              className="text-[#845212] font-medium hover:underline cursor-pointer"
            >
              Heritage Stories
            </button>
          </>
        )}

        {activeTab === "stories" && activeArticle && (
          <>
            <span className="text-[#C79A3B]">•</span>
            <span className="text-[#6F1837] font-bold truncate max-w-[200px] sm:max-w-xs">
              {activeArticle.title}
            </span>
          </>
        )}
      </nav>

      {/* HERO SECTION (Shown when not reading a specific single story) */}
      {!activeArticle && (
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#C79A3B]/40 shadow-md bg-[#2A0614] text-white">
          <div className="h-60 sm:h-72 w-full relative">
            <img
              src="/assets/temple-complex-aerial.jpg"
              alt="Mata Tripura Sundari Temple Complex and Kalyan Sagar Aerial View"
              className="w-full h-full object-cover object-center brightness-[1.03] contrast-[1.06] saturate-[1.12]"
            />
            {/* Soft burgundy devotional gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A1027]/75 via-[#4A1027]/35 via-55% to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#4A1027]/80 via-[#4A1027]/25 via-40% to-transparent pointer-events-none" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF8ED]/95 text-[#6F1837] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border border-[#C79A3B]/40 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#C79A3B]" />
              <span>ONE OF THE 51 SACRED SHAKTI PEETHAS (PADAPEETHA)</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFF8ED] tracking-tight drop-shadow-md">
              Mata Tripura Sundari Temple
            </h1>
            <p className="text-xs sm:text-sm text-[#FDFBF7] max-w-2xl leading-relaxed drop-shadow-sm font-medium">
              Situated on a tortoise-shaped hillock in Matabari, Udaipur, this 500-year-old sanctum represents the supreme divine mother Maa Tripureshwari, where faith and tradition merge timelessly.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <button
                type="button"
                onClick={() => onNavigate?.("darshan")}
                className="px-4 py-2 rounded-full bg-[#DFC17B] text-[#4A1027] font-bold shadow-xs hover:bg-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Book Darshan Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.("pooja")}
                className="px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs border border-white/40 text-white font-semibold transition-colors cursor-pointer"
              >
                Explore Pooja & Sevas
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Section Navigation Tabs: Full Width, Premium Segmented Style */}
      <div className="w-full bg-[#FFFDF8] p-1.5 rounded-2xl border border-[#DEC077]/70 shadow-xs grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 select-none">
        {navTabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setActiveTab(t.id);
                if (t.id !== "stories") {
                  setSelectedArticleId(null);
                }
                if (typeof window !== "undefined") {
                  window.location.hash = `info?tab=${t.id}`;
                }
              }}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-1.5 sm:px-2 rounded-xl text-[11px] xl:text-xs font-bold transition-all whitespace-nowrap cursor-pointer text-center w-full ${
                isActive
                  ? "bg-[#6F1837] text-white shadow-xs ring-1 ring-[#DEC077]"
                  : "bg-white text-[#5D5460] border border-[#E7CE96]/70 hover:border-[#6F1837] hover:text-[#6F1837]"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 shrink-0 ${
                  isActive ? "text-[#DFC17B]" : "text-[#C79A3B]"
                }`}
              />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          TAB 1: HISTORY & HERITAGE
          ========================================================================= */}
      {activeTab === "history" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0E3D0]/80">
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
                Five Centuries of Sacred History
              </h2>
              <p className="text-xs text-[#5D5460] mt-0.5">
                Chronicling the consecration, royal patronage, and spiritual legacy of Matabari from 1501 CE to the present day.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("stories")}
              className="px-3.5 py-1.5 rounded-xl bg-[#FFF8ED] hover:bg-[#6F1837] hover:text-white border border-[#C79A3B]/40 text-[#6F1837] text-xs font-bold transition-all cursor-pointer self-start sm:self-auto flex items-center gap-1.5 shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C79A3B]" />
              <span>Browse All 8 Heritage Stories →</span>
            </button>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#C79A3B]/40 space-y-6">
            {templeHistoryMilestones.map((m, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-[#6F1837] border-2 border-[#FFF8ED] ring-2 ring-[#C79A3B]" />
                <span className="font-serif font-bold text-sm text-[#C79A3B] block">
                  {m.year}
                </span>
                <h3 className="font-serif font-bold text-base text-[#2D2430] mt-0.5">
                  {m.title}
                </h3>
                <p className="text-xs text-[#5D5460] mt-1 leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: HERITAGE STORIES (All 8 Stories Catalog OR Deep Article View)
          ========================================================================= */}
      {activeTab === "stories" && (
        <>
          {/* A. SINGLE STORY DEEP-DIVE VIEW */}
          {activeArticle ? (
            <article className="space-y-5 animate-in fade-in duration-300">
              {/* Back Bar & Share Action */}
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedArticleId(null)}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-[#DEC077]/70 hover:border-[#6F1837] text-[#6F1837] text-xs font-bold shadow-2xs hover:bg-[#FFF8ED] transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to All Heritage Stories</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShareStory}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DEC077]/70 text-xs font-semibold text-[#5D5460] hover:text-[#6F1837] hover:border-[#C79A3B] transition-all shadow-2xs cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>{copied ? "Link Copied!" : "Share Story"}</span>
                  </button>
                </div>
              </div>

              {/* Story Header & Cover Banner */}
              <header className="space-y-3 bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-xs">
                {/* Category Tag & Read Time */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#DEC077] text-[#8C5D17] text-xs font-bold tracking-wide uppercase shadow-2xs">
                    <Tag className="w-3 h-3 text-[#C79A3B]" />
                    <span>{activeArticle.tag}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-[#7A6448] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>{activeArticle.readTime}</span>
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#6F1837] tracking-tight leading-tight">
                    {activeArticle.title}
                  </h1>
                  {activeArticle.subtitle && (
                    <p className="text-sm font-medium text-[#7A6448]">
                      {activeArticle.subtitle}
                    </p>
                  )}
                </div>

                {/* Large Featured Image */}
                <div className="relative w-full h-[240px] sm:h-[340px] rounded-xl overflow-hidden border border-[#DEC077]/70 shadow-2xs bg-[#F0E3D0] mt-3">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    onError={(e) => {
                      if (
                        activeArticle.fallback &&
                        e.currentTarget.src !== activeArticle.fallback
                      ) {
                        e.currentTarget.src = activeArticle.fallback;
                      }
                    }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white/90 text-xs sm:text-sm font-medium drop-shadow-md">
                    Mata Tripura Sundari Temple Heritage • Matabari, Udaipur, Tripura
                  </div>
                </div>

                {/* Lead Paragraph */}
                <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#FFFDF9] via-[#FFF9EE] to-[#FFF6E5] border border-[#DEC077]/70 mt-3">
                  <p className="font-serif text-sm sm:text-base text-[#55132D] leading-relaxed italic">
                    "{activeArticle.intro}"
                  </p>
                </div>
              </header>

              {/* Highlights Box */}
              {activeArticle.highlights && activeArticle.highlights.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#C79A3B]/30 shadow-xs space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C5D17]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C79A3B]" />
                    <span>Sacred Highlights & Factual Insights</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {activeArticle.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 p-2.5 rounded-xl bg-[#FFFDF9] border border-[#F0E3D0] text-xs text-[#382E3B] font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Detailed Sections */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-xs space-y-6">
                {activeArticle.sections.map((sec, idx) => (
                  <section
                    key={idx}
                    className="space-y-2 border-b border-[#F5EFE6] pb-5 last:border-b-0 last:pb-0"
                  >
                    <h2 className="font-serif font-bold text-base sm:text-lg text-[#6F1837] tracking-tight">
                      {sec.heading}
                    </h2>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#4A3F4E] font-normal">
                      {sec.content}
                    </p>
                  </section>
                ))}
              </div>

              {/* Action Banner: Book Darshan Pass */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#6F1837] via-[#5C172A] to-[#4A1020] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#DFC17B]">
                    Sacred Pilgrimage
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-white tracking-tight">
                    Experience the Divine Sanctity of Matabari in Person
                  </h3>
                  <p className="text-xs text-white/80 max-w-xl">
                    Book your free darshan slot, arrange Annabhog sponsorship, or explore the sacred temple grounds.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate?.("darshan")}
                  className="px-4 py-2 rounded-xl bg-[#DFC17B] hover:bg-white text-[#4A1027] font-bold text-xs shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-center"
                >
                  Book Free Darshan Slot →
                </button>
              </div>

              {/* Continuous Discovery: More Heritage Stories */}
              <section className="space-y-3 pt-2">
                <div className="flex items-center justify-between pb-1 border-b border-[#DEC077]/40">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C79A3B]" />
                    <h3 className="font-serif font-bold text-base sm:text-lg text-[#6F1837]">
                      More Sacred Heritage Stories
                    </h3>
                  </div>
                  <span className="text-xs text-[#7A6448]">
                    Showing other stories
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {heritageArticles
                    .filter((a) => a.id !== activeArticle.id)
                    .slice(0, 3)
                    .map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelectStory(item.id)}
                        className="bg-white rounded-2xl p-3 border border-[#C79A3B]/30 hover:border-[#6F1837] shadow-2xs hover:shadow-sm transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="relative h-32 rounded-xl overflow-hidden bg-[#F0E3D0] mb-2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[#8C5D17] text-[9.5px] font-bold shadow-2xs">
                            {item.tag}
                          </span>
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-serif font-bold text-xs sm:text-sm text-[#2D2430] group-hover:text-[#6F1837] transition-colors line-clamp-1">
                            {item.title}
                          </h4>
                          <p className="text-[11px] text-[#5D5460] line-clamp-2">
                            {item.shortDescription}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-[#F0E3D0]/70 mt-2 flex items-center justify-between text-xs font-bold text-[#6F1837]">
                          <span>Read Story</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            </article>
          ) : (
            /* B. ALL 8 STORIES CATALOG GRID VIEW */
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/30 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF8ED] text-[#8C5D17] border border-[#DEC077]/70 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <BookOpen className="w-3 h-3 text-[#C79A3B]" />
                    <span>CURATED HERITAGE STORIES</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
                    Explore the Sacred Heritage of Matabari
                  </h2>
                  <p className="text-xs text-[#5D5460] mt-0.5">
                    Click any story below to read comprehensive historical, ecological, and cultural insights.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#8C5D17] px-3 py-1 rounded-full bg-[#FFF8ED] border border-[#DEC077] self-start sm:self-auto shrink-0">
                  {heritageArticles.length} Stories Available
                </span>
              </div>

              {/* 8 Stories Grid (Spacious 4-column desktop, 2-column tablet) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {heritageArticles.map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleSelectStory(article.id)}
                    className="bg-white rounded-2xl p-3 sm:p-3.5 border border-[#DEC077]/70 hover:border-[#6F1837] shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="relative w-full h-36 rounded-xl overflow-hidden bg-[#F0E3D0] border border-[#DEC077]/40 mb-2.5">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/95 text-[#8C5D17] text-[9.5px] font-bold backdrop-blur-xs border border-[#DEC077]/40 shadow-2xs">
                          {article.tag}
                        </span>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[9px] font-medium backdrop-blur-xs">
                          {article.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif font-bold text-sm text-[#2D2430] group-hover:text-[#6F1837] transition-colors leading-snug line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-[11px] text-[#5D5460] mt-1.5 leading-relaxed line-clamp-3">
                        {article.shortDescription}
                      </p>
                    </div>

                    <div className="pt-2.5 border-t border-[#F0E3D0]/80 mt-3 flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6F1837] group-hover:underline">
                        Explore Story
                      </span>
                      <div className="w-5 h-5 rounded-full bg-[#FFF8ED] border border-[#DEC077]/60 flex items-center justify-center text-[#6F1837] group-hover:bg-[#6F1837] group-hover:text-white transition-colors shadow-2xs">
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* =========================================================================
          TAB 3: DIVINE SIGNIFICANCE
          ========================================================================= */}
      {activeTab === "significance" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-xs space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
              Divine Presence of Maa Tripura Sundari
            </h2>
            <p className="text-xs text-[#5D5460]">
              The philosophical and spiritual significance of the deity revered as Shodashi, Tripureshwari, and Chandi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#C79A3B]/30 space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#6F1837]">
                The Shakti Peetha Tradition
              </h3>
              <p className="text-xs text-[#5D5460] leading-relaxed">
                When Lord Shiva performed the celestial dance of dissolution (Tandava) carrying Sati's sacred body, Lord Vishnu used his Sudarshana Chakra to sever the body into 51 pieces. Her right foot fell on this holy hill, endowing it with boundless spiritual energy as a supreme Padapeetha.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#C79A3B]/30 space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#6F1837]">
                The Two Sacred Deities
              </h3>
              <p className="text-xs text-[#5D5460] leading-relaxed">
                In the sanctum sanctorum reside two sacred black stone murtis: the grand 5-foot idol of Maa Tripura Sundari (known affectionately as Soroshi), and the smaller companion deity known as Chhoto-Ma, historically carried by Tripura kings into battle for divine benediction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: ARCHITECTURE (KURMA PEETH)
          ========================================================================= */}
      {activeTab === "architecture" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-xs space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
              Distinctive Kurma Peeth Architecture
            </h2>
            <p className="text-xs text-[#5D5460]">
              The unique fusion of Bengal terracotta dome construction with traditional Manikya royal design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-5 h-64 rounded-2xl overflow-hidden bg-slate-100 border border-[#C79A3B]/40">
              <img
                src="/assets/hero/temple-exterior.jpg"
                alt="Temple Exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:col-span-7 space-y-3 text-xs text-[#5D5460] leading-relaxed">
              <p>
                The temple stands atop a conical hillock shaped like a tortoise back, which gives it the scriptural name <strong>Kurma Peetha</strong>. In Hindu tantric symbology, the Kurma (tortoise) signifies unshakable stability and divine cosmic foundation.
              </p>
              <p>
                Built in the classic <em>Char-Chala</em> (four-roofed hut) Bengali architectural style with a central conical spire, the sanctum features thick medieval brickwork engineered to endure seismic tremors. The apex is crowned with a gold-gilded Kalasha and auspicious trident.
              </p>
              <div className="p-3 bg-[#FFF8ED] rounded-xl border border-[#C79A3B]/30 font-semibold text-[#6F1837]">
                Architectural Features: Square sanctum (Garbhagriha), vaulted Natmandap assembly hall, and expansive parikrama path.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 5: PHOTO GALLERY
          ========================================================================= */}
      {activeTab === "gallery" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-[#C79A3B]/30 shadow-xs space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
              Temple Photo Gallery
            </h2>
            <p className="text-xs text-[#5D5460]">
              Authentic visual reflections of temple architecture, festivals, and sacred surroundings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {templeGalleryImages.map((img, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden border border-[#C79A3B]/30 shadow-2xs"
              >
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img
                    src={img.src}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-3 bg-[#FFF8ED]">
                  <h4 className="font-serif font-bold text-xs text-[#6F1837]">
                    {img.title}
                  </h4>
                  <p className="text-[10.5px] text-[#5D5460] mt-0.5">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* QUICK LINKS FOOTER */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <button
          type="button"
          onClick={() => onNavigate?.("darshan")}
          className="p-4 rounded-2xl bg-white border border-[#C79A3B]/30 hover:border-[#6F1837] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <span className="text-[10px] text-[#877E8A] uppercase font-bold block">
              PILGRIMAGE
            </span>
            <span className="font-serif font-bold text-sm text-[#6F1837]">
              Free Darshan Passes
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.("pooja")}
          className="p-4 rounded-2xl bg-white border border-[#C79A3B]/30 hover:border-[#6F1837] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <span className="text-[10px] text-[#877E8A] uppercase font-bold block">
              RITUALS
            </span>
            <span className="font-serif font-bold text-sm text-[#6F1837]">
              Book Pooja & Seva
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.("prasad")}
          className="p-4 rounded-2xl bg-white border border-[#C79A3B]/30 hover:border-[#6F1837] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <span className="text-[10px] text-[#877E8A] uppercase font-bold block">
              PRASAD
            </span>
            <span className="font-serif font-bold text-sm text-[#6F1837]">
              Matabari Peda Store
            </span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
