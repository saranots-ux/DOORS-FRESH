import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Award,
  MapPin,
  Calendar,
  CheckCircle2,
  FileText,
  Heart,
  ExternalLink,
  QrCode,
  Droplets,
  Sun,
  Leaf,
  Sparkles,
  Scale,
  Download,
  Share2,
} from 'lucide-react';
import { Product } from '../../types';

export interface FarmerDetailData {
  id: string;
  name: string;
  avatarText: string;
  avatarBg: string;
  farmName: string;
  location: string;
  district: string;
  state: string;
  distanceKm: number;
  partnerSince: string;
  farmSizeAcres: number;
  soilType: string;
  irrigation: string;
  rating: number;
  auditCount: number;
  totalTonnageSold: number;
  harvestWindow: string;
  bioStory: string;
  certifications: {
    id: string;
    title: string;
    authority: string;
    certNumber: string;
    badgeColor: string;
    validity: string;
    description: string;
  }[];
  labTestResults: {
    parameter: string;
    doorsFreshResult: string;
    fssaiMaxAllowed: string;
    status: 'Safe / Zero' | 'Optimal' | 'Pass';
  }[];
  recentBatch: {
    batchId: string;
    harvestedDate: string;
    actualWeighedKg: number;
    grade: string;
    coldChainVerified: boolean;
  };
}

