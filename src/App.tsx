import React, { useState } from 'react';
import {
  Layers,
  Smartphone,
  Eye,
  Bell,
  Sparkles,
  ShoppingBag,
  HelpCircle,
  Settings,
  CheckCircle2,
  X,
  Star,
  ArrowRight,
  Heart,
  Truck,
  Building2,
  Users,
  Shield,
  Activity,
  Bike,
} from 'lucide-react';
import { WishoreLogo, DoorsFreshLogo } from './components/common/ProduceGraphics';
import { DesignBoard43 } from './components/board/DesignBoard43';
import { MobileDeviceFrame } from './components/mobile/MobileDeviceFrame';
import { ScreenInspector } from './components/inspector/ScreenInspector';
import { SplashScreen } from './components/mobile/screens/SplashScreen';
import { AuthScreen } from './components/mobile/screens/AuthScreen';
import { HomeScreen } from './components/mobile/screens/HomeScreen';
import { ProductListingScreen } from './components/mobile/screens/ProductListingScreen';
import { ProductDetailsScreen } from './components/mobile/screens/ProductDetailsScreen';
import { CartScreen } from './components/mobile/screens/CartScreen';
import { CheckoutScreen } from './components/mobile/screens/CheckoutScreen';
import { OrderTrackingScreen } from './components/mobile/screens/OrderTrackingScreen';
import { SubscriptionsScreen } from './components/mobile/screens/SubscriptionsScreen';
import { WishlistScreen } from './components/mobile/screens/WishlistScreen';
import { ProfileScreen } from './components/mobile/screens/ProfileScreen';
import { HelpSupportSection } from './components/mobile/screens/HelpSupportSection';
import { NotificationCenterModal } from './components/mobile/NotificationCenterModal';
import { NotificationSettingsModal } from './components/mobile/NotificationSettingsModal';
import { WishoreRewardsModal } from './components/mobile/WishoreRewardsModal';
import { ReferralScreen } from './components/mobile/screens/ReferralScreen';

// Farmer App Imports
import { FarmerMobileFrame } from './components/farmer/FarmerMobileFrame';
import { FarmerDesignBoard } from './components/farmer/FarmerDesignBoard';
import { NewFarmerRegistrationModal } from './components/farmer/NewFarmerRegistrationModal';

// Franchise App Imports
import { FranchiseDeviceFrame } from './components/franchise/FranchiseDeviceFrame';
import { FranchiseDesignBoard } from './components/franchise/FranchiseDesignBoard';

// Delivery Partner App Imports
import { DeliveryMobileFrame } from './components/delivery/DeliveryMobileFrame';
import { DeliveryDesignBoard } from './components/delivery/DeliveryDesignBoard';

// Centralised Admin Panel Imports
import { AdminDashboard } from './components/admin/AdminDashboard';

// B2B Wholesale & HORECA Supply Imports
import { B2BMobileFrame } from './components/b2b/B2BMobileFrame';
import { B2BDesignBoard } from './components/b2b/B2BDesignBoard';
import {
  MOCK_B2B_CLIENTS,
  MOCK_B2B_WHOLESALE_ITEMS,
  MOCK_B2B_STANDING_ORDERS,
  MOCK_B2B_INVOICES,
} from './data/b2bMockData';

import {
  INITIAL_PRODUCTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_NOTIFICATION_SETTINGS,
  SUBSCRIPTION_PLANS,
  INITIAL_ORDER,
  INITIAL_USER_REWARDS,
  INITIAL_FARMER_PROFILE,
  INITIAL_FARMERS_LIST,
  INITIAL_FARMER_BATCHES,
  MANDI_RATE_COMPARISONS,
  CROP_ADVISORIES,
  FARMER_PAYOUTS,
  INITIAL_FRANCHISE_HUB,
  FRANCHISE_INWARD_BATCHES,
  FRANCHISE_DISPATCH_ORDERS,
  FRANCHISE_WASTAGE_RECORDS,
  FRANCHISE_FINANCIALS,
  INITIAL_ADMIN_TELEMETRY,
  INITIAL_SYSTEM_LOGS,
  INITIAL_DELIVERY_PROFILE,
  INITIAL_DELIVERY_TASKS,
  INITIAL_RIDER_EARNINGS,
  INITIAL_REFERRAL_DATA,
} from './data/mockData';
import {
  AdminTelemetry,
  AppEcosystemView,
  B2BBusinessProfile,
  B2BInvoice,
  B2BScreenType,
  B2BStandingOrder,
  B2BWholesaleItem,
  CartItem,
  CropAdvisory,
  DeliveryPartnerProfile,
  DeliveryScreenType,
  DeliveryTask,
  DeliveryTaskStatus,
  FarmerBatch,
  FarmerPayout,
  FarmerProfile,
  FarmerScreenType,
  FranchiseDispatchOrder,
  FranchiseFinancialSummary,
  FranchiseHub,
  FranchiseInwardBatch,
  FranchiseScreenType,
  FranchiseWastageRecord,
  MandiRate,
  NotificationItem,
  NotificationSettings,
  Order,
  Product,
  ProductReview,
  RewardActivity,
  RewardTierLevel,
  RiderEarningsSummary,
  ScreenType,
  SubscriptionPlan,
  SystemAuditLog,
  UserReferralData,
  UserRewards,
} from './types';

