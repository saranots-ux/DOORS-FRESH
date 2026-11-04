import React, { useState } from 'react';
import {
  Star,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Leaf,
  Clock,
  MapPin,
  MessageSquare,
  ThumbsUp,
  X,
  Sparkles,
  ChevronRight,
  Award,
} from 'lucide-react';
import { MobileHeader } from '../MobileHeader';
import { TomatoGraphic } from '../../common/ProduceGraphics';
import { Product, ProductReview, ScreenType } from '../../../types';
import { FarmerProfileModal, getFarmerForProduct } from '../FarmerProfileModal';

interface ProductDetailsScreenProps {
  product: Product;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBack: () => void;
  onNavigateScreen: (screen: ScreenType) => void;
  onAddReview: (productId: string, review: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
}

export const ProductDetailsScreen: React.FC<ProductDetailsScreenProps> = ({
  product,
  isWishlisted: isWishlistedProp,
  onToggleWishlist,
  onAddToCart,
  onBack,
  onNavigateScreen,
  onAddReview,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [localWishlisted, setLocalWishlisted] = useState(false);
  const isWishlisted = isWishlistedProp !== undefined ? isWishlistedProp : localWishlisted;

  const handleToggleWishlist = () => {
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    } else {
      setLocalWishlisted(!localWishlisted);
    }
  };

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showFarmerModal, setShowFarmerModal] = useState(false);
  const farmer = getFarmerForProduct(product);

  // New review form states
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('Priya Sharma (You)');
  const [reviewComment, setReviewComment] = useState('');
  const [selectedReviewTags, setSelectedReviewTags] = useState<string[]>(['Crisp & Fresh']);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const availableTags = ['Crisp & Fresh', 'Natural Aroma', 'Safe Produce', 'Sweet Taste', 'Eco Packaging'];

