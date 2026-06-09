import profile from "../assets/profile.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-6 py-24">
      <img
        src={profile}
        alt="Lawrence Owini"
        className="w-44 h-44 rounded-full object-cover border-4 border-gray-700 shadow-lg mb-8"
      />

      <h1 className="text-6xl font-bold mb-4">Lawrence Owini</h1>

      <p className="text-gray-400 text-xl max-w-2xl mb-8">
        Software Developer • Software Engineering Student • Builder of secure
        and intelligent systems.
      </p>

      <div className="flex gap-4 mb-8">
        <a
          href="https://github.com/lawrenceowini"
          target="_blank"
          className="flex items-center gap-2 bg-gray-900 px-5 py-3 rounded-lg hover:bg-gray-800 transition"
        >
          <FaGithub />
          GitHub
        </a>

        <a
          href="#"
          className="flex items-center gap-2 bg-blue-700 px-5 py-3 rounded-lg hover:bg-blue-600 transition"
        >
          <FaLinkedin />
          LinkedIn
        </a>
      </div>

      <div className="flex gap-4">
        <a
          href="#projects"
          className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
        >
          View Projects
        </a>

        <a
          href="/resume.pdf"
          download
          className="border border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-900 transition"
        >
          Download Résumé
        </a>
      </div>
    </section>
  );
}
