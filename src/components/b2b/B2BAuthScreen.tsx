import React, { useState } from 'react';
import {
  Building2,
  Lock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  FileCheck,
  LogIn,
  UserPlus,
  Store,
  GraduationCap,
  Utensils,
  AlertCircle,
  HelpCircle,
  BadgeCheck,
  RefreshCw,
  Clock,
  Warehouse,
} from 'lucide-react';
import { B2BBusinessProfile, B2BClientCategory, B2BScreenType } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface B2BAuthScreenProps {
  currentClient?: B2BBusinessProfile;
  allClients?: B2BBusinessProfile[];
  onLogin: (client: B2BBusinessProfile) => void;
  onRegisterNewClient?: (client: B2BBusinessProfile) => void;
  onNavigate?: (screen: B2BScreenType) => void;
}

export const B2BAuthScreen: React.FC<B2BAuthScreenProps> = ({
  currentClient,
  allClients = [],
  onLogin,
  onRegisterNewClient,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Login form state
  const [selectedClientId, setSelectedClientId] = useState(currentClient?.id || (allClients[0]?.id ?? 'b2b-01'));
  const [corporatePhone, setCorporatePhone] = useState('98402 88120');
  const [securityPin, setSecurityPin] = useState('4920');
  const [loginError, setLoginError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Signup form state
  const [category, setCategory] = useState<B2BClientCategory>('restaurant');
  const [businessName, setBusinessName] = useState('');
  const [tradeName, setTradeName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [designation, setDesignation] = useState('Executive Chef / Procurement Lead');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gstin, setGstin] = useState('');
  const [fssaiNumber, setFssaiNumber] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('Anna Nagar West');
  const [city, setCity] = useState('Chennai');
  const [dailyTonnageKg, setDailyTonnageKg] = useState(350);
  const [paymentTermsDays, setPaymentTermsDays] = useState(15);
  const [deliverySlot, setDeliverySlot] = useState('04:30 AM - 05:30 AM (Early Kitchen Prep)');
  const [hasColdRoom, setHasColdRoom] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(true);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Quick 1-Click Login Handler
  const handleQuickLogin = (client: B2BBusinessProfile) => {
    setSelectedClientId(client.id);
    onLogin(client);
    if (onNavigate) {
      onNavigate('b2b_catalog');
    }
  };

  // Submit Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!corporatePhone || corporatePhone.replace(/\D/g, '').length < 10) {
      setLoginError('Please enter a valid 10-digit registered corporate phone number');
      return;
    }
    if (!securityPin || securityPin.length < 4) {
      setLoginError('Please enter your 4-digit Corporate Procurement PIN');
      return;
    }

    setLoginError('');
    const matched = allClients.find((c) => c.id === selectedClientId) || allClients[0];
    if (matched) {
      onLogin(matched);
      if (onNavigate) {
        onNavigate('b2b_catalog');
      }
    }
  };

  // Autofill templates for testing signup quickly
  const handleFillTemplate = (cat: B2BClientCategory) => {
    setCategory(cat);
    if (cat === 'hotel') {
      setBusinessName('Feathers - A Radha Hotel');
      setTradeName('Feathers Luxury Hospitality Pvt Ltd');
      setContactPerson('Chef Balasubramanian');
      setDesignation('Director of Culinary Operations');
      setPhone('98402 99201');
      setEmail('culinary.procurement@feathershotel.com');
      setGstin('33AABCF8812K1Z9');
      setFssaiNumber('12421005000789');
      setAddress('4/129 Mount Poonamallee Road, Manapakkam');
      setLocality('Manapakkam - Airport Corridor');
      setCity('Chennai');
      setDailyTonnageKg(650);
      setPaymentTermsDays(15);
      setDeliverySlot('04:00 AM - 05:00 AM (Cold Reefer Truck)');
      setHasColdRoom(true);
    } else if (cat === 'restaurant') {
      setBusinessName('Sangeetha Vegetarian Restaurant Group');
      setTradeName('Sangeetha Caterers & Hospitality LLC');
      setContactPerson('M. Padmanabhan');
      setDesignation('Central Kitchen Supply Head');
      setPhone('98840 77312');
      setEmail('supplychain@sangeethaveg.com');
      setGstin('33AABCS4490P1Z6');
      setFssaiNumber('12420003000672');
      setAddress('No. 7 Gandhi Road, Mylapore');
      setLocality('Mylapore Heritage Zone');
      setCity('Chennai');
      setDailyTonnageKg(420);
      setPaymentTermsDays(7);
      setDeliverySlot('05:00 AM - 06:00 AM (Early Kitchen Prep)');
      setHasColdRoom(true);
    } else if (cat === 'hostel') {
      setBusinessName('VIT University Central Hostel Mess');
      setTradeName('Vellore Institute of Technology Hostel Trust');
      setContactPerson('Dr. K. Swaminathan');
      setDesignation('Chief Hostel Warden');
      setPhone('94441 55670');
      setEmail('hostel.mess@vit.ac.in');
      setGstin('33AAATV3391M1Z1');
      setFssaiNumber('12419002000881');
      setAddress('Vandalur - Kelambakkam Road');
      setLocality('Kelambakkam Institutional Zone');
      setCity('Chennai');
      setDailyTonnageKg(1200);
      setPaymentTermsDays(30);
      setDeliverySlot('03:30 AM - 04:30 AM (Bulk Morning Batch)');
      setHasColdRoom(true);
    } else {
      setBusinessName('Kovai Pazhamudir Nilayam Express');
      setTradeName('KPN Retail Fresh Produce Ltd');
      setContactPerson('S. Murugan');
      setDesignation('Store Cluster Manager');
      setPhone('97910 88234');
      setEmail('procurement.omr@kpnstores.in');
      setGstin('33BAAPK7721N1Z3');
      setFssaiNumber('12422008000412');
      setAddress('Plot 88, 200 Feet Radial Road, Zamin Pallavaram');
      setLocality('Pallavaram - Radial Road');
      setCity('Chennai');
      setDailyTonnageKg(500);
      setPaymentTermsDays(7);
      setDeliverySlot('05:30 AM - 06:30 AM (Store Opening Ready)');
      setHasColdRoom(false);
    }
  };

  // Submit Signup
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone || !gstin) return;

    const creditLimit =
      category === 'hotel'
        ? 500000
        : category === 'hostel'
        ? 350000
        : category === 'restaurant'
        ? 250000
        : 150000;

    const newClient: B2BBusinessProfile = {
      id: `b2b-${Date.now().toString().slice(-4)}`,
      businessName: businessName,
      tradeName: tradeName || businessName,
      category: category,
      contactPerson: `${contactPerson} (${designation})`,
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: email || `procurement@${businessName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      gstin: gstin.toUpperCase(),
      fssaiNumber: fssaiNumber || '12424001000999',
      address: address || 'Main Kitchen Receiving Bay, Gate 2',
      locality: locality || 'Metro Hub Sector',
      city: city || 'Chennai',
      assignedDarkStoreHub: 'South Chennai Central Dark Store (DF-CHN-01)',
      creditLimitInr: creditLimit,
      creditUsedInr: 0,
      paymentTermsDays: paymentTermsDays,
      dailyTonnageKg: dailyTonnageKg || 300,
      dedicatedAccountManager: {
        name: 'Gopinath Sundaram',
        phone: '+91 98408 22100',
        role: 'Senior HORECA Portfolio Manager',
      },
      deliveryWindowPreference: deliverySlot,
      kycStatus: 'verified',
    };

    if (onRegisterNewClient) {
      onRegisterNewClient(newClient);
    } else {
      onLogin(newClient);
    }

    setSignupSuccess(true);
    setTimeout(() => {
      onLogin(newClient);
      if (onNavigate) {
        onNavigate('b2b_catalog');
      }
    }, 900);
  };

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col overflow-y-auto">
      {/* Brand Header & Hero */}
      <div className="relative bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 p-4 border-b border-indigo-900/40 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="bg-white/10 p-1.5 rounded-xl border border-white/20 backdrop-blur-xs">
              <DoorsFreshLogo className="h-6 w-auto" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-black tracking-tight text-white">Doors Fresh</span>
                <span className="text-[10px] font-black uppercase px-1.5 py-0.5 rounded bg-indigo-500 text-white tracking-wider">
                  B2B HORECA
                </span>
              </div>
              <p className="text-[10px] text-indigo-300 font-medium">Wholesale Farm-to-Kitchen Portal</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>04:30 AM Slot Live</span>
          </div>
        </div>

        <div className="bg-indigo-900/30 border border-indigo-700/40 rounded-2xl p-2.5 backdrop-blur-xs">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shrink-0 shadow-md shadow-indigo-900/50">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Enterprise Produce Supply Desk</span>
                <BadgeCheck className="w-3.5 h-3.5 text-indigo-400" />
              </h2>
              <p className="text-[10px] text-slate-300 leading-tight mt-0.5">
                Direct mandi APMC hedging, 25kg/50kg crate wholesale, 15-day credit lines, and temperature-controlled 04:30 AM kitchen receiving.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher: Login vs Sign Up */}
        <div className="mt-3 grid grid-cols-2 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => {
              setAuthMode('login');
              setLoginError('');
            }}
            className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Corporate Sign In</span>
          </button>
          <button
            onClick={() => {
              setAuthMode('signup');
              setLoginError('');
            }}
            className={`py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              authMode === 'signup'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-950'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Register Business</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-3.5 space-y-3.5 pb-20">
        {/* ============================================================== */}
        {/* LOGIN MODE                                                     */}
        {/* ============================================================== */}
        {authMode === 'login' && (
          <div className="space-y-3.5">
            {/* 1-Click Fast Enterprise Switcher */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Click Verified Commercial Accounts:</span>
                </span>
                <span className="text-[10px] text-indigo-400 font-medium">Select to Test</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {allClients.slice(0, 4).map((client) => {
                  const isSelected = selectedClientId === client.id;
                  const getCategoryIcon = () => {
                    switch (client.category) {
                      case 'hotel':
                        return <Building2 className="w-3.5 h-3.5 text-amber-400" />;
                      case 'restaurant':
                        return <Utensils className="w-3.5 h-3.5 text-rose-400" />;
                      case 'hostel':
                        return <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />;
                      default:
                        return <Store className="w-3.5 h-3.5 text-emerald-400" />;
                    }
                  };

                  return (
                    <button
                      key={client.id}
                      onClick={() => handleQuickLogin(client)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                        isSelected
                          ? 'bg-indigo-950/80 border-indigo-500 shadow-md shadow-indigo-950'
                          : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-1 right-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 mb-1">
                        {getCategoryIcon()}
                        <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                          {client.category}
                        </span>
                      </div>
                      <h4 className="text-[11px] font-bold text-white line-clamp-1">{client.businessName}</h4>
                      <p className="text-[9px] text-slate-400 line-clamp-1 mt-0.5">{client.locality}</p>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[9px]">
                        <span className="text-slate-400 font-mono">₹{(client.creditLimitInr / 1000).toFixed(0)}k credit</span>
                        <span className="text-indigo-400 font-semibold">{client.paymentTermsDays}d Net</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Corporate Phone & PIN Login Form */}
            <form onSubmit={handleLoginSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Authorized Procurement Officer Sign In</span>
                </h3>
                <span className="text-[10px] text-slate-400 font-mono">256-Bit SSL</span>
              </div>

              {loginError && (
                <div className="p-2 rounded-xl bg-rose-950/60 border border-rose-800/60 flex items-start gap-2 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-tight">{loginError}</span>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Registered Corporate Mobile
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-xs font-medium font-mono">+91</span>
                  <input
                    type="tel"
                    value={corporatePhone}
                    onChange={(e) => setCorporatePhone(e.target.value)}
                    placeholder="98402 88120"
                    className="w-full pl-12 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    4-Digit Corporate Security PIN / OTP
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(true);
                      setSecurityPin('4920');
                    }}
                    className="text-[10px] text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
                  >
                    {otpSent ? 'Resend OTP (Code: 4920)' : 'Request OTP'}
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    maxLength={6}
                    value={securityPin}
                    onChange={(e) => setSecurityPin(e.target.value)}
                    placeholder="••••"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 tracking-[0.3em] font-mono"
                    required
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
                </div>
                {otpSent && (
                  <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Demo OTP auto-filled: 4920</span>
                  </p>
                )}
              </div>

              {/* Receiving Desk Tablet Option */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                  />
                  <span className="text-[11px] text-slate-300">Keep receiving desk tablet logged in</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For PIN reset, please contact your Dedicated Account Manager: +91 98408 22100')}
                  className="text-[10px] text-slate-500 hover:text-slate-300"
                >
                  Forgot PIN?
                </button>
              </div>

              {/* Submit Sign In Button */}
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer mt-1"
              >
                <span>Authorize & Enter Wholesale Desk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* B2B Partner Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2">
                <Clock className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
                <h5 className="text-[10px] font-bold text-slate-200">04:30 AM SLA</h5>
                <p className="text-[8px] text-slate-400">Sunrise Kitchen Drop</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2">
                <CreditCard className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <h5 className="text-[10px] font-bold text-slate-200">15-Day Net</h5>
                <p className="text-[8px] text-slate-400">Commercial Credit</p>
              </div>
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <h5 className="text-[10px] font-bold text-slate-200">100% ITC Pass</h5>
                <p className="text-[8px] text-slate-400">GST Compliant E-B2B</p>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SIGN UP MODE (INSTITUTIONAL REGISTRATION)                      */}
        {/* ============================================================== */}
        {authMode === 'signup' && (
          <div className="space-y-3.5">
            {/* Quick Template Fill Buttons */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-2.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Autofill New Business Profile:</span>
                </span>
                <span className="text-[9px] text-indigo-400">Instant Sample</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleFillTemplate('hotel')}
                  className="px-2 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[9px] font-bold text-amber-300 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Hotel</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTemplate('restaurant')}
                  className="px-2 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[9px] font-bold text-rose-300 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Resto</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTemplate('hostel')}
                  className="px-2 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[9px] font-bold text-indigo-300 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>Hostel</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleFillTemplate('shop')}
                  className="px-2 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-[9px] font-bold text-emerald-300 flex flex-col items-center gap-0.5 cursor-pointer"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span>Store</span>
                </button>
              </div>
            </div>

            {signupSuccess && (
              <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-600 flex items-center gap-2.5 text-emerald-200 text-xs animate-bounce">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Commercial Application Approved!</h4>
                  <p className="text-[10px] text-emerald-300">
                    Revolving credit line activated. Redirecting to Wholesale Catalog...
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 space-y-3 shadow-md">
              {/* Category Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                  1. Select Commercial Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'hotel' as const, label: 'Hotel & Banquets', icon: Building2, desc: 'Grade-A visual, 25kg crates' },
                    { id: 'restaurant' as const, label: 'Restaurant & Kitchen', icon: Utensils, desc: 'Daily prep staples & herbs' },
                    { id: 'hostel' as const, label: 'College / Corporate Hostel', icon: GraduationCap, desc: '50kg bulk sacks & milk cans' },
                    { id: 'shop' as const, label: 'Retail Produce Mart', icon: Store, desc: 'Sorted crates for retail resale' },
                  ].map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = category === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`p-2 rounded-xl border text-left flex items-start gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-950 border-indigo-500 shadow-xs'
                            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="text-[10px] font-bold text-white leading-tight">{cat.label}</div>
                          <div className="text-[8px] text-slate-400 leading-tight mt-0.5">{cat.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Legal Entity & Trade Name */}
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  2. Business & Authorised Contact
                </span>

                <div>
                  <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Business / Trade Name *</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Radisson Blu Hotel & Banquets"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Authorised Contact *</label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Chef Balasubramanian"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Designation</label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Executive Chef"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Official Mobile *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98402 88120"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Corporate Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="procurement@hotel.com"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Statutory Tax & Food Safety */}
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  3. Statutory Tax & Safety Licenses
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">GSTIN (15 Digits) *</label>
                    <input
                      type="text"
                      maxLength={15}
                      value={gstin}
                      onChange={(e) => setGstin(e.target.value)}
                      placeholder="33AABCR1092K1Z8"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono uppercase"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">FSSAI License No.</label>
                    <input
                      type="text"
                      maxLength={14}
                      value={fssaiNumber}
                      onChange={(e) => setFssaiNumber(e.target.value)}
                      placeholder="12421005000341"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Kitchen Dock Address */}
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  4. Kitchen Receiving Dock Location
                </span>

                <div>
                  <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Receiving Gate / Dock Address *</label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Gate 3, Basement Receiving Dock, GST Road"
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Locality / Zone</label>
                    <input
                      type="text"
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="e.g. Guindy / OMR"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">City</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Chennai"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              {/* Commercial Terms & Supply Preferences */}
              <div className="space-y-2 pt-1 border-t border-slate-800/80">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  5. Commercial Terms & Delivery Slot
                </span>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Credit Line Terms</label>
                    <select
                      value={paymentTermsDays}
                      onChange={(e) => setPaymentTermsDays(Number(e.target.value))}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                    >
                      <option value={15}>15-Day Commercial Credit (Standard)</option>
                      <option value={7}>7-Day Quick Credit (1% Cash Rebate)</option>
                      <option value={30}>30-Day Institutional (Govt/Uni)</option>
                      <option value={0}>Prepaid Advance Wallet (2.5% Off)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Daily Volume (Kg)</label>
                    <input
                      type="number"
                      value={dailyTonnageKg}
                      onChange={(e) => setDailyTonnageKg(Number(e.target.value))}
                      placeholder="350"
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Dedicated Morning Delivery Slot</label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    <option value="04:00 AM - 05:00 AM (Cold Reefer Truck)">04:00 AM - 05:00 AM (Hotel Sunrise Shift)</option>
                    <option value="04:30 AM - 05:30 AM (Early Kitchen Prep)">04:30 AM - 05:30 AM (Restaurant Morning Prep)</option>
                    <option value="03:30 AM - 04:30 AM (Bulk Morning Batch)">03:30 AM - 04:30 AM (Hostel Breakfast Batch)</option>
                    <option value="05:30 AM - 06:30 AM (Store Opening Ready)">05:30 AM - 06:30 AM (Retail Store Display)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="hasColdRoom"
                    checked={hasColdRoom}
                    onChange={(e) => setHasColdRoom(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                  />
                  <label htmlFor="hasColdRoom" className="text-[11px] text-slate-300 cursor-pointer">
                    Commercial kitchen has cold-room or walk-in chiller (2°C - 8°C)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="acceptedTerms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-0"
                    required
                  />
                  <label htmlFor="acceptedTerms" className="text-[10px] text-slate-400 cursor-pointer">
                    Agree to circular returnable plastic crate handshake & GST ITC compliance terms
                  </label>
                </div>
              </div>

              {/* Submit Registration Button */}
              <button
                type="submit"
                disabled={!acceptedTerms}
                className={`w-full py-2.5 font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer ${
                  acceptedTerms
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40 active:scale-[0.98]'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Register Business & Activate Commercial Desk</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Security & Support Footer */}
        <div className="pt-2 text-center text-[10px] text-slate-500 space-y-1">
          <div className="flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Encrypted HORECA Procurement Desk • Doors Fresh Agritech Network</span>
          </div>
          <p>Dedicated Account Manager support: +91 98408 22100 (24x7 Kitchen Emergency)</p>
        </div>
      </div>
    </div>
  );
};
