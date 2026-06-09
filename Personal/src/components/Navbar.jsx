import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 border-b border-gray-800">
      <div className="flex justify-between items-center px-8 py-5">
        <h1 className="text-xl font-bold">Lawrence Owino</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-300">
          <a href="#about" className="hover:text-white">
            About
          </a>

          <a href="#skills" className="hover:text-white">
            Skills
          </a>

          <a href="#projects" className="hover:text-white">
            Projects
          </a>

          <a href="#contact" className="hover:text-white">
            Contact
          </a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-8 pb-5 space-y-4 text-gray-300">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </nav>
  );
}