export const getFarmerForProduct = (product: Product): FarmerDetailData => {
  const pName = product.name.toLowerCase();

  if (pName.includes('carrot') || pName.includes('cucumber')) {
    return {
      id: 'frm-tn-1088',
      name: 'Murugan Pillai',
      avatarText: 'MP',
      avatarBg: 'bg-amber-700',
      farmName: 'Hosur Valley Terrace Farms',
      location: 'Kelamangalam Road, Hosur',
      district: 'Krishnagiri District',
      state: 'Tamil Nadu',
      distanceKm: 280,
      partnerSince: 'January 2023',
      farmSizeAcres: 8.0,
      soilType: 'Red Loamy Mountain Soil (Rich in Iron)',
      irrigation: 'Natural mountain stream + solar drip',
      rating: 4.9,
      auditCount: 142,
      totalTonnageSold: 38.4,
      harvestWindow: 'Daily 05:00 AM - 07:00 AM',
      bioStory: '3rd generation family farmer specializing in root crops and heirloom seeds. Employs traditional Jeevamrutha microbial culture and mulching with paddy husk.',
      certifications: [
        {
          id: 'cert-pgs',
          title: 'PGS-India Natural Farming Certified',
          authority: 'Ministry of Agriculture & Farmers Welfare',
          certNumber: 'PGS-IN-TN-2023-4019',
          badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
          validity: 'Valid through Dec 2026',
          description: '100% natural inputs with zero chemical nitrogen fertilizers or synthetic enhancers.',
        },
        {
          id: 'cert-nabl',
          title: 'NABL Lab Multi-Residue Pesticide Screen',
          authority: 'SGS India Accredited Testing Laboratory',
          certNumber: 'TEST-NABL-2024-819',
          badgeColor: 'border-blue-300 bg-blue-50 text-blue-900',
          validity: 'Tested 28 Oct 2024 (Batch clearance)',
          description: 'Screened for 104 common agrochemicals. Gas chromatography confirmed 0.00 ppm.',
        },
      ],
      labTestResults: [
        { parameter: 'Organophosphates (Chlorpyrifos)', doorsFreshResult: '0.00 PPM (Not Detected)', fssaiMaxAllowed: '0.20 PPM', status: 'Safe / Zero' },
        { parameter: 'Synthetic Fungicides (Mancozeb)', doorsFreshResult: '0.00 PPM (Not Detected)', fssaiMaxAllowed: '0.50 PPM', status: 'Safe / Zero' },
        { parameter: 'Heavy Metals (Lead / Cadmium)', doorsFreshResult: '< 0.01 PPM (Trace / Clean)', fssaiMaxAllowed: '0.10 PPM', status: 'Safe / Zero' },
        { parameter: 'Natural Beta-Carotene', doorsFreshResult: '8.4 mg / 100g', fssaiMaxAllowed: 'Baseline > 5.0', status: 'Optimal' },
      ],
      recentBatch: {
        batchId: 'BATCH-8822',
        harvestedDate: 'Harvested Yesterday 06:00 AM',
        actualWeighedKg: 320,
        grade: 'Grade A (Export Crisp)',
        coldChainVerified: true,
      },
    };
  }

  if (pName.includes('spinach') || pName.includes('palak') || product.subcategory === 'Leafy') {
    return {
      id: 'frm-tn-1015',
      name: 'Lakshmi Narayanan',
      avatarText: 'LN',
      avatarBg: 'bg-emerald-800',
      farmName: 'Palur Wetland Agro Sanctuary',
      location: 'Palur Riverbank, Chengalpattu',
      district: 'Chengalpattu District',
      state: 'Tamil Nadu',
      distanceKm: 34,
      partnerSince: 'August 2022',
      farmSizeAcres: 4.2,
      soilType: 'Alluvial Riverbed Clay Soil',
      irrigation: 'Filtered river well + mist hydro system',
      rating: 4.95,
      auditCount: 210,
      totalTonnageSold: 29.1,
      harvestWindow: 'Pre-dawn 04:30 AM - 06:00 AM',
      bioStory: 'Pioneer of chemical-free urban green belts in Chengalpattu. Produces delicate leafy greens that reach Doors Fresh dark stores within 2 hours of harvest.',
      certifications: [
        {
          id: 'cert-npop',
          title: 'NPOP India Organic Certified (National Standard)',
          authority: 'APEDA India Accredited Agency (Aditi Organic)',
          certNumber: 'NPOP/NAB/0017-TN-892',
          badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
          validity: 'Annual Renewal: March 2027',
          description: 'Full conversion organic farm following international NPOP standards.',
        },
        {
          id: 'cert-water',
          title: 'Potable Riverbed Water Purity Certification',
          authority: 'Tamil Nadu Water Supply & Quality Lab',
          certNumber: 'TWAD-LAB-CHN-2024-11',
          badgeColor: 'border-cyan-300 bg-cyan-50 text-cyan-900',
          validity: 'Tested Quarterly (Last: Sep 2024)',
          description: 'Tested for total dissolved solids, E. coli, and heavy industrial run-off (0% detected).',
        },
      ],
      labTestResults: [
        { parameter: 'Nitrate / Nitrite Accumulation', doorsFreshResult: '12 mg/kg (Ultra Safe)', fssaiMaxAllowed: '200 mg/kg', status: 'Safe / Zero' },
        { parameter: 'Synthetic Weedicides (Glyphosate)', doorsFreshResult: '0.00 PPM (Not Detected)', fssaiMaxAllowed: '0.05 PPM', status: 'Safe / Zero' },
        { parameter: 'Microbial Hygiene (E. coli)', doorsFreshResult: 'Absent / Zero in 25g', fssaiMaxAllowed: 'Absent', status: 'Pass' },
        { parameter: 'Dietary Iron & Chlorophyll', doorsFreshResult: '3.6 mg / 100g (High)', fssaiMaxAllowed: 'Baseline > 2.0', status: 'Optimal' },
      ],
      recentBatch: {
        batchId: 'BATCH-8819',
        harvestedDate: 'Today 05:00 AM',
        actualWeighedKg: 178,
        grade: 'Grade A+ (Hydro-Cooled)',
        coldChainVerified: true,
      },
    };
  }

  // Default: Thiru Selvam K. (Tomatoes, Onions, and General Farm Produce)
  return {
    id: 'frm-tn-1042',
    name: 'Thiru Selvam K.',
    avatarText: 'SK',
    avatarBg: 'bg-emerald-700',
    farmName: 'Vembakkam Green Belt Farm',
    location: 'Vembakkam Green Belt, Kanchipuram',
    district: 'Kanchipuram District',
    state: 'Tamil Nadu',
    distanceKm: 42,
    partnerSince: 'March 2023',
    farmSizeAcres: 6.5,
    soilType: 'Clay Loam with 0.78% Organic Carbon',
    irrigation: 'Solar Drip Irrigation + Rain Harvesting Lake',
    rating: 4.9,
    auditCount: 184,
    totalTonnageSold: 42.8,
    harvestWindow: 'Sunrise 05:30 AM - 08:00 AM',
    bioStory: 'Passionate regenerative agriculturist with 24 years on inherited family land. Vines are hand-pollinated and fed with cow dung bio-slurry and neem leaf oil. Supplies vine-ripened tomatoes and shallots directly to Doors Fresh.',
    certifications: [
      {
        id: 'cert-npop-selvam',
        title: 'NPOP India Organic Certified Producer',
        authority: 'APEDA Recognized Agency (OneCert International)',
        certNumber: 'IN-ORG-2023-8821',
        badgeColor: 'border-emerald-300 bg-emerald-50 text-emerald-900',
        validity: 'Valid through March 2027',
        description: 'Meets strict export-grade organic protocols with zero synthetic inputs for 4 consecutive harvest cycles.',
      },
      {
        id: 'cert-fair-price',
        title: 'Doors Fresh Guaranteed Farmgate Partner',
        authority: 'Doors Fresh Agri-Tech Quality Board',
        certNumber: 'DF-AGRI-KYC-TN-1042',
        badgeColor: 'border-teal-300 bg-teal-50 text-teal-900',
        validity: 'KYC & Electronic Weighment Verified',
        description: 'Receives direct DBT bank settlements at +33% premium over local Mandi APMC rates with zero deductions.',
      },
      {
        id: 'cert-lab-selvam',
        title: 'NABL Certified Zero Chemical Residue',
        authority: 'National Accreditation Board for Laboratories',
        certNumber: 'NABL-CH-2024-9912',
        badgeColor: 'border-purple-300 bg-purple-50 text-purple-900',
        validity: 'Batch Tested Today 06:15 AM',
        description: 'Zero chemical ripeners (Ethephon/Calcium Carbide). 100% natural on-vine solar ripening.',
      },
    ],
    labTestResults: [
      { parameter: 'Chemical Ripener (Ethephon)', doorsFreshResult: '0.00 PPM (Not Detected)', fssaiMaxAllowed: '2.0 PPM', status: 'Safe / Zero' },
      { parameter: 'Organophosphates (Chlorpyrifos)', doorsFreshResult: '0.00 PPM (Not Detected)', fssaiMaxAllowed: '0.20 PPM', status: 'Safe / Zero' },
      { parameter: 'Synthetic Fungicides (Carbendazim)', doorsFreshResult: '0.00 PPM (Not Detected)', fssaiMaxAllowed: '0.50 PPM', status: 'Safe / Zero' },
      { parameter: 'Natural Brix Sugar Level', doorsFreshResult: '8.4° Brix (Sweet & Savory)', fssaiMaxAllowed: 'Standard > 4.5°', status: 'Optimal' },
    ],
    recentBatch: {
      batchId: 'BATCH-8821',
      harvestedDate: 'Today 05:30 AM (Cold Van Picked)',
      actualWeighedKg: 454,
      grade: 'Grade A+ (Vine-Ripened)',
      coldChainVerified: true,
    },
  };
};

