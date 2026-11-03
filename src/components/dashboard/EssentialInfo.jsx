import React from "react";
import InfoCard from "../ui/InfoCard";
import { essentialStats } from "../../data/dashboardData";

export default function EssentialInfo({ onNavigate }) {
  return (
    <section aria-label="Essential Temple Information">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-3.5 items-stretch">
        {essentialStats.map((stat) => (
          <div key={stat.id} className="h-full">
            <InfoCard stat={stat} onNavigate={onNavigate} />
          </div>
        ))}
      </div>
    </section>
  );
}
