import React, { useState } from 'react';
import {
  Search,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  MapPin,
  Bot,
  Send,
  Sparkles,
  HelpCircle,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { FAQS } from '../../../data/mockData';
import { FAQItem, ScreenType, SupportChatMessage } from '../../../types';

interface HelpSupportSectionProps {
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
}

export const HelpSupportSection: React.FC<HelpSupportSectionProps> = ({
  onBack,
  onNavigateScreen,
}) => {
  const [activeTab, setActiveTab] = useState<'faqs' | 'chat' | 'contact'>('faqs');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>('faq-1');

  // AgriBot chat state
  const [messages, setMessages] = useState<SupportChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Vanakkam Priya! 🌿 I am your Doors Fresh assistant. How can I assist you with your farm-fresh produce or orders today?',
      time: 'Just now',
      quickReplies: [
        'Where is order #W12345?',
        'How to pause my subscription?',
        'Is the produce 100% pesticide-free?',
        'Report item issue / refund',
      ],
    },
  ]);
  const [inputText, setInputText] = useState('');

  const categories = [
    { id: 'all', label: 'All FAQs' },
    { id: 'orders', label: 'Orders & Delivery' },
    { id: 'quality', label: 'Organic Quality' },
    { id: 'payments', label: 'Payments' },
    { id: 'subscriptions', label: 'Subscriptions' },
    { id: 'farmers', label: 'Farmer Direct' },
  ];

  const filteredFaqs = FAQS.filter((faq) => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: SupportChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent AgriBot answer
    setTimeout(() => {
      let botResponse = '';
      let quicks: string[] = [];

      const query = text.toLowerCase();
      if (query.includes('where is') || query.includes('#w12345') || query.includes('order')) {
        botResponse =
          'Your order #W12345 is currently Out for Delivery with our partner Rajesh Kumar on his electric eco-scooter. He is approximately 20 mins away near Green Park Roundabout!';
        quicks = ['Track Order on Map', 'Call Rajesh Kumar'];
      } else if (query.includes('pause') || query.includes('subscription')) {
        botResponse =
          'You can pause your active Family Combo subscription anytime! Tap Subscriptions > Manage Plan > Pause, or specify your vacation dates. No cancellation penalty applies.';
        quicks = ['Open Subscriptions'];
      } else if (query.includes('pesticide') || query.includes('organic') || query.includes('quality')) {
        botResponse =
          'All Wishore vegetables and fruits are 100% pesticide-free. Every harvest batch undergoes spectrometry verification at our Chengalpattu Hub within 3 hours of dawn picking.';
        quicks = ['View Quality Certificate', 'Contact Lab'];
      } else if (query.includes('refund') || query.includes('damaged') || query.includes('issue')) {
        botResponse =
          'We have an unconditional 100% Freshness Guarantee! If any item did not meet your expectations, we will credit your Wishore Wallet instantly. Would you like to request a refund for Tomato (₹25)?';
        quicks = ['Yes, refund to Wallet', 'Speak to human agent'];
      } else {
        botResponse =
          'Thank you for your question! I can connect you with our Chennai 24x7 farm support team at +91 44 2847 9000 or WhatsApp right away.';
        quicks = ['Call 24x7 Helpline', 'Open WhatsApp'];
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: botResponse,
          time: 'Just now',
          quickReplies: quicks,
        },
      ]);
    }, 600);
  };

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-slate-50 text-slate-800">
      <MobileHeader
        title="Help & Support"
        showBack={true}
        onBack={onBack}
        rightAction="none"
      />

      {/* Segmented Top Tabs */}
      <div className="bg-white border-b border-slate-100 px-4 pt-2 pb-2">
        <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl">
          <button
            onClick={() => setActiveTab('faqs')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'faqs'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            FAQs
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'chat'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-emerald-600" />
            <span>AgriBot</span>
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'contact'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Contact
          </button>
        </div>
      </div>

      {/* Tab 1: FAQs */}
      {activeTab === 'faqs' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Search Bar */}
          <div className="relative flex items-center bg-white rounded-xl px-3 py-2 border border-slate-200/80 shadow-2xs">
            <Search className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics, refunds, quality..."
              className="w-full bg-transparent text-xs font-medium text-slate-800 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 font-bold"
              >
                ×
              </button>
            )}
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-2">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-3.5 text-left flex items-start justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 leading-snug">
                      {faq.question}
                    </span>
                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0 mt-0.5 text-slate-500">
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bot CTA Card */}
          <div
            onClick={() => setActiveTab('chat')}
            className="cursor-pointer bg-gradient-to-r from-emerald-700 to-teal-700 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold">Have a custom question?</h4>
                <p className="text-[10px] text-emerald-100">Chat with AgriBot for instant answers</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-200" />
          </div>
        </div>
      )}

      {/* Tab 2: AgriBot Assistant */}
      {activeTab === 'chat' && (
        <div className="flex-1 flex flex-col justify-between bg-slate-100/50 overflow-hidden">
          {/* Chat Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-emerald-600 text-white rounded-br-xs'
                      : 'bg-white border border-slate-100 text-slate-800 rounded-bl-xs'
                  }`}
                >
                  {msg.sender === 'bot' && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 mb-1">
                      <Bot className="w-3 h-3" />
                      <span>Doors Fresh Assistant</span>
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>

                {/* Quick suggestions if bot */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                    {msg.quickReplies.map((reply, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (reply === 'Track Order on Map') {
                            onNavigateScreen('tracking');
                          } else if (reply === 'Open Subscriptions') {
                            onNavigateScreen('subscriptions');
                          } else {
                            handleSendMessage(reply);
                          }
                        }}
                        className="text-[11px] font-semibold bg-white text-emerald-800 border border-emerald-200 hover:bg-emerald-50 px-2.5 py-1 rounded-full shadow-2xs transition-all active:scale-95"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask about delivery, harvest, subscriptions..."
              className="flex-1 bg-slate-100 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Contact Channels */}
      {activeTab === 'contact' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs space-y-4">
            <h4 className="text-sm font-bold text-slate-900">Reach Our Farm Support Team</h4>

            {/* Helpline */}
            <a
              href="tel:+914428479000"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">24×7 Customer Helpline</div>
                <div className="text-[11px] font-mono text-emerald-700 font-bold mt-0.5">
                  +91 44 2847 9000
                </div>
                <div className="text-[10px] text-slate-400">Available in Tamil, English, Hindi</div>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919840123456"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-green-500 text-white flex items-center justify-center">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">WhatsApp Live Support</div>
                <div className="text-[11px] font-mono text-emerald-700 font-bold mt-0.5">
                  +91 98401 23456
                </div>
                <div className="text-[10px] text-slate-400">Instant photo verification & order help</div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:support@doorsfresh.com"
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold text-slate-900">Email Farm Desk</div>
                <div className="text-[11px] font-mono text-slate-700 font-semibold mt-0.5">
                  support@doorsfresh.com
                </div>
                <div className="text-[10px] text-slate-400">Response within 2 hours</div>
              </div>
            </a>
          </div>

          {/* Physical Agro Hub */}
          <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-emerald-600" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">Chennai Distribution Hub</h5>
                <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                  Wishore Agro-Logistics Center, Plot 14B, Chengalpattu Agro Corridor, Tamil Nadu - 603001
                </p>
                <div className="flex items-center gap-1.5 mt-2 text-[10px] font-semibold text-emerald-700">
                  <Clock className="w-3 h-3" />
                  <span>Harvest Despatch Hours: 5:00 AM – 9:00 PM Daily</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
