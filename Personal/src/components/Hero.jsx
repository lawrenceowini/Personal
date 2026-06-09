import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 sm:px-6 py-16 md:py-24">
      {/* Profile Image */}
      <img
        src={profile}
        alt="Lawrence Owini"
        className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-gray-700 shadow-lg mb-6 md:mb-8"
      />

      {/* Name */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 md:mb-4">
        Lawrence Owini
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mb-6 md:mb-8 px-2">
        Software Developer • Software Engineering Student • Builder of secure
        and intelligent systems.
      </p>

      {/* Social Links */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 md:mb-8 w-full sm:w-auto">
        <a
          href="https://github.com/lawrenceowini"
          target="_blank"
          className="flex items-center justify-center gap-2 bg-gray-900 px-5 py-3 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
        >
          <FaGithub />
          GitHub
        </a>

        <a
          href="#"
          className="flex items-center justify-center gap-2 bg-blue-700 px-5 py-3 rounded-lg hover:bg-blue-600 transition w-full sm:w-auto"
        >
          <FaLinkedin />
          LinkedIn
        </a>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
        <a
          href="#projects"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition w-full sm:w-auto text-center"
        >
          View Projects
        </a>

        <a
          href="/resume.pdf"
          download
          className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-900 transition w-full sm:w-auto text-center"
        >
          Download Résumé
        </a>
      </div>
    </section>
  );
}
