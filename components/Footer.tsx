
// components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Section 1: About */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">StudentPortal</h3>
          <p className="text-gray-400 text-sm">
            Votre plateforme centralisée pour une vie universitaire simplifiée. Accédez à vos cours, emplois du temps, forums et plus encore.
          </p>
        </div>

        {/* Section 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Liens Rapides</h3>
          <ul className="space-y-2">
            <li><Link to="/courses" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Cours et Ressources</Link></li>
            <li><Link to="/timetable" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Emploi du Temps</Link></li>
            <li><Link to="/forum" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Forum / Communauté</Link></li>
            <li><Link to="/scholarships" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Bourses et Stages</Link></li>
          </ul>
        </div>

        {/* Section 3: Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Support</h3>
          <ul className="space-y-2">
            <li><Link to="/contact" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Contactez-nous</Link></li>
            <li><Link to="/faq" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">FAQ</Link></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Politique de Confidentialité</a></li>
            <li><a href="#" className="text-gray-400 hover:text-blue-200 transition-colors duration-300 text-sm">Conditions d'Utilisation</a></li>
          </ul>
        </div>

        {/* Section 4: Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Suivez-nous</h3>
          <div className="flex space-x-4 text-gray-400 text-2xl">
            <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition-colors duration-300"><i className="fab fa-facebook-f"></i></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition-colors duration-300"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Instagram" className="hover:text-blue-400 transition-colors duration-300"><i className="fab fa-instagram"></i></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-400 transition-colors duration-300"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} StudentPortal. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
