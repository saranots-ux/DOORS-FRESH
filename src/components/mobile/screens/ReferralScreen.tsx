import React, { useState } from 'react';
import {
  Share2,
  Copy,
  Check,
  Gift,
  Coins,
  Users,
  QrCode,
  ArrowRight,
  Sparkles,
  Award,
  CheckCircle2,
  MessageCircle,
  Send,
  Phone,
  X,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  HeartHandshake,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { MobileNavBar } from '../MobileNavBar';
import { ScreenType, UserReferralData, UserRewards } from '../../../types';

interface ReferralScreenProps {
  referralData: UserReferralData;
  rewards: UserRewards;
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onSimulateFriendRegistration: (friendName: string, friendPhone: string) => void;
}

export const ReferralScreen: React.FC<ReferralScreenProps> = ({
  referralData,
  rewards,
  onBack,
  onNavigateScreen,
  onSimulateFriendRegistration,
}) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showSimulateModal, setShowSimulateModal] = useState(false);
  const [friendName, setFriendName] = useState('Kavitha Sundaram');
  const [friendPhone, setFriendPhone] = useState('98402 11982');
  const [simulatedSuccessToast, setSimulatedSuccessToast] = useState<string | null>(null);

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(referralData.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(referralData.referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareMessage = `Join me on Doors Fresh for pure farm-to-table organic produce! Use my referral code ${referralData.referralCode} to claim +100 bonus Farm Coins & ₹100 off your first harvest box: ${referralData.referralLink}`;

  const handleWhatsAppShare = () => {
    // Non-blocking in-app feedback or url link
    navigator.clipboard?.writeText(shareMessage);
    setSimulatedSuccessToast('Share message copied to clipboard! Ready to paste in WhatsApp.');
    setTimeout(() => setSimulatedSuccessToast(null), 3500);
  };

  const handleSimulateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!friendName.trim()) return;

    onSimulateFriendRegistration(
      friendName.trim(),
      friendPhone.startsWith('+91') ? friendPhone : `+91 ${friendPhone}`
    );

    setShowSimulateModal(false);
    setSimulatedSuccessToast(
      `🎉 Success! ${friendName} signed up using ${referralData.referralCode}. +250 Coins credited to you, +100 Coins credited to ${friendName}!`
    );
    setTimeout(() => setSimulatedSuccessToast(null), 5000);

    // Reset default for next test
    setFriendName('Suresh Kannan');
    setFriendPhone('97910 44219');
  };

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800 relative">
      <MobileHeader
        title="Refer a Friend"
        showBack={true}
        onBack={onBack}
        rightAction="none"
      />

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {/* Celebration Toast Feedback */}
        {simulatedSuccessToast && (
          <div className="p-3 bg-emerald-600 text-white rounded-2xl text-xs font-bold flex items-start gap-2 shadow-lg animate-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{simulatedSuccessToast}</span>
          </div>
        )}

        {/* Hero Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-900 text-white rounded-3xl p-5 shadow-lg border border-emerald-600/40">
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-radial from-emerald-400/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-emerald-100 text-[10px] font-bold mb-2">
              <Gift className="w-3 h-3 text-amber-300" />
              <span>Dual Reward Loyalty Program</span>
            </div>

            <h2 className="text-xl font-black tracking-tight leading-tight">
              Give ₹100, Get 250 Farm Coins!
            </h2>
            <p className="text-xs text-emerald-100 mt-1 leading-relaxed max-w-[270px]">
              Invite friends to eat fresh, healthy farm produce. Both of you receive instant loyalty points when they register!
            </p>

            {/* Quick Reward Stats Strip */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-emerald-600/60 text-xs">
              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/15">
                <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider">
                  You Receive
                </span>
                <div className="text-lg font-black text-amber-300 mt-0.5 font-mono">
                  +250 Coins
                </div>
                <span className="text-[10px] text-emerald-100">per friend signup</span>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-2.5 rounded-2xl border border-white/15">
                <span className="text-[10px] text-emerald-200 block uppercase font-bold tracking-wider">
                  Friend Receives
                </span>
                <div className="text-lg font-black text-white mt-0.5 font-mono">
                  +100 Coins
                </div>
                <span className="text-[10px] text-emerald-100">+ ₹100 welcome credit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Unique Referral Code & Link Box */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-800">Your Unique Referral Code</span>
            <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
              <Coins className="w-3 h-3" /> 1 Coin = ₹0.10 Value
            </span>
          </div>

          {/* Referral Code Display with Copy Button */}
          <div className="flex items-center justify-between p-2.5 bg-slate-50 border-2 border-dashed border-emerald-500/50 rounded-2xl">
            <div className="pl-1">
              <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Share Code</span>
              <span className="font-mono text-base font-black tracking-widest text-emerald-800">
                {referralData.referralCode}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                copiedCode
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
              }`}
            >
              {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Unique Share Link */}
          <div className="flex items-center justify-between p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-mono text-[11px] text-slate-600 truncate max-w-[210px]">
              {referralData.referralLink}
            </span>

            <button
              type="button"
              onClick={handleCopyLink}
              className="text-emerald-700 hover:text-emerald-800 font-bold text-[11px] flex items-center gap-1 cursor-pointer shrink-0 ml-2"
            >
              {copiedLink ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Share Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={() => setShowQrModal(true)}
              className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <QrCode className="w-4 h-4 text-slate-700" />
              <span>Show QR Code</span>
            </button>
          </div>
        </div>

        {/* Interactive 'Simulate Friend Registration' Tester */}
        <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl p-4 border border-amber-300/80 shadow-xs space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-800 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Simulate Friend Signup & Referral Test</h3>
                <p className="text-[10px] text-slate-500">Test the dual point award engine instantly</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowSimulateModal(true)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1"
            >
              <span>Test Signup</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <p className="text-[11px] text-slate-600 leading-snug">
            Click 'Test Signup' to enter a friend's name and simulate them registering with code <strong>{referralData.referralCode}</strong>.
            This will award <strong>+250 Coins</strong> to Priya and <strong>+100 Coins</strong> to the friend!
          </p>
        </div>

        {/* How It Works 3-Step Guide */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
            <span>How Refer & Earn Works</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                1
              </div>
              <div>
                <strong className="text-slate-900 block">Share your unique link or code</strong>
                <span className="text-slate-500 text-[11px]">Send via WhatsApp, SMS, or QR code to neighbors and family.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                2
              </div>
              <div>
                <strong className="text-slate-900 block">Friend signs up & gets +100 Coins</strong>
                <span className="text-slate-500 text-[11px]">They get instant ₹100 welcome credit + 100 loyalty Farm Coins.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                3
              </div>
              <div>
                <strong className="text-slate-900 block">You earn +250 Coins</strong>
                <span className="text-slate-500 text-[11px]">Coins are credited directly to your Doors Fresh wallet for fresh harvest discounts!</span>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History & Invited Friends */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900">Your Referrals</h3>
              <p className="text-[10px] text-slate-500">
                {referralData.totalFriendsReferred} friends invited • {referralData.totalCoinsEarned} Coins earned
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-200">
              +{referralData.totalCoinsEarned} pts
            </span>
          </div>

          {/* Referral items list */}
          <div className="space-y-2">
            {referralData.referrals.map((ref) => (
              <div
                key={ref.id}
                className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0">
                    {ref.friendName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{ref.friendName}</h4>
                    <span className="text-[10px] text-slate-500">
                      {ref.date} • {ref.friendPhone}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 block text-xs">
                    +{ref.referrerPointsEarned} pts
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.2 rounded ${
                      ref.status === 'completed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ref.status === 'first_harvest_ordered'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {ref.status === 'completed'
                      ? 'Coins Settled'
                      : ref.status === 'first_harvest_ordered'
                      ? 'Harvest Ordered'
                      : 'Registered'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Referral Tier Milestone */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
            <span>Milestone: 3 of 5 referred</span>
            <span className="font-bold text-amber-700">2 more for 500 Coin Bonus!</span>
          </div>
        </div>
      </div>

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-xs w-full text-center space-y-3 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">Scan to Claim ₹100 + 100 Coins</h3>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Stylized Simulated QR Code */}
            <div className="p-4 bg-slate-900 rounded-2xl flex flex-col items-center justify-center shadow-inner">
              <div className="w-44 h-44 bg-white p-3 rounded-xl flex flex-col items-center justify-between">
                <div className="grid grid-cols-6 gap-1.5 w-full h-full p-1 bg-slate-100 rounded">
                  {/* QR pattern mock */}
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        i % 2 === 0 || i % 7 === 0 ? 'bg-slate-900' : 'bg-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="font-mono text-xs font-black text-emerald-400 mt-2 tracking-widest">
                {referralData.referralCode}
              </span>
            </div>

            <p className="text-[11px] text-slate-500">
              Ask your friend to scan this QR code with their phone camera to open the Doors Fresh app with your code pre-applied!
            </p>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* SIMULATE FRIEND REGISTRATION MODAL */}
      {showSimulateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3.5 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Simulate Friend Registration</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Enter your friend's details to simulate them clicking your referral link and completing signup with referral code{' '}
              <strong className="text-emerald-700">{referralData.referralCode}</strong>:
            </p>

            <form onSubmit={handleSimulateSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Friend Full Name
                </label>
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="e.g. Kavitha Sundaram"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Friend Mobile Number
                </label>
                <input
                  type="tel"
                  value={friendPhone}
                  onChange={(e) => setFriendPhone(e.target.value)}
                  placeholder="98402 11982"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:border-emerald-500 font-mono"
                  required
                />
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Dual Rewards to be Credited:</span>
                </div>
                <div className="flex justify-between pl-4">
                  <span>Priya (Referrer):</span>
                  <strong className="text-emerald-700 font-mono">+250 Coins</strong>
                </div>
                <div className="flex justify-between pl-4">
                  <span>{friendName || 'Friend'} (New User):</span>
                  <strong className="text-emerald-700 font-mono">+100 Coins + ₹100 Off</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowSimulateModal(false)}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center justify-center gap-1"
                >
                  <Gift className="w-3.5 h-3.5" />
                  <span>Award Coins</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <MobileNavBar
        currentScreen="profile"
        onNavigate={onNavigateScreen}
      />
    </div>
  );
};
