import { Link } from 'react-router-dom';
import { Clock, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="contact" className="bg-brand-dark text-gray-300">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        {/* brand */}
        <div>
          <Logo dark />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-gray-400">
            Your One-Stop Hardware Superstore. From Garden to Workshop — everything you need, under
            one roof in Delgoda since 1998.
          </p>
          <a
            href="https://www.facebook.com/jayakiranapvtltd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Jayakirana on Facebook"
            className="mt-5 inline-grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand-orange"
          >
            <Facebook size={20} />
          </a>
        </div>

        {/* links */}
        <div className="md:justify-self-center">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-400 transition-colors hover:text-brand-orange">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="text-gray-400 transition-colors hover:text-brand-orange">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 transition-colors hover:text-brand-orange">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-400 transition-colors hover:text-brand-orange">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">Get In Touch</h3>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 flex-shrink-0 text-brand-orange" />
              <span className="text-gray-400">
                No. 397, New Kandy Road, Delgoda, Gampaha 11700, Sri Lanka
              </span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="flex-shrink-0 text-brand-orange" />
              <a href="tel:+94771095633" className="text-gray-400 hover:text-brand-orange">
                +94 77 109 5633
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="flex-shrink-0 text-brand-orange" />
              <a href="mailto:jayakiranalk@gmail.com" className="text-gray-400 hover:text-brand-orange">
                jayakiranalk@gmail.com
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="mt-0.5 flex-shrink-0 text-brand-orange" />
              <span className="text-gray-400">
                Mon–Sat: 8am–6pm
                <br />
                Sun: 9am–2pm
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page py-5 text-center text-xs text-gray-500">
          © 2024 Jayakirana Pvt. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
