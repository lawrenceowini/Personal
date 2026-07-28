import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { useActiveSection } from "../hooks/useActiveSection";

const LINKS = ["About", "Skills", "Projects", "Contact"];
const SECTION_IDS = LINKS.map((link) => link.toLowerCase());

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const progress = useScrollProgress();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    <nav className="sticky top-0 z-50 bg-bg/90 backdrop-blur-sm border-b border-border">
      {/* Scroll progress indicator */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />

      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5">
        <a
          href="#"
          className="font-display text-lg sm:text-xl font-semibold tracking-tight"
        >
          Lawrence Owino
        </a>

        <div className="hidden md:flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
          {LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeId === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                className={`transition-colors pb-1 border-b-2 ${
                  isActive
                    ? "text-accent border-accent"
                    : "text-muted border-transparent hover:text-white"
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>

        <button
          className="md:hidden text-2xl text-muted"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-5 space-y-4 font-mono text-sm uppercase tracking-wider border-t border-border pt-4">
          {LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeId === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                className={isActive ? "text-accent" : "text-muted"}
                onClick={() => setIsOpen(false)}
              >
                {link}
              </a>
            );
          })}
        </div>
      )}
    </nav>
  );
}
