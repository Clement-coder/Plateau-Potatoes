import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { LogIn, Loader2, Mail, Lock } from 'lucide-react';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

interface LoginForm { email: string; password: string; }

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: authAPI.login,
    onSuccess: (response) => { login(response.data.token, response.data.user); navigate('/'); },
    onError: (error: any) => { alert(error.response?.data?.message || 'Login failed'); }
  });

  return (
    <div className="clay-page flex items-center justify-center px-4 py-16">
      <div className="clay-card w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
            style={{ background: 'linear-gradient(135deg, #d4edda, #c3e6cb)', boxShadow: '4px 4px 12px rgba(44,182,125,0.25)' }}>
            🥔
          </div>
          <h2 className="text-3xl font-extrabold text-gray-700">Welcome Back</h2>
          <p className="text-gray-400 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit((d) => loginMutation.mutate(d))} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Email</label>
            <div className="clay-input-wrap">
              <Mail className="input-icon w-4 h-4" />
              <input type="email" {...register('email', { required: 'Email is required' })}
                className="clay-input" placeholder="you@example.com" />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">Password</label>
            <div className="clay-input-wrap">
              <Lock className="input-icon w-4 h-4" />
              <input type="password" {...register('password', { required: 'Password is required' })}
                className="clay-input" placeholder="••••••••" />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={loginMutation.isPending} className="clay-btn w-full py-4 text-base mt-2">
            {loginMutation.isPending
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Logging in...</>
              : <><LogIn className="w-4 h-4" /> Login</>}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">Register</Link>
        </p>
        <p className="text-center mt-2">
          <Link to="/forgot-password" className="text-sm text-gray-400 hover:text-green-700 transition-colors">Forgot password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
