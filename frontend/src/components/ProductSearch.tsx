import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsAPI } from '../services/api';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const ProductSearch: React.FC<Props> = ({ value, onChange, placeholder = 'Search products...' }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchSuggestions = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const data = await productsAPI.getProducts({ search: q, page: 1 });
      const names: string[] = (data?.products || []).map((p: any) => p.name);
      setSuggestions(Array.from(new Set(names)).slice(0, 6));
      setOpen(names.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleChange = (v: string) => {
    onChange(v);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => fetchSuggestions(v), 350);
  };

  const pick = (name: string) => { onChange(name); setOpen(false); setSuggestions([]); };
  const clear = () => { onChange(''); setSuggestions([]); setOpen(false); };

  return (
    <div ref={ref} className="relative flex-1 min-w-64">
      <div className="clay-input-wrap">
        {loading
          ? <Loader2 className="input-icon w-4 h-4 animate-spin text-green-500" />
          : <Search className="input-icon w-4 h-4" />}
        <input
          type="text"
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder={placeholder}
          className="clay-input"
          onFocus={() => suggestions.length > 0 && setOpen(true)}
        />
        {value && (
          <button type="button" onClick={clear}
            className="absolute right-3 text-gray-400 hover:text-red-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute z-50 w-full mt-1 rounded-2xl overflow-hidden"
            style={{ boxShadow: '8px 8px 20px rgba(163,177,198,0.5), -4px -4px 12px rgba(255,255,255,0.8)', background: '#f5faf6' }}
          >
            {suggestions.map(s => (
              <button key={s} type="button" onClick={() => pick(s)}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-semibold text-left hover:bg-green-50 transition-colors"
                style={{ color: '#4b7a5e' }}>
                <Search className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductSearch;
