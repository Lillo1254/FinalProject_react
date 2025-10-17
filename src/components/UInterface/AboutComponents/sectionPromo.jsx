import { Link } from "react-router";
import { ShoppingCart, Gamepad2 } from "lucide-react";

export default function SectionPromo() {
  return (
    <section className="relative w-full py-20 px-6 text-white overflow-hidden rounded-lg " translate="no">


          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] animate-pulse"></div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
        <Gamepad2 className="w-16 h-16 text-yellow-400 animate-bounce" />
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Vivi l’esperienza del gaming come mai prima d’ora 🎮
        </h2>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          Scopri le ultime uscite, i titoli più amati e i migliori affari del momento.  
          Su <span className="text-yellow-400 font-semibold">VisualGame</span> ogni click ti porta in un nuovo mondo!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Link
            to="/market"
            className="btn bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <ShoppingCart className="w-5 h-5" />
            Scopri il Mercato
          </Link>

          <Link
            to="/about-us"
            className="btn bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300"
          >
            Scopri di più
          </Link>
        </div>
      </div>
    </section>
  );
}
