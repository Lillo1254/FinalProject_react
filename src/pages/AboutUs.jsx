import { useEffect } from "react";

export default function AboutUs() {

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  return (
    <div translate="no">
      <section className="bg-primary text-primary min-h-screen flex flex-col items-center justify-center px-6 py-30">
        <div className="max-w-3xl text-center card-surface shadow-form p-10 rounded-2xl">
          <h1 className="text-4xl font-bold mb-4 text-accent">
            Chi Sono
          </h1>
          <p className="text-lg leading-relaxed mb-6">
            Ciao!Sono <span className="text-support font-bold">Alessandro</span>, 
            un <span className="text-accent font-bold">Junior Web Developer</span> appassionato di tecnologia e design.  
            Amo creare interfacce moderne e funzionali che uniscono estetica e performance.  
            Mi piace trasformare un’idea in codice e vedere prendere vita un progetto che possa davvero essere utile e coinvolgente.
          </p>

          <div className="border-t border-primary my-6 opacity-40"></div>

          <h2 className="text-2xl font-semibold mb-3 text-accent">Competenze Tecniche</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-md mb-8">
            {[
              "HTML5",
              "CSS3 / TailwindCSS / Bootstrap",
              "JavaScript",
              "React.js",
              "Laravel",
              "PHP",
              "MySQL",
              "Git / GitHub",
            ].map((skill) => (
              <li
                key={skill}
                className="bg-secondary py-2 px-4 rounded-md shadow-detail hover:shadow-form hover:scale-105 transition-all duration-300"
              >
                {skill}
              </li>
            ))}
          </ul>

          <p className="text-lg leading-relaxed">
            Mi piace lavorare in team, imparare costantemente nuove tecnologie e mantenere
            sempre un approccio <span className="text-support font-medium">curioso e creativo</span>.
            Il mio obiettivo è crescere come sviluppatore e contribuire a progetti con un impatto reale.
          </p>

          <div className="mt-10 flex justify-center">
            <a
              href="/contact"
              className="btn-primary px-6 py-3 rounded-md shadow-neon hover:shadow-detail transition-all duration-300"
            >
              Contattami
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
}
