import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  History
} from 'lucide-react';

export default function ReservationSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '12:30 PM',
    guests: '2 Guests',
    zone: 'Indoor Main Hall',
    specialRequest: ''
  });

  const [errors, setErrors] = useState({});
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  // Set default minimum date to today
  const todayStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    // Load booking history from localStorage
    const saved = localStorage.getItem('aura_reservations');
    if (saved) {
      try {
        setBookingHistory(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const timeSlots = [
    '08:00 AM (Breakfast)',
    '10:30 AM (Morning Brew)',
    '12:30 PM (Lunch)',
    '03:00 PM (Afternoon Tea)',
    '06:30 PM (Sunset Dinner)',
    '08:30 PM (Night Lounge)'
  ];

  const guestOptions = [
    '1 Guest (Solo Study/Work)',
    '2 Guests (Couples/Friends)',
    '3-4 Guests (Small Group)',
    '5-8 Guests (Family/Meeting)',
    '9+ Guests (Party Event)'
  ];

  const zoneOptions = [
    'Indoor Main Hall (Cozy & Warm)',
    'Outdoor Garden Patio (Fresh Air & Greenery)',
    'Window View (City Street Sight)',
    'Quiet Nook (Study/Lounge Area)'
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email address is required';
    }
    if (!formData.phone.trim() || formData.phone.length < 7) {
      newErrors.phone = 'Valid contact phone number is required';
    }
    if (!formData.date) newErrors.date = 'Reservation date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refNumber = 'AURA-RES-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking = {
      refNumber,
      ...formData,
      timestamp: new Date().toLocaleString()
    };

    const updatedHistory = [newBooking, ...bookingHistory];
    setBookingHistory(updatedHistory);
    localStorage.setItem('aura_reservations', JSON.stringify(updatedHistory));

    setConfirmedBooking(newBooking);

    // Reset Form
    setFormData({
      name: '',
      email: '',
      phone: '',
      date: '',
      time: '12:30 PM',
      guests: '2 Guests',
      zone: 'Indoor Main Hall',
      specialRequest: ''
    });
    setErrors({});
  };

  return (
    <section id="reservation" className="py-20 relative bg-stone-900 text-stone-100 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table Booking & Events</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-stone-50">
            Reserve Your Table at Aura Roast
          </h2>
          <p className="text-base text-stone-300 font-normal">
            Skip the queue and guarantee your spot for coffee, brunch, or an evening gathering.
          </p>

          {bookingHistory.length > 0 && (
            <button
              onClick={() => setShowHistoryModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 text-xs font-bold transition-colors mt-2"
            >
              <History className="w-4 h-4" />
              <span>View Your Past Reservations ({bookingHistory.length})</span>
            </button>
          )}
        </div>

        {/* Reservation Card */}
        <div className="max-w-4xl mx-auto glass-card rounded-3xl p-6 sm:p-10 bg-stone-950/80 border border-amber-500/20 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-400" />
                  <span>Your Full Name *</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl bg-stone-900 border text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.name ? 'border-rose-500' : 'border-stone-800'
                    }`}
                />
                {errors.name && <p className="text-[11px] text-rose-400 font-semibold">{errors.name}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>Email Address *</span>
                </label>
                <input
                  type="email"
                  placeholder="eleanor@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl bg-stone-900 border text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.email ? 'border-rose-500' : 'border-stone-800'
                    }`}
                />
                {errors.email && <p className="text-[11px] text-rose-400 font-semibold">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Phone Number *</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl bg-stone-900 border text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.phone ? 'border-rose-500' : 'border-stone-800'
                    }`}
                />
                {errors.phone && <p className="text-[11px] text-rose-400 font-semibold">{errors.phone}</p>}
              </div>

              {/* Reservation Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>Reservation Date *</span>
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={`w-full px-4 py-3 rounded-2xl bg-stone-900 border text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 ${errors.date ? 'border-rose-500' : 'border-stone-800'
                    }`}
                />
                {errors.date && <p className="text-[11px] text-rose-400 font-semibold">{errors.date}</p>}
              </div>

              {/* Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Time Slot</span>
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              {/* Guest Count */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Number of Guests</span>
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-sm text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  {guestOptions.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

            </div>

            {/* Seating Zone Preference */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Preferred Seating Area</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {zoneOptions.map((zone) => (
                  <label
                    key={zone}
                    className={`p-3 rounded-2xl border flex items-center gap-3 cursor-pointer text-xs font-semibold transition-all ${formData.zone === zone
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:border-stone-700'
                      }`}
                  >
                    <input
                      type="radio"
                      name="zone"
                      value={zone}
                      checked={formData.zone === zone}
                      onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                      className="accent-amber-500"
                    />
                    <span>{zone}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Special Request */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                <span>Special Requests / Dietary Notes (Optional)</span>
              </label>
              <textarea
                rows="3"
                placeholder="High chair needed, birthday cake candles, quiet workspace request..."
                value={formData.specialRequest}
                onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                className="w-full px-4 py-3 rounded-2xl bg-stone-900 border border-stone-800 text-sm text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-amber-600/30 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-5 h-5" />
              <span>Confirm Table Reservation</span>
            </button>

          </form>
        </div>

      </div>

      {/* Confirmation Success Modal */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
          <div className="glass-card w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-stone-900 text-stone-100 shadow-2xl border border-amber-500/30 text-center space-y-4">

            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Reservation Guaranteed</span>
              <h3 className="text-2xl font-extrabold font-heading text-stone-100 mt-1">
                We're Excited to Host You, {confirmedBooking.name}!
              </h3>
              <p className="text-xs text-stone-300 mt-1">
                Your reservation reference is <span className="text-amber-400 font-mono font-bold">{confirmedBooking.refNumber}</span>. A confirmation email has been sent to <span className="text-amber-200">{confirmedBooking.email}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-950 text-left text-xs space-y-2 border border-stone-800">
              <div className="flex justify-between">
                <span className="text-stone-400">Date & Time:</span>
                <span className="font-bold text-amber-300">{confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Party Size:</span>
                <span className="font-semibold text-stone-200">{confirmedBooking.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-400">Seating Area:</span>
                <span className="font-semibold text-stone-200">{confirmedBooking.zone}</span>
              </div>
              {confirmedBooking.specialRequest && (
                <div className="flex justify-between border-t border-stone-800 pt-2">
                  <span className="text-stone-400">Note:</span>
                  <span className="font-italic text-amber-200">{confirmedBooking.specialRequest}</span>
                </div>
              )}
            </div>

            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md"
            >
              Done & Return
            </button>

          </div>
        </div>
      )}

      {/* Booking History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="glass-card w-full max-w-xl rounded-3xl p-6 bg-stone-900 text-stone-100 shadow-2xl border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="text-lg font-bold font-heading">Your Saved Reservations</h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-stone-400 hover:text-white"
              >
                Close
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {bookingHistory.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-xs space-y-1 text-left">
                  <div className="flex justify-between font-bold text-amber-400">
                    <span>{item.refNumber}</span>
                    <span>{item.date} @ {item.time}</span>
                  </div>
                  <div className="text-stone-300 font-medium">Guest: {item.name} ({item.guests})</div>
                  <div className="text-stone-400">Zone: {item.zone}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
