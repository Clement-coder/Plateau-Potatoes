import React, { useState } from 'react';
import { Phone, CheckCircle, AlertCircle } from 'lucide-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const CODES = [
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
];

const validate = (dialCode: string, number: string): string | null => {
  const digits = number.replace(/\D/g, '');
  if (!digits) return null;
  if (dialCode === '+234') {
    if (digits.length !== 10) return 'Nigerian numbers must be 10 digits after +234';
    if (!/^[789]/.test(digits)) return 'Must start with 7, 8, or 9';
    return null;
  }
  if (digits.length < 6) return 'Number too short';
  if (digits.length > 15) return 'Number too long';
  return null;
};

const PhoneInput: React.FC<Props> = ({ value, onChange, error }) => {
  const [dialCode, setDialCode] = useState('+234');
  const [showCodes, setShowCodes] = useState(false);
  const [localNumber, setLocalNumber] = useState(
    value.startsWith('+') ? value.replace(/^\+\d+\s?/, '') : value
  );

  const validationError = validate(dialCode, localNumber);
  const isValid = localNumber.length > 0 && !validationError;

  const handleNumberChange = (raw: string) => {
    // strip leading 0 for Nigerian numbers
    const cleaned = dialCode === '+234' ? raw.replace(/^0+/, '') : raw;
    const digits = cleaned.replace(/[^\d\s\-()]/g, '');
    setLocalNumber(digits);
    onChange(`${dialCode}${digits}`);
  };

  const handleCodeSelect = (code: string) => {
    setDialCode(code);
    setShowCodes(false);
    onChange(`${code}${localNumber}`);
  };

  return (
    <div className="space-y-1">
      <div className="flex gap-2">
        {/* Country code picker */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowCodes(o => !o)}
            className="flex items-center gap-1.5 px-3 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all duration-200"
            style={{
              background: showCodes ? 'linear-gradient(135deg, #2cb67d, #1a9e68)' : 'linear-gradient(135deg, #f0faf4, #e0f5ea)',
              color: showCodes ? 'white' : '#1a9e68',
              boxShadow: '4px 4px 12px rgba(163,177,198,0.45), -3px -3px 8px rgba(255,255,255,0.85)',
            }}
          >
            <span>{CODES.find(c => c.code === dialCode)?.flag}</span>
            <span>{dialCode}</span>
          </button>

          {showCodes && (
            <div className="absolute z-50 top-full mt-1 left-0 rounded-2xl overflow-hidden min-w-max"
              style={{ boxShadow: '8px 8px 20px rgba(163,177,198,0.5), -4px -4px 12px rgba(255,255,255,0.8)', background: '#f5faf6' }}>
              {CODES.map(c => (
                <button key={c.code} type="button" onClick={() => handleCodeSelect(c.code)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold hover:bg-green-50 transition-colors text-left"
                  style={{ color: c.code === dialCode ? '#1a9e68' : '#4b7a5e' }}>
                  <span>{c.flag}</span>
                  <span>{c.name}</span>
                  <span className="text-gray-400 ml-auto">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Number input */}
        <div className="clay-input-wrap flex-1">
          {isValid
            ? <CheckCircle className="input-icon w-4 h-4 text-green-500" />
            : <Phone className="input-icon w-4 h-4" />
          }
          <input
            type="tel"
            value={localNumber}
            onChange={e => handleNumberChange(e.target.value)}
            placeholder={dialCode === '+234' ? '8012345678' : 'Phone number'}
            className="clay-input"
            maxLength={dialCode === '+234' ? 10 : 15}
          />
        </div>
      </div>

      {/* Validation feedback */}
      {localNumber && validationError && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {validationError}
        </p>
      )}
      {localNumber && isValid && (
        <p className="text-green-600 text-xs flex items-center gap-1">
          <CheckCircle className="w-3.5 h-3.5" /> Valid number
        </p>
      )}
      {error && !validationError && (
        <p className="text-red-500 text-xs flex items-center gap-1">
          <AlertCircle className="w-3.5 h-3.5" /> {error}
        </p>
      )}
    </div>
  );
};

export default PhoneInput;
