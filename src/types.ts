export type ScreenType =
  | 'splash'
  | 'auth'
  | 'home'
  | 'listing'
  | 'product_detail'
  | 'cart'
  | 'checkout'
  | 'tracking'
  | 'subscriptions'
  | 'wishlist'
  | 'profile'
  | 'help_support'
  | 'settings_notifications'
  | 'referral';

export interface ProductReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number; // 1 to 5
  date: string;
  verifiedPurchase: boolean;
  comment: string;
  tags?: string[];
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Groceries' | 'Milk & Dairy' | 'Water' | 'Meat & Fish' | 'Organic' | 'More';
  subcategory: 'All' | 'Leafy' | 'Root' | 'Others';
  price: number;
  unit: string;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  availableStockKg: number;
  description: string;
  farmOrigin: string;
  harvestTime: string;
  badges: string[];
  nutrition: {
    calories: string;
    vitaminC: string;
    fiber: string;
    potassium?: string;
  };
  reviews: ProductReview[];
  color: string;
  iconName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderTrackingStep {
  status: 'placed' | 'packed' | 'out_for_delivery' | 'delivered';
  label: string;
  time: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Order {
  id: string;
  placedAt: string;
  status: 'placed' | 'packed' | 'out_for_delivery' | 'delivered';
  eta: string;
  deliveryPartner: {
    name: string;
    phone: string;
    role: string;
    avatar: string;
    rating: number;
    vehicle: string;
  };
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    unit: string;
  }[];
  subtotal: number;
  deliveryCharge: number;
  totalAmount: number;
  deliveryAddress: {
    name: string;
    street: string;
    city: string;
    pincode: string;
  };
  deliverySlot: string;
  paymentMethod: string;
  deliveryOtp?: string;
}

export interface DeliverySlotOption {
  id: string;
  dayKey: 'today' | 'tomorrow' | 'day_after';
  dayTitle: string;
  windowTitle: string;
  timeRange: string;
  period: 'morning' | 'midday' | 'evening' | 'express';
  harvestNote: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'blue' | 'purple';
  isAvailable: boolean;
  cutoffText?: string;
  ecoFriendly?: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'offer' | 'arrival';
  isRead: boolean;
  targetScreen?: ScreenType;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  orderUpdates: boolean;
  specialOffers: boolean;
  newArrivals: boolean;
  morningSummary: boolean;
  channels: {
    push: boolean;
    sms: boolean;
    whatsapp: boolean;
  };
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  subtitle: string;
  priceMonthly: number;
  frequency: string;
  itemsIncluded: string[];
  color: string;
  isSubscribed?: boolean;
}

export interface FAQItem {
  id: string;
  category: 'orders' | 'quality' | 'payments' | 'subscriptions' | 'farmers';
  question: string;
  answer: string;
}

export interface SupportChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'agent';
  text: string;
  time: string;
  quickReplies?: string[];
}

export type RewardTierLevel = 'Seedling' | 'Green Harvester' | 'Gold Harvester' | 'Agri Master';

export interface RewardActivity {
  id: string;
  description: string;
  points: number;
  date: string;
  type: 'purchase' | 'review' | 'subscription' | 'redemption' | 'bonus' | 'referral';
}

export interface UserRewards {
  currentPoints: number;
  lifetimePoints: number;
  tier: RewardTierLevel;
  nextTier: RewardTierLevel | null;
  pointsToNextTier: number;
  tierProgressPercent: number;
  history: RewardActivity[];
}

export interface ReferralRecord {
  id: string;
  friendName: string;
  friendPhone: string;
  date: string;
  status: 'registered' | 'first_harvest_ordered' | 'completed';
  referrerPointsEarned: number;
  refereePointsEarned: number;
  bonusCoinTag: string;
}

export interface UserReferralData {
  referralCode: string;
  referralLink: string;
  referrerRewardCoins: number;
  newFriendRewardCoins: number;
  totalFriendsReferred: number;
  totalCoinsEarned: number;
  referrals: ReferralRecord[];
}

// ==========================================
// DOORS FRESH MULTI-APP ECOSYSTEM TYPES
// ==========================================

export type AppEcosystemView = 'customer' | 'b2b' | 'farmer' | 'franchise' | 'delivery' | 'admin';

// ------------------- DELIVERY PARTNER APP TYPES -------------------
export type DeliveryScreenType =
  | 'delivery_auth'
  | 'delivery_home'
  | 'delivery_orders'
  | 'delivery_navigation'
  | 'delivery_earnings'
  | 'delivery_profile';

export interface DeliveryPartnerProfile {
  id: string;
  name: string;
  phone: string;
  avatarText: string;
  assignedHubName: string;
  assignedHubCode: string;
  vehicleModel: string;
  vehiclePlate: string;
  batteryPercent: number;
  rangeKmRemaining: number;
  insulatedBagId: string;
  coldBagTempCelsius: number;
  isOnline: boolean;
  rating: number;
  totalDeliveries: number;
  onTimeRatePercent: number;
  upiId: string;
  bankLast4: string;
}