export default function App() {
  // Ecosystem Application Switcher: Customer, Farmer, Franchise, Admin
  const [ecosystemView, setEcosystemView] = useState<AppEcosystemView>('customer');

  // Customer App view modes & screens
  const [viewMode, setViewMode] = useState<'board' | 'interactive' | 'inspector'>('board');
  const [activeScreen, setActiveScreen] = useState<ScreenType>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(INITIAL_PRODUCTS[0]);

  // Farmer App states
  const [farmerScreen, setFarmerScreen] = useState<FarmerScreenType>('farmer_home');
  const [farmersList, setFarmersList] = useState<FarmerProfile[]>(INITIAL_FARMERS_LIST);
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile>(INITIAL_FARMER_PROFILE);
  const [farmerBatches, setFarmerBatches] = useState<FarmerBatch[]>(INITIAL_FARMER_BATCHES);
  const [mandiRates, setMandiRates] = useState<MandiRate[]>(MANDI_RATE_COMPARISONS);
  const [cropAdvisories, setCropAdvisories] = useState<CropAdvisory[]>(CROP_ADVISORIES);
  const [farmerPayouts, setFarmerPayouts] = useState<FarmerPayout[]>(FARMER_PAYOUTS);
  const [isFarmerRegistrationOpen, setIsFarmerRegistrationOpen] = useState(false);

  // Franchise Hub App states
  const [franchiseScreen, setFranchiseScreen] = useState<FranchiseScreenType>('franchise_home');
  const [franchiseHub, setFranchiseHub] = useState<FranchiseHub>(INITIAL_FRANCHISE_HUB);
  const [franchiseHubs, setFranchiseHubs] = useState<FranchiseHub[]>([
    INITIAL_FRANCHISE_HUB,
    {
      id: 'hub-chn-02',
      name: 'Chennai Central Dark Store',
      code: 'DF-CHN-CEN',
      city: 'Chennai',
      area: 'Poonamallee High Road, Kilpauk',
      managerName: 'Sundar Rajan',
      contactNumber: '+91 94440 22109',
      activeRidersCount: 14,
      coldRoomTempCelsius: 3.9,
      humidityPercent: 91,
      dailyCapacityKg: 6000,
      currentStockKg: 4320,
      fulfillmentRatePercent: 99.8,
      avgDeliveryTimeMinutes: 21,
    },
    {
      id: 'hub-chn-03',
      name: 'Tambaram Cold-Chain Hub',
      code: 'DF-CHN-TAM',
      city: 'Chennai',
      area: 'GST Road, West Tambaram',
      managerName: 'M. Anand',
      contactNumber: '+91 98841 77312',
      activeRidersCount: 10,
      coldRoomTempCelsius: 4.1,
      humidityPercent: 88,
      dailyCapacityKg: 4500,
      currentStockKg: 3100,
      fulfillmentRatePercent: 98.9,
      avgDeliveryTimeMinutes: 26,
    },
  ]);
  const [franchiseInwards, setFranchiseInwards] = useState<FranchiseInwardBatch[]>(FRANCHISE_INWARD_BATCHES);
  const [franchiseOrders, setFranchiseOrders] = useState<FranchiseDispatchOrder[]>(FRANCHISE_DISPATCH_ORDERS);
  const [franchiseWastages, setFranchiseWastages] = useState<FranchiseWastageRecord[]>(FRANCHISE_WASTAGE_RECORDS);
  const [franchiseFinancials, setFranchiseFinancials] = useState<FranchiseFinancialSummary>(FRANCHISE_FINANCIALS);

  // Delivery Partner App states
  // Delivery Partner App states
  const [deliveryScreen, setDeliveryScreen] = useState<DeliveryScreenType>('delivery_home');
  const [deliveryProfile, setDeliveryProfile] = useState<DeliveryPartnerProfile>(INITIAL_DELIVERY_PROFILE);
  const [deliveryRidersList, setDeliveryRidersList] = useState<DeliveryPartnerProfile[]>([
    INITIAL_DELIVERY_PROFILE,
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
  ]);
  const [deliveryTasks, setDeliveryTasks] = useState<DeliveryTask[]>(INITIAL_DELIVERY_TASKS);
  const [riderEarnings, setRiderEarnings] = useState<RiderEarningsSummary>(INITIAL_RIDER_EARNINGS);
  const [selectedDeliveryTask, setSelectedDeliveryTask] = useState<DeliveryTask>(INITIAL_DELIVERY_TASKS[0]);

  // B2B Wholesale & HORECA Supply states
  const [b2bScreen, setB2bScreen] = useState<B2BScreenType>('b2b_auth');
  const [b2bClients, setB2bClients] = useState<B2BBusinessProfile[]>(MOCK_B2B_CLIENTS);
  const [currentB2BClient, setCurrentB2BClient] = useState<B2BBusinessProfile>(MOCK_B2B_CLIENTS[0]);
  const [b2bItems, setB2bItems] = useState<B2BWholesaleItem[]>(MOCK_B2B_WHOLESALE_ITEMS);
  const [b2bStandingOrders, setB2bStandingOrders] = useState<B2BStandingOrder[]>(MOCK_B2B_STANDING_ORDERS);
  const [b2bInvoices, setB2bInvoices] = useState<B2BInvoice[]>(MOCK_B2B_INVOICES);

  // Centralised Admin Panel states
  const [adminTelemetry, setAdminTelemetry] = useState<AdminTelemetry>(INITIAL_ADMIN_TELEMETRY);
  const [systemLogs, setSystemLogs] = useState<SystemAuditLog[]>(INITIAL_SYSTEM_LOGS);

  // Cross-Application Interactive Handlers
  const handleRegisterB2BClient = (newClient: B2BBusinessProfile) => {
    setB2bClients((prev) => [newClient, ...prev]);
    setCurrentB2BClient(newClient);
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'B2B HORECA Portal',
      action: 'Commercial B2B Buyer Connected',
      details: `${newClient.businessName} (${newClient.category.toUpperCase()}) approved for ₹${(newClient.creditLimitInr / 1000).toFixed(0)}k credit line. Delivery window: ${newClient.deliveryWindowPreference}.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
    setActivePushToast({
      id: `alert-b2b-${Date.now()}`,
      title: '🏢 New B2B Commercial Client Connected',
      message: `${newClient.businessName} registered with ${newClient.paymentTermsDays}-day credit terms.`,
      time: 'Just now',
      type: 'arrival',
      isRead: false,
    });
  };
  const handleAddNewFranchiseHub = (newHub: FranchiseHub) => {
    setFranchiseHubs((prev) => [newHub, ...prev]);
    setFranchiseHub(newHub);
    setAdminTelemetry((prev) => ({
      ...prev,
      activeFranchiseHubs: prev.activeFranchiseHubs + 1,
    }));
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'New Franchise Dark Store Provisioned',
      details: `${newHub.name} (${newHub.code}) opened in ${newHub.area}. Manager: ${newHub.managerName}. Daily Capacity: ${newHub.dailyCapacityKg} kg.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
    setActivePushToast({
      id: `alert-hub-${Date.now()}`,
      title: '🏬 New Franchise Dark Store Provisioned',
      message: `${newHub.name} is now online in ${newHub.city} with ${newHub.dailyCapacityKg}kg capacity.`,
      time: 'Just now',
      type: 'arrival',
      isRead: false,
    });
  };

  const handleAddNewRider = (newRider: DeliveryPartnerProfile) => {
    setDeliveryRidersList((prev) => [newRider, ...prev]);
    setDeliveryProfile(newRider);
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'New EV Delivery Partner Onboarded',
      details: `${newRider.name} (${newRider.id}) onboarded with ${newRider.vehicleModel} (${newRider.vehiclePlate}) at ${newRider.assignedHubName}.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
    setActivePushToast({
      id: `alert-rider-${Date.now()}`,
      title: '🛵 New EV Rider Onboarded',
      message: `${newRider.name} joined Doors Fresh fleet at ${newRider.assignedHubName}.`,
      time: 'Just now',
      type: 'arrival',
      isRead: false,
    });
  };

  const handleAddNewFarmer = (newFarmer: FarmerProfile) => {
    setFarmersList((prev) => [newFarmer, ...prev]);
    setFarmerProfile(newFarmer);
    setAdminTelemetry((prev: AdminTelemetry) => ({
      ...prev,
      totalFarmersActive: prev.totalFarmersActive + 1,
    }));
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'New Farmer Onboarded & Verified',
      details: `${newFarmer.name} (${newFarmer.id}) registered from ${newFarmer.location}. Land: ${newFarmer.farmSizeAcres} Acres. Direct DBT Account (•••• ${newFarmer.bankAccountLast4}) linked.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
    setActivePushToast({
      id: `alert-farmer-${Date.now()}`,
      title: '🌾 New Farmer Partner Onboarded',
      message: `${newFarmer.name} joined Doors Fresh network from ${newFarmer.district} with ${newFarmer.farmSizeAcres} acres.`,
      time: 'Just now',
      type: 'arrival',
      isRead: false,
    });
  };

  const handleAddFarmerBatch = (newBatch: FarmerBatch) => {
    setFarmerBatches((prev) => [newBatch, ...prev]);

    // Also register in Franchise Inwarding Queue
    const newInward: FranchiseInwardBatch = {
      id: `INW-${Math.floor(400 + Math.random() * 500)}`,
      batchCode: newBatch.id,
      cropName: newBatch.cropName,
      farmerName: farmerProfile.name,
      farmerDistrict: farmerProfile.location,
      dispatchedKg: newBatch.quantityKg,
      receivedKg: newBatch.quantityKg,
      transitLossPercent: 0.1,
      qualityScorePercent: 99.0,
      coldChainCompliant: true,
      arrivalTimestamp: 'Scheduled Reefer Pickup',
      status: 'arriving',
      storageZone: 'Cold Staging Bay Dock 1',
    };
    setFranchiseInwards((prev) => [newInward, ...prev]);

    // Log to Admin Audit
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Farmer App',
      action: 'Harvest Batch Created',
      details: `${farmerProfile.name} registered ${newBatch.quantityKg} kg ${newBatch.cropName} for ${newBatch.hubDestination}.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
    setAdminTelemetry((prev: AdminTelemetry) => ({
      ...prev,
      totalProcurementTonnageToday: Number((prev.totalProcurementTonnageToday + newBatch.quantityKg / 1000).toFixed(1)),
    }));
  };

  const handleApproveFarmerBatch = (batchId: string) => {
    setFarmerBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: 'scheduled_pickup' as const } : b))
    );
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'Batch Approved & Van Dispatched',
      details: `Reefer Van TN-19-BA-8902 dispatched for harvest batch ${batchId}.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
    );
    const targetProduct = products.find((p) => p.id === productId);
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'Retail Price Adjusted',
      details: `${targetProduct?.name || productId} retail price set to ₹${newPrice}. Propagated to Customer App.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
  };

  const handleUpdateProcurementRate = (cropName: string, newRate: number) => {
    setMandiRates((prev) =>
      prev.map((m) => (m.cropName === cropName ? { ...m, doorsFreshRate: newRate, premiumAmount: newRate - m.mandiApmcRate } : m))
    );
  };

  const handleReleaseFarmerPayout = (batchId: string) => {
    const utr = `RBI${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setFarmerPayouts((prev) =>
      prev.map((p) =>
        p.batchId === batchId || p.id === batchId
          ? { ...p, status: 'completed' as const, utrNumber: utr }
          : p
      )
    );
    setFarmerBatches((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: 'settled' as const } : b))
    );
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'Farmer DBT Released',
      details: `UTR ${utr} released to farmer bank account via RBI IMPS.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
  };

  const handleApproveInward = (batchId: string) => {
    setFranchiseInwards((prev) =>
      prev.map((b) => (b.id === batchId ? { ...b, status: 'sorted_stocked' as const, storageZone: 'Chilled Bay C-14 (4°C)' } : b))
    );
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Franchise Hub',
      action: 'Produce Inwarded & Stocked',
      details: `Batch ${batchId} cleared electronic weighment & quality inspection at Velachery Hub.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);
  };

  const handleDispatchOrder = (orderId: string) => {
    setFranchiseOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: 'out_for_delivery' as const, etaMinutes: 14 } : o))
    );
  };

  // Delivery Partner Handlers
  const handleToggleRiderOnline = () => {
    setDeliveryProfile((prev) => {
      const nextOnline = !prev.isOnline;
      const logEntry: SystemAuditLog = {
        id: `LOG-${Date.now().toString().slice(-4)}`,
        timestamp: 'Just now',
        sourceApp: 'Delivery Partner App',
        action: nextOnline ? 'Rider Checked On-Duty' : 'Rider Checked Off-Duty',
        details: `${prev.name} (${prev.id}) switched duty status to ${nextOnline ? 'ONLINE' : 'OFFLINE'}. Battery: ${prev.batteryPercent}%, Insulated Bag: ${prev.insulatedBagId} (${prev.coldBagTempCelsius}°C).`,
        severity: 'normal',
      };
      setSystemLogs((l) => [logEntry, ...l]);
      return { ...prev, isOnline: nextOnline };
    });
  };

  const handleUpdateDeliveryTaskStatus = (taskId: string, status: DeliveryTaskStatus) => {
    setDeliveryTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
    setSelectedDeliveryTask((prev) => (prev.id === taskId ? { ...prev, status } : prev));
    if (status === 'in_transit') {
      setOrder((prev) => ({ ...prev, status: 'out_for_delivery' }));
      setActivePushToast({
        id: `alert-out-${Date.now()}`,
        title: '🛵 Out for Delivery!',
        message: `${deliveryProfile.name} is on the way on Ather 450X EV with your fresh harvest box.`,
        time: 'Just now',
        type: 'order',
        isRead: false,
        targetScreen: 'tracking',
      });
    } else if (status === 'delivered') {
      setOrder((prev) => ({ ...prev, status: 'delivered' }));
    }
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Delivery Partner App',
      action: `Order Status: ${status.toUpperCase()}`,
      details: `Delivery task ${taskId} updated to ${status}.`,
      severity: 'normal',
    };
    setSystemLogs((l) => [logEntry, ...l]);
  };

  const handleCompleteDelivery = (taskId: string) => {
    const targetTask = deliveryTasks.find((t) => t.id === taskId);
    const earnedAmount = targetTask ? targetTask.payoutEarnings : 65;
    const otpUsed = targetTask ? targetTask.deliveryOtp : '4821';
    setDeliveryTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'delivered' as const } : t))
    );
    setSelectedDeliveryTask((prev) => (prev.id === taskId ? { ...prev, status: 'delivered' as const } : prev));
    setOrder((prev) => ({ ...prev, status: 'delivered' }));
    setRiderEarnings((prev) => ({
      ...prev,
      todayTotalInr: prev.todayTotalInr + earnedAmount,
      walletBalanceInr: prev.walletBalanceInr + earnedAmount,
      completedOrdersCount: prev.completedOrdersCount + 1,
    }));
    setDeliveryProfile((prev) => ({
      ...prev,
      totalDeliveries: prev.totalDeliveries + 1,
    }));
    setAdminTelemetry((prev: AdminTelemetry) => ({
      ...prev,
      grossMerchandiseValue: prev.grossMerchandiseValue + (targetTask?.totalAmount || 385),
      dailyOrdersCount: prev.dailyOrdersCount + 1,
    }));
    setActivePushToast({
      id: `alert-delivered-${Date.now()}`,
      title: '✅ Farm Box Delivered!',
      message: `${deliveryProfile.name} verified OTP ${otpUsed} and completed delivery at Green Park. 1 returnable crate collected (+₹20 loyalty).`,
      time: 'Just now',
      type: 'order',
      isRead: false,
      targetScreen: 'tracking',
    });
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Delivery Partner App',
      action: 'Delivery Verified via OTP',
      details: `Order ${targetTask?.orderId || taskId} successfully delivered by ${deliveryProfile.name}. Customer OTP ${otpUsed} verified. +₹${earnedAmount} credited to rider wallet.`,
      severity: 'normal',
    };
    setSystemLogs((l) => [logEntry, ...l]);
  };

  const handleInstantRiderCashout = (amount: number) => {
    const utr = `UPI${Math.floor(100000000000 + Math.random() * 900000000000)}`;
    setRiderEarnings((prev) => ({
      ...prev,
      walletBalanceInr: Math.max(0, prev.walletBalanceInr - amount),
      recentPayouts: [
        {
          id: `PO-${Date.now().toString().slice(-4)}`,
          date: 'Today, Just now',
          amount,
          utr,
          status: 'completed',
        },
        ...prev.recentPayouts,
      ],
    }));
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Admin Command',
      action: 'Instant Rider UPI Payout',
      details: `₹${amount} transferred to ${deliveryProfile.name} (VPA: ${deliveryProfile.upiId}). UTR: ${utr}.`,
      severity: 'normal',
    };
    setSystemLogs((l) => [logEntry, ...l]);
  };

  const handleAcceptDeliveryTask = (taskId: string) => {
    handleUpdateDeliveryTaskStatus(taskId, 'accepted');
    const targetTask = deliveryTasks.find((t) => t.id === taskId);
    if (targetTask) {
      setSelectedDeliveryTask({ ...targetTask, status: 'accepted' });
    }
    setActivePushToast({
      id: `alert-accepted-${Date.now()}`,
      title: '📦 Delivery Assignment Accepted',
      message: `${deliveryProfile.name} accepted order ${taskId}. Proceeding to Velachery Dark Store Bay 2.`,
      time: 'Just now',
      type: 'order',
      isRead: false,
    });
  };

  const handleRejectDeliveryTask = (taskId: string, reason: string) => {
    setDeliveryTasks((prev) => prev.filter((t) => t.id !== taskId));
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Delivery Partner App',
      action: 'Delivery Assignment Declined',
      details: `${deliveryProfile.name} declined task ${taskId}. Reason: ${reason}. Auto-reassigned to next available EV rider.`,
      severity: 'warning',
    };
    setSystemLogs((l) => [logEntry, ...l]);
    setActivePushToast({
      id: `alert-rejected-${Date.now()}`,
      title: '🔄 Task Reassigned to Fleet',
      message: `Assignment declined (${reason}). Reassigned to dark store fleet queue.`,
      time: 'Just now',
      type: 'order',
      isRead: false,
    });
  };

  const handleInitiateReturnDeliveryTask = (taskId: string, reason: string) => {
    setDeliveryTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'assigned' as const } : t))
    );
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Delivery Partner App',
      action: 'Produce Return Manifest Created',
      details: `Order ${taskId} marked undeliverable (${reason}). Inward return seal routed to Velachery Micro-Hub Dock Bay 3.`,
      severity: 'warning',
    };
    setSystemLogs((l) => [logEntry, ...l]);
  };

  // Data states
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }, // Tomato
    { product: INITIAL_PRODUCTS[1], quantity: 1 }, // Onion
    { product: INITIAL_PRODUCTS[3], quantity: 1 }, // Carrot
  ]);
  const [order, setOrder] = useState<Order>(INITIAL_ORDER);
  const [subscriptionPlans, setSubscriptionPlans] = useState<SubscriptionPlan[]>(SUBSCRIPTION_PLANS);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-tomato', 'prod-carrot']);

  // Wishlist handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleMoveWishlistToCart = (product: Product) => {
    handleAddToCart(product, 1);
  };

  const handleMoveAllWishlistToCart = () => {
    const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
    wishlistedProducts.forEach((p) => handleAddToCart(p, 1));
  };

  const handleClearWishlist = () => {
    setWishlistIds([]);
  };

  // Push notification states
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(
    INITIAL_NOTIFICATION_SETTINGS
  );
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [isNotificationSettingsOpen, setIsNotificationSettingsOpen] = useState(false);
  const [activePushToast, setActivePushToast] = useState<NotificationItem | null>(null);

  // Wishore Rewards & Loyalty states
  const [rewards, setRewards] = useState<UserRewards>(INITIAL_USER_REWARDS);
  const [walletBalance, setWalletBalance] = useState<number>(125);
  const [isRewardsModalOpen, setIsRewardsModalOpen] = useState(false);
  const [rewardsToast, setRewardsToast] = useState<{ title: string; points: number; message: string } | null>(null);

  const calculateTierInfo = (currentPoints: number): {
    tier: RewardTierLevel;
    nextTier: RewardTierLevel | null;
    pointsToNextTier: number;
    tierProgressPercent: number;
  } => {
    if (currentPoints >= 4000) {
      return {
        tier: 'Agri Master',
        nextTier: null,
        pointsToNextTier: 0,
        tierProgressPercent: 100,
      };
    } else if (currentPoints >= 1500) {
      const progress = Math.min(100, Math.round(((currentPoints - 1500) / (4000 - 1500)) * 100));
      return {
        tier: 'Gold Harvester',
        nextTier: 'Agri Master',
        pointsToNextTier: 4000 - currentPoints,
        tierProgressPercent: progress,
      };
    } else if (currentPoints >= 500) {
      const progress = Math.min(100, Math.round(((currentPoints - 500) / (1500 - 500)) * 100));
      return {
        tier: 'Green Harvester',
        nextTier: 'Gold Harvester',
        pointsToNextTier: 1500 - currentPoints,
        tierProgressPercent: progress,
      };
    } else {
      const progress = Math.min(100, Math.round((currentPoints / 500) * 100));
      return {
        tier: 'Seedling',
        nextTier: 'Green Harvester',
        pointsToNextTier: 500 - currentPoints,
        tierProgressPercent: progress,
      };
    }
  };

  const awardPoints = (
    points: number,
    description: string,
    type: RewardActivity['type']
  ) => {
    setRewards((prev) => {
      const newCurrent = prev.currentPoints + points;
      const newLifetime = prev.lifetimePoints + points;
      const tierInfo = calculateTierInfo(newCurrent);
      const newActivity: RewardActivity = {
        id: `rew-${Date.now()}`,
        description,
        points,
        date: 'Just now',
        type,
      };
      return {
        currentPoints: newCurrent,
        lifetimePoints: newLifetime,
        ...tierInfo,
        history: [newActivity, ...prev.history],
      };
    });

    setRewardsToast({
      title: `+${points} Wishore Rewards Points!`,
      points,
      message: description,
    });
    setTimeout(() => {
      setRewardsToast(null);
    }, 4500);
  };

  const handleRedeemPoints = (points: number, rupeeValue: number) => {
    setRewards((prev) => {
      const newCurrent = Math.max(0, prev.currentPoints - points);
      const tierInfo = calculateTierInfo(newCurrent);
      const newActivity: RewardActivity = {
        id: `rew-${Date.now()}`,
        description: `Redeemed ${points} pts for ₹${rupeeValue} Farm Wallet`,
        points: -points,
        date: 'Just now',
        type: 'redemption',
      };
      return {
        ...prev,
        currentPoints: newCurrent,
        ...tierInfo,
        history: [newActivity, ...prev.history],
      };
    });
    setWalletBalance((prev) => prev + rupeeValue);
  };

  // Refer a Friend System state & dual loyalty points dispatcher
  const [referralData, setReferralData] = useState<UserReferralData>(INITIAL_REFERRAL_DATA);

  const handleSimulateFriendRegistration = (friendName: string, friendPhone: string) => {
    const referrerCoins = referralData.referrerRewardCoins; // 250
    const friendCoins = referralData.newFriendRewardCoins; // 100

    // 1. Award loyalty points to referrer (Priya)
    awardPoints(
      referrerCoins,
      `Referral Bonus: ${friendName} registered with your link`,
      'referral'
    );

    // 2. Append new referral record
    const newRecord = {
      id: `ref-${Date.now().toString().slice(-4)}`,
      friendName,
      friendPhone,
      date: 'Just now',
      status: 'first_harvest_ordered' as const,
      referrerPointsEarned: referrerCoins,
      refereePointsEarned: friendCoins,
      bonusCoinTag: `+${referrerCoins} Coins Credited`,
    };

    setReferralData((prev) => ({
      ...prev,
      totalFriendsReferred: prev.totalFriendsReferred + 1,
      totalCoinsEarned: prev.totalCoinsEarned + referrerCoins,
      referrals: [newRecord, ...prev.referrals],
    }));

    // 3. Log to Admin Panel audit
    const logEntry: SystemAuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      sourceApp: 'Customer App',
      action: 'Dual Referral Bonus Disbursed',
      details: `${friendName} (${friendPhone}) registered using code ${referralData.referralCode}. +${referrerCoins} Coins awarded to Priya Sharma, +${friendCoins} Coins credited to ${friendName}.`,
      severity: 'normal',
    };
    setSystemLogs((prev) => [logEntry, ...prev]);

    // 4. Trigger celebratory push toast
    setActivePushToast({
      id: `alert-ref-${Date.now()}`,
      title: '🎁 Referral Bonus Credited!',
      message: `${friendName} registered with your link. +${referrerCoins} Farm Coins added to your loyalty balance!`,
      time: 'Just now',
      type: 'offer',
      isRead: false,
      targetScreen: 'referral',
    });
  };

  // Add item to cart
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  // Remove / decrement cart
  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((i) => i.product.id !== productId);
      }
      return prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
      );
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Add new Product Review
  const handleAddReview = (
    productId: string,
    newReviewData: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>
  ) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newReview: ProductReview = {
            id: `rev-${Date.now()}`,
            ...newReviewData,
            date: 'Just now',
            helpfulCount: 1,
          };
          const updatedReviews = [newReview, ...p.reviews];
          const sumRatings = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
          const newAvg = Number((sumRatings / updatedReviews.length).toFixed(1));
          return {
            ...p,
            rating: newAvg,
            reviewCount: p.reviewCount + 1,
            reviews: updatedReviews,
          };
        }
        return p;
      })
    );

    // Also update selectedProduct if currently viewing it
    if (selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        const newReview: ProductReview = {
          id: `rev-${Date.now()}`,
          ...newReviewData,
          date: 'Just now',
          helpfulCount: 1,
        };
        const updatedReviews = [newReview, ...prev.reviews];
        const sumRatings = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
        const newAvg = Number((sumRatings / updatedReviews.length).toFixed(1));
        return {
          ...prev,
          rating: newAvg,
          reviewCount: prev.reviewCount + 1,
          reviews: updatedReviews,
        };
      });
    }

    // Award +50 loyalty points for verified produce review
    const targetProd = products.find((p) => p.id === productId);
    awardPoints(50, `Verified Review: ${targetProd?.name || 'Fresh Produce'}`, 'review');
  };

  // Toggle subscription
  const handleToggleSubscription = (planId: string) => {
    setSubscriptionPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const willSubscribe = !plan.isSubscribed;
          if (willSubscribe) {
            awardPoints(200, `${plan.name} Monthly Farm Plan Activated`, 'subscription');
          }
          return { ...plan, isSubscribed: willSubscribe };
        }
        return plan;
      })
    );
  };

  // Trigger push alert demonstration
  const handleTriggerDemoPush = () => {
    const alerts: NotificationItem[] = [
      {
        id: `demo-${Date.now()}`,
        title: '🛵 Order #W12345 Near You!',
        message: 'Rajesh Kumar has entered Green Park Street with your fresh produce box.',
        time: 'Just now',
        type: 'order',
        isRead: false,
        targetScreen: 'tracking',
      },
      {
        id: `demo-${Date.now() + 1}`,
        title: '🍅 Fresh Morning Tomatoes Harvested!',
        message: 'Kanchipuram sun-ripened organic batch ready for dispatch. 20% off today.',
        time: 'Just now',
        type: 'arrival',
        isRead: false,
        targetScreen: 'product_detail',
      },
    ];

    const chosenAlert = alerts[Math.floor(Math.random() * alerts.length)];
    setNotifications((prev) => [chosenAlert, ...prev]);
    setActivePushToast(chosenAlert);
    setTimeout(() => {
      setActivePushToast(null);
    }, 4500);
  };

  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n))
    );
    setIsNotificationCenterOpen(false);
    if (item.targetScreen) {
      setActiveScreen(item.targetScreen);
      setViewMode('interactive');
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Active Screen Content Renderer for Interactive Mode
  const renderActiveScreenContent = () => {
    switch (activeScreen) {
      case 'splash':
        return (
          <SplashScreen
            onEnterApp={() => setActiveScreen('home')}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'auth':
        return (
          <AuthScreen
            onLoginSuccess={(referralCodeApplied) => {
              if (referralCodeApplied) {
                // Award welcome registration bonus to new user
                awardPoints(100, `Welcome Bonus: Registered with referral code ${referralCodeApplied}`, 'referral');
                setActivePushToast({
                  id: `alert-refbonus-${Date.now()}`,
                  title: '🎉 Welcome to Doors Fresh!',
                  message: `Referral code ${referralCodeApplied} applied: +100 Farm Coins credited to your wallet!`,
                  time: 'Just now',
                  type: 'offer',
                  isRead: false,
                });
              }
              setActiveScreen('home');
            }}
            onBack={() => setActiveScreen('splash')}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onNavigateScreen={setActiveScreen}
            onOpenNotifications={() => setIsNotificationCenterOpen(true)}
            unreadNotificationsCount={unreadCount}
            wishlistCount={wishlistIds.length}
            onSwitchToB2B={() => setEcosystemView('b2b')}
            activeOrder={order}
            onSwitchToDelivery={() => {
              setEcosystemView('delivery');
              setDeliveryScreen('delivery_navigation');
            }}
          />
        );
      case 'listing':
        return (
          <ProductListingScreen
            products={products}
            cartItems={cartItems}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setActiveScreen('product_detail');
            }}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'product_detail':
        return (
          <ProductDetailsScreen
            product={selectedProduct}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBack={() => setActiveScreen('listing')}
            onNavigateScreen={setActiveScreen}
            onAddReview={handleAddReview}
          />
        );
      case 'wishlist':
        return (
          <WishlistScreen
            wishlistProducts={products.filter((p) => wishlistIds.includes(p.id))}
            onMoveToCart={handleMoveWishlistToCart}
            onMoveAllToCart={handleMoveAllWishlistToCart}
            onRemoveFromWishlist={handleToggleWishlist}
            onClearWishlist={handleClearWishlist}
            onSelectProduct={(product) => {
              setSelectedProduct(product);
              setActiveScreen('product_detail');
            }}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'cart':
        return (
          <CartScreen
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateCartQuantity}
            onClearCart={handleClearCart}
            onProceedToCheckout={() => setActiveScreen('checkout')}
            onBack={() => setActiveScreen('listing')}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'checkout':
        return (
          <CheckoutScreen
            totalAmount={cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0) + 20}
            onPaymentSuccess={(chosenSlot) => {
              const orderTotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0) + 20;
              awardPoints(orderTotal, 'Farm Fresh Harvest Purchase', 'purchase');

              const newOrderId = `ORD-${Math.floor(9900 + Math.random() * 99)}`;
              const generatedOtp = '4821';

              setOrder((prev) => ({
                ...prev,
                id: newOrderId,
                status: 'out_for_delivery',
                deliverySlot: chosenSlot || prev.deliverySlot,
                deliveryOtp: generatedOtp,
                placedAt: 'Just now',
                deliveryPartner: {
                  name: deliveryProfile.name,
                  phone: deliveryProfile.phone,
                  role: 'Doors Fresh EV Delivery Partner',
                  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
                  rating: deliveryProfile.rating,
                  vehicle: `${deliveryProfile.vehicleModel} (${deliveryProfile.vehiclePlate})`,
                },
              }));

              // Sync real-time delivery task in Delivery Partner App
              const newDeliveryTask: DeliveryTask = {
                id: `DEL-${Date.now().toString().slice(-4)}`,
                orderId: newOrderId,
                customerName: 'Priya Sharma',
                customerPhone: '+91 98401 23456',
                deliveryAddress: '#123, Green Park, Chennai - 600028',
                landmark: 'Near Green Park Community Hall',
                slotTitle: chosenSlot || 'Today, 6:00 PM - 8:00 PM',
                distanceKm: 2.1,
                estimatedMinutes: 12,
                status: 'in_transit',
                totalAmount: orderTotal,
                paymentMethod: 'Prepaid Online',
                isExpress: false,
                items: cartItems.length > 0 ? cartItems.map((c) => ({
                  name: c.product.name,
                  quantity: c.quantity,
                  unit: c.product.unit,
                  isFragile: true,
                  isColdRefrigerated: true,
                })) : [
                  { name: 'Roma Tomato (Vine-Ripened)', quantity: 2, unit: 'kg', isFragile: true, isColdRefrigerated: true },
                  { name: 'Palak & Tender Amaranth', quantity: 1, unit: 'bunch', isFragile: false, isColdRefrigerated: true },
                ],
                deliveryOtp: generatedOtp,
                returnableCratesToCollect: 1,
                payoutEarnings: 65,
              };

              setDeliveryTasks((prev) => [newDeliveryTask, ...prev]);
              setSelectedDeliveryTask(newDeliveryTask);

              setActivePushToast({
                id: `alert-neworder-${Date.now()}`,
                title: '🛒 Order Placed & Dispatched!',
                message: `Assigned to ${deliveryProfile.name} on ${deliveryProfile.vehicleModel}. Delivery OTP: ${generatedOtp}.`,
                time: 'Just now',
                type: 'order',
                isRead: false,
                targetScreen: 'tracking',
              });

              setActiveScreen('tracking');
            }}
            onBack={() => setActiveScreen('cart')}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'tracking':
        return (
          <OrderTrackingScreen
            order={order}
            onBack={() => setActiveScreen('home')}
            onNavigateScreen={setActiveScreen}
            onRateDeliveredProduct={() => {
              setSelectedProduct(products[0]);
              setActiveScreen('product_detail');
            }}
            onSwitchToDeliveryApp={() => {
              setEcosystemView('delivery');
              setDeliveryScreen('delivery_navigation');
            }}
          />
        );
      case 'subscriptions':
        return (
          <SubscriptionsScreen
            plans={subscriptionPlans}
            onToggleSubscription={handleToggleSubscription}
            onBack={() => setActiveScreen('home')}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            onNavigateScreen={setActiveScreen}
            onLogout={() => setActiveScreen('auth')}
            onOpenSettings={() => setIsNotificationSettingsOpen(true)}
            onOpenHelpSupport={() => setActiveScreen('help_support')}
            onOpenRewards={() => setIsRewardsModalOpen(true)}
            rewards={rewards}
            walletBalance={walletBalance}
            wishlistCount={wishlistIds.length}
          />
        );
      case 'help_support':
        return (
          <HelpSupportSection
            onBack={() => setActiveScreen('profile')}
            onNavigateScreen={setActiveScreen}
          />
        );
      case 'settings_notifications':
        return (
          <ProfileScreen
            onNavigateScreen={setActiveScreen}
            onLogout={() => setActiveScreen('auth')}
            onOpenSettings={() => setIsNotificationSettingsOpen(true)}
            onOpenHelpSupport={() => setActiveScreen('help_support')}
            onOpenRewards={() => setIsRewardsModalOpen(true)}
            rewards={rewards}
            walletBalance={walletBalance}
            wishlistCount={wishlistIds.length}
          />
        );
      case 'referral':
        return (
          <ReferralScreen
            referralData={referralData}
            rewards={rewards}
            onBack={() => setActiveScreen('profile')}
            onNavigateScreen={setActiveScreen}
            onSimulateFriendRegistration={handleSimulateFriendRegistration}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigateScreen={setActiveScreen}
            onOpenNotifications={() => setIsNotificationCenterOpen(true)}
            unreadNotificationsCount={unreadCount}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between text-slate-800">
      {/* Top Application Bar with Multi-App Ecosystem Switcher */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-2.5 flex flex-col lg:flex-row items-center justify-between gap-3 shadow-2xs">
        {/* Zone 1: Brand Logo & 4 Ecosystem Pillars */}
        <div className="w-full lg:w-auto flex flex-wrap items-center justify-between lg:justify-start gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <DoorsFreshLogo variant="image" size="sm" />
          </div>

          {/* 4 Multi-App Ecosystem Tabs */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold overflow-x-auto">
            <button
              onClick={() => {
                setEcosystemView('customer');
                if (viewMode === 'inspector') setViewMode('board');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                ecosystemView === 'customer'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Customer App (10)</span>
            </button>

            <button
              onClick={() => {
                setEcosystemView('b2b');
                if (viewMode === 'inspector') setViewMode('board');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                ecosystemView === 'b2b'
                  ? 'bg-indigo-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>B2B HORECA Supply (6)</span>
            </button>

            <button
              onClick={() => {
                setEcosystemView('farmer');
                if (viewMode === 'inspector') setViewMode('board');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                ecosystemView === 'farmer'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Farmer App (6)</span>
            </button>

            <button
              onClick={() => {
                setEcosystemView('franchise');
                if (viewMode === 'inspector') setViewMode('board');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                ecosystemView === 'franchise'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Franchise App (6)</span>
            </button>

            <button
              onClick={() => {
                setEcosystemView('delivery');
                if (viewMode === 'inspector') setViewMode('board');
              }}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                ecosystemView === 'delivery'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Bike className="w-3.5 h-3.5" />
              <span>Delivery Partner (6)</span>
            </button>

            <button
              onClick={() => setEcosystemView('admin')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                ecosystemView === 'admin'
                  ? 'bg-slate-900 text-emerald-400 border border-slate-700 shadow-xs'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-bold">Admin Panel</span>
            </button>
          </div>
        </div>

        {/* Zone 2: App Sub-Mode View Selectors (Board vs Live Prototype) */}
        {ecosystemView !== 'admin' && (
          <nav className="flex items-center gap-2 text-xs font-semibold">
            <button
              onClick={() => setViewMode('board')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'board'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>4:3 Design Board (All Screens)</span>
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                viewMode === 'interactive'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Live Interactive Prototype</span>
            </button>

            {ecosystemView === 'customer' && (
              <button
                onClick={() => setViewMode('inspector')}
                className={`hidden xl:flex px-3 py-1.5 rounded-lg items-center gap-1.5 transition-all whitespace-nowrap shrink-0 ${
                  viewMode === 'inspector'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Specs & Navigator</span>
              </button>
            )}
          </nav>
        )}

        {/* Zone 3: App-Specific Actions */}
        {ecosystemView === 'customer' && (
          <div className="flex items-center gap-2 shrink-0">
            {/* Rewards Shortcut */}
            <button
              onClick={() => setIsRewardsModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors cursor-pointer shadow-2xs"
              title="Rewards Balance"
            >
              <span className="text-xs">👑</span>
              <span className="text-xs font-mono font-black text-amber-950">
                {rewards.currentPoints.toLocaleString()} <span className="font-sans font-medium text-[10px] text-amber-800">pts</span>
              </span>
            </button>

            {/* Wishlist Shortcut */}
            <button
              onClick={() => {
                setActiveScreen('wishlist');
                setViewMode('interactive');
              }}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-600 transition-colors cursor-pointer"
              title="My Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlistIds.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Notification Center Trigger */}
            <button
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer"
              title="Push Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Quick Help & Support */}
            <button
              onClick={() => {
                setActiveScreen('help_support');
                setViewMode('interactive');
              }}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Help & Support"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        )}

        {ecosystemView === 'farmer' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5">
              👨‍🌾 {farmerProfile.name} ({farmerProfile.district})
            </span>
            <button
              onClick={() => setIsFarmerRegistrationOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-2.5 py-1 rounded-xl text-xs flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
              title="Register and onboard new farmer partner"
            >
              + Add Farmer
            </button>
          </div>
        )}

        {ecosystemView === 'franchise' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-xl font-bold">
              🏬 Velachery Dark Store
            </span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
              Cold Room: 4.2°C
            </span>
          </div>
        )}

        {ecosystemView === 'delivery' && (
          <div className="flex items-center gap-2 text-xs">
            <span
              className={`px-2.5 py-1 rounded-xl font-bold flex items-center gap-1.5 ${
                deliveryProfile.isOnline
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  deliveryProfile.isOnline ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                }`}
              />
              🛵 {deliveryProfile.name} ({deliveryProfile.id})
            </span>
            <span className="text-slate-500 hidden sm:inline">
              Ather 450X · {deliveryProfile.batteryPercent}% Batt · Box: {deliveryProfile.coldBagTempCelsius}°C
            </span>
          </div>
        )}

        {ecosystemView === 'admin' && (
          <div className="flex items-center gap-2 text-xs">
            <span className="bg-slate-900 text-emerald-400 border border-slate-700 px-3 py-1 rounded-xl font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> GMV: ₹{adminTelemetry.grossMerchandiseValue.toLocaleString()}
            </span>
          </div>
        )}
      </header>

      {/* Main Workspace Body */}
      <main className="flex-1 overflow-x-hidden">
        {/* ========================================================= */}
        {/* PILLAR 1: CUSTOMER APP                                   */}
        {/* ========================================================= */}
        {ecosystemView === 'customer' && (
          <div className="p-4 md:p-6">
            {/* Customer 4:3 Board */}
            {viewMode === 'board' && (
              <DesignBoard43
                products={products}
                cartItems={cartItems}
                wishlistIds={wishlistIds}
                order={order}
                plans={subscriptionPlans}
                notificationSettings={notificationSettings}
                onSelectScreenForInteractive={(screen) => {
                  setActiveScreen(screen);
                  setViewMode('interactive');
                }}
                onOpenHelpSupport={() => {
                  setActiveScreen('help_support');
                  setViewMode('interactive');
                }}
                onOpenSettings={() => setIsNotificationSettingsOpen(true)}
                onOpenRewards={() => setIsRewardsModalOpen(true)}
                rewards={rewards}
                walletBalance={walletBalance}
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateCartQuantity={handleUpdateCartQuantity}
                onClearCart={handleClearCart}
                onAddReview={handleAddReview}
                onToggleSubscription={handleToggleSubscription}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {/* Customer Interactive Mobile Prototype */}
            {viewMode === 'interactive' && (
              <div className="flex flex-col items-center">
                {/* Quick Screen Switcher Bar */}
                <div className="w-full max-w-4xl bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs mb-6 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5 min-w-max">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                      Jump to Screen:
                    </span>
                    {[
                      { id: 'splash' as ScreenType, label: '1. Splash' },
                      { id: 'auth' as ScreenType, label: '2. Login/Signup' },
                      { id: 'home' as ScreenType, label: '3. Home' },
                      { id: 'listing' as ScreenType, label: '4. Products' },
                      { id: 'product_detail' as ScreenType, label: '5. Details & 5★ Reviews' },
                      { id: 'wishlist' as ScreenType, label: `❤️ Wishlist (${wishlistIds.length})` },
                      { id: 'cart' as ScreenType, label: '6. Cart' },
                      { id: 'checkout' as ScreenType, label: '7. Checkout' },
                      { id: 'tracking' as ScreenType, label: '8. Track Order' },
                      { id: 'subscriptions' as ScreenType, label: '9. Subscriptions' },
                      { id: 'profile' as ScreenType, label: '10. Profile' },
                      { id: 'help_support' as ScreenType, label: '🎧 Help & Support' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setActiveScreen(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          activeScreen === s.id
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <MobileDeviceFrame deviceLabel="Doors Fresh Customer App Prototype">
                  {renderActiveScreenContent()}
                </MobileDeviceFrame>
              </div>
            )}

            {/* Customer Inspector */}
            {viewMode === 'inspector' && (
              <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 py-2">
                <MobileDeviceFrame deviceLabel="Active Screen Preview">
                  {renderActiveScreenContent()}
                </MobileDeviceFrame>
                <ScreenInspector
                  currentScreen={activeScreen}
                  onSelectScreen={(screen) => setActiveScreen(screen)}
                  onOpenNotifications={() => setIsNotificationCenterOpen(true)}
                  onOpenHelpSupport={() => setActiveScreen('help_support')}
                  onOpenSettings={() => setIsNotificationSettingsOpen(true)}
                  onOpenRewards={() => setIsRewardsModalOpen(true)}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR: B2B WHOLESALE & HORECA SUPPLY                     */}
        {/* ========================================================= */}
        {ecosystemView === 'b2b' && (
          <div className="h-[calc(100vh-65px)]">
            {viewMode === 'board' ? (
              <B2BDesignBoard
                client={currentB2BClient}
                allClients={b2bClients}
                items={b2bItems}
                standingOrders={b2bStandingOrders}
                invoices={b2bInvoices}
                onSelectScreenForInteractive={(screen) => {
                  setB2bScreen(screen);
                  setViewMode('interactive');
                }}
                onSelectClient={(c) => {
                  setCurrentB2BClient(c);
                  setB2bScreen('b2b_catalog');
                }}
                onRegisterClient={handleRegisterB2BClient}
                onToggleStandingOrder={(id) => {
                  setB2bStandingOrders((prev) =>
                    prev.map((o) =>
                      o.id === id ? { ...o, status: o.status === 'active' ? 'paused' : 'active' } : o
                    )
                  );
                }}
                onPayInvoice={(id) => {
                  setB2bInvoices((prev) =>
                    prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' } : inv))
                  );
                }}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-start py-4 px-2 overflow-y-auto bg-slate-900">
                {/* B2B Screen Selector Tabs for Interactive Test */}
                <div className="mb-4 bg-slate-950/90 border border-slate-800 rounded-2xl p-1.5 shadow-lg max-w-full overflow-x-auto">
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'b2b_auth' as const, label: '01: Corporate Auth / Sign Up' },
                      { id: 'b2b_connect' as const, label: '02: Connect & KYC' },
                      { id: 'b2b_catalog' as const, label: '03: Crate Wholesale' },
                      { id: 'b2b_standing_orders' as const, label: '04: Daily Standing Orders' },
                      { id: 'b2b_invoices' as const, label: '05: GST Invoices' },
                      { id: 'b2b_logistics' as const, label: '06: Reefer Dock GPS' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setB2bScreen(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          b2bScreen === s.id
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <B2BMobileFrame
                  client={currentB2BClient}
                  allClients={b2bClients}
                  items={b2bItems}
                  standingOrders={b2bStandingOrders}
                  invoices={b2bInvoices}
                  activeScreen={b2bScreen}
                  onScreenChange={setB2bScreen}
                  onSelectClient={(c) => setCurrentB2BClient(c)}
                  onRegisterClient={handleRegisterB2BClient}
                  onToggleStandingOrder={(id) => {
                    setB2bStandingOrders((prev) =>
                      prev.map((o) =>
                        o.id === id ? { ...o, status: o.status === 'active' ? 'paused' : 'active' } : o
                      )
                    );
                  }}
                  onPayInvoice={(id) => {
                    setB2bInvoices((prev) =>
                      prev.map((inv) => (inv.id === id ? { ...inv, status: 'paid' } : inv))
                    );
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR 2: FARMER APP                                     */}
        {/* ========================================================= */}
        {ecosystemView === 'farmer' && (
          <div className="h-[calc(100vh-65px)]">
            {viewMode === 'board' ? (
              <FarmerDesignBoard
                farmer={farmerProfile}
                allFarmers={farmersList}
                batches={farmerBatches}
                mandiRates={mandiRates}
                advisories={cropAdvisories}
                payouts={farmerPayouts}
                onSelectFarmer={(f) => {
                  setFarmerProfile(f);
                  setFarmerScreen('farmer_home');
                }}
                onOpenRegisterFarmer={() => setIsFarmerRegistrationOpen(true)}
                onRegisterNewFarmer={handleAddNewFarmer}
                onSelectScreenForInteractive={(screen) => {
                  setFarmerScreen(screen);
                  setViewMode('interactive');
                }}
                onAddBatch={handleAddFarmerBatch}
              />
            ) : (
              <div className="p-6 flex flex-col items-center">
                {/* Farmer Screen Selector Bar */}
                <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs mb-6 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Farmer View:
                    </span>
                    {[
                      { id: 'farmer_auth' as FarmerScreenType, label: '0. Auth (Login/Signup)' },
                      { id: 'farmer_home' as FarmerScreenType, label: '1. Kisan Home' },
                      { id: 'farmer_batches' as FarmerScreenType, label: '2. Harvest Batches & Sell' },
                      { id: 'farmer_rates' as FarmerScreenType, label: '3. Mandi vs Farmgate Radar' },
                      { id: 'farmer_advisory' as FarmerScreenType, label: '4. Crop Health AI' },
                      { id: 'farmer_earnings' as FarmerScreenType, label: '5. Instant Settlements' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setFarmerScreen(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          farmerScreen === s.id
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <FarmerMobileFrame
                  farmer={farmerProfile}
                  allFarmers={farmersList}
                  batches={farmerBatches}
                  mandiRates={mandiRates}
                  advisories={cropAdvisories}
                  payouts={farmerPayouts}
                  activeScreen={farmerScreen}
                  onSelectFarmer={(f) => setFarmerProfile(f)}
                  onOpenRegisterFarmer={() => setIsFarmerRegistrationOpen(true)}
                  onRegisterNewFarmer={handleAddNewFarmer}
                  onScreenChange={setFarmerScreen}
                  onAddBatch={handleAddFarmerBatch}
                  onTriggerInstantPayout={handleReleaseFarmerPayout}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR 3: FRANCHISE HUB APP                              */}
        {/* ========================================================= */}
        {ecosystemView === 'franchise' && (
          <div className="h-[calc(100vh-65px)]">
            {viewMode === 'board' ? (
              <FranchiseDesignBoard
                hub={franchiseHub}
                allHubs={franchiseHubs}
                inwardBatches={franchiseInwards}
                orders={franchiseOrders}
                wastageRecords={franchiseWastages}
                financials={franchiseFinancials}
                onSelectHub={(h) => {
                  setFranchiseHub(h);
                  setFranchiseScreen('franchise_home');
                }}
                onRegisterNewHub={handleAddNewFranchiseHub}
                onSelectScreenForInteractive={(screen) => {
                  setFranchiseScreen(screen);
                  setViewMode('interactive');
                }}
                onApproveInward={handleApproveInward}
                onDispatchOrder={handleDispatchOrder}
              />
            ) : (
              <div className="p-6 flex flex-col items-center">
                {/* Franchise Screen Selector Bar */}
                <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-2xl p-2.5 shadow-2xs mb-6 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Franchise View:
                    </span>
                    {[
                      { id: 'franchise_auth' as FranchiseScreenType, label: '0. Auth (Login/Apply)' },
                      { id: 'franchise_home' as FranchiseScreenType, label: '1. Dark Store Command' },
                      { id: 'franchise_inventory' as FranchiseScreenType, label: '2. Cold Stock-In & QC' },
                      { id: 'franchise_dispatch' as FranchiseScreenType, label: '3. Local Dispatch Fleet' },
                      { id: 'franchise_spoilage' as FranchiseScreenType, label: '4. Zero-Waste Audit' },
                      { id: 'franchise_margins' as FranchiseScreenType, label: '5. Daily Margins' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setFranchiseScreen(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          franchiseScreen === s.id
                            ? 'bg-teal-700 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <FranchiseDeviceFrame
                  hub={franchiseHub}
                  allHubs={franchiseHubs}
                  inwardBatches={franchiseInwards}
                  orders={franchiseOrders}
                  wastageRecords={franchiseWastages}
                  financials={franchiseFinancials}
                  activeScreen={franchiseScreen}
                  onSelectHub={(h) => setFranchiseHub(h)}
                  onRegisterNewHub={handleAddNewFranchiseHub}
                  onScreenChange={setFranchiseScreen}
                  onApproveInward={handleApproveInward}
                  onDispatchOrder={handleDispatchOrder}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR 4: DELIVERY PARTNER APP (6 SCREENS)                */}
        {/* ========================================================= */}
        {ecosystemView === 'delivery' && (
          <div className="h-[calc(100vh-65px)]">
            {viewMode === 'board' ? (
              <DeliveryDesignBoard
                rider={deliveryProfile}
                allRiders={deliveryRidersList}
                tasks={deliveryTasks}
                earnings={riderEarnings}
                selectedTask={selectedDeliveryTask}
                onSelectRider={(r) => {
                  setDeliveryProfile(r);
                  setDeliveryScreen('delivery_home');
                }}
                onRegisterNewRider={handleAddNewRider}
                onSelectScreenForInteractive={(screen) => {
                  setDeliveryScreen(screen);
                  setViewMode('interactive');
                }}
                onToggleOnline={handleToggleRiderOnline}
                onUpdateTaskStatus={handleUpdateDeliveryTaskStatus}
                onCompleteDelivery={handleCompleteDelivery}
                onInstantCashout={handleInstantRiderCashout}
                onSelectTask={setSelectedDeliveryTask}
                onSwitchToCustomerApp={() => {
                  setEcosystemView('customer');
                  setActiveScreen('tracking');
                }}
              />
            ) : (
              <div className="h-full flex flex-col items-center justify-start py-4 px-2 overflow-y-auto bg-slate-900">
                {/* Screen Selector Tabs for Interactive Test */}
                <div className="mb-4 bg-slate-950/90 border border-slate-800 rounded-2xl p-1.5 shadow-lg max-w-full overflow-x-auto">
                  <div className="flex items-center gap-1">
                    {[
                      { id: 'delivery_auth' as const, label: '00: Rider Auth & KYC' },
                      { id: 'delivery_home' as const, label: '01: Duty & Telemetry' },
                      { id: 'delivery_orders' as const, label: '02: Route Tasks' },
                      { id: 'delivery_navigation' as const, label: '03: GPS HUD & OTP' },
                      { id: 'delivery_earnings' as const, label: '04: Earnings & UPI' },
                      { id: 'delivery_profile' as const, label: '05: Fleet & KYC' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setDeliveryScreen(s.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                          deliveryScreen === s.id
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <DeliveryMobileFrame
                  rider={deliveryProfile}
                  allRiders={deliveryRidersList}
                  tasks={deliveryTasks}
                  earnings={riderEarnings}
                  selectedTask={selectedDeliveryTask}
                  activeScreen={deliveryScreen}
                  onSelectRider={(r) => setDeliveryProfile(r)}
                  onRegisterNewRider={handleAddNewRider}
                  onScreenChange={setDeliveryScreen}
                  onToggleOnline={handleToggleRiderOnline}
                  onUpdateTaskStatus={handleUpdateDeliveryTaskStatus}
                  onCompleteDelivery={handleCompleteDelivery}
                  onInstantCashout={handleInstantRiderCashout}
                  onSelectTask={setSelectedDeliveryTask}
                  onAcceptTask={handleAcceptDeliveryTask}
                  onRejectTask={handleRejectDeliveryTask}
                  onInitiateReturn={handleInitiateReturnDeliveryTask}
                  onSwitchToCustomerApp={() => {
                    setEcosystemView('customer');
                    setActiveScreen('tracking');
                  }}
                />
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* PILLAR 5: CENTRALISED ADMIN PANEL                         */}
        {/* ========================================================= */}
        {ecosystemView === 'admin' && (
          <div className="h-[calc(100vh-65px)]">
            <AdminDashboard
              telemetry={adminTelemetry}
              systemLogs={systemLogs}
              farmers={[farmerProfile]}
              farmerBatches={farmerBatches}
              franchiseHubs={franchiseHubs}
              franchiseInwards={franchiseInwards}
              orders={franchiseOrders}
              products={products}
              mandiRates={mandiRates}
              deliveryProfile={deliveryProfile}
              deliveryTasks={deliveryTasks}
              onApproveFarmerBatch={handleApproveFarmerBatch}
              onUpdateProductPrice={handleUpdateProductPrice}
              onUpdateProcurementRate={handleUpdateProcurementRate}
              onReleaseFarmerPayout={handleReleaseFarmerPayout}
              onSwitchAppView={(view) => {
                setEcosystemView(view);
                setViewMode('interactive');
              }}
            />
          </div>
        )}
      </main>

      {/* Live Push Notification Toast Banner Simulator */}
      {activePushToast && (
        <div
          onClick={() => handleSelectNotification(activePushToast)}
          className="fixed top-16 right-4 z-50 max-w-sm bg-slate-900/95 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 backdrop-blur-md cursor-pointer animate-in slide-in-from-top-4 duration-300"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Bell className="w-4 h-4 animate-bounce" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-emerald-400">
                  Wishore Push Alert
                </span>
                <span className="text-[10px] text-slate-400">now</span>
              </div>
              <h5 className="text-xs font-bold text-white mt-0.5">{activePushToast.title}</h5>
              <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2">
                {activePushToast.message}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActivePushToast(null);
              }}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Rewards Points Awarded Toast Banner */}
      {rewardsToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-700 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-300/40 flex items-center gap-3 animate-in slide-in-from-top duration-300 backdrop-blur-md">
          <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-amber-200 text-sm shrink-0">
            👑
          </div>
          <div className="min-w-0">
            <div className="text-xs font-black tracking-tight">{rewardsToast.title}</div>
            <div className="text-[11px] text-amber-100 line-clamp-1">{rewardsToast.message}</div>
          </div>
          <button
            onClick={() => setRewardsToast(null)}
            className="text-white/80 hover:text-white ml-2 cursor-pointer shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Push Notification Center Modal */}
      <NotificationCenterModal
        notifications={notifications}
        isOpen={isNotificationCenterOpen}
        onClose={() => setIsNotificationCenterOpen(false)}
        onMarkAllAsRead={() =>
          setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })))
        }
        onSelectNotification={handleSelectNotification}
        onTriggerDemoNotification={handleTriggerDemoPush}
        onOpenSettings={() => {
          setIsNotificationSettingsOpen(true);
        }}
      />

      {/* Push Notification Preferences Settings Modal */}
      <NotificationSettingsModal
        settings={notificationSettings}
        isOpen={isNotificationSettingsOpen}
        onClose={() => setIsNotificationSettingsOpen(false)}
        onUpdateSettings={(newSettings) => setNotificationSettings(newSettings)}
      />

      {/* Wishore Rewards Loyalty Modal */}
      <WishoreRewardsModal
        rewards={rewards}
        isOpen={isRewardsModalOpen}
        onClose={() => setIsRewardsModalOpen(false)}
        onRedeemPoints={handleRedeemPoints}
        onOpenReferral={() => {
          setIsRewardsModalOpen(false);
          setActiveScreen('referral');
        }}
      />

      {/* Global Footer */}
      <footer className="bg-white border-t border-slate-200 px-6 py-4 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <DoorsFreshLogo variant="image" size="xs" />
          <span className="font-semibold text-slate-700">Doors Fresh Agri-Tech</span>
          <span>· Fresh Farm to Your Home</span>
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <span>Support Farmers</span>
          <span>·</span>
          <span>100% Pesticide-Free</span>
          <span>·</span>
          <span>Chengalpattu Agro Hub</span>
        </div>
      </footer>
    </div>
  );
}
