import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 px-4 pb-8">
      <div className="max-w-6xl mx-auto clay-card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-extrabold text-green-800 mb-3">Plateau Potatoes NG</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your trusted source for premium Plateau potatoes, delivered fresh to your doorstep across Nigeria.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-green-800 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/products', 'Products'], ['/gallery', 'Gallery'], ['/account', 'My Account']].map(([to, label]) => (
                <li key={to}><Link to={to} className="text-gray-500 hover:text-green-700 transition-colors font-medium">{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold text-green-800 mb-3">Connect With Us</h3>
            <p className="text-sm text-gray-500 mb-4">info@plateaupotatoesng.com</p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="clay-btn-secondary !px-3 !py-2">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-green-100 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Plateau Potatoes NG. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
