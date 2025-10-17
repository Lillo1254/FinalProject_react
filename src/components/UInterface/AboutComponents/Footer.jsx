import { Link } from "react-router";
import { Github, Instagram, Twitter, Youtube, Mail } from "lucide-react";


export default function Footer({ generi }) {
  
  const generis = [...new Set(generi)]

  return (
    <footer className="bg-base-200 text-base-content border-t border-base-300">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="flex flex-col items-start space-y-3">
            <h2 className="text-3xl font-bold text-primary">VisualGame</h2>
            <p className="text-sm text-base-content/70 leading-relaxed">
              Esplora un universo di giochi, recensioni e offerte esclusive.  
              Vivi il meglio del gaming in un solo click.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Navigazione</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/market" className="hover:text-accent transition-colors">Market</Link></li>
              <li><Link to="/about-us" className="hover:text-accent transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Categorie</h3>
            <ul className="space-y-2">
             {generis.map((genere) => (
               <li key={genere}><Link to={`/genre/${genere}`} className="hover:text-accent transition-colors">{genere}</Link></li>
             ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Seguici</h3>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-transform transform hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-transform transform hover:scale-110">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-transform transform hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-accent transition-transform transform hover:scale-110">
                <Youtube className="w-6 h-6" />
              </a>
            </div>

            <div className="mt-4">
              <a
                href="mailto:backbacklazio@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-accent"
              >
                <Mail className="w-4 h-4" /> backbacklazio@gmail.com
              </a>
            </div>
          </div>
        </div>

       
        <div className="border-t border-base-300 mt-10 pt-6 text-center text-sm text-base-content/60">
          © {new Date().getFullYear()} <span className="font-semibold text-accent">VisualGame</span>.  
          Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
