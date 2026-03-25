import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, User, Mail, Lock, Phone, MapPin, Home } from 'lucide-react';
import toast from 'react-hot-toast';
import { authAPI } from '../services/api';
import { nigerianStates } from '../utils/nigerianStates';

interface FormData { name: string; email: string; password: string; phone: string; address: string; state: string; }
type FormErrors = { [key in keyof FormData]?: string; };

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', password: '', phone: '', address: '', state: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{[key in keyof FormData]?: boolean}>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const totalSteps = 2;

  const validatePhone = (p: string) => /^(\+234|0)[789]\d{9}$/.test(p.replace(/\s/g, ''));
  const validateEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const validateStep = (step: number): boolean => {
    const e: FormErrors = {};
    if (step === 1) {
      if (!formData.name.trim()) e.name = 'Full name is required';
      if (!formData.email.trim()) e.email = 'Email is required';
      else if (!validateEmail(formData.email)) e.email = 'Invalid email format';
      if (!formData.password) e.password = 'Password is required';
      else if (formData.password.length < 6) e.password = 'Password must be at least 6 characters';
    }
    if (step === 2) {
      if (!formData.phone.trim()) e.phone = 'Phone number is required';
      else if (!validatePhone(formData.phone)) e.phone = 'Invalid Nigerian phone format (+234 or 0)';
      if (!formData.state) e.state = 'Please select your state';
      if (!formData.address.trim()) e.address = 'Address is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    if (touched[field]) {
      const ne = { ...errors };
      if (field === 'email' && !validateEmail(value)) ne.email = 'Invalid email format';
      else delete ne[field];
      setErrors(ne);
    }
  };

  const handleNext = () => { if (validateStep(currentStep)) { setCurrentStep(p => Math.min(p + 1, totalSteps)); window.scrollTo({ top: 0, behavior: 'smooth' }); } };
  const handleBack = () => { setCurrentStep(p => Math.max(p - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) return;
    setIsSubmitting(true);
    try {
      const { address, state, ...rest } = formData;
      await authAPI.register({ ...rest, address: { street: address, state } });
      toast.success('Registration successful! A welcome email has been sent.');
      navigate('/login');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="clay-page py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-700 mb-2">Create Account</h1>
          <p className="text-gray-400">Join us to start ordering fresh Plateau potatoes.</p>
        </div>

        {/* Progress */}
        <div className="clay-card mb-6">
          <div className="flex items-center">
            {[1, 2].map((step) => (
              <React.Fragment key={step}>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-bold transition-all"
                    style={step <= currentStep
                      ? { background: 'linear-gradient(135deg, #2cb67d, #1a9e68)', boxShadow: '4px 4px 12px rgba(44,182,125,0.35)', color: 'white' }
                      : { background: '#e8f0e9', color: '#9ca3af', boxShadow: '3px 3px 8px rgba(163,177,198,0.4)' }}>
                    {step < currentStep ? <Check className="w-4 h-4" /> : step}
                  </div>
                  <span className="text-xs mt-1 text-gray-500 hidden sm:block">{step === 1 ? 'Account' : 'Contact'}</span>
                </div>
                {step < 2 && <div className={`flex-1 h-1.5 mx-3 rounded-full transition-all ${step < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="clay-card mb-6">
          {currentStep === 1 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-extrabold text-gray-700 mb-4">Account Details</h2>
              {([
                ['Full Name', 'name', 'text', 'Your full name', <User className="input-icon w-4 h-4" />],
                ['Email Address', 'email', 'email', 'you@example.com', <Mail className="input-icon w-4 h-4" />],
                ['Password', 'password', 'password', '••••••••', <Lock className="input-icon w-4 h-4" />]
              ] as const).map(([label, field, type, placeholder, icon]) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-600 mb-2">{label}</label>
                  <div className="clay-input-wrap">
                    {icon}
                    <input type={type} value={formData[field]} placeholder={placeholder}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                      className={`clay-input ${errors[field] ? 'ring-2 ring-red-300' : ''}`} />
                  </div>
                  {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
                </div>
              ))}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5">
              <h2 className="text-2xl font-extrabold text-gray-700 mb-4">Contact Information</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Phone Number</label>
                <div className="clay-input-wrap">
                  <Phone className="input-icon w-4 h-4" />
                  <input type="tel" value={formData.phone} placeholder="+234 803 456 7890"
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`clay-input ${errors.phone ? 'ring-2 ring-red-300' : ''}`} />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">State</label>
                <div className="clay-input-wrap">
                  <MapPin className="input-icon w-4 h-4" />
                  <select value={formData.state} onChange={(e) => handleInputChange('state', e.target.value)}
                    className={`clay-select ${errors.state ? 'ring-2 ring-red-300' : ''}`}>
                    <option value="">Select your state</option>
                    {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">Delivery Address</label>
                <div className="clay-input-wrap items-start">
                  <Home className="input-icon w-4 h-4 mt-3.5" />
                  <textarea value={formData.address} rows={3} placeholder="Your full delivery address"
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`clay-input resize-none ${errors.address ? 'ring-2 ring-red-300' : ''}`} />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {currentStep > 1 && (
            <button onClick={handleBack} className="clay-btn-secondary flex-1 py-4">
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
          )}
          {currentStep < totalSteps ? (
            <button onClick={handleNext} className="clay-btn flex-1 py-4 ml-auto">
              Next <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={isSubmitting} className="clay-btn flex-1 py-4 ml-auto disabled:opacity-60">
              {isSubmitting ? 'Submitting...' : 'Complete Registration'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
