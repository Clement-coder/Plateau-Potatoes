import React, { useState } from 'react';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface Rule { label: string; test: (v: string) => boolean; }

const rules: Rule[] = [
  { label: 'At least 8 characters', test: v => v.length >= 8 },
  { label: 'One uppercase letter', test: v => /[A-Z]/.test(v) },
  { label: 'One number', test: v => /\d/.test(v) },
  { label: 'One special character', test: v => /[^A-Za-z0-9]/.test(v) },
];

interface Props {
  value: string;
  onChange: (v: string) => void;
  confirmValue?: string;
  onConfirmChange?: (v: string) => void;
  error?: string;
  confirmError?: string;
  showConfirm?: boolean;
  placeholder?: string;
  name?: string;
}

const PasswordInput: React.FC<Props> = ({
  value, onChange, confirmValue = '', onConfirmChange, error, confirmError,
  showConfirm = false, placeholder = '••••••••', name
}) => {
  const [show, setShow] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [focused, setFocused] = useState(false);

  const passed = rules.filter(r => r.test(value)).length;
  const strength = passed === 0 ? null : passed <= 1 ? 'Weak' : passed <= 2 ? 'Fair' : passed <= 3 ? 'Good' : 'Strong';
  const strengthColor = { Weak: '#ef4444', Fair: '#f59e0b', Good: '#3b82f6', Strong: '#2cb67d' }[strength ?? 'Weak'];
  const matches = showConfirm && confirmValue.length > 0 && value === confirmValue;

  return (
    <div className="space-y-3">
      {/* Password field */}
      <div>
        <div className="clay-input-wrap">
          <Lock className="input-icon w-4 h-4" />
          <input
            type={show ? 'text' : 'password'}
            name={name}
            value={value}
            onChange={e => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder={placeholder}
            autoComplete={showConfirm ? 'new-password' : 'current-password'}
            className={`clay-input pr-10 ${error ? 'ring-2 ring-red-300' : ''}`}
          />
          <button type="button" onClick={() => setShow(s => !s)}
            className="absolute right-3 text-gray-400 hover:text-green-600 transition-colors">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {error && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />{error}</p>}
      </div>

      {/* Strength meter — show when focused or has value */}
      {showConfirm && value.length > 0 && (
        <div className="space-y-2">
          <div className="flex gap-1">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                style={{ background: i <= passed ? strengthColor : '#e5e7eb' }} />
            ))}
          </div>
          {strength && <p className="text-xs font-semibold" style={{ color: strengthColor }}>{strength} password</p>}
          <div className="grid grid-cols-2 gap-1">
            {rules.map(r => (
              <p key={r.label} className={`text-xs flex items-center gap-1 transition-colors ${r.test(value) ? 'text-green-600' : 'text-gray-400'}`}>
                <CheckCircle className="w-3 h-3 flex-shrink-0" /> {r.label}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Confirm password */}
      {showConfirm && onConfirmChange && (
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Confirm Password</label>
          <div className="clay-input-wrap">
            {matches
              ? <CheckCircle className="input-icon w-4 h-4 text-green-500" />
              : <Lock className="input-icon w-4 h-4" />}
            <input
              type={showConf ? 'text' : 'password'}
              value={confirmValue}
              onChange={e => onConfirmChange(e.target.value)}
              placeholder="Re-enter password"
              autoComplete="new-password"
              className={`clay-input pr-10 ${confirmError || (confirmValue && !matches) ? 'ring-2 ring-red-300' : matches ? 'ring-2 ring-green-300' : ''}`}
            />
            <button type="button" onClick={() => setShowConf(s => !s)}
              className="absolute right-3 text-gray-400 hover:text-green-600 transition-colors">
              {showConf ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {confirmValue && !matches && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" />Passwords don't match</p>}
          {matches && <p className="text-green-600 text-xs mt-1 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" />Passwords match</p>}
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
