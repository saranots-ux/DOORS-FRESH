import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Phone,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Boxes,
  ThermometerSnowflake,
  LogIn,
  UserPlus,
  Store,
  FileCheck,
} from 'lucide-react';
import { FranchiseHub, FranchiseScreenType } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface FranchiseAuthScreenProps {
  currentHub?: FranchiseHub;
  allHubs?: FranchiseHub[];
  onLogin: (hub: FranchiseHub) => void;
  onRegisterNewHub?: (hub: FranchiseHub) => void;
  onNavigate?: (screen: FranchiseScreenType) => void;
}

export const FranchiseAuthScreen: React.FC<FranchiseAuthScreenProps> = ({
  currentHub,
  allHubs = [],
  onLogin,
  onRegisterNewHub,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [selectedHubId, setSelectedHubId] = useState(currentHub?.id || (allHubs[0]?.id ?? 'hub-chn-01'));
  const [managerPhone, setManagerPhone] = useState('98401 55219');
  const [securityPin, setSecurityPin] = useState('2024');
  const [loginError, setLoginError] = useState('');

  // Signup form state
  const [applicantName, setApplicantName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [hubName, setHubName] = useState('');
  const [area, setArea] = useState('OMR Thoraipakkam, Ward 192');
  const [city, setCity] = useState('Chennai');
  const [dailyCapacityKg, setDailyCapacityKg] = useState(4000);
  const [coldRoomTemp, setColdRoomTemp] = useState(4.0);
  const [investmentTier, setInvestmentTier] = useState<'Standard (₹15L)' | 'Super Hub (₹30L)'>('Standard (₹15L)');
  const [hasFssaiGst, setHasFssaiGst] = useState(true);

  const handleQuickLogin = (hub: FranchiseHub) => {
    onLogin(hub);
    if (onNavigate) {
      onNavigate('franchise_home');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managerPhone || !securityPin) {
      setLoginError('Please enter valid credentials and Security PIN');
      return;
    }

    const matchedHub = allHubs.find((h) => h.id === selectedHubId) || allHubs[0];
    if (matchedHub) {
      onLogin(matchedHub);
      if (onNavigate) {
        onNavigate('franchise_home');
      }
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !contactNumber || !hubName) return;

    const newHubCode = `DF-CHN-${area.slice(0, 3).toUpperCase()}`;
    const newHub: FranchiseHub = {
      id: `hub-chn-${Date.now().toString().slice(-4)}`,
      name: hubName,
      code: newHubCode,
      city: city,
      area: area,
      managerName: applicantName,
      contactNumber: contactNumber.startsWith('+91') ? contactNumber : `+91 ${contactNumber}`,
      activeRidersCount: 6,
      coldRoomTempCelsius: coldRoomTemp,
      humidityPercent: 88,
      dailyCapacityKg: dailyCapacityKg,
      currentStockKg: Math.round(dailyCapacityKg * 0.6),
      fulfillmentRatePercent: 99.1,
      avgDeliveryTimeMinutes: 22,
    };

    if (onRegisterNewHub) {
      onRegisterNewHub(newHub);
    }
    onLogin(newHub);
    if (onNavigate) {
      onNavigate('franchise_home');
    }
  };

  const autofillDemoSignup = () => {
    setApplicantName('Sundar Rajan & Co.');
    setContactNumber('94440 22109');
    setHubName('Doors Fresh OMR Tech Corridor Dark Store');
    setArea('OMR Thoraipakkam, Ward 192');
    setCity('Chennai');
    setDailyCapacityKg(5000);
    setColdRoomTemp(3.8);
    setInvestmentTier('Super Hub (₹30L)');
    setHasFssaiGst(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-b from-teal-950 via-slate-900 to-slate-900 p-5 pt-7 pb-6 text-center border-b border-teal-800/40">
        <div className="flex justify-center mb-2">
          <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-teal-200">
            <DoorsFreshLogo className="h-6 w-auto" />
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-semibold border border-teal-500/30 mb-1">
          <Store className="w-3 h-3 text-teal-400" />
          <span>Hub Operations • Dark Store Command</span>
        </div>
        <h1 className="text-lg font-bold text-white tracking-tight">Franchise & Micro-Hub Portal</h1>
        <p className="text-xs text-teal-200/80 max-w-[290px] mx-auto mt-0.5">
          Cold-chain inwarding, 15-min packing station, and fleet dispatch automation
        </p>

        {/* Tab Switcher */}
        <div className="mt-4 flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 max-w-[270px] mx-auto">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMode === 'login'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Store Login</span>
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMode === 'signup'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Apply Franchise</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {authMode === 'login' ? (
          /* LOGIN FORM */
          <div className="space-y-4">
            <form onSubmit={handleLoginSubmit} className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Select Franchise Dark Store Hub
                </label>
                <div className="relative">
                  <select
                    value={selectedHubId}
                    onChange={(e) => setSelectedHubId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500"
                  >
                    {allHubs.map((hub) => (
                      <option key={hub.id} value={hub.id}>
                        {hub.name} ({hub.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Hub Manager Mobile / Staff Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={managerPhone}
                    onChange={(e) => setManagerPhone(e.target.value)}
                    placeholder="98401 55219"
                    className="w-full pl-12 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                    required
                  />
                  <Phone className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-medium text-slate-300">
                    Store Security PIN
                  </label>
                  <span className="text-[10px] text-teal-400 font-mono">Demo: 2024</span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={4}
                    value={securityPin}
                    onChange={(e) => setSecurityPin(e.target.value)}
                    placeholder="4-digit PIN"
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center tracking-[0.5em] text-sm placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono font-bold"
                    required
                  />
                  <Lock className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                </div>
              </div>

              {loginError && <p className="text-[11px] text-rose-400">{loginError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-teal-950/40 flex items-center justify-center gap-2 transition-all"
              >
                <span>Open Dark Store Dispatch Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Demo Hub Logins */}
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Hub Manager Access:</span>
                </span>
                <span className="text-[10px] text-slate-400">1-click switch</span>
              </div>

              <div className="space-y-2">
                {allHubs.map((h) => (
                  <button
                    key={h.id}
                    type="button"
                    onClick={() => handleQuickLogin(h)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-750 border border-slate-700/60 hover:border-teal-500/50 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-teal-950 text-teal-300 flex items-center justify-center font-bold text-xs border border-teal-700/50">
                        {h.code.slice(-3)}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-teal-300 flex items-center gap-1.5">
                          <span>{h.name}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Mgr: {h.managerName} • {h.activeRidersCount} EV Riders • {h.coldRoomTempCelsius}°C Cold Room
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
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
                <h3 className="text-xs font-bold text-white">Franchise Partnership Application</h3>
                <p className="text-[10px] text-slate-400">Launch a high-margin Doors Fresh Dark Store</p>
              </div>
              <button
                type="button"
                onClick={autofillDemoSignup}
                className="text-[10px] px-2 py-1 rounded-lg bg-teal-950/70 text-teal-300 hover:bg-teal-900 border border-teal-700/50 flex items-center gap-1"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>Autofill Demo</span>
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Applicant / Firm Name</label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="e.g. Sundar Rajan Logistics LLP"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Contact Number</label>
                <input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="98401 23456"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Investment Tier</label>
                <select
                  value={investmentTier}
                  onChange={(e) => setInvestmentTier(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500"
                >
                  <option value="Standard (₹15L)">Standard (₹15L)</option>
                  <option value="Super Hub (₹30L)">Super Hub (₹30L)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Proposed Store Name</label>
              <input
                type="text"
                value={hubName}
                onChange={(e) => setHubName(e.target.value)}
                placeholder="e.g. Doors Fresh OMR Dark Store"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-teal-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Area / Ward</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. OMR Thoraipakkam"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Daily Capacity (Kg)</label>
                <input
                  type="number"
                  step="500"
                  value={dailyCapacityKg}
                  onChange={(e) => setDailyCapacityKg(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Cold Room (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={coldRoomTemp}
                  onChange={(e) => setColdRoomTemp(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-700/60">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-teal-400" />
                <span className="text-[11px] text-slate-200">FSSAI License & Commercial GSTIN Active</span>
              </div>
              <input
                type="checkbox"
                checked={hasFssaiGst}
                onChange={(e) => setHasFssaiGst(e.target.checked)}
                className="w-4 h-4 accent-teal-500 rounded cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-teal-950/40 flex items-center justify-center gap-2 transition-all mt-2"
            >
              <span>Submit & Provision Micro-Hub</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer Guarantee */}
        <div className="pt-3 pb-1 text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>11.2% guaranteed gross margin + zero-spoilage insurance subsidy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
