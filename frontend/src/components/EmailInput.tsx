import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'live.com', 'protonmail.com'];

interface Props {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  name?: string;
}

const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const EmailInput: React.FC<Props> = ({ value, onChange, error, placeholder = 'you@example.com', name }) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (raw: string) => {
    onChange(raw);
    const atIdx = raw.indexOf('@');
    if (atIdx > 0) {
      const typed = raw.slice(atIdx + 1).toLowerCase();
      setSuggestions(
        typed === ''
          ? DOMAINS.map(d => `${raw.slice(0, atIdx)}@${d}`)
          : DOMAINS.filter(d => d.startsWith(typed)).map(d => `${raw.slice(0, atIdx)}@${d}`)
      );
    } else {
      setSuggestions([]);
    }
  };

  const isValid = validateEmail(value);

  return (
    <div className="relative">
      <div className="clay-input-wrap">
        {isValid
          ? <CheckCircle className="input-icon w-4 h-4 text-green-500" />
          : <Mail className="input-icon w-4 h-4" />}
        <input
          type="email"
          name={name}
          value={value}
          onChange={e => handleChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="email"
          className={`clay-input ${error ? 'ring-2 ring-red-300' : ''}`}
          onBlur={() => setSuggestions([])}
        />
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute z-50 w-full mt-1 rounded-2xl overflow-hidden"
            style={{ boxShadow: '8px 8px 20px rgba(163,177,198,0.5), -4px -4px 12px rgba(255,255,255,0.8)', background: '#f5faf6' }}
          >
            {suggestions.map(s => (
              <button key={s} type="button"
                onMouseDown={() => { onChange(s); setSuggestions([]); }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-left hover:bg-green-50 transition-colors"
                style={{ color: '#4b7a5e' }}>
                <Mail className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{error}</p>}
      {!error && isValid && <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />Valid email</p>}
    </div>
  );
};

export default EmailInput;
