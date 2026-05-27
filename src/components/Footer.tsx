import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Linkedin } from "lucide-react";
import { categories } from "@/data/categories";

export default function Footer() {
  const mainCats = categories.slice(0, 6);
  return (
    <footer className="bg-black text-gray-300">
      {/* CTA strip */}
      <div className="bg-primary py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-xl font-bold">Potrzebujesz fachowej porady?</h3>
            <p className="text-red-100 text-sm">Nasi eksperci są do Twojej dyspozycji – bezpłatne doradztwo techniczne</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="tel:+48509567213" className="flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
              <Phone className="w-4 h-4" /> +48 509 567 213
            </a>
            <Link to="/kontakt" className="flex items-center gap-2 bg-transparent border-2 border-white text-white font-bold px-6 py-3 rounded-lg hover:bg-white hover:text-primary transition-colors">
              <Mail className="w-4 h-4" /> Napisz do nas
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Company */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded flex items-center justify-center">
              <span className="text-white font-black text-lg">MB</span>
            </div>
            <div>
              <div className="font-black text-white text-lg leading-none">MEDIA BUD</div>
              <div className="text-xs text-gray-500 leading-none">Skład Budowlany</div>
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-4">Profesjonalna hurtownia materiałów budowlanych w Lublinie. Obsługujemy deweloperów i klientów indywidualnych od lat.</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span>ul. Budowlana 1, 20-001 Lublin</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary flex-shrink-0" />
              <a href="tel:+48509567213" className="hover:text-white transition-colors">+48 509 567 213</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary flex-shrink-0" />
              <a href="mailto:sprzedaz@mediabud.pl" className="hover:text-white transition-colors">sprzedaz@mediabud.pl</a>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <div>Pon–Pt: 7:00–17:00</div>
                <div>Sob: 8:00–14:00</div>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram className="w-4 h-4 text-white" />
            </a>
            <a href="#" className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-primary transition-colors">
              <Linkedin className="w-4 h-4 text-white" />
            </a>
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Kategorie produktów</h4>
          <ul className="space-y-2 text-sm">
            {mainCats.map(cat => (
              <li key={cat.id}>
                <Link to={`/kategoria/${cat.slug}`} className="hover:text-white hover:pl-1 transition-all">{cat.name}</Link>
              </li>
            ))}
            <li><Link to="/produkty" className="text-primary hover:text-red-400 font-medium">→ Wszystkie kategorie</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Usługi</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/uslugi/dom-od-podstaw" className="hover:text-white hover:pl-1 transition-all">Program „Dom od podstaw"</Link></li>
            <li><Link to="/uslugi/doradztwo-techniczne" className="hover:text-white hover:pl-1 transition-all">Doradztwo techniczne</Link></li>
            <li><Link to="/uslugi/transport" className="hover:text-white hover:pl-1 transition-all">Transport materiałów</Link></li>
            <li><Link to="/uslugi/podwykonawstwo" className="hover:text-white hover:pl-1 transition-all">Podwykonawstwo</Link></li>
            <li><Link to="/uslugi/siec-specjalistow" className="hover:text-white hover:pl-1 transition-all">Sieć specjalistów</Link></li>
          </ul>
          <h4 className="text-white font-bold mb-4 mt-6 text-sm uppercase tracking-wider">Informacje</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/o-firmie" className="hover:text-white hover:pl-1 transition-all">O firmie</Link></li>
            <li><Link to="/realizacje" className="hover:text-white hover:pl-1 transition-all">Realizacje</Link></li>
            <li><Link to="/blog" className="hover:text-white hover:pl-1 transition-all">Blog techniczny</Link></li>
            <li><Link to="/kontakt" className="hover:text-white hover:pl-1 transition-all">Kontakt</Link></li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Znajdź nas</h4>
          <div className="w-full h-40 bg-gray-800 rounded-lg overflow-hidden mb-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156388.35438088064!2d22.4083836!3d51.246452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4722517b51b87de3%3A0x5b0ff7cbec274f1e!2sLublin!5e0!3m2!1spl!2spl!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Media Bud Lublin"
            />
          </div>
          <p className="text-xs text-gray-500">Skład budowlany zlokalizowany w Lublinie, woj. lubelskie. Obsługujemy cały region lubelski.</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>© 2026 Media Bud – Skład Budowlany Lublin. Wszelkie prawa zastrzeżone.</span>
          <div className="flex gap-4">
            <Link to="/polityka-prywatnosci" className="hover:text-gray-300 transition-colors">Polityka prywatności</Link>
            <Link to="/rodo" className="hover:text-gray-300 transition-colors">RODO</Link>
            <Link to="/regulamin" className="hover:text-gray-300 transition-colors">Regulamin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
