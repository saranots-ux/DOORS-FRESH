import React, { useState } from 'react';
import {
  Building2,
  Utensils,
  GraduationCap,
  Store,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Truck,
  Phone,
  FileCheck,
  TrendingDown,
  Clock,
  MapPin,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { B2BBusinessProfile, B2BClientCategory, B2BScreenType } from '../../types';
import { DoorsFreshLogo } from '../common/ProduceGraphics';

interface B2BConnectScreenProps {
  currentClient: B2BBusinessProfile;
  allClients: B2BBusinessProfile[];
  onSelectClient: (client: B2BBusinessProfile) => void;
  onRegisterClient: (newClient: B2BBusinessProfile) => void;
  onNavigate: (screen: B2BScreenType) => void;
}

export const B2BConnectScreen: React.FC<B2BConnectScreenProps> = ({
  currentClient,
  allClients,
  onSelectClient,
  onRegisterClient,
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'switch_demo' | 'apply_new'>('switch_demo');

  // New business application state
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState<B2BClientCategory>('restaurant');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gstin, setGstin] = useState('');
  const [fssaiNumber, setFssaiNumber] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('Anna Nagar West');
  const [dailyTonnageKg, setDailyTonnageKg] = useState(300);
  const [requestedCreditDays, setRequestedCreditDays] = useState(15);
  const [deliverySlot, setDeliverySlot] = useState('04:30 AM - 05:30 AM (Early Kitchen Prep)');

  const autofillDemoApplication = (type: B2BClientCategory) => {
    if (type === 'hotel') {
      setBusinessName('Radisson Blu Hotel & Banquets');
      setCategory('hotel');
      setContactPerson('Chef Balasubramanian (Executive Chef)');
      setPhone('98402 88120');
      setEmail('kitchen.radisson@grt.com');
      setGstin('33AABCR1092K1Z8');
      setFssaiNumber('12421005000341');
      setAddress('531 GST Road, St. Thomas Mount');
      setLocality('Guindy - Airport Corridor');
      setDailyTonnageKg(550);
      setRequestedCreditDays(15);
      setDeliverySlot('04:00 AM - 05:00 AM (Cold Reefer Truck)');
    } else if (type === 'restaurant') {
      setBusinessName('Dindigul Thalappakatti Restaurant');
      setCategory('restaurant');
      setContactPerson('P. Ramachandran (Central Store Manager)');
      setPhone('98841 99211');
      setEmail('omr.procurement@thalappakatti.com');
      setGstin('33AABCT9981P1Z4');
      setFssaiNumber('12420003000889');
      setAddress('Plot 19, IT Highway, Sholinganallur');
      setLocality('OMR Tech Belt');
      setDailyTonnageKg(320);
      setRequestedCreditDays(7);
      setDeliverySlot('05:00 AM - 06:00 AM (Early Kitchen Prep)');
    } else if (type === 'hostel') {
      setBusinessName('Anna University CEG Hostel Mess');
      setCategory('hostel');
      setContactPerson('Prof. S. Natarajan (Mess Warden)');
      setPhone('94440 33819');
      setEmail('mess.warden@annauniv.edu');
      setGstin('33AAATA0921N1ZY');
      setFssaiNumber('12419002000551');
      setAddress('College of Engineering Guindy Campus');
      setLocality('Sardar Patel Road, Guindy');
      setDailyTonnageKg(950);
      setRequestedCreditDays(30);
      setDeliverySlot('03:30 AM - 04:30 AM (Bulk Morning Batch)');
    } else {
      setBusinessName('Nilgiris Supermarket & Fresh Mart');
      setCategory('shop');
      setContactPerson('V. Kumar (Franchise Owner)');
      setPhone('97910 11450');
      setEmail('nilgiris.velachery@gmail.com');
      setGstin('33BBNPV4412L1ZQ');
      setFssaiNumber('12422004000332');
      setAddress('Door 42, Velachery Bypass Road');
      setLocality('Velachery Main Market');
      setDailyTonnageKg(400);
      setRequestedCreditDays(7);
      setDeliverySlot('05:30 AM - 06:30 AM (Store Opening Ready)');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName || !phone) return;

    const newClient: B2BBusinessProfile = {
      id: `B2B-${Date.now().toString().slice(-4)}`,
      businessName,
      category,
      contactPerson: contactPerson || 'Authorized Representative',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: email || 'procurement@business.com',
      gstin: gstin || '33AAAAA0000A1Z5',
      fssaiNumber: fssaiNumber || '12422000000000',
      address: address || `${locality}, Chennai`,
      locality: locality,
      city: 'Chennai',
      assignedDarkStoreHub: 'Velachery Micro-Hub (DF-CHN-VEL)',
      creditLimitInr: requestedCreditDays > 15 ? 200000 : 100000,
      creditUsedInr: 0,
      paymentTermsDays: requestedCreditDays,
      dailyTonnageKg: Number(dailyTonnageKg) || 250,
      dedicatedAccountManager: {
        name: 'Raghavan Sampath',
        phone: '+91 98400 99812',
        role: 'Senior HORECA Procurement Lead',
      },
      deliveryWindowPreference: deliverySlot,
      kycStatus: 'verified',
    };

    onRegisterClient(newClient);
    onSelectClient(newClient);
    onNavigate('b2b_catalog');
  };

  return (
    <div className="h-full flex flex-col bg-slate-900 text-slate-100 overflow-y-auto">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-900 p-5 pt-6 pb-5 text-center border-b border-indigo-900/40">
        <div className="flex justify-center mb-2">
          <div className="bg-white/95 px-3 py-1.5 rounded-xl shadow-lg border border-indigo-200">
            <DoorsFreshLogo className="h-6 w-auto" />
          </div>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30 mb-1">
          <Building2 className="w-3 h-3 text-indigo-400" />
          <span>B2B HORECA Supply • நேரடி மொத்த கொள்முதல்</span>
        </div>
        <h1 className="text-lg font-bold text-white tracking-tight">
          How Hotels, Restos, Hostels & Shops Connect
        </h1>
        <p className="text-xs text-indigo-200/80 max-w-[310px] mx-auto mt-0.5">
          Farmgate direct crate wholesale, 25-30% below mandi prices, 4:30 AM Reefer cold delivery, and 15-day commercial credit.
        </p>

        <div className="mt-2.5 flex justify-center">
          <button
            onClick={() => onNavigate('b2b_auth')}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white rounded-full text-[10px] font-bold shadow-md cursor-pointer transition-all border border-indigo-400/40"
          >
            <LogIn className="w-3 h-3" />
            <span>Open B2B Sign In / Sign Up Desk</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4 Ecosystem Pillars Pillars Bar */}
        <div className="grid grid-cols-4 gap-1.5 mt-3 pt-3 border-t border-slate-800 text-center">
          <div className="bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <Building2 className="w-4 h-4 mx-auto text-amber-400 mb-0.5" />
            <div className="text-[10px] font-bold text-white">Hotels</div>
            <div className="text-[8px] text-slate-400">Chef A+ Grade</div>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <Utensils className="w-4 h-4 mx-auto text-orange-400 mb-0.5" />
            <div className="text-[10px] font-bold text-white">Restaurants</div>
            <div className="text-[8px] text-slate-400">2x Daily Slots</div>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <GraduationCap className="w-4 h-4 mx-auto text-blue-400 mb-0.5" />
            <div className="text-[10px] font-bold text-white">Hostels</div>
            <div className="text-[8px] text-slate-400">Institutional Lots</div>
          </div>
          <div className="bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <Store className="w-4 h-4 mx-auto text-emerald-400 mb-0.5" />
            <div className="text-[10px] font-bold text-white">Veg Shops</div>
            <div className="text-[8px] text-slate-400">Returnable Crates</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-3.5 flex bg-slate-800/90 p-1 rounded-xl border border-slate-700/80 max-w-[280px] mx-auto">
          <button
            type="button"
            onClick={() => setActiveTab('switch_demo')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'switch_demo'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Active Clients (4)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('apply_new')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'apply_new'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Connect New B2B</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {activeTab === 'switch_demo' ? (
          /* ACTIVE CLIENTS LIST */
          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Select Commercial Partner to View Portal:</span>
              </span>
              <span className="text-[10px] text-indigo-400 font-mono">Instant 1-Click Access</span>
            </div>

            <div className="space-y-2.5">
              {allClients.map((client) => {
                const isSelected = client.id === currentClient.id;
                const getIcon = () => {
                  switch (client.category) {
                    case 'hotel':
                      return <Building2 className="w-4 h-4 text-amber-400" />;
                    case 'restaurant':
                      return <Utensils className="w-4 h-4 text-orange-400" />;
                    case 'hostel':
                      return <GraduationCap className="w-4 h-4 text-blue-400" />;
                    case 'shop':
                      return <Store className="w-4 h-4 text-emerald-400" />;
                  }
                };

                return (
                  <div
                    key={client.id}
                    onClick={() => {
                      onSelectClient(client);
                      onNavigate('b2b_catalog');
                    }}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer group ${
                      isSelected
                        ? 'bg-indigo-950/70 border-indigo-500 shadow-md ring-1 ring-indigo-500/50'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0">
                          {getIcon()}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center gap-1.5">
                            <span>{client.businessName}</span>
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase font-mono">
                              {client.category}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {client.contactPerson} • {client.locality}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[9px] font-mono">
                            <span className="text-emerald-400">GST: {client.gstin}</span>
                            <span className="text-slate-500">•</span>
                            <span className="text-blue-300">Credit: ₹{(client.creditLimitInr / 1000).toFixed(0)}k ({client.paymentTermsDays}d)</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold flex items-center gap-1 shrink-0"
                      >
                        <span>Open Desk</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Footer perks */}
                    <div className="mt-2.5 pt-2 border-t border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-indigo-400" />
                        <span>{client.deliveryWindowPreference}</span>
                      </span>
                      <span className="text-emerald-400 font-semibold font-mono">
                        ~{client.dailyTonnageKg} kg/day
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* How B2B Works 3-Step Guide */}
            <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-700/50 space-y-2 mt-4">
              <span className="text-[11px] font-semibold text-slate-200">
                How Commercial Entities Connect with Doors Fresh:
              </span>
              <div className="space-y-1.5 text-[10px] text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-900 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[9px]">1</span>
                  <span><strong>GSTIN & FSSAI Verification</strong>: Instant 15-day credit line approval up to ₹2,50,000 for verified businesses.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-900 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[9px]">2</span>
                  <span><strong>Standing Kitchen Orders</strong>: Automated morning delivery before kitchen prep starts (04:00 AM - 06:00 AM).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-4 h-4 rounded-full bg-indigo-900 text-indigo-300 font-bold flex items-center justify-center shrink-0 text-[9px]">3</span>
                  <span><strong>Zero Food-Miles Cold Supply</strong>: Farm-harvested produce weighed, graded, and dispatched in returnable crates.</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* APPLY NEW B2B FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 bg-slate-800/70 p-4 rounded-2xl border border-slate-700/60">
            <div className="flex justify-between items-center pb-2 border-b border-slate-700/60">
              <div>
                <h3 className="text-xs font-bold text-white">Commercial Buyer Application</h3>
                <p className="text-[10px] text-slate-400">Direct farmgate procurement for high-volume kitchens</p>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-slate-400 mr-0.5">Autofill:</span>
                <button
                  type="button"
                  onClick={() => autofillDemoApplication('hotel')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-300 border border-amber-700/50"
                >
                  Hotel
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemoApplication('restaurant')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-orange-900/60 text-orange-300 border border-orange-700/50"
                >
                  Resto
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemoApplication('hostel')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-700/50"
                >
                  Hostel
                </button>
                <button
                  type="button"
                  onClick={() => autofillDemoApplication('shop')}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-700/50"
                >
                  Shop
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">
                Business / Entity Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Radisson Blu Hotel / Thalappakatti"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Commercial Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as B2BClientCategory)}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value="hotel">Hotel & Fine Dining</option>
                  <option value="restaurant">Restaurant / Cloud Kitchen</option>
                  <option value="hostel">College / Corporate Hostel</option>
                  <option value="shop">Retail Vegetable Shop</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Daily Requirement (kg)</label>
                <input
                  type="number"
                  step="50"
                  value={dailyTonnageKg}
                  onChange={(e) => setDailyTonnageKg(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Contact Person / Chef</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Executive Chef"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Mobile Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98402 12345"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  placeholder="33AAAAA0000A1Z5"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono uppercase"
                  required
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">FSSAI License No.</label>
                <input
                  type="text"
                  value={fssaiNumber}
                  onChange={(e) => setFssaiNumber(e.target.value)}
                  placeholder="12421000000000"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Commercial Kitchen Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Door No, Street, Landmark"
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Locality / Area</label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Guindy / OMR"
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Payment Terms</label>
                <select
                  value={requestedCreditDays}
                  onChange={(e) => setRequestedCreditDays(Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
                >
                  <option value={7}>7-Day Commercial Credit</option>
                  <option value={15}>15-Day Commercial Credit (Standard)</option>
                  <option value={30}>30-Day Credit (Hostels & Govt)</option>
                  <option value={0}>Advance Prepaid Wallet (5% Discount)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-medium text-slate-300 mb-0.5">Daily Morning Delivery Slot</label>
              <select
                value={deliverySlot}
                onChange={(e) => setDeliverySlot(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="04:00 AM - 05:00 AM (Cold Reefer Truck)">04:00 AM - 05:00 AM (Hotel Sunrise Shift)</option>
                <option value="05:00 AM - 06:00 AM (Early Kitchen Prep)">05:00 AM - 06:00 AM (Restaurant Prep)</option>
                <option value="05:30 AM - 06:30 AM (Store Opening Ready)">05:30 AM - 06:30 AM (Retail Store Display)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-950/40 flex items-center justify-center gap-2 transition-all mt-2 cursor-pointer"
            >
              <span>Connect Business & Activate Wholesale Desk</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Footer Guarantee */}
        <div className="pt-3 pb-1 text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>Official GST Input Tax Credit (ITC) invoices & 100% digital weighment slips</span>
          </div>
        </div>
      </div>
    </div>
  );
};
