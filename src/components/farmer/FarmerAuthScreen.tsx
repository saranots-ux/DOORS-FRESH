import React, { useState } from 'react';
import {
  Leaf,
  Phone,
  KeyRound,
  User,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  CreditCard,
  Sprout,
  LogIn,
  UserPlus,
  RefreshCw,
  Tractor,
} from 'lucide-react';
import { FarmerProfile, FarmerScreenType } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface FarmerAuthScreenProps {
  currentFarmer?: FarmerProfile;
  allFarmers?: FarmerProfile[];
  onLogin: (farmer: FarmerProfile) => void;
  onRegisterNewFarmer?: (farmer: FarmerProfile) => void;
  onNavigate?: (screen: FarmerScreenType) => void;
}

export const FarmerAuthScreen: React.FC<FarmerAuthScreenProps> = ({
  currentFarmer,
  allFarmers = [],
  onLogin,
  onRegisterNewFarmer,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('98402 11920');
  const [loginOtp, setLoginOtp] = useState('4492');
  const [otpSent, setOtpSent] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Kanchipuram');
  const [farmSizeAcres, setFarmSizeAcres] = useState(4.5);
  const [primaryCrops, setPrimaryCrops] = useState('Roma Tomatoes, Palak Spinach, Small Onions');
  const [organicCertified, setOrganicCertified] = useState(true);
  const [bankLast4, setBankLast4] = useState('8920');
  const [upiId, setUpiId] = useState('');

  const handleQuickLogin = (farmer: FarmerProfile) => {
    onLogin(farmer);
    if (onNavigate) {
      onNavigate('farmer_home');
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || loginPhone.length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number');
      return;
    }
    // Find matching farmer or fallback to first
    const matched = allFarmers.find((f) => f.phone.includes(loginPhone.replace(/\D/g, '').slice(-6))) || allFarmers[0];
    if (matched) {
      onLogin(matched);
      if (onNavigate) {
        onNavigate('farmer_home');
      }
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newFarmer: FarmerProfile = {
      id: `FARM-${Date.now().toString().slice(-4)}`,
      name: fullName,
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      location: location || `${district} Agritech Belt`,
      district: district,
      state: 'Tamil Nadu',
      farmSizeAcres: Number(farmSizeAcres) || 3.0,
      primaryCrops: primaryCrops.split(',').map((c) => c.trim()).filter(Boolean),
      organicCertified: organicCertified,
      doorsFreshPartnerSince: 'Nov 2024 (Newly Enrolled)',
      kycVerified: true,
      bankAccountLast4: bankLast4 || '4412',
      upiId: upiId || `${fullName.toLowerCase().replace(/\s+/g, '')}@okaxis`,
      rating: 5.0,
      totalTonnageSold: 0,
    };

    if (onRegisterNewFarmer) {
      onRegisterNewFarmer(newFarmer);
    }
    onLogin(newFarmer);
    if (onNavigate) {
      onNavigate('farmer_home');
    }
  };

  const autofillDemoSignup = () => {
    setFullName('Muthuvel Karuppiah');
    setPhone('98401 77319');
    setLocation('Thiruporur Agri Zone');
    setDistrict('Chengalpattu');
    setFarmSizeAcres(5.5);
    setPrimaryCrops('Country Cucumber, Bitter Gourd, Mint');
    setOrganicCertified(true);
    setBankLast4('5519');
    setUpiId('muthuvel.farm@okaxis');
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-b from-emerald-900 via-emerald-950 to-slate-900 p-5 pt-7 pb-6 text-center border-b border-emerald-800/40">
        <div className="flex justify-center mb-2">
          <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-emerald-200">
            <DoorsFreshLogo className="h-6 w-auto" />
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30 mb-1">
          <Tractor className="w-3 h-3 text-emerald-400" />
          <span>Kisan Mitra Pro • உழவர் செயலி</span>
        </div>
        <h1 className="text-lg font-bold text-white tracking-tight">Direct Farmgate Portal</h1>
        <p className="text-xs text-emerald-200/80 max-w-[280px] mx-auto mt-0.5">
          Guaranteed MSP + 15% bonus, 4-hour farmgate Reefer collection, and instant RBI NEFT payouts
        </p>

        {/* Tab Switcher */}
        <div className="mt-4 flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 max-w-[260px] mx-auto">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMode === 'login'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>உள்நுழைவு (Login)</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMode === 'signup'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>பதிவு (Sign Up)</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {authMode === 'login' ? (
          /* LOGIN FORM */
          <div className="space-y-4">
            <form onSubmit={handlePhoneSubmit} className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Farmer Registered Mobile / உழவர் தொலைபேசி
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={loginPhone}
                    onChange={(e) => setLoginPhone(e.target.value)}
                    placeholder="98402 11920"
                    className="w-full pl-12 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    required
                  />
                  <Phone className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                </div>
              </div>

              {otpSent && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      Security OTP (One-Time Password)
                    </label>
                    <span className="text-[10px] text-emerald-400 font-mono">Demo: 4492</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={4}
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="4-digit OTP"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center tracking-[0.5em] text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono font-bold"
                    />
                    <KeyRound className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                  </div>
                </div>
              )}

              {loginError && <p className="text-[11px] text-rose-400">{loginError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all"
              >
                <span>Verify & Enter Kisan Mitra</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Demo Logins */}
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Demo Farmer Accounts:</span>
                </span>
                <span className="text-[10px] text-slate-400">1-click switch</span>
              </div>

              <div className="space-y-2">
                {allFarmers.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleQuickLogin(f)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-750 border border-slate-700/60 hover:border-emerald-500/50 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-emerald-900/80 text-emerald-300 flex items-center justify-center font-bold text-xs border border-emerald-700/50">
                        {f.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-emerald-300 flex items-center gap-1.5">
                          <span>{f.name}</span>
                          {f.organicCertified && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              Organic
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {f.district} • {f.farmSizeAcres} Acres • {f.primaryCrops.slice(0, 2).join(', ')}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* SIGNUP FORM */
          <form onSubmit={handleSignupSubmit} className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
              <div>
                <h3 className="text-xs font-bold text-white">Enroll New Producer</h3>
                <p className="text-[10px] text-slate-400">Join 140+ direct farm suppliers in Tamil Nadu</p>
              </div>
              <button
                type="button"
                onClick={autofillDemoSignup}
                className="text-[10px] px-2 py-1 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800 border border-emerald-700/50 flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>Autofill Demo</span>
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Farmer Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Thiru Selvam / Annamalai"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98401 23456"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="Kanchipuram">Kanchipuram</option>
                  <option value="Thiruvallur">Thiruvallur</option>
                  <option value="Chengalpattu">Chengalpattu</option>
                  <option value="Vellore">Vellore</option>
                  <option value="Dharmapuri">Dharmapuri</option>
                  <option value="Salem">Salem</option>
                  <option value="Krishnagiri">Krishnagiri</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Farm Size (Acres)</label>
                <input
                  type="number"
                  step="0.5"
                  value={farmSizeAcres}
                  onChange={(e) => setFarmSizeAcres(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Village / Locality</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Walajabad"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Primary Crops Cultivated</label>
              <input
                type="text"
                value={primaryCrops}
                onChange={(e) => setPrimaryCrops(e.target.value)}
                placeholder="Roma Tomatoes, Palak, Small Onions"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                required
              />
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-700/60">
              <div className="flex items-center gap-2">
                <Sprout className="w-4 h-4 text-emerald-400" />
                <span className="text-[11px] text-slate-200">Zero Synthetic Pesticide / Organic</span>
              </div>
              <input
                type="checkbox"
                checked={organicCertified}
                onChange={(e) => setOrganicCertified(e.target.checked)}
                className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Bank A/C (Last 4)</label>
                <input
                  type="text"
                  maxLength={4}
                  value={bankLast4}
                  onChange={(e) => setBankLast4(e.target.value)}
                  placeholder="8920"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">UPI ID for DBT</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="farmer@upi"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Enroll & Activate Farmgate Account</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer Guarantee */}
        <div className="pt-3 pb-1 text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Govt. APMC benchmarked • 100% digital weight slip guarantee</span>
          </div>
        </div>
      </div>
    </div>
  );
};
