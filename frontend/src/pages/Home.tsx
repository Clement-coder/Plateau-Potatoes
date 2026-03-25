import React from 'react';
import { ArrowRight, Truck, Shield, Star, MapPin, Users, TrendingUp, Leaf, CheckCircle, ShoppingBag, Package, Smile, CreditCard, Building2 } from 'lucide-react';

const features = [
  { icon: <Truck className="w-6 h-6 anim-truck" />, title: "Fast Delivery", description: "24-48 hour delivery to major cities across Nigeria", color: '#2cb67d' },
  { icon: <Shield className="w-6 h-6 anim-shield" />, title: "Quality Guaranteed", description: "100% fresh from Jos Plateau farms, or your money back", color: '#f59e0b' },
  { icon: <Star className="w-6 h-6 anim-star" />, title: "Premium Grade", description: "Hand-picked, sorted, and packed with care", color: '#8b5cf6' },
  { icon: <Leaf className="w-6 h-6 anim-leaf" />, title: "Farm Direct", description: "No middlemen — straight from Jos Plateau to your door", color: '#ef4444' },
];

const stats = [
  { number: "5,000+", label: "Happy Customers", icon: <Users className="w-5 h-5 anim-users" />, color: '#2cb67d' },
  { number: "50+", label: "Retail Partners", icon: <CheckCircle className="w-5 h-5 anim-check" />, color: '#f59e0b' },
  { number: "15", label: "States Covered", icon: <MapPin className="w-5 h-5 anim-mappin" />, color: '#8b5cf6' },
  { number: "99%", label: "Satisfaction Rate", icon: <TrendingUp className="w-5 h-5 anim-trending" />, color: '#ef4444' },
];

const steps = [
  { icon: <ShoppingBag className="w-6 h-6 anim-bag" />, step: '01', title: 'Place Your Order', desc: 'Browse our fresh catalogue and order online in minutes', color: '#2cb67d' },
  { icon: <Package className="w-6 h-6 anim-package" />, step: '02', title: 'We Pack Fresh', desc: 'Your potatoes are hand-sorted and packed same day', color: '#f59e0b' },
  { icon: <Smile className="w-6 h-6 anim-smile" />, step: '03', title: 'Delivered to You', desc: 'Fast delivery to your doorstep within 24–48 hours', color: '#8b5cf6' },
];

const testimonials = [
  { name: 'Amaka O.', location: 'Lagos', text: "Best potatoes I've ever bought. Arrived fresh and well-packaged. Will definitely order again!", rating: 5 },
  { name: 'Emeka D.', location: 'Abuja', text: 'We supply our restaurant from Plateau Potatoes NG. Consistent quality every single time.', rating: 5 },
  { name: 'Fatima B.', location: 'Kano', text: 'Ordered for my shop and customers love them. Great price for the quality.', rating: 5 },
];

