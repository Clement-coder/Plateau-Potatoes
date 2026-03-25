import React, { useState, useEffect } from 'react';
import { ArrowRight, Truck, Shield, Star, MapPin, Users, TrendingUp, Leaf, CheckCircle, ShoppingBag, Package, Smile, CreditCard, Building2, Smartphone } from 'lucide-react';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const features = [
    { icon: <Truck className="w-7 h-7 anim-truck" />, title: "Fast Delivery", description: "24-48 hour delivery to major cities across Nigeria", color: '#2cb67d' },
    { icon: <Shield className="w-7 h-7 anim-shield" />, title: "Quality Guaranteed", description: "100% fresh from Jos Plateau farms, or your money back", color: '#f59e0b' },
    { icon: <Star className="w-7 h-7 anim-star" />, title: "Premium Grade", description: "Hand-picked, sorted, and packed with care", color: '#8b5cf6' },
    { icon: <Leaf className="w-7 h-7 anim-leaf" />, title: "Farm Direct", description: "No middlemen — straight from Jos Plateau to your door", color: '#ef4444' },
  ];

  const stats = [
    { number: "5,000+", label: "Happy Customers", icon: <Users className="w-6 h-6 anim-users" />, color: '#2cb67d' },
    { number: "50+", label: "Retail Partners", icon: <CheckCircle className="w-6 h-6 anim-check" />, color: '#f59e0b' },
    { number: "15", label: "States Covered", icon: <MapPin className="w-6 h-6 anim-mappin" />, color: '#8b5cf6' },
    { number: "99%", label: "Satisfaction Rate", icon: <TrendingUp className="w-6 h-6 anim-trending" />, color: '#ef4444' },
  ];

  return (
    <div className="clay-page">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden px-6 py-10"
        style={{ background: 'linear-gradient(150deg, #f0fdf4 0%, #e8f5e9 100%)' }}>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[420px] h-[420px] rounded-full blur-3xl opacity-25"
            style={{ background: 'radial-gradient(circle, #bbf7d0, transparent)', top: '-6rem', left: '-6rem', transform: `translateY(${scrollY * 0.3}px)` }} />
          <div className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-15"
            style={{ background: 'radial-gradient(circle, #a7f3d0, transparent)', bottom: '10%', right: '-4rem', transform: `translateY(${scrollY * 0.2}px)` }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            <div className="clay-badge mb-6 w-fit text-sm px-4 py-2">
              <MapPin className="w-3.5 h-3.5" /> Direct from Jos Plateau Farms
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              <span style={{ background: 'linear-gradient(135deg, #14532d, #2cb67d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Fresh Plateau
              </span>
              <br />
              <span style={{ background: 'linear-gradient(135deg, #1a9e68, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Potatoes
              </span>
              <br />
              <span className="text-gray-600 text-3xl sm:text-4xl md:text-5xl font-bold">Delivered Daily</span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-lg font-light leading-relaxed">
              Premium quality potatoes from Nigeria's finest farms,{' '}
              <span className="font-semibold text-green-700">delivered fresh</span> to your doorstep
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a href="/products" className="clay-btn text-base px-10 py-4">
                Shop Now <ArrowRight className="w-5 h-5" />
              </a>
              <a href="/register" className="clay-btn-secondary text-base px-10 py-4">
                <Users className="w-5 h-5" /> Become a Retailer
              </a>
            </div>

            <div className="flex flex-wrap gap-3">
              {[
                [<Shield className="w-3.5 h-3.5" />, 'Quality Guaranteed'],
                [<Truck className="w-3.5 h-3.5" />, 'Free Delivery on ₦10,000+'],
                [<Star className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" />, '4.9/5 Rating'],
              ].map(([icon, text], i) => (
                <div key={i} className="clay-badge text-xs px-3 py-1.5">
                  {icon as React.ReactNode} <span>{text as string}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — visual card */}
          <div className="flex items-center justify-center">
            <div className="clay-card w-full max-w-sm text-center py-12"
              style={{ background: 'linear-gradient(135deg, #d4edda, #c3e6cb)', boxShadow: '10px 10px 28px rgba(44,182,125,0.25), -6px -6px 18px rgba(255,255,255,0.9)' }}>
              <div className="text-8xl mb-6">🥔</div>
              <h3 className="text-2xl font-extrabold text-green-900 mb-2">Farm to Doorstep</h3>
              <p className="text-green-700 text-sm leading-relaxed mb-6">Handpicked from the cool highlands of Jos Plateau, packed fresh and shipped to you.</p>
              <div className="grid grid-cols-2 gap-3">
                {[['5,000+', 'Customers'], ['15', 'States'], ['99%', 'Satisfaction'], ['48hr', 'Delivery']].map(([n, l]) => (
                  <div key={l} className="clay-card !p-3">
                    <div className="text-xl font-extrabold text-green-800">{n}</div>
                    <div className="text-xs text-gray-500">{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="clay-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-3 text-gray-700">
            Why Choose <span className="text-green-600">NaijaSpuds</span>?
          </h2>
          <p className="text-center text-gray-400 mb-12 text-lg">Everything you need, nothing you don't</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="clay-card group hover:-translate-y-2 transition-transform duration-200">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white"
                  style={{ background: `linear-gradient(135deg, ${f.color}cc, ${f.color})`, boxShadow: `4px 4px 14px ${f.color}55` }}>
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="clay-section pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="clay-card group hover:-translate-y-2 transition-transform duration-200 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto text-white"
                  style={{ background: `linear-gradient(135deg, ${s.color}cc, ${s.color})`, boxShadow: `4px 4px 14px ${s.color}55` }}>
                  {s.icon}
                </div>
                <div className="text-3xl font-extrabold text-gray-700 mb-1">{s.number}</div>
                <div className="text-gray-400 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="clay-section pt-0">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-3 text-gray-700">How It Works</h2>
          <p className="text-center text-gray-400 mb-12 text-lg">From farm to your door in 3 simple steps</p>
          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-green-200 via-green-400 to-green-200 z-0" />
            {[
              { icon: <ShoppingBag className="w-7 h-7 anim-bag" />, step: '01', title: 'Place Your Order', desc: 'Browse our fresh catalogue and order online in minutes', color: '#2cb67d' },
              { icon: <Package className="w-7 h-7 anim-package" />, step: '02', title: 'We Pack Fresh', desc: 'Your potatoes are hand-sorted and packed same day', color: '#f59e0b' },
              { icon: <Smile className="w-7 h-7 anim-smile" />, step: '03', title: 'Delivered to You', desc: 'Fast delivery to your doorstep within 24–48 hours', color: '#8b5cf6' },
            ].map((s, i) => (
              <div key={i} className="clay-card group text-center relative z-10 hover:-translate-y-2 transition-transform duration-200">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 mx-auto text-white"
                  style={{ background: `linear-gradient(135deg, ${s.color}cc, ${s.color})`, boxShadow: `4px 4px 14px ${s.color}55` }}>
                  {s.icon}
                </div>
                <span className="text-xs font-bold text-gray-300 tracking-widest">{s.step}</span>
                <h3 className="text-lg font-bold text-gray-700 mt-1 mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="clay-section pt-0">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-extrabold text-center mb-3 text-gray-700">What Customers Say</h2>
          <p className="text-center text-gray-400 mb-12 text-lg">Real reviews from real buyers across Nigeria</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { name: 'Amaka O.', location: 'Lagos', text: 'Best potatoes I\'ve ever bought. Arrived fresh and well-packaged. Will definitely order again!', rating: 5 },
              { name: 'Emeka D.', location: 'Abuja', text: 'We supply our restaurant from Plateau Potatoes NG. Consistent quality every single time.', rating: 5 },
              { name: 'Fatima B.', location: 'Kano', text: 'Ordered for my shop and customers love them. Great price for the quality.', rating: 5 },
            ].map((t, i) => (
              <div key={i} className="clay-card hover:-translate-y-2 transition-transform duration-200">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #2cb67d, #1a9e68)' }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-gray-700 text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RETAILER CTA ── */}
      <section className="clay-section pt-0">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Retailer */}
          <div className="clay-card group hover:-translate-y-1 transition-transform duration-200"
            style={{ background: 'linear-gradient(135deg, #f0fdf4, #e8f5e9)', boxShadow: '8px 8px 20px rgba(163,177,198,0.45), -6px -6px 16px rgba(255,255,255,0.9)' }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white"
              style={{ background: 'linear-gradient(135deg, #2cb67d, #1a9e68)', boxShadow: '4px 4px 14px rgba(44,182,125,0.4)' }}>
              <Building2 className="w-7 h-7 anim-building" />
            </div>
            <h3 className="text-2xl font-extrabold text-green-900 mb-2">Are You a Retailer?</h3>
            <p className="text-green-700 text-sm leading-relaxed mb-6">Join 50+ retail partners getting bulk supply at wholesale prices. Consistent stock, reliable delivery.</p>
            <a href="/register" className="clay-btn w-fit">
              <Users className="w-4 h-4" /> Become a Partner
            </a>
          </div>

          {/* Payment */}
          <div className="clay-card group hover:-translate-y-1 transition-transform duration-200">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 text-white"
              style={{ background: 'linear-gradient(135deg, #8b5cf6cc, #8b5cf6)', boxShadow: '4px 4px 14px rgba(139,92,246,0.4)' }}>
              <CreditCard className="w-7 h-7 anim-card" />
            </div>
            <h3 className="text-2xl font-extrabold text-gray-700 mb-2">Secure Payments</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">Pay safely with Paystack — card, bank transfer, or USSD. Your transactions are always protected.</p>
            <div className="flex flex-wrap gap-2">
              {['💳 Card', '🏦 Bank Transfer', '📱 USSD', '💰 Pay on Delivery'].map(m => (
                <span key={m} className="clay-badge text-xs">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="clay-section pt-0">
        <div className="max-w-3xl mx-auto clay-card text-center">
          <div className="text-5xl mb-4">🥔</div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-700 mb-4">
            Ready to Experience Fresh?
          </h2>
          <p className="text-gray-400 mb-8 text-lg leading-relaxed">
            Join thousands of satisfied customers enjoying premium Plateau potatoes delivered fresh daily
          </p>
          <a href="/products" className="clay-btn text-lg px-12 py-5 mx-auto">
            Start Shopping Today <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <style>{`
      @keyframes icon-truck    { 0%,100%{transform:translateX(0)} 30%{transform:translateX(7px)} 60%{transform:translateX(-3px)} }
      @keyframes icon-shield   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
      @keyframes icon-star     { 0%,100%{transform:rotate(0) scale(1)} 50%{transform:rotate(20deg) scale(1.25)} }
      @keyframes icon-leaf     { 0%,100%{transform:rotate(0)} 40%{transform:rotate(-18deg) scale(1.1)} 70%{transform:rotate(10deg)} }
      @keyframes icon-users    { 0%,100%{transform:scale(1) translateY(0)} 50%{transform:scale(1.15) translateY(-3px)} }
      @keyframes icon-check    { 0%,100%{transform:scale(1) rotate(0)} 50%{transform:scale(1.2) rotate(12deg)} }
      @keyframes icon-mappin   { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} 65%{transform:translateY(-2px)} }
      @keyframes icon-trending { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-5px) scale(1.15)} }
      @keyframes icon-bag      { 0%,100%{transform:scale(1) rotate(0)} 40%{transform:scale(1.15) rotate(-10deg)} 70%{transform:scale(1.1) rotate(6deg)} }
      @keyframes icon-package  { 0%,100%{transform:scale(1)} 30%{transform:scale(0.88)} 65%{transform:scale(1.15)} }
      @keyframes icon-smile    { 0%,100%{transform:scale(1) rotate(0)} 50%{transform:scale(1.2) rotate(12deg)} }
      @keyframes icon-building { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
      @keyframes icon-card     { 0%,100%{transform:translateX(0) rotate(0)} 40%{transform:translateX(5px) rotate(-6deg)} 70%{transform:translateX(-2px) rotate(3deg)} }

      .group:hover .anim-truck    { animation: icon-truck    0.6s ease-in-out; }
      .group:hover .anim-shield   { animation: icon-shield   0.5s ease-in-out; }
      .group:hover .anim-star     { animation: icon-star     0.5s ease-in-out; }
      .group:hover .anim-leaf     { animation: icon-leaf     0.6s ease-in-out; }
      .group:hover .anim-users    { animation: icon-users    0.5s ease-in-out; }
      .group:hover .anim-check    { animation: icon-check    0.5s ease-in-out; }
      .group:hover .anim-mappin   { animation: icon-mappin   0.5s ease-in-out; }
      .group:hover .anim-trending { animation: icon-trending 0.5s ease-in-out; }
      .group:hover .anim-bag      { animation: icon-bag      0.6s ease-in-out; }
      .group:hover .anim-package  { animation: icon-package  0.5s ease-in-out; }
      .group:hover .anim-smile    { animation: icon-smile    0.5s ease-in-out; }
      .group:hover .anim-building { animation: icon-building 0.5s ease-in-out; }
      .group:hover .anim-card     { animation: icon-card     0.6s ease-in-out; }
    `}</style>
    </div>
  );
};

export default Home;
