import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  value: string;
  onChange: (value: string) => void;
  state?: string;
  placeholder?: string;
  className?: string;
}

interface Suggestion { display_name: string; place_id: number; }

const AddressAutocomplete: React.FC<Props> = ({ value, onChange, state = '', placeholder = 'Start typing your address...', className = '' }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const search = useCallback(async (query: string) => {
    if (query.length < 3) { setSuggestions([]); setOpen(false); return; }
    setLoading(true);
    try {
      const stateQuery = state ? `,${state} State,Nigeria` : ',Nigeria';
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query + stateQuery)}&format=json&addressdetails=1&limit=6&countrycodes=ng`,
        { headers: { 'Accept-Language': 'en' } }
      );
      const data: Suggestion[] = await res.json();
      setSuggestions(data);
      setOpen(data.length > 0);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, [state]);

  const handleInput = (val: string) => {
    onChange(val);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => search(val), 400);
  };

  const pick = (s: Suggestion) => {
    // Trim the long Nominatim display_name to just the relevant local part
    const parts = s.display_name.split(',');
    const short = parts.slice(0, 3).join(',').trim();
    onChange(short);
    setOpen(false);
    setSuggestions([]);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <div className="clay-input-wrap">
        {loading
          ? <Loader2 className="input-icon w-4 h-4 animate-spin text-green-500" />
          : <MapPin className="input-icon w-4 h-4" />
        }
        <textarea
          value={value}
          onChange={e => handleInput(e.target.value)}
          placeholder={placeholder}
          rows={2}
          className="clay-input resize-none"
        />
      </div>

      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute z-50 w-full mt-1 rounded-2xl overflow-y-auto max-h-52"
            style={{ boxShadow: '8px 8px 20px rgba(163,177,198,0.5), -4px -4px 12px rgba(255,255,255,0.8)', background: '#f5faf6' }}
          >
            {suggestions.map(s => (
              <button
                key={s.place_id}
                type="button"
                onClick={() => pick(s)}
                className="w-full flex items-start gap-2 px-4 py-3 text-sm text-left transition-colors duration-150 hover:bg-green-50"
                style={{ color: '#4b7a5e' }}
              >
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-green-500" />
                <span className="line-clamp-2">{s.display_name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddressAutocomplete;
