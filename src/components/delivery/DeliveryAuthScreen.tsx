import React, { useState, useEffect } from 'react';
import {
  Bike,
  Lock,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  ThermometerSnowflake,
  LogIn,
  UserPlus,
  CreditCard,
  MapPin,
  FileBadge,
  FileCheck,
  Clock,
  RotateCcw,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { DeliveryPartnerProfile, DeliveryScreenType } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface DeliveryAuthScreenProps {
  currentRider?: DeliveryPartnerProfile;
  allRiders?: DeliveryPartnerProfile[];
  onLogin: (rider: DeliveryPartnerProfile) => void;
  onRegisterNewRider?: (rider: DeliveryPartnerProfile) => void;
  onNavigate?: (screen: DeliveryScreenType) => void;
}

export const DeliveryAuthScreen: React.FC<DeliveryAuthScreenProps> = ({
  currentRider,
  allRiders = [],
  onLogin,
  onRegisterNewRider,
  onNavigate,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'verification_status'>('login');
  const [loginMethod, setLoginMethod] = useState<'otp' | 'pin'>('otp');

  // Login form state
  const [phone, setPhone] = useState('97910 44211');
  const [riderPin, setRiderPin] = useState('3318');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [otpTimer, setOtpTimer] = useState(30);
  const [loginError, setLoginError] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('Ather 450X Gen 3 (EV)');

  // Signup form state
  const [riderName, setRiderName] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [dlNumber, setDlNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('Ather 450X Gen 3 (EV)');
  const [vehiclePlate, setVehiclePlate] = useState('TN-07-CW-3419');
  const [hubPreference, setHubPreference] = useState('Velachery Micro-Hub (DF-CHN-VEL)');
  const [upiId, setUpiId] = useState('');
  const [agreedToColdBagCare, setAgreedToColdBagCare] = useState(true);

  // Recently registered rider for verification approval view
  const [registeredRider, setRegisteredRider] = useState<DeliveryPartnerProfile | null>(null);
  const [adminApprovalStatus, setAdminApprovalStatus] = useState<'pending' | 'approved'>('approved');

  // Default demo riders
  const demoRiders: DeliveryPartnerProfile[] = allRiders.length > 0 ? allRiders : [
    {
      id: 'RIDER-01',
      name: 'Vijay Raghavan',
      phone: '+91 97910 44211',
      avatarText: 'VR',
      assignedHubName: 'Velachery Micro-Hub',
      assignedHubCode: 'DF-CHN-VEL',
      vehicleModel: 'Ather 450X Gen 3 (EV)',
      vehiclePlate: 'TN-07-CB-4891',
      batteryPercent: 84,
      rangeKmRemaining: 68,
      insulatedBagId: 'DF-COOL-BOX-41',
      coldBagTempCelsius: 5.2,
      isOnline: true,
      rating: 4.96,
      totalDeliveries: 1248,
      onTimeRatePercent: 99.4,
      upiId: 'vijay.raghavan@okaxis',
      bankLast4: '7103',
    },
    {
      id: 'RIDER-02',
      name: 'Karthik Raja',
      phone: '+91 98840 22910',
      avatarText: 'KR',
      assignedHubName: 'Chennai Central Dark Store',
      assignedHubCode: 'DF-CHN-CEN',
      vehicleModel: 'Ola S1 Pro Gen 2 (EV)',
      vehiclePlate: 'TN-01-AX-9912',
      batteryPercent: 92,
      rangeKmRemaining: 88,
      insulatedBagId: 'DF-COOL-BOX-18',
      coldBagTempCelsius: 4.8,
      isOnline: true,
      rating: 4.92,
      totalDeliveries: 984,
      onTimeRatePercent: 98.9,
      upiId: 'karthik.raja@oksbi',
      bankLast4: '4419',
    },
    {
      id: 'RIDER-03',
      name: 'Senthil Nathan',
      phone: '+91 98840 12894',
      avatarText: 'SN',
      assignedHubName: 'Tambaram Cold-Chain Hub',
      assignedHubCode: 'DF-CHN-TAM',
      vehicleModel: 'TVS iQube Electric',
      vehiclePlate: 'TN-11-BZ-5502',
      batteryPercent: 76,
      rangeKmRemaining: 55,
      insulatedBagId: 'DF-COOL-BOX-62',
      coldBagTempCelsius: 5.5,
      isOnline: true,
      rating: 4.89,
      totalDeliveries: 1110,
      onTimeRatePercent: 99.1,
      upiId: 'senthil.n@okaxis',
      bankLast4: '3810',
    },
  ];

  // OTP Countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const handleSendOtp = () => {
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setLoginError('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoginError('');
    setOtpSent(true);
    setOtpTimer(30);
    // Autofill demo OTP helper
    setOtpCode(['8', '9', '2', '1']);
  };

  const handleOtpInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    // Auto focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleQuickLogin = (rider: DeliveryPartnerProfile) => {
    onLogin(rider);
    if (onNavigate) {
      onNavigate('delivery_home');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      setLoginError('Please enter registered mobile number');
      return;
    }

    if (loginMethod === 'otp') {
      const fullOtp = otpCode.join('');
      if (!otpSent) {
        handleSendOtp();
        return;
      }
      if (fullOtp.length < 4) {
        setLoginError('Please enter 4-digit verification OTP');
        return;
      }
    } else {
      if (!riderPin) {
        setLoginError('Please enter 4-digit security PIN');
        return;
      }
    }

    const matched =
      demoRiders.find((r) => r.phone.replace(/\D/g, '').includes(phone.replace(/\D/g, '').slice(-6))) ||
      demoRiders[0];

    onLogin(matched);
    if (onNavigate) {
      onNavigate('delivery_home');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!riderName || !signupPhone) return;

    const initials =
      riderName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'RP';
    const hubParts = hubPreference.split('(');
    const hubName = hubParts[0].trim();
    const hubCode = hubParts[1] ? hubParts[1].replace(')', '').trim() : 'DF-CHN-VEL';

    const newRider: DeliveryPartnerProfile = {
      id: `RIDER-${Date.now().toString().slice(-4)}`,
      name: riderName,
      phone: signupPhone.startsWith('+91') ? signupPhone : `+91 ${signupPhone}`,
      avatarText: initials,
      assignedHubName: hubName,
      assignedHubCode: hubCode,
      vehicleModel: vehicleModel,
      vehiclePlate: vehiclePlate || 'TN-07-CW-3419',
      batteryPercent: 100,
      rangeKmRemaining: 95,
      insulatedBagId: `DF-COOL-BOX-${Math.floor(Math.random() * 80 + 10)}`,
      coldBagTempCelsius: 4.5,
      isOnline: true,
      rating: 5.0,
      totalDeliveries: 0,
      onTimeRatePercent: 100,
      upiId: upiId || `${riderName.toLowerCase().replace(/\s+/g, '')}@okaxis`,
      bankLast4: '9920',
    };

    setRegisteredRider(newRider);
    setAdminApprovalStatus('approved');
    setAuthMode('verification_status');

    if (onRegisterNewRider) {
      onRegisterNewRider(newRider);
    }
  };

  const handleCompleteOnboardingAndEnterApp = () => {
    if (registeredRider) {
      onLogin(registeredRider);
    }
    if (onNavigate) {
      onNavigate('delivery_home');
    }
  };

  const autofillDemoSignup = () => {
    setRiderName('Dinesh Chandran');
    setSignupPhone('98403 99120');
    setDlNumber('TN0720210084910');
    setAadhaarNumber('8940 3319 8012');
    setVehicleModel('Ather 450X Gen 3 (EV)');
    setVehiclePlate('TN-07-CW-3419');
    setHubPreference('Velachery Micro-Hub (DF-CHN-VEL)');
    setUpiId('dinesh.c@okaxis');
    setAgreedToColdBagCare(true);
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Header Banner */}
      <div className="relative bg-gradient-to-b from-blue-950 via-slate-900 to-slate-900 p-4 pt-6 pb-5 text-center border-b border-blue-800/40 shrink-0">
        <div className="flex justify-center mb-2">
          <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-blue-200">
            <DoorsFreshLogo className="h-6 w-auto" />
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-semibold border border-blue-500/30 mb-1">
          <Bike className="w-3 h-3 text-blue-400" />
          <span>EV Fleet Partner • Delivery Network</span>
        </div>
        <h1 className="text-base font-bold text-white tracking-tight">Rider Partner Portal</h1>
        <p className="text-xs text-blue-200/80 max-w-[280px] mx-auto mt-0.5">
          ₹40/drop base + distance bonus, cold-bag incentives & instant daily UPI payouts
        </p>

        {/* Tab Switcher */}
        {authMode !== 'verification_status' && (
          <div className="mt-3 flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 max-w-[270px] mx-auto">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Rider Login</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                authMode === 'signup'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Join Fleet</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {authMode === 'verification_status' && registeredRider ? (
          /* ADMIN VERIFICATION & APPROVAL SCREEN */
          <div className="space-y-3.5">
            <div className="bg-gradient-to-br from-emerald-950 to-slate-900 border border-emerald-500/60 p-4 rounded-2xl text-center space-y-2 shadow-lg">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                  {adminApprovalStatus === 'approved' ? 'KYC Approved & Onboarded' : 'Verification Under Review'}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{registeredRider.name}</h3>
                <p className="text-xs text-slate-300 font-mono">{registeredRider.phone}</p>
              </div>

              {/* Approval status toggle simulator for testing */}
              <div className="pt-2 flex justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setAdminApprovalStatus('approved')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                    adminApprovalStatus === 'approved'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  Admin Approved (Ready)
                </button>
                <button
                  type="button"
                  onClick={() => setAdminApprovalStatus('pending')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-colors cursor-pointer ${
                    adminApprovalStatus === 'pending'
                      ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}
                >
                  Pending Admin Verification
                </button>
              </div>
            </div>

            {/* Document Checklist Cards */}
            <div className="bg-slate-950 rounded-2xl p-3.5 border border-slate-800 space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" /> Driver Documents Verification Status
              </h4>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">Driving License (TN Transport)</span>
                    <span className="text-[10px] text-slate-400 font-mono">{dlNumber || 'TN0720210084910'}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">Aadhaar Identity Card</span>
                    <span className="text-[10px] text-slate-400 font-mono">•••• •••• {aadhaarNumber.slice(-4) || '8012'}</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> UIDAI Linked
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">EV Vehicle RC & Green Badge</span>
                    <span className="text-[10px] text-slate-400">{registeredRider.vehicleModel} ({registeredRider.vehiclePlate})</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Compliant
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="font-bold text-white block">Insulated Cold Box Asset</span>
                    <span className="text-[10px] text-slate-400 font-mono">{registeredRider.insulatedBagId} (Pre-calibrated 4.5°C)</span>
                  </div>
                  <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Bag Issued
                  </span>
                </div>
              </div>
            </div>

            {/* Action to proceed */}
            {adminApprovalStatus === 'approved' ? (
              <button
                type="button"
                onClick={handleCompleteOnboardingAndEnterApp}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Enter Rider Dashboard & Go Online</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-3 bg-amber-950/60 border border-amber-800/80 rounded-xl text-center text-xs text-amber-200">
                <AlertCircle className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="font-bold block">Awaiting Admin Dark Store Inspection</span>
                <span className="text-[11px] text-amber-300/80">
                  Click 'Admin Approved' toggle above to simulate instant verification.
                </span>
              </div>
            )}
          </div>
        ) : authMode === 'login' ? (
          /* LOGIN FORM (Mobile OTP & PIN options) */
          <div className="space-y-4">
            {/* Toggle Login Method */}
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-slate-400 text-[11px] font-medium">Select Sign In Method:</span>
              <div className="flex items-center gap-1 bg-slate-800 p-0.5 rounded-lg border border-slate-700">
                <button
                  type="button"
                  onClick={() => setLoginMethod('otp')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    loginMethod === 'otp' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Mobile OTP
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod('pin')}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                    loginMethod === 'pin' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Rider PIN
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 shadow-md">
              <div>
                <label className="block text-[11px] font-medium text-slate-300 mb-1">
                  Registered Rider Mobile Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 text-xs font-bold">
                    +91
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="97910 44211"
                    className="w-full pl-12 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                    required
                  />
                  <Phone className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                </div>
              </div>

              {loginMethod === 'otp' ? (
                /* OTP Verification Block */
                <div className="space-y-2 pt-1 border-t border-slate-700/60">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium text-slate-300">
                      One-Time Password (OTP)
                    </label>
                    {otpSent ? (
                      <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> OTP Sent via SMS
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="text-[10px] text-blue-400 hover:text-blue-300 font-bold cursor-pointer underline"
                      >
                        Request OTP
                      </button>
                    )}
                  </div>

                  {otpSent ? (
                    <div className="space-y-2">
                      <div className="flex justify-center gap-2">
                        {otpCode.map((digit, idx) => (
                          <input
                            key={idx}
                            id={`otp-input-${idx}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpInputChange(idx, e.target.value)}
                            className="w-10 h-11 text-center bg-slate-900 border border-slate-700 rounded-xl text-lg font-mono font-bold text-emerald-300 focus:outline-none focus:border-emerald-500"
                          />
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                        <span>
                          {otpTimer > 0 ? (
                            `Resend OTP in ${otpTimer}s`
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              className="text-blue-400 hover:text-blue-300 underline font-semibold"
                            >
                              Resend OTP
                            </button>
                          )}
                        </span>
                        <button
                          type="button"
                          onClick={() => setOtpCode(['8', '9', '2', '1'])}
                          className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                        >
                          <Sparkles className="w-2.5 h-2.5" /> Auto-fill Demo OTP (8921)
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      className="w-full py-2 bg-slate-900 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs font-semibold text-blue-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <KeyRound className="w-3.5 h-3.5" /> Send Verification Code
                    </button>
                  )}
                </div>
              ) : (
                /* PIN Input Block */
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-medium text-slate-300">
                      Rider Security PIN
                    </label>
                    <span className="text-[10px] text-blue-400 font-mono">Demo PIN: 3318</span>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      maxLength={4}
                      value={riderPin}
                      onChange={(e) => setRiderPin(e.target.value)}
                      placeholder="4-digit PIN"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-center tracking-[0.5em] text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono font-bold"
                      required
                    />
                    <Lock className="absolute right-3 top-2.5 w-4 h-4 text-slate-500" />
                  </div>
                </div>
              )}

              {loginError && <p className="text-[11px] text-rose-400 font-medium">{loginError}</p>}

              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-blue-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Verify & Start Receiving Deliveries</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Quick Demo Rider Logins */}
            <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Verified Rider Logins:</span>
                </span>
                <span className="text-[10px] text-slate-400">1-click switch</span>
              </div>

              <div className="space-y-2">
                {demoRiders.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleQuickLogin(r)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-750 border border-slate-700/60 hover:border-blue-500/50 flex items-center justify-between transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-blue-950 text-blue-300 flex items-center justify-center font-bold text-xs border border-blue-700/50">
                        {r.avatarText}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white group-hover:text-blue-300 flex items-center gap-1.5">
                          <span>{r.name}</span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 font-bold">
                            ★ {r.rating}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {r.assignedHubName} • {r.vehicleModel} • {r.totalDeliveries} Drops
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* SIGNUP FORM (Driver registration) */
          <form onSubmit={handleSignupSubmit} className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60 shadow-md">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
              <div>
                <h3 className="text-xs font-bold text-white">Driver Registration</h3>
                <p className="text-[10px] text-slate-400">EV fleet partner • Instant admin verification</p>
              </div>
              <button
                type="button"
                onClick={autofillDemoSignup}
                className="text-[10px] px-2 py-1 rounded-lg bg-blue-950/70 text-blue-300 hover:bg-blue-900 border border-blue-700/50 flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                <span>Autofill Demo</span>
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Driver Full Name</label>
              <input
                type="text"
                value={riderName}
                onChange={(e) => setRiderName(e.target.value)}
                placeholder="e.g. Dinesh Chandran"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Mobile Phone (OTP)</label>
                <input
                  type="tel"
                  value={signupPhone}
                  onChange={(e) => setSignupPhone(e.target.value)}
                  placeholder="98403 99120"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Driving License (DL)</label>
                <input
                  type="text"
                  value={dlNumber}
                  onChange={(e) => setDlNumber(e.target.value)}
                  placeholder="TN0720210084910"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Aadhaar Number</label>
                <input
                  type="text"
                  value={aadhaarNumber}
                  onChange={(e) => setAadhaarNumber(e.target.value)}
                  placeholder="8940 3319 8012"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Vehicle Plate No.</label>
                <input
                  type="text"
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  placeholder="TN-07-CW-3419"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Select EV Two-Wheeler</label>
              <select
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Ather 450X Gen 3 (EV)">Ather 450X Gen 3 (EV) • 85km Range</option>
                <option value="Ola S1 Pro Gen 2 (EV)">Ola S1 Pro Gen 2 (EV) • 110km Range</option>
                <option value="TVS iQube Electric">TVS iQube Electric • 75km Range</option>
                <option value="Doors Fresh Cargo e-Bike">Doors Fresh Cargo e-Bike Carrier</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Assigned Dark Store Hub</label>
              <select
                value={hubPreference}
                onChange={(e) => setHubPreference(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Velachery Micro-Hub (DF-CHN-VEL)">Velachery Micro-Hub (DF-CHN-VEL)</option>
                <option value="Chennai Central Dark Store (DF-CHN-CEN)">Chennai Central Dark Store (DF-CHN-CEN)</option>
                <option value="Tambaram Cold-Chain Hub (DF-CHN-TAM)">Tambaram Cold-Chain Hub (DF-CHN-TAM)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">UPI ID for Daily Payouts</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="dinesh.c@okaxis"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>

            <label className="flex items-start gap-2 pt-1 text-[10px] text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedToColdBagCare}
                onChange={(e) => setAgreedToColdBagCare(e.target.checked)}
                className="w-3.5 h-3.5 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700 mt-0.5"
                required
              />
              <span>
                I agree to maintain insulated cold-bag at sub-6°C and follow farm-to-table hygiene protocols.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Submit Registration for Admin Approval</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer Info */}
        <div className="pt-3 border-t border-slate-800/80 text-center">
          <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> 100% Insured Fleet
            </span>
            <span className="flex items-center gap-1">
              <ThermometerSnowflake className="w-3 h-3 text-cyan-400" /> Cold-Chain Box
            </span>
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Daily UPI IMPS
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