const Home = () => (
  <div className="clay-page">

    {/* ── HERO ── */}
    <section className="relative min-h-screen flex items-center px-6 py-16"
      style={{ background: 'linear-gradient(150deg, var(--clay-hero-bg-start) 0%, var(--clay-hero-bg-end) 100%)' }}>
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

        <div>
          <div className="clay-badge mb-6 w-fit text-sm">
            <MapPin className="w-3.5 h-3.5" /> Direct from Jos Plateau Farms
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-5 leading-tight tracking-tight">
            <span style={{ background: 'linear-gradient(135deg, #14532d, #2cb67d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Fresh Plateau
            </span>
            <br />
            <span style={{ background: 'linear-gradient(135deg, #1a9e68, #4ade80)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Potatoes
            </span>
            <br />
            <span className="text-4xl sm:text-5xl font-bold" style={{ color: 'var(--clay-text-muted)' }}>Delivered Daily</span>
          </h1>
          <p className="text-lg mb-8 max-w-lg leading-relaxed" style={{ color: 'var(--clay-text-muted)' }}>
            Premium quality potatoes from Nigeria's finest farms,{' '}
            <span className="font-semibold text-green-600">delivered fresh</span> to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <a href="/products" className="clay-btn px-8 py-3.5">Shop Now <ArrowRight className="w-4 h-4" /></a>
            <a href="/register" className="clay-btn-secondary px-8 py-3.5"><Users className="w-4 h-4" /> Become a Retailer</a>
          </div>
          <div className="flex flex-wrap gap-2">
            {[[<Shield className="w-3 h-3" />, 'Quality Guaranteed'], [<Truck className="w-3 h-3" />, 'Free Delivery on ₦10,000+'], [<Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />, '4.9/5 Rating']].map(([icon, text], i) => (
              <div key={i} className="clay-badge text-xs">{icon as React.ReactNode} <span>{text as string}</span></div>
            ))}
          </div>
        </div>

        <div className="clay-card text-center py-10"
          style={{ background: 'linear-gradient(135deg, var(--clay-surface), var(--clay-surface-2))' }}>
          <div className="text-7xl mb-4">🥔</div>
          <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--clay-text)' }}>Farm to Doorstep</h3>
          <p className="text-sm leading-relaxed mb-6 px-4" style={{ color: 'var(--clay-text-muted)' }}>Handpicked from the cool highlands of Jos Plateau, packed fresh and shipped to you.</p>
          <div className="grid grid-cols-2 gap-3 px-2">
            {[['5,000+', 'Customers'], ['15', 'States'], ['99%', 'Satisfaction'], ['48hr', 'Delivery']].map(([n, l]) => (
              <div key={l} className="clay-card !p-3">
                <div className="text-lg font-extrabold text-green-600">{n}</div>
                <div className="text-xs" style={{ color: 'var(--clay-text-muted)' }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ── FEATURES ── */}
    <section className="clay-section">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-2" style={{ color: 'var(--clay-text)' }}>
          Why Choose <span className="text-green-600">NaijaSpuds</span>?
        </h2>
        <p className="text-center mb-10 text-sm" style={{ color: 'var(--clay-text-muted)' }}>Everything you need, nothing you don't</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <div key={i} className="clay-card group">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white"
                style={{ background: `linear-gradient(135deg, ${f.color}cc, ${f.color})`, boxShadow: `3px 3px 10px ${f.color}44` }}>
                {f.icon}
              </div>
              <h3 className="font-bold mb-1.5" style={{ color: 'var(--clay-text)' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--clay-text-muted)' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── STATS ── */}
    <section className="clay-section pt-0">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <div key={i} className="clay-card group text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 mx-auto text-white"
                style={{ background: `linear-gradient(135deg, ${s.color}cc, ${s.color})`, boxShadow: `3px 3px 10px ${s.color}44` }}>
                {s.icon}
              </div>
              <div className="text-2xl font-extrabold text-green-600 mb-0.5">{s.number}</div>
              <div className="text-xs font-medium" style={{ color: 'var(--clay-text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── HOW IT WORKS ── */}
    <section className="clay-section pt-0">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-2" style={{ color: 'var(--clay-text)' }}>How It Works</h2>
        <p className="text-center mb-10 text-sm" style={{ color: 'var(--clay-text-muted)' }}>From farm to your door in 3 simple steps</p>
        <div className="grid sm:grid-cols-3 gap-5">
          {steps.map((s, i) => (
            <div key={i} className="clay-card group text-center">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 mx-auto text-white"
                style={{ background: `linear-gradient(135deg, ${s.color}cc, ${s.color})`, boxShadow: `3px 3px 10px ${s.color}44` }}>
                {s.icon}
              </div>
              <span className="text-xs font-bold text-green-400 tracking-widest">{s.step}</span>
              <h3 className="font-bold mt-1 mb-1.5" style={{ color: 'var(--clay-text)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--clay-text-muted)' }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TESTIMONIALS ── */}
    <section className="clay-section pt-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-2" style={{ color: 'var(--clay-text)' }}>What Customers Say</h2>
        <p className="text-center mb-10 text-sm" style={{ color: 'var(--clay-text-muted)' }}>Real reviews from real buyers across Nigeria</p>
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="clay-card">
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'var(--clay-text-muted)' }}>"{t.text}"</p>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs"
                  style={{ background: 'linear-gradient(135deg, #2cb67d, #1a9e68)' }}>{t.name[0]}</div>
                <div>
                  <p className="font-bold text-sm" style={{ color: 'var(--clay-text)' }}>{t.name}</p>
                  <p className="text-xs flex items-center gap-1" style={{ color: 'var(--clay-text-muted)' }}><MapPin className="w-3 h-3" />{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── RETAILER + PAYMENT ── */}
    <section className="clay-section pt-0">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-5">
        <div className="clay-card group">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white"
            style={{ background: 'linear-gradient(135deg, #2cb67d, #1a9e68)', boxShadow: '3px 3px 10px rgba(44,182,125,0.35)' }}>
            <Building2 className="w-6 h-6 anim-building" />
          </div>
          <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--clay-text)' }}>Are You a Retailer?</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--clay-text-muted)' }}>Join 50+ retail partners getting bulk supply at wholesale prices. Consistent stock, reliable delivery.</p>
          <a href="/register" className="clay-btn w-fit text-sm"><Users className="w-4 h-4" /> Become a Partner</a>
        </div>
        <div className="clay-card group">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 text-white"
            style={{ background: 'linear-gradient(135deg, #8b5cf6cc, #8b5cf6)', boxShadow: '3px 3px 10px rgba(139,92,246,0.35)' }}>
            <CreditCard className="w-6 h-6 anim-card" />
          </div>
          <h3 className="text-xl font-extrabold mb-2" style={{ color: 'var(--clay-text)' }}>Secure Payments</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--clay-text-muted)' }}>Pay safely with Paystack — card, bank transfer, or USSD. Your transactions are always protected.</p>
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
      <div className="max-w-2xl mx-auto clay-card text-center">
        <div className="text-5xl mb-3">🥔</div>
        <h2 className="text-2xl font-extrabold mb-3" style={{ color: 'var(--clay-text)' }}>Ready to Experience Fresh?</h2>
        <p className="text-sm mb-6 leading-relaxed" style={{ color: 'var(--clay-text-muted)' }}>
          Join thousands of satisfied customers enjoying premium Plateau potatoes delivered fresh daily.
        </p>
        <a href="/products" className="clay-btn px-10 py-4 mx-auto">Start Shopping Today <ArrowRight className="w-4 h-4" /></a>
      </div>
    </section>

    <style>{`
      @keyframes icon-truck    { 0%,100%{transform:translateX(0)} 30%{transform:translateX(6px)} 60%{transform:translateX(-2px)} }
      @keyframes icon-shield   { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
      @keyframes icon-star     { 0%,100%{transform:rotate(0) scale(1)} 50%{transform:rotate(18deg) scale(1.2)} }
      @keyframes icon-leaf     { 0%,100%{transform:rotate(0)} 40%{transform:rotate(-15deg)} 70%{transform:rotate(8deg)} }
      @keyframes icon-users    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
      @keyframes icon-check    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2) rotate(10deg)} }
      @keyframes icon-mappin   { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} 65%{transform:translateY(-1px)} }
      @keyframes icon-trending { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      @keyframes icon-bag      { 0%,100%{transform:rotate(0)} 40%{transform:rotate(-8deg)} 70%{transform:rotate(5deg)} }
      @keyframes icon-package  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }
      @keyframes icon-smile    { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
      @keyframes icon-building { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
      @keyframes icon-card     { 0%,100%{transform:translateX(0)} 40%{transform:translateX(4px) rotate(-4deg)} 70%{transform:translateX(-1px)} }
      .group:hover .anim-truck    { animation: icon-truck    0.5s ease-in-out; }
      .group:hover .anim-shield   { animation: icon-shield   0.4s ease-in-out; }
      .group:hover .anim-star     { animation: icon-star     0.4s ease-in-out; }
      .group:hover .anim-leaf     { animation: icon-leaf     0.5s ease-in-out; }
      .group:hover .anim-users    { animation: icon-users    0.4s ease-in-out; }
      .group:hover .anim-check    { animation: icon-check    0.4s ease-in-out; }
      .group:hover .anim-mappin   { animation: icon-mappin   0.4s ease-in-out; }
      .group:hover .anim-trending { animation: icon-trending 0.4s ease-in-out; }
      .group:hover .anim-bag      { animation: icon-bag      0.5s ease-in-out; }
      .group:hover .anim-package  { animation: icon-package  0.4s ease-in-out; }
      .group:hover .anim-smile    { animation: icon-smile    0.4s ease-in-out; }
      .group:hover .anim-building { animation: icon-building 0.4s ease-in-out; }
      .group:hover .anim-card     { animation: icon-card     0.5s ease-in-out; }
    `}</style>
  </div>
);

export default Home;