export type DeliveryTaskStatus = 'assigned' | 'accepted' | 'picked_from_hub' | 'in_transit' | 'delivered';

export interface DeliveryTask {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  landmark: string;
  slotTitle: string;
  distanceKm: number;
  estimatedMinutes: number;
  status: DeliveryTaskStatus;
  totalAmount: number;
  paymentMethod: 'Prepaid Online' | 'Cash on Delivery (₹245)';
  isExpress: boolean;
  items: {
    name: string;
    quantity: number;
    unit: string;
    isFragile?: boolean;
    isColdRefrigerated?: boolean;
  }[];
  deliveryOtp: string;
  returnableCratesToCollect: number;
  payoutEarnings: number;
}

export interface RiderEarningsSummary {
  todayTotalInr: number;
  completedOrdersCount: number;
  basePayInr: number;
  distanceBonusInr: number;
  peakSlotIncentivesInr: number;
  coldChainComplianceBonusInr: number;
  tipsInr: number;
  walletBalanceInr: number;
  recentPayouts: {
    id: string;
    date: string;
    amount: number;
    utr: string;
    status: 'completed' | 'processing';
  }[];
}

// ------------------- FARMER APP TYPES -------------------
export type FarmerScreenType =
  | 'farmer_auth'
  | 'farmer_home'
  | 'farmer_batches'
  | 'farmer_rates'
  | 'farmer_advisory'
  | 'farmer_earnings';

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  location: string;
  district: string;
  state: string;
  farmSizeAcres: number;
  primaryCrops: string[];
  organicCertified: boolean;
  doorsFreshPartnerSince: string;
  kycVerified: boolean;
  bankAccountLast4: string;
  upiId: string;
  rating: number;
  totalTonnageSold: number;
}

export interface FarmerBatch {
  id: string;
  cropName: string;
  variety: string;
  grade: 'Grade A+ (Premium)' | 'Grade A (Export)' | 'Grade B (Standard)';
  quantityKg: number;
  expectedHarvestDate: string;
  offeredPricePerKg: number;
  mandiBenchmarkPerKg: number;
  status: 'draft' | 'pending_approval' | 'scheduled_pickup' | 'in_transit' | 'weighed_accepted' | 'settled';
  hubDestination: string;
  moisturePercent: number;
  images?: string[];
  notes?: string;
  weighmentSlipNo?: string;
  actualWeighedKg?: number;
  totalPayoutAmount?: number;
}

export interface MandiRate {
  cropName: string;
  category: 'Vegetable' | 'Fruit' | 'Leafy' | 'Root';
  mandiApmcRate: number;
  doorsFreshRate: number;
  trend: 'up' | 'down' | 'stable';
  changePercent: number;
  demandLevel: 'High' | 'Normal' | 'Surplus';
  premiumAmount: number;
  procurementStatus: 'Active Buying' | 'Quota Full' | 'High Demand';
}

export interface CropAdvisory {
  id: string;
  title: string;
  category: 'Weather Alert' | 'Pest & Disease' | 'Nutrient Management' | 'Harvest Timing' | 'Irrigation';
  urgency: 'high' | 'medium' | 'info';
  cropTarget: string;
  message: string;
  recommendedAction: string;
  date: string;
  iconName: string;
}

export interface FarmerPayout {
  id: string;
  batchId: string;
  cropName: string;
  quantityKg: number;
  ratePerKg: number;
  grossAmount: number;
  doorsFreshBonus: number;
  deductions: number;
  netPayout: number;
  status: 'completed' | 'processing' | 'pending_qc';
  utrNumber: string;
  date: string;
}

// ------------------- FRANCHISE APP TYPES -------------------
export type FranchiseScreenType =
  | 'franchise_auth'
  | 'franchise_home'
  | 'franchise_inventory'
  | 'franchise_dispatch'
  | 'franchise_spoilage'
  | 'franchise_margins';

export interface FranchiseHub {
  id: string;
  name: string;
  code: string;
  city: string;
  area: string;
  managerName: string;
  contactNumber: string;
  activeRidersCount: number;
  coldRoomTempCelsius: number;
  humidityPercent: number;
  dailyCapacityKg: number;
  currentStockKg: number;
  fulfillmentRatePercent: number;
  avgDeliveryTimeMinutes: number;
}

export interface FranchiseInwardBatch {
  id: string;
  batchCode: string;
  cropName: string;
  farmerName: string;
  farmerDistrict: string;
  dispatchedKg: number;
  receivedKg: number;
  transitLossPercent: number;
  qualityScorePercent: number;
  coldChainCompliant: boolean;
  arrivalTimestamp: string;
  status: 'arriving' | 'qc_in_progress' | 'sorted_stocked' | 'rejected';
  storageZone: string;
}

