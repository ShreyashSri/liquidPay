"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollDownIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="animate-bounce flex flex-col items-center">
      <span className="text-gray-400 text-sm mb-2">Scroll Down</span>
      <ChevronDown className="h-6 w-6 text-gray-400" />
    </div>
  );
}
