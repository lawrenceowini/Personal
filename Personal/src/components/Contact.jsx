export default function Contact() {
  return (
    <section id="contact" className="px-8 py-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact</h2>

      <div className="space-y-4 text-gray-400">
        <p>
          Email:{" "}
          <a href="mailto:youremail@example.com" className="text-blue-400">
            lawrenceowini17@gmail.com
          </a>
        </p>

        <p>
          GitHub:{" "}
          <a
            href="https://github.com/lawrenceowini"
            target="_blank"
            className="text-blue-400"
          >
            github.com/lawrenceowini
          </a>
        </p>
      </div>
    </section>
  );
}
