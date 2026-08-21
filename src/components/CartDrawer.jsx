import React, { useState } from 'react';
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  CheckCircle2,
  Tag,
  MapPin,
  Store,
  CreditCard
} from 'lucide-react';

export default function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart }) {
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in', 'pickup', 'delivery'
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Checkout Modal State
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    tableOrAddress: '',
    paymentMethod: 'counter'
  });
  const [orderConfirmed, setOrderConfirmed] = useState(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxAmount = (subtotal - discountAmount) * 0.08; // 8% tax
  const deliveryFee = orderType === 'delivery' ? 3.50 : 0;
  const grandTotal = subtotal - discountAmount + taxAmount + deliveryFee;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'AURA10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError('');
    } else if (code === 'COFFEE20') {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "AURA10" for 10% off!');
    }
  };

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      items: [...cartItems],
      orderType,
      grandTotal,
      customer: checkoutData,
      date: new Date().toLocaleString()
    };

    // Save order history to LocalStorage
    const existingOrders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
    localStorage.setItem('aura_orders', JSON.stringify([newOrder, ...existingOrders]));

    setOrderConfirmed(newOrder);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-900 text-stone-100 shadow-2xl flex flex-col border-l border-amber-500/20">

          {/* Header */}
          <div className="p-5 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-heading">Your Food Order</h2>
                <p className="text-xs text-stone-400">{cartItems.length} unique item(s)</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-800/80 flex items-center justify-center mx-auto text-amber-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold">Your cart is currently empty</h3>
                <p className="text-xs text-stone-400 max-w-xs mx-auto">
                  Explore our artisanal menu and add your favorite coffees & delicacies!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 text-white text-xs font-bold shadow-md hover:bg-amber-700 transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-stone-950 border border-stone-800 flex items-center gap-3.5"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-stone-100 truncate">{item.name}</h4>
                    <span className="text-xs font-semibold text-amber-400">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.notes && (
                      <p className="text-[11px] text-amber-200/80 italic mt-0.5 truncate">
                        "{item.notes}"
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-md bg-stone-800 text-stone-300 hover:bg-amber-600 hover:text-white text-xs font-bold flex items-center justify-center transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-md bg-stone-800 text-stone-300 hover:bg-amber-600 hover:text-white text-xs font-bold flex items-center justify-center transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Right side price & delete */}
                  <div className="flex flex-col items-end justify-between h-full space-y-3">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-extrabold text-stone-100 font-heading">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Order Form */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-stone-950 border-t border-stone-800 space-y-4">

              {/* Order Mode Toggle */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-stone-900 rounded-xl border border-stone-800">
                <button
                  onClick={() => setOrderType('dine-in')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${orderType === 'dine-in' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                >
                  Dine-In
                </button>
                <button
                  onClick={() => setOrderType('pickup')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${orderType === 'pickup' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                >
                  Takeaway
                </button>
                <button
                  onClick={() => setOrderType('delivery')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${orderType === 'delivery' ? 'bg-amber-600 text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                >
                  Delivery
                </button>
              </div>

              {/* Promo Code Box */}
              <div className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-500" />
                    <input
                      type="text"
                      placeholder="Promo Code (Try AURA10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-amber-500 uppercase"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="px-3.5 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-amber-400 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {promoApplied && (
                  <p className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Promo code applied ({discountPercent}% Off)
                  </p>
                )}
                {promoError && <p className="text-[11px] text-rose-400">{promoError}</p>}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-stone-200 font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="text-stone-200 font-semibold">${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Taxes (8%)</span>
                  <span className="text-stone-200 font-semibold">${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-amber-400 pt-2 border-t border-stone-800">
                  <span>Total Amount</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Trigger Button */}
              <button
                onClick={() => setCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-sm shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>

      {/* Checkout Modal Dialog */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-lg rounded-3xl p-6 bg-stone-900 text-stone-100 shadow-2xl border border-amber-500/20 space-y-5">

            {orderConfirmed ? (
              // Order Confirmation Screen
              <div className="text-center space-y-4 py-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Order Confirmed!</span>
                  <h3 className="text-2xl font-extrabold font-heading text-stone-100">
                    Thank You, {orderConfirmed.customer.name}!
                  </h3>
                  <p className="text-xs text-stone-300 mt-1">
                    Your order ID <span className="text-amber-400 font-mono font-bold">{orderConfirmed.orderId}</span> has been dispatched to our kitchen.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-stone-950 text-left text-xs space-y-2 border border-stone-800">
                  <div className="flex justify-between">
                    <span className="text-stone-400">Order Mode:</span>
                    <span className="font-bold text-amber-300 capitalize">{orderConfirmed.orderType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Table / Address:</span>
                    <span className="font-semibold text-stone-200">{orderConfirmed.customer.tableOrAddress || 'Dine-In Counter'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">Total Paid:</span>
                    <span className="font-extrabold text-amber-400">${orderConfirmed.grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderConfirmed(null);
                    setCheckoutModalOpen(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
                >
                  Close & Return to Cafe
                </button>
              </div>
            ) : (
              // Checkout Form
              <form onSubmit={handleCompleteOrder} className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                  <h3 className="text-lg font-bold font-heading">Confirm Your Order Details</h3>
                  <button
                    type="button"
                    onClick={() => setCheckoutModalOpen(false)}
                    className="text-stone-400 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Morgan"
                      value={checkoutData.name}
                      onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Mobile Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (555) 234-5678"
                      value={checkoutData.phone}
                      onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">
                      {orderType === 'dine-in' ? 'Table Number (or "Bar")' : orderType === 'pickup' ? 'Estimated Pickup Time' : 'Delivery Street Address'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={orderType === 'dine-in' ? 'Table 04' : orderType === 'pickup' ? 'In 20 minutes' : '123 Artisan Ave, Suite 4'}
                      value={checkoutData.tableOrAddress}
                      onChange={(e) => setCheckoutData({ ...checkoutData, tableOrAddress: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-300 font-semibold mb-1">Payment Method</label>
                    <select
                      value={checkoutData.paymentMethod}
                      onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="counter">Pay at Counter (Cash / Card)</option>
                      <option value="card">Credit / Debit Card (Online)</option>
                      <option value="upi">UPI / Apple Pay / Google Pay</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400">Total Payable:</span>
                  <span className="text-xl font-extrabold text-amber-400">${grandTotal.toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-bold text-xs shadow-xl shadow-amber-600/30"
                >
                  Place Order Now
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
