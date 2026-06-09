import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5">
        <h1 className="text-lg sm:text-xl font-bold">Lawrence Owino</h1>
        <div className="hidden md:flex space-x-6 text-gray-300">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-white transition"
            >
              {link}
            </a>
          ))}
        </div>
        <button
          className="md:hidden text-2xl text-gray-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-5 space-y-4 text-gray-300 border-t border-gray-800 pt-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="hover:text-white text-lg"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
