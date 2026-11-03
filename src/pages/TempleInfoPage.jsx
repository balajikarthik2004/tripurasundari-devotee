import React, { useState } from "react";
import { BookOpen, Sparkles, MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Heart, Info, Image as ImageIcon } from "lucide-react";
import { templeHistoryMilestones, templeGalleryImages } from "../data/templePortalData";
import { templeInfo } from "../data/dashboardData";
import { useLanguage } from "../context/LanguageContext";

export default function TempleInfoPage({ onNavigate }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("history"); // 'history' | 'architecture' | 'kalyan-sagar' | 'gallery'

  return (
    <div className="space-y-5 sm:space-y-6 animate-in fade-in duration-300">
      {/* Devotional Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#877E8A] px-1 select-none">
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
        >
          <span className="group-hover:underline">{t("nav.home", "Home")}</span>
        </button>
        <span className="text-[#C79A3B]">•</span>
        <span className="text-[#6F1837] font-semibold">{t("nav.info", "Temple Information")}</span>
      </nav>

      {/* HERO SECTION */}
      <div className="relative rounded-3xl overflow-hidden border border-[#C79A3B]/40 shadow-md bg-[#2A0614] text-white">
        <div className="h-64 sm:h-80 w-full relative">
          <img
            src="/assets/temple-complex-aerial.jpg"
            alt="Mata Tripura Sundari Temple Complex and Kalyan Sagar Aerial View"
            className="w-full h-full object-cover object-center brightness-[1.03] contrast-[1.06] saturate-[1.12]"
          />
          {/* Subtle directional gradient: left soft burgundy for text readability, fading to unobstructed center & right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#4A1027]/42 via-[#4A1027]/20 via-50% to-transparent pointer-events-none" />
          {/* Subtle bottom gradient tint to preserve devotional grounding */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4A1027]/45 via-[#4A1027]/15 via-35% to-transparent pointer-events-none" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF8ED]/95 text-[#6F1837] text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs border border-[#C79A3B]/40 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#C79A3B]" />
            <span>ONE OF THE 51 SACRED SHAKTI PEETHAS (PADAPEETHA)</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#FFF8ED] tracking-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]">
            Mata Tripura Sundari Temple
          </h1>
          <p className="text-xs sm:text-sm text-[#FDFBF7] max-w-2xl leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] font-medium">
            Situated on a tortoise-shaped hillock in Matabari, Udaipur, this 500-year-old sanctum represents the supreme divine mother Maa Tripureshwari, where faith and tradition merge timelessly.
          </p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={() => onNavigate?.("darshan")}
              className="px-4 py-2 rounded-full bg-[#DFC17B] text-[#4A1027] font-bold shadow-xs hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
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

      {/* SECTION NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-[#C79A3B]/30 pb-2 overflow-x-auto custom-scrollbar select-none">
        {[
          { id: "history", label: "History & Heritage", icon: BookOpen },
          { id: "significance", label: "Divine Significance", icon: Sparkles },
          { id: "architecture", label: "Architecture (Kurma Peeth)", icon: MapPin },
          { id: "kalyan-sagar", label: "Kalyan Sagar Lake", icon: Heart },
          { id: "gallery", label: "Photo Gallery", icon: ImageIcon },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#6F1837] text-white shadow-xs"
                  : "bg-white text-[#665D6A] border border-[#C79A3B]/30 hover:border-[#6F1837] hover:text-[#6F1837]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#DFC17B]" : "text-[#C79A3B]"}`} />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}

      {/* 1. HISTORY & HERITAGE */}
      {activeTab === "history" && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#C79A3B]/30 shadow-xs space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
              Five Centuries of Sacred History
            </h2>
            <p className="text-xs text-[#5D5460]">
              Chronicling the consecration, royal patronage, and spiritual legacy of Matabari from 1501 CE to the present day.
            </p>
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

      {/* 2. DIVINE SIGNIFICANCE */}
      {activeTab === "significance" && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#C79A3B]/30 shadow-xs space-y-5">
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
              <h3 className="font-serif font-bold text-sm text-[#6F1837]">The Shakti Peetha Tradition</h3>
              <p className="text-xs text-[#5D5460] leading-relaxed">
                When Lord Shiva performed the celestial dance of dissolution (Tandava) carrying Sati's sacred body, Lord Vishnu used his Sudarshana Chakra to sever the body into 51 pieces. Her right foot fell on this holy hill, endowing it with boundless spiritual energy as a supreme Padapeetha.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FFF9EE] border border-[#C79A3B]/30 space-y-2">
              <h3 className="font-serif font-bold text-sm text-[#6F1837]">The Two Sacred Deities</h3>
              <p className="text-xs text-[#5D5460] leading-relaxed">
                In the sanctum sanctorum reside two sacred black stone murtis: the grand 5-foot idol of Maa Tripura Sundari (known affectionately as Soroshi), and the smaller companion deity known as Chhoto-Ma, historically carried by Tripura kings into battle for divine benediction.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 3. ARCHITECTURE (KURMA PEETH) */}
      {activeTab === "architecture" && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#C79A3B]/30 shadow-xs space-y-5">
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
              <img src="/assets/hero/temple-exterior.jpg" alt="Temple Exterior" className="w-full h-full object-cover" />
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

      {/* 4. KALYAN SAGAR SACRED LAKE */}
      {activeTab === "kalyan-sagar" && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#C79A3B]/30 shadow-xs space-y-5">
          <div className="space-y-1">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#6F1837]">
              Kalyan Sagar & Sacred Turtle Heritage
            </h2>
            <p className="text-xs text-[#5D5460]">
              The 6.4-acre sacred lake east of the temple holding the ancient Bostami softshell turtles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-6 h-60 rounded-2xl overflow-hidden bg-slate-100 border border-[#C79A3B]/40">
              <img src="/assets/kalyan-sagar.jpg" alt="Kalyan Sagar Lake" className="w-full h-full object-cover" />
            </div>
            <div className="md:col-span-6 space-y-3 text-xs text-[#5D5460] leading-relaxed">
              <p>
                Excavated in the 16th century alongside the temple consecration, Kalyan Sagar is revered as a holy tirtha. Devotees perform ritual ablutions before entering the temple sanctum.
              </p>
              <p>
                The lake is internationally recognized for nurturing a thriving population of the critically endangered Black Softshell Turtle (<em>Nilssonia nigricans</em>), venerated locally as divine messengers of the Kurma Avatar.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Conservation Etiquette:</strong> Please feed only temple-approved puffed rice at designated bathing ghats. Do not discard plastic or soap in the holy waters.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. PHOTO GALLERY */}
      {activeTab === "gallery" && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border border-[#C79A3B]/30 shadow-xs space-y-5">
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
              <div key={idx} className="group rounded-2xl overflow-hidden border border-[#C79A3B]/30 shadow-2xs">
                <div className="h-44 overflow-hidden bg-slate-100">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3 bg-[#FFF8ED]">
                  <h4 className="font-serif font-bold text-xs text-[#6F1837]">{img.title}</h4>
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
            <span className="text-[10px] text-[#877E8A] uppercase font-bold block">PILGRIMAGE</span>
            <span className="font-serif font-bold text-sm text-[#6F1837]">Free Darshan Passes</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.("pooja")}
          className="p-4 rounded-2xl bg-white border border-[#C79A3B]/30 hover:border-[#6F1837] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <span className="text-[10px] text-[#877E8A] uppercase font-bold block">RITUALS</span>
            <span className="font-serif font-bold text-sm text-[#6F1837]">Book Pooja & Seva</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate?.("prasad")}
          className="p-4 rounded-2xl bg-white border border-[#C79A3B]/30 hover:border-[#6F1837] transition-all text-left flex items-center justify-between group cursor-pointer shadow-2xs"
        >
          <div>
            <span className="text-[10px] text-[#877E8A] uppercase font-bold block">PRASAD</span>
            <span className="font-serif font-bold text-sm text-[#6F1837]">Matabari Peda Store</span>
          </div>
          <ArrowRight className="w-4 h-4 text-[#C79A3B] group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

