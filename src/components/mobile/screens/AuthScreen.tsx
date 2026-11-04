import React, { useState } from 'react';
import { Smartphone, CheckCircle, ShieldCheck, ArrowRight, UserCheck, Gift } from 'lucide-react';
import { WishoreLogo } from '../../common/ProduceGraphics';
import { MobileHeader } from '../MobileHeader';
import { ScreenType } from '../../../types';

interface AuthScreenProps {
  onLoginSuccess: (referralCodeApplied?: string) => void;
  onBack: () => void;
  onNavigateScreen?: (screen: ScreenType) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onBack }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [mobileNumber, setMobileNumber] = useState('98401 23456');
  const [referralInput, setReferralInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['4', '8', '1', '2']);

  const handleGetOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpSent) {
      setOtpSent(true);
    } else {
      onLoginSuccess(tab === 'signup' ? referralInput : undefined);
    }
  };

  const handleQuickDemoLogin = () => {
    setMobileNumber('98401 23456');
    onLoginSuccess();
  };

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-white text-slate-800">
      <MobileHeader
        showBack={true}
        onBack={onBack}
        rightAction="dots"
      />

      <div className="px-6 py-4 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Brand Sprout Logo */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="bg-emerald-50/60 hover:bg-emerald-50 px-4 py-2 rounded-2xl flex items-center justify-center border border-emerald-100 shadow-2xs mb-3 transition-colors">
            <img
              src="/assets/aistudio/Doors__991a8f46.png"
              alt="Doors Fresh"
              className="h-9 w-auto object-contain drop-shadow-2xs"
            />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            {tab === 'login' ? 'Welcome Back!' : 'Create Farm Account'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {tab === 'login' ? 'Login to continue to fresh farm orders' : 'Join thousands of healthy families'}
          </p>
        </div>

        {/* Login / Sign Up Segmented Control */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setOtpSent(false);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'login'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('signup');
              setOtpSent(false);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              tab === 'signup'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleGetOtp} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Mobile Number
            </label>
            <div className="relative flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-slate-50/50 focus-within:bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
              <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
                🇮🇳 +91
              </span>
              <Smartphone className="w-4 h-4 text-slate-400 mr-2" />
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter 10-digit number"
                className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none"
                required
              />
            </div>
          </div>

          {/* Referral Code Field for New User Sign Up */}
          {tab === 'signup' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Referral Code (Optional)
                </label>
                <button
                  type="button"
                  onClick={() => setReferralInput('DOORS-PRIYA250')}
                  className="text-[10px] text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  Use: DOORS-PRIYA250
                </button>
              </div>
              <div className="relative flex items-center border border-slate-200 rounded-xl px-3 py-2 bg-slate-50/50 focus-within:bg-white focus-within:border-emerald-500 transition-all">
                <Gift className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                <input
                  type="text"
                  value={referralInput}
                  onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                  placeholder="e.g. DOORS-PRIYA250"
                  className="w-full bg-transparent text-xs font-mono font-bold text-slate-900 outline-none uppercase"
                />
              </div>
              {referralInput && (
                <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                  🎁 +100 bonus Farm Coins & ₹100 discount applied!
                </span>
              )}
            </div>
          )}

          {/* OTP Code fields if sent */}
          {otpSent && (
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-semibold text-emerald-900">Enter OTP sent to +91 {mobileNumber}</span>
                <span className="text-emerald-700 font-mono text-[11px]">00:45</span>
              </div>
              <div className="flex gap-2 justify-center">
                {otpCode.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const updated = [...otpCode];
                      updated[idx] = e.target.value;
                      setOtpCode(updated);
                    }}
                    className="w-10 h-11 text-center font-bold text-base bg-white border border-emerald-300 rounded-lg text-emerald-900 focus:outline-emerald-600 shadow-sm"
                  />
                ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full h-11 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{otpSent ? 'Verify & Continue' : 'Get OTP'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Or continue with */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <span className="relative bg-white px-3 text-[11px] font-medium text-slate-400">
            or continue with
          </span>
        </div>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-700 transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="flex items-center justify-center gap-2 py-2.5 px-3 border border-slate-200 rounded-xl hover:bg-slate-50 active:scale-95 text-xs font-semibold text-slate-700 transition-all"
          >
            <svg className="w-4 h-4 fill-slate-900" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.84c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.65-2.8 1.45-.6.69-1.12 1.83-1 2.95 1.08.08 2.18-.55 2.81-1.3z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Demo Fast Login Helper */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">Prototype convenience:</span>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline text-[11px]"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Quick Login as Priya Sharma
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center border-t border-slate-100 bg-slate-50/50">
        <p className="text-[10px] text-slate-500 leading-relaxed">
          By continuing, you agree to Wishore Agri-Tech's{' '}
          <span className="text-emerald-700 font-medium">Terms of Service</span> &{' '}
          <span className="text-emerald-700 font-medium">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
