import React, { useState, useEffect } from "react";
import { ShoppingBag, Sparkles, Plus, Minus, Trash2, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Eye, Package, ShieldCheck, X } from "lucide-react";
import { prasadCategories, prasadItems } from "../data/templePortalData";
import { useLanguage } from "../context/LanguageContext";

export default function PrasadPage({ onNavigate }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("store"); // 'store' | 'cart' | 'orders'
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_prasad_cart");
      return saved ? JSON.parse(saved) : [{ ...prasadItems[0], quantity: 1 }];
    } catch {
      return [{ ...prasadItems[0], quantity: 1 }];
    }
  });
  const [detailsProduct, setDetailsProduct] = useState(null);
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("mts_prasad_orders");
      return saved ? JSON.parse(saved) : [
        {
          id: "MTS-2026-ORD-3129",
          date: "29 Oct 2026",
          items: [{ name: "Authentic Matabari Peda (500g)", quantity: 2, price: 320 }],
          total: 640,
          fulfillment: "Counter Pickup (Temple Gate No. 1)",
          status: "Ready for Pickup (Prototype)",
          devoteeName: "Praneeth Ganithala",
          mobile: "+91 98765 43210"
        }
      ];
    } catch {
      return [];
    }
  });

  const [checkoutData, setCheckoutData] = useState({
    devoteeName: "",
    mobile: "",
    deliveryMode: "Counter Pickup", // 'Counter Pickup' | 'Postal Courier (Tripura Only)'
    address: ""
  });
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem("mts_prasad_cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("mts_prasad_orders", JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const filteredItems = selectedCategory === "All"
    ? prasadItems
    : prasadItems.filter(i => i.category === selectedCategory);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCompleteOrder = () => {
    if (!checkoutData.devoteeName.trim() || !checkoutData.mobile.trim()) {
      alert("Please provide devotee name and mobile number.");
      return;
    }
    const orderId = `MTS-2026-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items: cart.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      total: subtotal,
      fulfillment: checkoutData.deliveryMode,
      status: "Order Confirmed (Prototype)",
      devoteeName: checkoutData.devoteeName,
      mobile: `+91 ${checkoutData.mobile}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setConfirmedOrder(newOrder);
    setCart([]);
    setActiveTab("confirmation");
  };

  return (
    <div className="space-y-4 sm:space-y-5 animate-in fade-in duration-300">
      {/* Devotional Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#877E8A] px-1 select-none">
        <button
          type="button"
          onClick={() => onNavigate?.("home")}
          className="hover:text-[#6F1837] font-medium transition-colors cursor-pointer flex items-center gap-1 group"
        >
          <span className="group-hover:underline">{t("nav.home", "Home")}</span>
        </button>
        <span className="text-[#C79A3B]">•</span>
        <span className="text-[#6F1837] font-semibold">{t("nav.prasad", "Prasad & Store")}</span>
      </nav>

      {/* Header Banner */}
      <header className="bg-white rounded-2xl sm:rounded-3xl px-4 py-4 sm:px-6 sm:py-5 border border-[#C79A3B]/30 shadow-[0_2px_12px_rgba(74,16,39,0.04)] select-none">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFF8ED] border border-[#C79A3B]/30 text-[9.5px] font-bold uppercase tracking-wider text-[#C79A3B]">
              <Package className="w-3 h-3 text-[#C79A3B]" />
              <span>SACRED NAIVEDYA & TEMPLE KEEPSAKES</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#6F1837] tracking-tight">
              {t("prasad.title", "Prasad & Temple Store")}
            </h1>
            <p className="text-xs sm:text-[13px] text-[#5D5460] leading-relaxed">
              {t("prasad.subtitle", "Take home a sacred memory of your pilgrimage to Matabari with authentic GI-tagged Matabari Peda and consecrated temple naivedya.")}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <div className="inline-flex p-1 rounded-xl bg-[#FFF8ED] border border-[#C79A3B]/30 shadow-2xs">
              <button
                type="button"
                onClick={() => setActiveTab("store")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "store" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>Store Items</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("cart")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer relative ${
                  activeTab === "cart" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>Cart ({totalCartCount})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "orders" ? "bg-[#6F1837] text-white shadow-xs" : "text-[#665D6A] hover:text-[#6F1837]"
                }`}
              >
                <Package className="w-3.5 h-3.5 text-[#DFC17B]" />
                <span>My Orders ({orders.length})</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURED: GI-TAGGED MATABARI PEDA SPOTLIGHT */}
      {activeTab === "store" && (
        <div className="bg-gradient-to-r from-[#FFF8ED] via-[#F9EFE0] to-[#FFF8ED] rounded-2xl p-4 sm:p-5 border border-[#C79A3B]/40 shadow-xs flex flex-col md:flex-row items-center gap-4 select-none">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-[#C79A3B]/40 shadow-sm">
            <img src="/assets/matabari-peda.jpg" alt="GI-Tagged Matabari Peda" className="w-full h-full object-cover" />
          </div>
          <div className="space-y-1 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#6F1837] text-[#DFC17B] border border-[#C79A3B]/50">
              <ShieldCheck className="w-3 h-3 text-[#DFC17B]" />
              <span>GEOGRAPHICAL INDICATION (GI) CERTIFIED</span>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#6F1837]">
              The Sacred Heritage of Matabari Peda
            </h3>
            <p className="text-xs text-[#5D5460] leading-snug">
              Prepared for over 500 years with unadulterated cow milk khoya and unrefined sugar, Matabari Peda holds official Geographical Indication (GI) status. It is the premier sacred sweet offering of Tripura.
            </p>
          </div>
          <button
            type="button"
            onClick={() => addToCart(prasadItems[0])}
            className="px-4 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold shrink-0 shadow-2xs cursor-pointer"
          >
            + Quick Add 500g (₹320)
          </button>
        </div>
      )}

      {/* TAB 1: PRODUCT STORE CATALOGUE */}
      {activeTab === "store" && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
            {prasadCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#6F1837] text-white shadow-xs"
                    : "bg-white text-[#665D6A] border border-[#C79A3B]/30 hover:border-[#6F1837] hover:text-[#6F1837]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#C79A3B]/30 shadow-2xs hover:shadow-md hover:border-[#C79A3B]/60 transition-all flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  {item.isGITagged && (
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-[#6F1837] text-white border border-[#C79A3B]/40 shadow-xs">
                      GI Tagged
                    </span>
                  )}
                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full text-[9.5px] font-bold bg-white/95 text-[#6F1837] border border-[#C79A3B]/30">
                    ★ {item.rating}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-[#2D2430] group-hover:text-[#6F1837] transition-colors leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-[#5D5460] mt-1 leading-snug line-clamp-2">
                      {item.shortDesc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[10px] text-[#877E8A] block">Consecrated Price</span>
                      <span className="font-sans font-bold tabular-nums text-base text-[#6F1837]">₹{item.price}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => setDetailsProduct(item)}
                        className="p-2 rounded-xl border border-[#C79A3B]/35 hover:bg-[#FFF8ED] text-[#6F1837] cursor-pointer"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => addToCart(item)}
                        className="px-3.5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold shadow-2xs cursor-pointer flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CART & CHECKOUT */}
      {activeTab === "cart" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 max-w-4xl mx-auto">
          {/* Cart Items List */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-[#C79A3B]/30 shadow-2xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#6F1837] pb-2 border-b border-[#F0E3D0]">
              Devotional Cart ({totalCartCount} items)
            </h3>

            {cart.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#877E8A]">
                Your sacred cart is empty. Explore our store to add Matabari Peda and prasad kits.
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#FFF9EE]/70 border border-[#C79A3B]/25">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-bold text-xs text-[#2D2430] truncate">{item.name}</h4>
                      <span className="font-sans font-bold tabular-nums text-xs text-[#6F1837]">₹{item.price} each</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded-md bg-white border border-[#C79A3B]/30 flex items-center justify-center text-xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded-md bg-white border border-[#C79A3B]/30 flex items-center justify-center text-xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-sans font-bold tabular-nums text-xs text-[#2D2430] w-14 text-right">
                      ₹{item.price * item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Panel */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-[#C79A3B]/30 shadow-2xs space-y-4 h-fit">
            <h3 className="font-serif text-lg font-bold text-[#6F1837] pb-2 border-b border-[#F0E3D0]">
              Pickup & Details
            </h3>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1">Devotee Name *</label>
                <input
                  type="text"
                  placeholder="Primary recipient"
                  value={checkoutData.devoteeName}
                  onChange={(e) => setCheckoutData({ ...checkoutData, devoteeName: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-[#C79A3B]/40 text-xs bg-[#FFF8ED]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1">Mobile Number *</label>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="10-digit mobile"
                  value={checkoutData.mobile}
                  onChange={(e) => setCheckoutData({ ...checkoutData, mobile: e.target.value.replace(/\D/g, "") })}
                  className="w-full h-9 px-3 rounded-xl border border-[#C79A3B]/40 text-xs bg-[#FFF8ED]/30"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2D2430] mb-1">Fulfillment Mode</label>
                <select
                  value={checkoutData.deliveryMode}
                  onChange={(e) => setCheckoutData({ ...checkoutData, deliveryMode: e.target.value })}
                  className="w-full h-9 px-3 rounded-xl border border-[#C79A3B]/40 text-xs bg-[#FFF8ED]/30"
                >
                  <option value="Counter Pickup">Temple Counter Pickup (Udaipur)</option>
                  <option value="Postal Courier">Postal Dispatch (Tripura Devotees Only)</option>
                </select>
              </div>

              <div className="pt-2 border-t border-[#F0E3D0] text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Items Subtotal:</span>
                  <span className="font-bold text-[#2D2430]">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#877E8A]">Fulfillment Fee:</span>
                  <span className="font-bold text-emerald-700">₹0 (Free Pickup)</span>
                </div>
                <div className="flex justify-between font-bold text-sm pt-1 border-t border-[#F0E3D0]">
                  <span className="text-[#2D2430]">Total:</span>
                  <span className="font-sans font-bold tabular-nums text-[#6F1837]">₹{subtotal}</span>
                </div>
              </div>

              <button
                type="button"
                disabled={cart.length === 0}
                onClick={handleCompleteOrder}
                className="w-full py-2.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold shadow-2xs cursor-pointer disabled:opacity-50"
              >
                Place Prototype Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION SCREEN */}
      {activeTab === "confirmation" && confirmedOrder && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-[#C79A3B]/40 shadow-sm max-w-lg mx-auto text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              PRASAD ORDER PLACED (PROTOTYPE)
            </span>
            <h3 className="font-serif text-xl font-bold text-[#6F1837] mt-1.5">
              Order Confirmed: {confirmedOrder.id}
            </h3>
            <p className="text-xs text-[#5D5460]">
              Present this reference at the official temple prasad counter or upon postal arrival.
            </p>
          </div>

          <div className="bg-[#FFF9EE] p-4 rounded-xl border border-[#C79A3B]/30 text-xs text-left space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#877E8A]">Recipient:</span>
              <span className="font-semibold">{confirmedOrder.devoteeName} ({confirmedOrder.mobile})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#877E8A]">Fulfillment:</span>
              <span className="font-semibold text-[#6F1837]">{confirmedOrder.fulfillment}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-[#F0E3D0] font-bold">
              <span>Amount Paid:</span>
              <span className="font-sans font-bold tabular-nums text-[#6F1837]">₹{confirmedOrder.total}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab("orders")}
              className="px-5 py-2.5 rounded-xl bg-[#6F1837] text-white text-xs font-semibold hover:bg-[#882245]"
            >
              View in My Orders
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("store")}
              className="px-5 py-2.5 rounded-xl border border-[#C79A3B]/40 hover:bg-[#FFF8ED] text-xs font-semibold text-[#6F1837]"
            >
              Back to Store
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: MY ORDERS */}
      {activeTab === "orders" && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-[#C79A3B]/30 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0E3D0]">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#6F1837]">
                My Prasad Orders ({orders.length})
              </h3>
              <p className="text-xs text-[#877E8A]">
                Track orders for Matabari Peda and blessed temple keepsakes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab("store")}
              className="px-3.5 py-1.5 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-semibold"
            >
              + Order More Prasad
            </button>
          </div>

          <div className="space-y-3">
            {orders.map(o => (
              <div key={o.id} className="bg-[#FFF9EE]/70 rounded-xl p-4 border border-[#C79A3B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6F1837] bg-white px-2 py-0.5 rounded border border-[#C79A3B]/25">
                      {o.id}
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {o.status}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-[#2D2430]">
                    {o.items.map(i => `${i.name} (x${i.quantity})`).join(", ")}
                  </p>
                  <p className="text-[11px] text-[#5D5460]">
                    Recipient: {o.devoteeName} • {o.fulfillment}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-sans font-bold tabular-nums text-base text-[#6F1837] block">₹{o.total}</span>
                  <span className="text-[10px] text-[#877E8A]">Ordered on: {o.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT DETAILS MODAL */}
      {detailsProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 border border-[#C79A3B]/40 shadow-xl space-y-4">
            <div className="flex items-start justify-between border-b border-[#F0E3D0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C79A3B]">
                  {detailsProduct.category}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#6F1837] leading-snug">
                  {detailsProduct.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDetailsProduct(null)}
                className="p-1 rounded-lg text-[#877E8A] hover:text-[#2D2430] hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-48 rounded-xl overflow-hidden bg-slate-100">
              <img src={detailsProduct.image} alt={detailsProduct.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-3 text-xs text-[#5D5460]">
              <p className="leading-relaxed">{detailsProduct.significance}</p>
              <div className="bg-[#FFF8ED] p-3 rounded-xl border border-[#C79A3B]/25 space-y-1">
                <div><strong>Ingredients:</strong> {detailsProduct.ingredients}</div>
                <div><strong>Shelf Life:</strong> {detailsProduct.shelfLife}</div>
                <div><strong>Packaging:</strong> {detailsProduct.packaging}</div>
                <div><strong>Fulfillment:</strong> {detailsProduct.fulfillmentNotice}</div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-[#F0E3D0]">
              <span className="font-sans font-bold tabular-nums text-lg text-[#6F1837]">₹{detailsProduct.price}</span>
              <button
                type="button"
                onClick={() => {
                  addToCart(detailsProduct);
                  setDetailsProduct(null);
                }}
                className="px-5 py-2 rounded-xl bg-[#6F1837] hover:bg-[#882245] text-white text-xs font-bold"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

