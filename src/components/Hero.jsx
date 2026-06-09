import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-4 sm:px-6 md:px-8 py-14 sm:py-20 md:py-24">
      <img
        src={profile}
        alt="Lawrence Owino"
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full object-cover border-4 border-gray-700 shadow-lg mb-6 sm:mb-8"
      />
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
        Lawrence Owino
      </h1>
      <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xs sm:max-w-xl md:max-w-2xl mb-6 sm:mb-8 leading-relaxed">
        Software Developer • Software Engineering Student • Builder of secure
        and intelligent systems.
      </p>
      <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
        <a
          href="https://github.com/lawrenceOwino"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-900 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
        >
          <FaGithub /> GitHub
        </a>
        <a
          href="#"
          className="flex items-center gap-2 bg-blue-700 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg hover:bg-blue-600 transition text-sm sm:text-base"
        >
          <FaLinkedin /> LinkedIn
        </a>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:w-auto">
        <a
          href="#projects"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition text-center"
        >
          View Projects
        </a>
        <a
          href="/resume.pdf"
          download
          className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-900 transition text-center"
        >
          Download Résumé
        </a>
      </div>
    </section>
  );
}
