import React, { useState } from 'react';
import {
  X,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Phone,
  Landmark,
  Leaf,
  Tractor,
  CreditCard,
  FileCheck,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';
import { FarmerProfile } from '../../types';

interface NewFarmerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterFarmer: (newFarmer: FarmerProfile) => void;
}

const PRESET_FARMERS: Omit<FarmerProfile, 'id'>[] = [
  {
    name: 'K. Annamalai',
    phone: '+91 98410 77312',
    location: 'Madurantakam Organic Agro Belt',
    district: 'Chengalpattu',
    state: 'Tamil Nadu',
    farmSizeAcres: 7.5,
    primaryCrops: ['Organic Capsicum', 'Sweet Corn', 'Cherry Tomatoes', 'Coriander'],
    organicCertified: true,
    doorsFreshPartnerSince: 'Just Now',
    kycVerified: true,
    bankAccountLast4: '7109',
    upiId: 'annamalai.farm@oksbi',
    rating: 4.95,
    totalTonnageSold: 0,
  },
  {
    name: 'S. Muthuvel',
    phone: '+91 94448 11209',
    location: 'Ponneri Valley Riverbed',
    district: 'Tiruvallur',
    state: 'Tamil Nadu',
    farmSizeAcres: 5.2,
    primaryCrops: ['Shallots (Small Onion)', 'Country Cucumber', 'Mint & Spinach'],
    organicCertified: true,
    doorsFreshPartnerSince: 'Just Now',
    kycVerified: true,
    bankAccountLast4: '3341',
    upiId: 'muthuvel.ponneri@okaxis',
    rating: 4.88,
    totalTonnageSold: 0,
  },
  {
    name: 'Radha Krishnan',
    phone: '+91 98842 90184',
    location: 'Denkanikottai Terrace Farm',
    district: 'Krishnagiri',
    state: 'Tamil Nadu',
    farmSizeAcres: 11.0,
    primaryCrops: ['Pusa Kesar Carrots', 'Broccoli', 'Green Beans', 'Cabbage'],
    organicCertified: true,
    doorsFreshPartnerSince: 'Just Now',
    kycVerified: true,
    bankAccountLast4: '8820',
    upiId: 'radha.krishnagiri@icici',
    rating: 4.92,
    totalTonnageSold: 0,
  },
];