export interface FranchiseDispatchOrder {
  id: string;
  customerName: string;
  addressArea: string;
  itemsCount: number;
  totalWeightKg: number;
  slotTime: string;
  riderName: string;
  riderPhone: string;
  status: 'queued' | 'packing' | 'out_for_delivery' | 'delivered';
  isExpress: boolean;
  etaMinutes: number;
}

export interface FranchiseWastageRecord {
  id: string;
  cropName: string;
  lossKg: number;
  reason: 'transit_bruising' | 'shelf_life_expiry' | 'grading_downgrade' | 'handling';
  actionTaken: 'compost_redirection' | 'biogas_unit' | 'discounted_clearance';
  date: string;
  lossValueInr: number;
  preventativeTip: string;
}

export interface FranchiseFinancialSummary {
  dailyGrossRevenue: number;
  totalProduceSoldKg: number;
  hubCommissionEarned: number;
  handlingFeeRatePerKg: number;
  deliveryIncentives: number;
  netDailyProfit: number;
  wastagePenaltyDeduction: number;
}

// ------------------- ADMIN PANEL TYPES -------------------
export type AdminTabType =
  | 'overview'
  | 'farmers'
  | 'franchises'
  | 'b2b_horeca'
  | 'orders'
  | 'delivery_fleet'
  | 'subscriptions'
  | 'promotions_support'
  | 'pricing'
  | 'finances';

export interface AdminTelemetry {
  totalFarmersActive: number;
  activeFranchiseHubs: number;
  dailyOrdersCount: number;
  totalProcurementTonnageToday: number;
  transitActiveTonnage: number;
  hubColdStorageFulfillmentRate: number;
  overallEcosystemSpoilagePercent: number;
  grossMerchandiseValue: number;
  farmerPayoutDisbursedToday: number;
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  sourceApp: 'Customer App' | 'Farmer App' | 'Franchise Hub' | 'Delivery Partner App' | 'B2B HORECA Portal' | 'Admin Command';
  action: string;
  details: string;
  severity: 'normal' | 'warning' | 'critical';
}

// ------------------- B2B HORECA & WHOLESALE SUPPLY TYPES -------------------
export type B2BScreenType =
  | 'b2b_auth'
  | 'b2b_connect'
  | 'b2b_catalog'
  | 'b2b_standing_orders'
  | 'b2b_invoices'
  | 'b2b_logistics';

export type B2BClientCategory = 'hotel' | 'restaurant' | 'hostel' | 'shop';

export interface B2BBusinessProfile {
  id: string;
  businessName: string;
  tradeName?: string;
  category: B2BClientCategory;
  contactPerson: string;
  phone: string;
  email: string;
  gstin: string;
  fssaiNumber: string;
  address: string;
  locality: string;
  city: string;
  assignedDarkStoreHub: string;
  creditLimitInr: number;
  creditUsedInr: number;
  paymentTermsDays: number; // e.g. 15 days or 7 days
  dailyTonnageKg: number;
  dedicatedAccountManager: {
    name: string;
    phone: string;
    role: string;
  };
  deliveryWindowPreference: string;
  kycStatus: 'verified' | 'pending' | 'document_requested';
}

export interface B2BWholesaleItem {
  id: string;
  name: string;
  tamilName: string;
  category: 'Vegetable' | 'Fruit' | 'Leafy' | 'Root' | 'Pantry Bulk';
  packagingUnit: string; // e.g. "25 kg Plastic Crate", "50 kg Jute Bag", "10 kg Carton"
  minOrderQuantityUnits: number;
  mandiBenchmarkRatePerKg: number;
  doorsFreshBulkPricePerKg: number;
  doorsFreshCratePrice: number;
  savingsVsMandiPercent: number;
  availableStockKg: number;
  originDistrict: string;
  grade: 'Grade A+ (Chef Grade)' | 'Grade A (Export)' | 'Grade B (Bulk Cooking)';
  coldChainBay: string;
  image: string;
}

export interface B2BStandingOrder {
  id: string;
  title: string;
  businessName: string;
  category: B2BClientCategory;
  dailyDeliveryTime: string;
  frequency: 'Every Morning (Daily)' | 'Mon - Sat (Kitchen Prep)' | 'Weekend Surge (Fri - Sun)';
  status: 'active' | 'paused';
  items: {
    cropName: string;
    packagingUnit: string;
    quantityUnits: number;
    approxKg: number;
    pricePerUnit: number;
  }[];
  dailyTotalKg: number;
  dailyEstimatedInr: number;
  nextScheduledDelivery: string;
  assignedDeliverySlot: string;
}

export interface B2BInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  businessName: string;
  gstin: string;
  totalWeightKg: number;
  subtotalInr: number;
  cgstInr: number;
  sgstInr: number;
  totalAmountInr: number;
  status: 'paid' | 'due' | 'overdue';
  paymentMethod: '15-Day Commercial Credit' | 'Prepaid Advance Wallet' | 'NEFT / RTGS Bank Transfer';
  deliveryChallanNumber: string;
  receivedBy: string;
}

