import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogOut, User as UserIcon, Edit, LogIn } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { totalUniqueItems } = useCart();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLink = (to: string, label: string) => {
    const active = pathname === to;
    return (
      <Link key={to} to={to}
        className="relative px-4 py-2 rounded-2xl text-sm font-semibold transition-colors duration-150 z-10"
        style={{ color: active ? 'white' : '#4b7a5e' }}
      >
        {active && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 rounded-2xl z-[-1]"
            style={{ background: 'linear-gradient(135deg, #2cb67d, #1a9e68)', boxShadow: '4px 4px 10px rgba(44,182,125,0.35), -2px -2px 6px rgba(255,255,255,0.6)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}
        {label}
      </Link>
    );
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    navigate('/login');
    toggleMobileMenu();
  };

  return (
    <div className="px-3 pt-3 sticky top-0 z-40">
    <header className="rounded-3xl px-6 py-4"
      style={{ background: 'linear-gradient(135deg, #f5faf6, #edf7ef)', boxShadow: '8px 8px 20px rgba(163,177,198,0.45), -6px -6px 16px rgba(255,255,255,0.85)' }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-green-700 tracking-tight">
          <img src="/logo.png" alt="Plateau Potatoes NG" className="h-9" onError={(e) => { (e.target as HTMLImageElement).style.display='none'; }} />
          <span className="sr-only">Plateau Potatoes NG</span>
        </Link>

        {/* Nav links pill */}
        <nav className="hidden md:flex items-center gap-0 p-1.5 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #edf7ef, #e4f2e6)', boxShadow: 'inset 3px 3px 8px rgba(163,177,198,0.35), inset -2px -2px 6px rgba(255,255,255,0.7)' }}>
          {navLink('/', 'Home')}
          {navLink('/products', 'Products')}
          {navLink('/gallery', 'Gallery')}
        </nav>

        {/* Actions pill */}
        <div className="hidden md:flex items-center gap-2">

          <Link to="/cart" className="relative">
            <div className="clay-btn-secondary !px-3 !py-2">
              <ShoppingCart className="w-5 h-5" />
              {totalUniqueItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold shadow">
                  {totalUniqueItems}
                </span>
              )}
            </div>
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/account" className="clay-btn-secondary !px-4 !py-2 text-sm">
                <UserIcon className="w-4 h-4" /> Account
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="clay-btn-secondary !px-4 !py-2 text-sm">
                  <Edit className="w-4 h-4" /> Admin
                </Link>
              )}
              <button onClick={handleLogout} className="clay-btn-danger !px-4 !py-2 text-sm">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="clay-btn-secondary !px-4 !py-2 text-sm">
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link to="/register" className="clay-btn !px-4 !py-2 text-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button onClick={toggleMobileMenu} className="md:hidden clay-btn-secondary !px-3 !py-2">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
          style={{ background: 'linear-gradient(135deg, #e8f5e9, #f0f4f0)' }}>
          <button onClick={toggleMobileMenu} className="absolute top-5 right-5 clay-btn-secondary !px-3 !py-2">
            <X className="w-6 h-6" />
          </button>
          {[['/', 'Home'], ['/products', 'Products'], ['/gallery', 'Gallery']].map(([to, label]) => (
            <Link key={to} to={to} className="text-3xl font-extrabold text-green-800 hover:text-green-600 transition-colors" onClick={toggleMobileMenu}>{label}</Link>
          ))}
          <Link to="/cart" className="clay-btn-secondary text-2xl font-bold !px-8 !py-4" onClick={toggleMobileMenu}>
            <ShoppingCart className="w-6 h-6" /> Cart {totalUniqueItems > 0 && `(${totalUniqueItems})`}
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/account" className="clay-btn-secondary text-2xl font-bold !px-8 !py-4" onClick={toggleMobileMenu}>
                <UserIcon className="w-6 h-6" /> Account
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin/products" className="clay-btn-secondary text-2xl font-bold !px-8 !py-4" onClick={toggleMobileMenu}>
                  <Edit className="w-6 h-6" /> Admin
                </Link>
              )}
              <button onClick={handleLogout} className="clay-btn-danger text-2xl font-bold !px-8 !py-4">
                <LogOut className="w-6 h-6" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="clay-btn-secondary text-2xl font-bold !px-8 !py-4" onClick={toggleMobileMenu}>
                <LogIn className="w-6 h-6" /> Login
              </Link>
              <Link to="/register" className="clay-btn text-2xl font-bold !px-8 !py-4" onClick={toggleMobileMenu}>
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
    </div>
  );
};

export default Header;