export const NewFarmerRegistrationModal: React.FC<NewFarmerRegistrationModalProps> = ({
  isOpen,
  onClose,
  onRegisterFarmer,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Kanchipuram');
  const [farmSizeAcres, setFarmSizeAcres] = useState('5.0');
  const [primaryCrops, setPrimaryCrops] = useState('');
  const [organicCertified, setOrganicCertified] = useState(true);
  const [bankLast4, setBankLast4] = useState('');
  const [upiId, setUpiId] = useState('');
  const [kccNumber, setKccNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: Omit<FarmerProfile, 'id'>) => {
    setName(preset.name);
    setPhone(preset.phone);
    setLocation(preset.location);
    setDistrict(preset.district);
    setFarmSizeAcres(preset.farmSizeAcres.toString());
    setPrimaryCrops(preset.primaryCrops.join(', '));
    setOrganicCertified(preset.organicCertified);
    setBankLast4(preset.bankAccountLast4);
    setUpiId(preset.upiId);
    setKccNumber(`KCC-TN-${Math.floor(10000 + Math.random() * 90000)}`);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter farmer name');
      return;
    }
    if (!phone.trim() || phone.trim() === '+91') {
      setErrorMsg('Please enter valid contact number');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please enter farm location/village');
      return;
    }

    const newId = `frm-tn-${Math.floor(1100 + Math.random() * 8900)}`;
    const cropsArray = primaryCrops.trim()
      ? primaryCrops.split(',').map((c) => c.trim()).filter(Boolean)
      : ['Organic Vegetables', 'Seasonal Greens'];

    const newFarmer: FarmerProfile = {
      id: newId,
      name: name.trim(),
      phone: phone.trim(),
      location: location.trim(),
      district,
      state: 'Tamil Nadu',
      farmSizeAcres: parseFloat(farmSizeAcres) || 4.5,
      primaryCrops: cropsArray,
      organicCertified,
      doorsFreshPartnerSince: 'November 2026',
      kycVerified: true,
      bankAccountLast4: bankLast4.trim() || `${Math.floor(1000 + Math.random() * 9000)}`,
      upiId: upiId.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@okaxis`,
      rating: 5.0,
      totalTonnageSold: 0,
    };

    onRegisterFarmer(newFarmer);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 px-5 py-4 border-b border-emerald-700/40 flex items-start justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 flex items-center justify-center shadow-xs">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-700/60">
                  Kisan Onboarding
                </span>
                <span className="text-[10px] text-emerald-200 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> Direct DBT Verification
                </span>
              </div>
              <h2 className="text-base font-bold text-white mt-0.5">Register New Farmer Partner</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Demo Pre-fill Presets */}
        <div className="bg-slate-950/60 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
          <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Quick Demo Fill:
          </div>
          <div className="flex items-center gap-1.5">
            {PRESET_FARMERS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className="text-[11px] font-medium bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 hover:border-emerald-700 text-slate-300 border border-slate-700 px-2.5 py-1 rounded-lg transition-all whitespace-nowrap"
              >
                + {preset.name} ({preset.district})
              </button>
            ))}
          </div>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMsg && (
            <div className="bg-rose-950/80 border border-rose-800 text-rose-200 text-xs px-3.5 py-2 rounded-xl flex items-center gap-2">
              <span className="font-bold">Error:</span> {errorMsg}
            </div>
          )}

          {/* Section 1: Personal & Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Tractor className="w-3.5 h-3.5 text-emerald-400" /> 1. Farmer Identity & Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Farmer Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Thiru Selvam K."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Mobile Number (WhatsApp Enabled) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="+91 94432 88129"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Farm Location & Land Size */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" /> 2. Farm Location & Acreage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Farm Village / Location *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vembakkam Green Belt"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  District (Tamil Nadu)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                >
                  <option value="Kanchipuram">Kanchipuram</option>
                  <option value="Chengalpattu">Chengalpattu</option>
                  <option value="Tiruvallur">Tiruvallur</option>
                  <option value="Krishnagiri">Krishnagiri (Hosur)</option>
                  <option value="Villupuram">Villupuram</option>
                  <option value="Vellore">Vellore</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Landholding (Acres)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  value={farmSizeAcres}
                  onChange={(e) => setFarmSizeAcres(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-hidden focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Primary Crops Cultivated
                </label>
                <input
                  type="text"
                  placeholder="e.g. Organic Tomatoes, Sambar Onions, Palak"
                  value={primaryCrops}
                  onChange={(e) => setPrimaryCrops(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Organic Certification & Compliance */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">NPOP / Jaivik Bharat Organic Verified</div>
                  <div className="text-[11px] text-slate-400">Zero synthetic chemical fertilizers and pesticides</div>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={organicCertified}
                  onChange={(e) => setOrganicCertified(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-5 bg-slate-800 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {/* Section 4: Bank Account & Instant DBT UPI */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-amber-400" /> 3. Direct Benefit Transfer (DBT) Banking
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Bank Account (Last 4 Digits)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="4821"
                  value={bankLast4}
                  onChange={(e) => setBankLast4(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  UPI ID (VPA) for IMPS
                </label>
                <input
                  type="text"
                  placeholder="farmer@oksbi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Kisan Credit Card / Govt ID
                </label>
                <input
                  type="text"
                  placeholder="KCC-TN-89102"
                  value={kccNumber}
                  onChange={(e) => setKccNumber(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-hidden focus:border-emerald-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Ecosystem Commitments Callout */}
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-2xl p-3.5 text-xs text-emerald-200">
            <div className="flex items-center gap-2 font-bold text-white mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Doors Fresh Farmgate Guarantee
            </div>
            <ul className="text-[11px] text-emerald-300 space-y-1 list-disc list-inside">
              <li>Free Cold Reefer Van collection directly from farm gate</li>
              <li>Guaranteed 25%–35% premium over Mandi benchmark floor rates</li>
              <li>Same-day IMPS direct settlement with zero commission deductions</li>
            </ul>
          </div>

          {/* Modal Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 shrink-0 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              Complete Onboarding & Verify KYC
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
