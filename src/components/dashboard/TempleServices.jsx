import React from "react";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import { templeServices } from "../../data/dashboardData";
import { Sparkles } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export default function TempleServices({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <section aria-label="Temple Services" className="space-y-3">
      <SectionHeading
        title={t("services.heading", "Temple Services")}
        subtitle={t("services.subtitle", "Explore the main services for your spiritual journey")}
        icon={Sparkles}
        showDivider={true}
      />

      {/* Balanced 3-column grid on desktop, 2-column on tablet/mobile: Generous room for all 6 cards! */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-3.5">
        {templeServices.map((service) => (
          <ServiceCard key={service.id} service={service} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
}
