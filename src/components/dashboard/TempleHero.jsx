import React, { useState, useEffect } from "react";
import {
  Calendar,
  ArrowRight,
  Info,
  ChevronLeft,
  ChevronRight,
  Flame,
  Landmark,
  Compass,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const slides = [
  {
    id: "waterfront",
    image: "/assets/hero-kalyan-sagar-sunlight.jpg",
    objectPosition: "object-[82%_center] lg:object-[80%_center]",
    badge: "51 SACRED SHAKTI PEETHAS • PADAPEETHA",
    title: "Mata Tripura Sundari Temple",
    subtitle: "MATABARI, UDAIPUR, TRIPURA • ESTD. 1501 CE",
    description:
      "Seek the divine blessings of Maa Tripura Sundari, where five centuries of faith, royal heritage, and devotion meet atop sacred Kurma Peeth.",
    primaryBtn: {
      label: "Book Darshan",
      icon: Calendar,
      action: "darshan",
    },
    secondaryBtn: {
      label: "View Temple Information",
      icon: Info,
      action: "info",
    },
    invocation: "॥ जय माँ त्रिपुरा सुन्दरी ॥",
    alt: "Mata Tripura Sundari Temple and Sacred Kalyan Sagar Lake in Morning Sunlight",
  },
  {
    id: "temple-aerial-complex",
    image: "/assets/hero-aerial-panoramic.jpg",
    objectPosition: "object-[78%_center] lg:object-[76%_center]",
    badge: "500-YEAR SACRED ARCHITECTURE • 1501 CE",
    title: "Historic Kurma Peeth Sanctum",
    subtitle: "CONSECRATED BY MAHARAJA DHANYA MANIKYA",
    description:
      "Elevated panoramic perspective of the sacred temple complex atop Kurma Peeth, showcasing the iconic terracotta Char-Chala sanctum and Kalyan Sagar.",
    primaryBtn: {
      label: "Explore Heritage",
      icon: Landmark,
      action: "info",
    },
    secondaryBtn: {
      label: "Temple Architecture",
      icon: Info,
      action: "info",
    },
    invocation: "॥ पंचशतक प्राचीन पीठ ॥",
    alt: "Panoramic Aerial View of Mata Tripura Sundari Temple Complex and Kalyan Sagar",
  },
  {
    id: "lake-tirtha",
    image: "/assets/hero-kalyan-sagar-wide.jpg",
    objectPosition: "object-[82%_center] lg:object-[80%_center]",
    badge: "SACRED WATERS • KALYAN SAGAR",
    title: "Divine Kalyan Sagar & Holy Tirtha",
    subtitle: "HISTORIC TURTLE SANCTUARY & 6.4-ACRE SACRED LAKE",
    description:
      "Witness the majestic sacred waters of Kalyan Sagar, home to historic Bostami turtles and five centuries of unbroken devotion along the temple ghats.",
    primaryBtn: {
      label: "Discover Lake",
      icon: Compass,
      action: "info",
    },
    secondaryBtn: {
      label: "Visitor Guidelines",
      icon: Info,
      action: "info",
    },
    invocation: "॥ कल्याण सागर तीर्थ ॥",
    alt: "Panoramic View of Mata Tripura Sundari Temple and Sacred Kalyan Sagar Lake Waters",
  },
];

export default function TempleHero({ onNavigate }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t, language } = useLanguage();

  const totalSlides = slides.length;
  const slide = slides[currentSlide];

  // Auto-advance slideshow every 7 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [isPaused, totalSlides]);

  const PrimaryIcon = slide.primaryBtn.icon;
  const SecondaryIcon = slide.secondaryBtn.icon;

  const currentBadge = t(`hero.slides.${currentSlide}.badge`, slide.badge);
  const currentTitle = t(`hero.slides.${currentSlide}.title`, slide.title);
  const currentSubtitle = t(`hero.slides.${currentSlide}.subtitle`, slide.subtitle);
  const currentDesc = t(`hero.slides.${currentSlide}.description`, slide.description);
  const currentPrimaryLabel = t(`hero.slides.${currentSlide}.primaryBtn`, slide.primaryBtn.label);
  const currentSecondaryLabel = t(`hero.slides.${currentSlide}.secondaryBtn`, slide.secondaryBtn.label);
  const currentInvocation = t(`hero.slides.${currentSlide}.invocation`, slide.invocation);

  return (
    <section
      aria-label="Mata Tripura Sundari Temple Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative rounded-[24px] overflow-hidden border border-[#C79A3B]/35 shadow-[0_4px_24px_rgba(74,16,39,0.06)] bg-[#FFF8ED] h-[260px] sm:h-[275px] lg:h-[285px] flex flex-col justify-center px-5 sm:px-7 lg:px-9 py-4 sm:py-5 select-none"
    >
      {/* =========================================================================
          1. IMMERSIVE CONTINUOUS BACKGROUND SLIDES (Smooth Crossfade)
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {slides.map((s, index) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.alt}
            className={`absolute inset-0 w-full h-full object-cover ${s.objectPosition} transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Controlled Left-to-Right Ivory Gradient:
            - Left 0–35%: rich ivory for crisp single-line text contrast
            - 35–55%: natural feathering into the background
            - Right 65–100%: 100% transparent preserving temple dome & scenery */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 248, 237, 0.98) 0%, rgba(255, 248, 237, 0.96) 32%, rgba(255, 248, 237, 0.85) 44%, rgba(255, 248, 237, 0.40) 56%, rgba(255, 248, 237, 0.08) 66%, transparent 75%, transparent 100%)",
          }}
        />
      </div>

      {/* =========================================================================
          2. TOP-RIGHT SACRED INVOCATION
          ========================================================================= */}
      <div className="absolute top-3.5 right-5 sm:right-7 z-10 hidden sm:flex flex-col items-end gap-0.5 select-none pointer-events-none transition-all duration-300">
        <div className="w-5 h-4 opacity-90">
          <img
            src="/assets/temple-ornament.svg"
            alt="Sacred Lotus"
            className="w-full h-full object-contain filter brightness-110"
          />
        </div>
        <span className="font-serif text-xs sm:text-[12.5px] font-bold text-[#6F1837] tracking-wider drop-shadow-2xs">
          {currentInvocation}
        </span>
      </div>

      {/* =========================================================================
          3. MAIN CONTENT (Left region with balanced proportions)
          ========================================================================= */}
      <div
        key={`${slide.id}-${language}`}
        className="relative z-10 max-w-lg lg:max-w-xl xl:max-w-2xl space-y-1.5 sm:space-y-2 animate-in fade-in duration-300"
      >
        {/* Shakti Peetha / Special Event Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFF8ED]/95 border border-[#C79A3B]/50 text-[#9E6E14] text-[9.5px] sm:text-[10px] font-bold tracking-widest uppercase shadow-2xs">
            {currentBadge}
          </span>
        </div>

        {/* Single-Line Prominent Heading */}
        <div className="space-y-0.5">
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-[33px] xl:text-[35px] font-bold text-[#6F1837] tracking-tight leading-tight sm:whitespace-nowrap">
            {currentTitle}
          </h1>
          <p className="text-[9.5px] sm:text-[10px] font-bold text-[#635568] tracking-[0.22em] uppercase pt-0.5">
            {currentSubtitle}
          </p>
        </div>

        {/* Delicate Gold Lotus Divider */}
        <div className="w-16 h-2 my-0.5 opacity-85">
          <img
            src="/assets/lotus-divider.svg"
            alt="Divider"
            className="w-full h-full object-contain filter brightness-110"
          />
        </div>

        {/* Short Meaningful Devotional Description */}
        <p className="text-xs sm:text-[13px] font-medium text-[#2E2431] leading-relaxed max-w-sm sm:max-w-md lg:max-w-lg">
          {currentDesc}
        </p>

        {/* Horizontal Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => onNavigate?.(slide.primaryBtn.action)}
            className="inline-flex items-center gap-1.5 h-8.5 sm:h-9 px-4.5 rounded-full bg-[#6F1837] hover:bg-[#521128] active:bg-[#3D0A1C] text-white text-xs sm:text-[12.5px] font-bold shadow-xs hover:shadow transition-all duration-200 cursor-pointer group/btn"
          >
            <PrimaryIcon className="w-3.5 h-3.5 text-[#DFC17B]" />
            <span>{currentPrimaryLabel}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#DFC17B] group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate?.(slide.secondaryBtn.action)}
            className="inline-flex items-center gap-1.5 h-8.5 sm:h-9 px-4 rounded-full bg-white/95 hover:bg-white text-[#201824] hover:text-[#6F1837] border border-[#C79A3B]/45 hover:border-[#6F1837] text-xs sm:text-[12.5px] font-bold shadow-2xs hover:shadow transition-all duration-200 cursor-pointer"
          >
            <SecondaryIcon className="w-3.5 h-3.5 text-[#6F1837]" />
            <span>{currentSecondaryLabel}</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          4. BOTTOM-RIGHT CAROUSEL CONTROLS
          ========================================================================= */}
      <div className="absolute bottom-3.5 right-5 sm:right-7 z-10 flex items-center gap-1.5">
        {/* Prev Button */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)}
          aria-label="Previous slide"
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/95 hover:bg-white text-[#6F1837] border border-[#C79A3B]/35 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#6F1837]" />
        </button>

        {/* Slide Indicators */}
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/80 backdrop-blur-xs border border-[#C79A3B]/30 shadow-2xs">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCurrentSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === i
                  ? "w-4 h-1.5 bg-[#C79A3B]"
                  : "w-1.5 h-1.5 bg-[#C79A3B]/40 hover:bg-[#C79A3B]/70"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % totalSlides)}
          aria-label="Next slide"
          className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-white/95 hover:bg-white text-[#6F1837] border border-[#C79A3B]/35 flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5 text-[#6F1837]" />
        </button>
      </div>
    </section>
  );
}