interface FarmerProfileModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const FarmerProfileModal: React.FC<FarmerProfileModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'certifications' | 'lab_report'>('profile');
  const [thanksCount, setThanksCount] = useState(148);
  const [hasThanked, setHasThanked] = useState(false);
  const [copiedBatch, setCopiedBatch] = useState(false);

  if (!isOpen) return null;

  const farmer = getFarmerForProduct(product);

  const handleThankFarmer = () => {
    if (!hasThanked) {
      setThanksCount((c) => c + 1);
      setHasThanked(true);
    }
  };

  const handleCopyBatch = (batchId: string) => {
    navigator.clipboard?.writeText(batchId);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800 border border-slate-200">
        {/* Modal Top Hero Header */}
        <div className="bg-gradient-to-br from-emerald-800 via-emerald-700 to-green-800 text-white p-5 rounded-t-3xl relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-start gap-3.5 pr-8">
            <div
              className={`w-14 h-14 rounded-2xl ${farmer.avatarBg} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-md ring-2 ring-white/30`}
            >
              👨‍🌾
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-white/10 px-2 py-0.5 rounded-full">
                  Verified Producer
                </span>
                <span className="text-[10px] font-semibold text-emerald-100 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-300" /> KYC Approved
                </span>
              </div>
              <h2 className="text-lg font-bold text-white leading-tight mt-1">
                {farmer.name}
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />
                <span>{farmer.farmName}</span>
              </p>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-4 gap-2 mt-4 pt-3 border-t border-white/15 text-center text-xs">
            <div>
              <span className="text-[9px] text-emerald-200 uppercase block font-medium">Farm Area</span>
              <span className="font-bold text-white text-xs">{farmer.farmSizeAcres} Acres</span>
            </div>
            <div className="border-x border-white/10">
              <span className="text-[9px] text-emerald-200 uppercase block font-medium">Transit</span>
              <span className="font-bold text-white text-xs">{farmer.distanceKm} km away</span>
            </div>
            <div className="border-r border-white/10">
              <span className="text-[9px] text-emerald-200 uppercase block font-medium">Audit Score</span>
              <span className="font-bold text-white text-xs">★ {farmer.rating}</span>
            </div>
            <div>
              <span className="text-[9px] text-emerald-200 uppercase block font-medium">Direct DBT</span>
              <span className="font-bold text-emerald-300 text-xs">100% Fair</span>
            </div>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex bg-slate-100 p-1 border-b border-slate-200 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 rounded-xl text-center transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Farm & Soil
          </button>
          <button
            onClick={() => setActiveTab('certifications')}
            className={`flex-1 py-2 rounded-xl text-center transition-all cursor-pointer ${
              activeTab === 'certifications'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Certifications ({farmer.certifications.length})
          </button>
          <button
            onClick={() => setActiveTab('lab_report')}
            className={`flex-1 py-2 rounded-xl text-center transition-all cursor-pointer ${
              activeTab === 'lab_report'
                ? 'bg-white text-emerald-800 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lab Safety Report
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: Farm Story, Soil & Harvest Window */}
          {activeTab === 'profile' && (
            <div className="space-y-3.5">
              {/* Product Match Info */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                    🌱
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">
                      Currently Sourcing
                    </span>
                    <span className="font-bold text-slate-900 text-xs">{product.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Harvested</span>
                  <span className="text-xs font-bold text-emerald-800">{product.harvestTime}</span>
                </div>
              </div>

              {/* Bio Story */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-xs">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" /> Farm Provenance & Practices
                </h4>
                <p className="text-slate-600 leading-relaxed text-[11px]">{farmer.bioStory}</p>
              </div>

              {/* Soil & Microclimate Health Grid */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" /> Soil & Water Ecology
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Soil Classification:</span>
                    <span className="font-semibold text-slate-800 text-right">{farmer.soilType}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Irrigation Method:</span>
                    <span className="font-semibold text-slate-800 text-right">{farmer.irrigation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Harvest Picking Window:</span>
                    <span className="font-semibold text-emerald-700 text-right">{farmer.harvestWindow}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Doors Fresh Partner:</span>
                    <span className="font-semibold text-slate-800 text-right">Since {farmer.partnerSince}</span>
                  </div>
                </div>
              </div>

              {/* Traceable Harvest Batch Card */}
              <div className="bg-slate-900 text-white rounded-2xl p-3.5 shadow-xs text-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <QrCode className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="font-bold text-white">Live Batch Traceability</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">
                    {farmer.recentBatch.batchId}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Weighed Net:</span>
                    <span className="font-bold text-white">{farmer.recentBatch.actualWeighedKg} kg</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Quality Grade:</span>
                    <span className="font-bold text-emerald-300">{farmer.recentBatch.grade}</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Harvest: {farmer.recentBatch.harvestedDate}</span>
                  <button
                    onClick={() => handleCopyBatch(farmer.recentBatch.batchId)}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer"
                  >
                    {copiedBatch ? '✓ Copied ID' : 'Copy Batch ID'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Official Certifications & Compliance */}
          {activeTab === 'certifications' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-500 mb-1">
                Every farm partner is independently audited and laboratory tested before every harvest cycle.
              </div>

              {farmer.certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">
                          {cert.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 block mt-0.5">
                          Issued by {cert.authority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 mt-2.5 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                    <span className="font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">
                      Lic: {cert.certNumber}
                    </span>
                    <span className="text-emerald-700 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> {cert.validity}
                    </span>
                  </div>
                </div>
              ))}

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">100% Traceability Guarantee</span>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Unlike standard aggregate supermarket supply chains, Doors Fresh never mixes produce from unverified third-party mandis.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: NABL Lab Safety & Multi-Residue Report */}
          {activeTab === 'lab_report' && (
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" /> SGS / NABL Gas Chromatography Test
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    ALL PASS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Certified zero synthetic chemical residue on incoming batch before hub packaging.
                </p>
              </div>

              {/* Lab Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs text-xs">
                <div className="bg-slate-100/80 px-3 py-2 border-b border-slate-200 grid grid-cols-12 font-bold text-[10px] text-slate-600 uppercase tracking-wider">
                  <div className="col-span-6">Tested Compound</div>
                  <div className="col-span-4 text-right">Batch Result</div>
                  <div className="col-span-2 text-right">Status</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {farmer.labTestResults.map((test, idx) => (
                    <div key={idx} className="px-3 py-2.5 grid grid-cols-12 items-center text-[11px]">
                      <div className="col-span-6">
                        <span className="font-semibold text-slate-800 block">{test.parameter}</span>
                        <span className="text-[10px] text-slate-400">Max Limit: {test.fssaiMaxAllowed}</span>
                      </div>
                      <div className="col-span-4 text-right font-mono font-bold text-slate-900 text-[10px]">
                        {test.doorsFreshResult}
                      </div>
                      <div className="col-span-2 text-right">
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                          {test.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Certificate Mock Button */}
              <button
                onClick={() => alert(`Certificate ${farmer.certifications[0]?.certNumber} verified. PDF certificate downloaded.`)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" /> Download Official NABL Lab Certificate (PDF)
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Sticky Action Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
              Farmer Gratitude
            </span>
            <span className="text-xs font-bold text-slate-800">
              {thanksCount} customers thanked {farmer.name.split(' ')[0]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleThankFarmer}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95 ${
                hasThanked
                  ? 'bg-rose-100 text-rose-700 border border-rose-300'
                  : 'bg-white hover:bg-rose-50 text-slate-700 border border-slate-300 hover:text-rose-600'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${hasThanked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span>{hasThanked ? 'Thanked!' : 'Thank Farmer'}</span>
            </button>

            <button
              onClick={onClose}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