  const toggleTag = (tag: string) => {
    if (selectedReviewTags.includes(tag)) {
      setSelectedReviewTags(selectedReviewTags.filter((t) => t !== tag));
    } else {
      setSelectedReviewTags([...selectedReviewTags, tag]);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewComment.trim()) return;

    onAddReview(product.id, {
      author: reviewAuthor,
      rating: reviewRating,
      verifiedPurchase: true,
      comment: reviewComment,
      tags: selectedReviewTags,
    });

    setShowReviewModal(false);
    setReviewComment('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  // Calculate rating breakdown distribution
  const totalReviews = product.reviews.length || 1;
  const ratingCounts = [5, 4, 3, 2, 1].map((r) => {
    const count = product.reviews.filter((rev) => Math.round(rev.rating) === r).length;
    const percentage = Math.round((count / totalReviews) * 100);
    return { stars: r, count, percentage };
  });

  return (
    <div className="min-h-[640px] h-full flex flex-col justify-between bg-white text-slate-800 relative">
      <MobileHeader
        showBack={true}
        onBack={onBack}
        rightAction="product_actions"
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Hero Visual Area matching design board screen 5 */}
        <div className="relative bg-gradient-to-b from-rose-50/60 via-amber-50/30 to-white px-6 pt-4 pb-6 flex flex-col items-center">
          <div className="w-56 h-56 flex items-center justify-center transform hover:scale-105 transition-transform duration-300">
            <TomatoGraphic className="w-full h-full drop-shadow-xl" />
          </div>

          <div className="absolute bottom-2 right-4 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-emerald-800 border border-emerald-100 flex items-center gap-1 shadow-xs">
            <Clock className="w-3 h-3 text-emerald-600" />
            Harvested 4h ago
          </div>
        </div>

        {/* Product Info Block */}
        <div className="px-5 pt-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {product.name}
              </h2>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                Fresh & Organic
              </p>
            </div>

            {/* Price matching board: "₹25/kg" */}
            <div className="text-right">
              <div className="text-2xl font-black text-slate-900 font-mono tracking-tight">
                ₹{product.price}
                <span className="text-xs font-normal text-slate-500 font-sans">
                  /{product.unit}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 line-through font-mono">
                ₹{product.originalPrice || 35}/{product.unit}
              </div>
            </div>
          </div>

          {/* Ratings & Stock Availability matching board */}
          <div className="flex items-center justify-between mt-3 py-2 border-y border-slate-100">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center bg-amber-50 text-amber-800 px-2 py-0.5 rounded-md text-xs font-bold border border-amber-200">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
              Available: <span className="font-bold">{product.availableStockKg} kg</span>
            </div>
          </div>

          {/* Interactive 'Sourced by' Badge (Requested Feature) */}
          <div
            onClick={() => setShowFarmerModal(true)}
            className="my-3.5 p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50/70 border border-emerald-200/90 flex items-center justify-between cursor-pointer group hover:border-emerald-400 hover:shadow-xs transition-all active:scale-[0.99]"
            role="button"
            tabIndex={0}
            aria-label={`View farm details and certifications for ${farmer.name}`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className={`w-9 h-9 rounded-xl ${farmer.avatarBg} text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ring-2 ring-emerald-200/80`}
              >
                👨‍🌾
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                    Sourced by
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] bg-emerald-200/80 text-emerald-900 px-1.5 py-0.2 rounded font-semibold">
                    <ShieldCheck className="w-2.5 h-2.5 text-emerald-700" /> NPOP Organic
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-900 truncate mt-0.5">
                  {farmer.name} · {farmer.farmName}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 shrink-0 ml-2 group-hover:translate-x-0.5 transition-transform bg-white/80 border border-emerald-200/80 px-2 py-1 rounded-lg">
              <span>Farm Details</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stepper matching board: "- 1 +" */}
          <div className="flex items-center justify-between my-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <span className="text-xs font-bold text-slate-700">Select Quantity</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 active:scale-95 shadow-xs"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-base font-bold text-slate-900 w-8 text-center font-mono">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold hover:bg-emerald-700 active:scale-95 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 3 Quality Assurance Badges matching board */}
          <div className="grid grid-cols-3 gap-2 my-4">
            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-1">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-emerald-950">Farm Fresh</span>
            </div>

            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-teal-50/70 border border-teal-100">
              <div className="w-7 h-7 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center mb-1">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-teal-950">No Pesticides</span>
            </div>

            <div className="flex flex-col items-center text-center p-2 rounded-xl bg-lime-50/70 border border-lime-100">
              <div className="w-7 h-7 rounded-full bg-lime-100 text-lime-700 flex items-center justify-center mb-1">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-lime-950">Quality Assured</span>
            </div>
          </div>

          {/* Farm Origin Transparency (Interactive Tap) */}
          <div
            onClick={() => setShowFarmerModal(true)}
            className="bg-slate-50 hover:bg-emerald-50/50 rounded-xl p-3 border border-slate-200 hover:border-emerald-300 transition-colors cursor-pointer mb-5 group"
            role="button"
            tabIndex={0}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>Direct Farm Transparency</span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 group-hover:underline flex items-center gap-0.5">
                Certifications & Lab Tests <ChevronRight className="w-3 h-3" />
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {product.farmOrigin}. Packaged in sanitized breathable vegetable crates with zero cold-storage holding.
            </p>
          </div>

          {/* Reviews & Ratings Section (Requested Feature) */}
          <div className="border-t border-slate-100 pt-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Ratings & Customer Reviews</h3>
                <p className="text-[11px] text-slate-500 font-medium">Verified farm-to-table customers</p>
              </div>

              <button
                onClick={() => setShowReviewModal(true)}
                className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Write Review</span>
              </button>
            </div>

            {/* Rating Summary Breakdown */}
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center gap-4 mb-4">
              <div className="text-center px-2">
                <div className="text-3xl font-black text-slate-900 font-mono leading-none">
                  {product.rating}
                </div>
                <div className="flex items-center justify-center gap-0.5 my-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-500'
                          : i < product.rating
                          ? 'fill-amber-300'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">{product.reviewCount} Ratings</div>
              </div>

              {/* Progress Bars */}
              <div className="flex-1 space-y-1">
                {ratingCounts.map((rc) => (
                  <div key={rc.stars} className="flex items-center gap-2 text-[10px]">
                    <span className="w-3 text-slate-600 font-bold">{rc.stars}★</span>
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${rc.percentage || 15}%` }}
                      />
                    </div>
                    <span className="w-6 text-right text-slate-400 font-mono">{rc.percentage || 15}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Reviews List */}
            <div className="space-y-3">
              {product.reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-3 rounded-xl bg-white border border-slate-100 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center">
                        {rev.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400">{rev.date}</span>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < rev.rating ? 'fill-amber-500' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>

                  {/* Tags */}
                  {rev.tags && rev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rev.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full"
                        >
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Add to Cart Bar matching design board */}
      <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-slate-100 p-3 flex items-center gap-3 shadow-lg">
        <div className="text-left px-2">
          <div className="text-[10px] text-slate-400 font-semibold uppercase">Total Price</div>
          <div className="text-lg font-black text-slate-900 font-mono">
            ₹{product.price * quantity}
          </div>
        </div>

        <button
          onClick={() => {
            onAddToCart(product, quantity);
            onNavigateScreen('cart');
          }}
          className="flex-1 h-12 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-md shadow-emerald-900/15 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Add to Cart</span>
          <span className="text-xs opacity-80">({quantity} kg)</span>
        </button>
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-base font-bold text-slate-900">Rate & Review Produce</h4>
                <p className="text-[11px] text-slate-500">Tomato · Batch #W12344 Verified Purchase</p>
              </div>
              <button
                onClick={() => setShowReviewModal(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Star Selector */}
            <div className="flex flex-col items-center justify-center py-2 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-xs font-semibold text-slate-700 mb-2">Tap stars to rate</span>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    className="p-1 hover:scale-125 transition-transform"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= reviewRating
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-emerald-800 mt-1 font-mono">
                {reviewRating} out of 5 Stars
              </span>
            </div>

            {/* Quick Farm Fresh Tags */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                What did you like most?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                      selectedReviewTags.includes(tag)
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Review Experience
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                rows={3}
                placeholder="How was the flavor, texture, and aroma? Was delivery on time?"
                className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none text-slate-800 resize-none"
                required
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleReviewSubmit}
              disabled={!reviewComment.trim()}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
            >
              Post Verified Review
            </button>
          </div>
        </div>
      )}

      {/* Review Posted Toast */}
      {showSuccessToast && (
        <div className="absolute top-14 left-4 right-4 z-40 bg-emerald-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Thank you! Your verified farm review was published.</span>
          </div>
        </div>
      )}

      {/* Interactive Farmer Profile Modal (Requested Feature) */}
      <FarmerProfileModal
        product={product}
        isOpen={showFarmerModal}
        onClose={() => setShowFarmerModal(false)}
      />
    </div>
  );
};
