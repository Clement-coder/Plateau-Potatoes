import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option { value: string; label: string; }

interface ClaySelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  className?: string;
}

const ClaySelect: React.FC<ClaySelectProps> = ({ value, onChange, options, placeholder = 'Select...', className = '' }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = options.find(o => o.value === value);
  const filtered = options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()));

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) { setOpen(false); setSearch(''); } };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch('');
  }, [open]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 text-left"
        style={{
          background: open ? 'linear-gradient(135deg, #2cb67d, #1a9e68)' : 'linear-gradient(135deg, #f0faf4, #e0f5ea)',
          color: open ? 'white' : '#1a9e68',
          boxShadow: open
            ? '4px 4px 12px rgba(44,182,125,0.4), -2px -2px 6px rgba(255,255,255,0.5)'
            : '4px 4px 12px rgba(163,177,198,0.45), -3px -3px 8px rgba(255,255,255,0.85)',
        }}
      >
        <span>{selected ? selected.label : placeholder}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 flex-shrink-0" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute z-50 w-full mt-2 rounded-2xl overflow-hidden"
            style={{ boxShadow: '8px 8px 20px rgba(163,177,198,0.5), -4px -4px 12px rgba(255,255,255,0.8)', background: '#f5faf6' }}
          >
            {/* Search */}
            <div className="p-2 border-b border-green-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                <input
                  ref={searchRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-xl outline-none font-medium text-gray-600 placeholder-gray-400"
                  style={{ background: '#edf7ef', boxShadow: 'inset 2px 2px 6px rgba(163,177,198,0.35), inset -2px -2px 4px rgba(255,255,255,0.7)' }}
                />
              </div>
            </div>

            {/* Options */}
            <div className="overflow-y-auto max-h-48">
              {filtered.length === 0 ? (
                <p className="px-4 py-3 text-sm text-gray-400 text-center">No results</p>
              ) : filtered.map(opt => {
                const active = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => { onChange(opt.value); setOpen(false); setSearch(''); }}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition-colors duration-150 text-left"
                    style={{ color: active ? '#1a9e68' : '#4b7a5e', background: active ? 'rgba(44,182,125,0.08)' : 'transparent' }}
                    onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(44,182,125,0.05)'; }}
                    onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = active ? 'rgba(44,182,125,0.08)' : 'transparent'; }}
                  >
                    {opt.label}
                    {active && <Check className="w-4 h-4 text-green-600 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClaySelect;
