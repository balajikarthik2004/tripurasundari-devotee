import React, { useEffect } from "react";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar({ isOpen, onClose, activeItem, onSelectItem }) {
  // Prevent body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer content */}
      <div className="relative z-10 w-72 h-full flex flex-col shadow-2xl animate-in slide-in-from-left duration-300">
        {/* Close Button on Drawer */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <Sidebar
          activeItem={activeItem}
          onSelectItem={onSelectItem}
          isMobile={true}
          onCloseMobile={onClose}
        />
      </div>
    </div>
  );
}

