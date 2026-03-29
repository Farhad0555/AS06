import { useState, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* ─── STYLES ─────────────────────────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --purple: #7c3aed;
    --purple-dark: #5b21b6;
    --purple-glow: rgba(124,58,237,0.22);
    --red: #ef4444;
    --bg: #ffffff;
    --bg2: #f8f7ff;
    --border: #e9e4ff;
    --text: #0f0a1e;
    --text2: #4b5563;
    --text3: #9ca3af;
    --radius: 16px;
    --shadow: 0 4px 24px rgba(124,58,237,0.08);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); overflow-x: hidden; }
  h1,h2,h3,h4,h5 { font-family: 'Syne', sans-serif; }

  /* NAVBAR */
  .navbar { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.93); backdrop-filter: blur(12px); border-bottom: 1px solid var(--border); padding: 0 5%; height: 68px; display: flex; align-items: center; justify-content: space-between; }
  .nav-logo { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:var(--purple); }
  .nav-logo span { color:var(--text); }
  .nav-links { display:flex; align-items:center; gap:28px; }
  .nav-links a { font-size:14px; font-weight:500; color:var(--text2); text-decoration:none; transition:color .2s; }
  .nav-links a:hover { color:var(--purple); }
  .nav-right { display:flex; align-items:center; gap:12px; }
  .nav-cart { position:relative; background:none; border:2px solid var(--border); border-radius:50px; padding:8px 16px; cursor:pointer; display:flex; align-items:center; gap:7px; font-size:14px; font-weight:600; color:var(--text); transition:all .2s; font-family:'DM Sans',sans-serif; }
  .nav-cart:hover { border-color:var(--purple); color:var(--purple); }
  .cart-badge { background:var(--purple); color:#fff; border-radius:50%; width:20px; height:20px; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
  .btn-login { font-size:14px; font-weight:600; color:var(--text2); background:none; border:none; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .btn-login:hover { color:var(--purple); }
  .btn-started { background:var(--purple); color:#fff; border:none; border-radius:50px; padding:9px 22px; font-size:14px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-started:hover { background:var(--purple-dark); box-shadow:0 6px 20px var(--purple-glow); }

  /* HERO */
  .hero { max-width:1200px; margin:0 auto; padding:80px 5% 60px; display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; }
  .hero-badge { display:inline-flex; align-items:center; gap:7px; background:#f3f0ff; border:1px solid var(--border); border-radius:50px; padding:6px 14px; font-size:12px; font-weight:600; color:var(--purple); margin-bottom:20px; }
  .hero h1 { font-size:clamp(36px,4vw,52px); font-weight:800; line-height:1.1; letter-spacing:-1.5px; margin-bottom:18px; }
  .hero p { font-size:16px; color:var(--text2); line-height:1.7; margin-bottom:30px; max-width:420px; }
  .hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
  .btn-primary { background:var(--purple); color:#fff; border:none; border-radius:50px; padding:13px 28px; font-size:15px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-primary:hover { background:var(--purple-dark); transform:translateY(-2px); box-shadow:0 8px 24px var(--purple-glow); }
  .btn-secondary { background:#fff; color:var(--text); border:2px solid var(--border); border-radius:50px; padding:11px 24px; font-size:15px; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-secondary:hover { border-color:var(--purple); color:var(--purple); }
  .hero-img { width:100%; border-radius:24px; object-fit:cover; box-shadow:0 24px 60px rgba(124,58,237,0.18); }

  /* STATS */
  .stats { background:linear-gradient(135deg,#7c3aed 0%,#6d28d9 60%,#4c1d95 100%); padding:44px 5%; }
  .stats-inner { max-width:900px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); }
  .stat-item { text-align:center; color:#fff; padding:0 20px; }
  .stat-item:not(:last-child) { border-right:1px solid rgba(255,255,255,.2); }
  .stat-num { font-family:'Syne',sans-serif; font-size:42px; font-weight:800; letter-spacing:-1px; }
  .stat-label { font-size:14px; opacity:.75; margin-top:4px; }

  /* MAIN */
  .main { max-width:1200px; margin:0 auto; padding:70px 5%; }
  .sec-header { text-align:center; margin-bottom:36px; }
  .sec-header h2 { font-size:clamp(28px,3vw,40px); font-weight:800; letter-spacing:-1px; margin-bottom:8px; }
  .sec-header p { color:var(--text2); font-size:16px; }

  /* TABS */
  .tab-bar { display:flex; background:#f8f7ff; border-radius:50px; padding:5px; margin:0 auto 40px; width:fit-content; border:1px solid var(--border); }
  .tab-btn { padding:10px 32px; border-radius:50px; border:none; font-size:15px; font-weight:600; cursor:pointer; transition:all .25s; font-family:'DM Sans',sans-serif; background:transparent; color:var(--text2); }
  .tab-btn.active { background:var(--purple); color:#fff; box-shadow:0 4px 16px var(--purple-glow); }

  /* PRODUCT GRID */
  .products-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; }
  .product-card { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:24px; transition:all .25s; cursor:pointer; }
  .product-card:hover { box-shadow:0 12px 40px rgba(124,58,237,0.12); transform:translateY(-4px); border-color:rgba(124,58,237,0.3); }
  .card-tag { display:inline-block; padding:4px 12px; border-radius:50px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.5px; margin-bottom:14px; }
  .tag-popular { background:#ede9fe; color:var(--purple); }
  .tag-new { background:#ecfdf5; color:#059669; }
  .tag-bestseller { background:#fffbeb; color:#b45309; }
  .card-icon { font-size:36px; margin-bottom:12px; }
  .card-name { font-size:18px; font-weight:700; margin-bottom:6px; }
  .card-desc { font-size:13px; color:var(--text2); line-height:1.6; margin-bottom:16px; }
  .card-price { display:flex; align-items:baseline; gap:5px; margin-bottom:14px; }
  .price-num { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; color:var(--purple); }
  .price-period { font-size:13px; color:var(--text3); }
  .card-features { list-style:none; margin-bottom:20px; display:flex; flex-direction:column; gap:7px; }
  .card-features li { font-size:13px; color:var(--text2); display:flex; align-items:center; gap:8px; }
  .card-features li::before { content:'✓'; color:var(--purple); font-weight:700; font-size:12px; }
  .btn-buy { width:100%; background:var(--purple); color:#fff; border:none; border-radius:50px; padding:12px; font-size:14px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-buy:hover { background:var(--purple-dark); }
  .btn-buy.added { background:#10b981; }

  /* CART */
  .cart-wrap { max-width:780px; margin:0 auto; }
  .cart-empty { text-align:center; padding:60px 20px; }
  .cart-empty-icon { font-size:64px; margin-bottom:16px; }
  .cart-empty h3 { font-size:22px; font-weight:700; margin-bottom:8px; }
  .cart-empty p { color:var(--text2); }
  .cart-box { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:28px; box-shadow:var(--shadow); }
  .cart-box h3 { font-size:22px; font-weight:800; margin-bottom:22px; }
  .cart-items { display:flex; flex-direction:column; gap:12px; margin-bottom:22px; }
  .cart-item { background:#f8f7ff; border-radius:12px; padding:16px 20px; display:flex; align-items:center; gap:14px; }
  .cart-item-icon { font-size:30px; }
  .cart-item-info { flex:1; }
  .cart-item-info h4 { font-size:15px; font-weight:700; }
  .cart-item-info span { font-size:14px; color:var(--text2); }
  .btn-remove { background:none; border:none; color:var(--red); font-size:13px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; }
  .btn-remove:hover { opacity:.7; }
  .cart-total { display:flex; align-items:center; justify-content:space-between; padding:16px 0; border-top:2px solid var(--border); margin-bottom:18px; }
  .cart-total-label { font-size:16px; color:var(--text2); }
  .cart-total-amt { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; }
  .btn-checkout { width:100%; background:linear-gradient(135deg,var(--purple),#6d28d9); color:#fff; border:none; border-radius:50px; padding:16px; font-size:16px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-checkout:hover { transform:translateY(-2px); box-shadow:0 10px 32px var(--purple-glow); }

  /* STEPS */
  .steps-section { background:#f8f7ff; padding:80px 5%; }
  .steps-inner { max-width:960px; margin:0 auto; text-align:center; }
  .steps-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:30px; margin-top:48px; }
  .step-card { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:36px 24px; position:relative; text-align:center; }
  .step-num { position:absolute; top:-14px; left:50%; transform:translateX(-50%); background:var(--purple); color:#fff; width:30px; height:30px; border-radius:50%; font-size:13px; font-weight:800; display:flex; align-items:center; justify-content:center; font-family:'Syne',sans-serif; }
  .step-icon { font-size:44px; margin-bottom:16px; }
  .step-card h3 { font-size:18px; font-weight:700; margin-bottom:8px; }
  .step-card p { font-size:14px; color:var(--text2); line-height:1.6; }

  /* PRICING */
  .pricing-section { max-width:1100px; margin:0 auto; padding:80px 5%; }
  .pricing-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:22px; margin-top:48px; }
  .pricing-card { background:#fff; border:2px solid var(--border); border-radius:var(--radius); padding:32px; transition:all .25s; }
  .pricing-card.featured { background:var(--purple); color:#fff; border-color:var(--purple); transform:scale(1.04); box-shadow:0 20px 60px var(--purple-glow); }
  .pricing-card:not(.featured):hover { border-color:var(--purple); box-shadow:var(--shadow); }
  .pricing-badge { display:inline-block; background:#f59e0b; color:#78350f; font-size:11px; font-weight:700; padding:4px 12px; border-radius:50px; text-transform:uppercase; margin-bottom:14px; }
  .pricing-tier { font-size:15px; font-weight:700; margin-bottom:4px; }
  .pricing-desc { font-size:13px; opacity:.65; margin-bottom:18px; }
  .pricing-price { font-family:'Syne',sans-serif; font-size:40px; font-weight:800; margin-bottom:4px; }
  .pricing-price span { font-size:16px; font-weight:500; opacity:.65; }
  .pricing-divider { height:1px; background:currentColor; opacity:.12; margin:18px 0; }
  .pricing-features { list-style:none; display:flex; flex-direction:column; gap:10px; margin-bottom:28px; }
  .pricing-features li { font-size:14px; display:flex; align-items:center; gap:9px; }
  .pricing-features li::before { content:'✓'; font-weight:700; font-size:12px; }
  .pricing-card.featured .pricing-features li::before { color:#a5f3fc; }
  .pricing-card:not(.featured) .pricing-features li::before { color:var(--purple); }
  .btn-plan { width:100%; border-radius:50px; padding:13px; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; border:2px solid var(--purple); }
  .btn-plan-outline { background:transparent; color:var(--purple); }
  .btn-plan-outline:hover { background:var(--purple); color:#fff; }
  .btn-plan-white { background:#fff; color:var(--purple); border-color:#fff; }
  .btn-plan-white:hover { background:#f3f0ff; }

  /* CTA */
  .cta { background:linear-gradient(135deg,var(--purple) 0%,#4c1d95 100%); padding:80px 5%; text-align:center; }
  .cta h2 { font-size:clamp(28px,3.5vw,44px); font-weight:800; color:#fff; margin-bottom:14px; }
  .cta p { color:rgba(255,255,255,.75); font-size:16px; margin-bottom:32px; }
  .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
  .btn-white { background:#fff; color:var(--purple); border:none; border-radius:50px; padding:13px 28px; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-white:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(0,0,0,.2); }
  .btn-outline-white { background:transparent; color:#fff; border:2px solid rgba(255,255,255,.5); border-radius:50px; padding:11px 26px; font-size:15px; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all .2s; }
  .btn-outline-white:hover { border-color:#fff; }
  .cta-note { font-size:13px; color:rgba(255,255,255,.5); margin-top:14px; }

  /* FOOTER */
  .footer { background:#0f0a1e; color:rgba(255,255,255,.6); padding:60px 5% 28px; }
  .footer-inner { max-width:1200px; margin:0 auto; }
  .footer-grid { display:grid; grid-template-columns:1.8fr 1fr 1fr 1fr; gap:40px; margin-bottom:48px; }
  .footer-logo { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; color:#fff; margin-bottom:12px; }
  .footer-logo span { color:#8b5cf6; }
  .footer-brand p { font-size:14px; line-height:1.7; max-width:220px; }
  .footer-social { display:flex; gap:10px; margin-top:16px; }
  .social-btn { width:36px; height:36px; border-radius:50%; background:rgba(255,255,255,.08); display:flex; align-items:center; justify-content:center; font-size:14px; cursor:pointer; transition:background .2s; text-decoration:none; color:#fff; }
  .social-btn:hover { background:var(--purple); }
  .footer-col h4 { font-family:'Syne',sans-serif; font-size:12px; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:1px; margin-bottom:16px; }
  .footer-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
  .footer-col ul li a { font-size:14px; color:rgba(255,255,255,.5); text-decoration:none; transition:color .2s; }
  .footer-col ul li a:hover { color:#fff; }
  .footer-bottom { border-top:1px solid rgba(255,255,255,.08); padding-top:24px; display:flex; align-items:center; justify-content:space-between; font-size:13px; }
  .footer-bottom-links { display:flex; gap:20px; }
  .footer-bottom-links a { color:rgba(255,255,255,.4); text-decoration:none; }
  .footer-bottom-links a:hover { color:#fff; }

  /* RESPONSIVE */
  @media (max-width:900px) {
    .hero { grid-template-columns:1fr; }
    .hero-img-wrap { display:none; }
    .products-grid { grid-template-columns:repeat(2,1fr); }
    .pricing-grid { grid-template-columns:1fr; }
    .pricing-card.featured { transform:none; }
    .steps-grid { grid-template-columns:1fr; }
    .footer-grid { grid-template-columns:1fr 1fr; }
    .nav-links { display:none; }
  }
  @media (max-width:580px) {
    .products-grid { grid-template-columns:1fr; }
    .stats-inner { grid-template-columns:1fr; gap:24px; }
    .stat-item { border-right:none !important; border-bottom:1px solid rgba(255,255,255,.15); padding-bottom:20px; }
    .stat-item:last-child { border-bottom:none; }
    .footer-grid { grid-template-columns:1fr; }
    .tab-btn { padding:10px 20px; font-size:14px; }
  }
`;

// Inject styles into <head> once
const styleEl = document.createElement("style");
styleEl.innerText = styles;
document.head.appendChild(styleEl);

/* ─── PRODUCT DATA ───────────────────────────────────────────────────────── */
const products = [
  {
    id: 1,
    name: "AI Writing Pro",
    description: "Generate high-quality content, blogs, and marketing copy in seconds with advanced AI.",
    price: 29,
    period: "/mo",
    tag: "Best Seller",
    tagType: "bestseller",
    features: ["Unlimited AI generations", "50+ writing templates", "Grammar checker"],
    icon: "✍️",
  },
  {
    id: 2,
    name: "Design Templates Pack",
    description: "2000+ premium templates for social media, presentations, and marketing materials.",
    price: 49,
    period: "One-Time",
    tag: "Popular",
    tagType: "popular",
    features: ["2000+ templates", "100+ categories", "Commercial license"],
    icon: "🎨",
  },
  {
    id: 3,
    name: "Premium Stock Assets",
    description: "Access millions of royalty-free photos, videos, and graphics for your projects.",
    price: 19,
    period: "/mo",
    tag: "New",
    tagType: "new",
    features: ["10M+ assets", "4K quality", "No attribution"],
    icon: "🖼️",
  },
  {
    id: 4,
    name: "Automation Toolkit",
    description: "Automate repetitive tasks and streamline your workflow with powerful tools.",
    price: 79,
    period: "/mo",
    tag: "Popular",
    tagType: "popular",
    features: ["50+ automations", "API access", "Custom workflows"],
    icon: "⚙️",
  },
  {
    id: 5,
    name: "Resume Builder Pro",
    description: "Create professional resumes and cover letters that land interviews.",
    price: 15,
    period: "One-Time",
    tag: "New",
    tagType: "new",
    features: ["100+ templates", "ATS optimization", "Export to PDF"],
    icon: "📄",
  },
  {
    id: 6,
    name: "Social Media Kit",
    description: "Complete toolkit for creating engaging social media content across all platforms.",
    price: 39,
    period: "/mo",
    tag: "Best Seller",
    tagType: "bestseller",
    features: ["1000+ assets", "Schedule included", "Analytics dashboard"],
    icon: "📱",
  },
];

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
function Navbar({ cartCount, onCartClick, onProductsClick }) {
  return (
    <nav className="navbar">
      <div className="nav-logo">Digi<span>Tools</span></div>
      <div className="nav-links">
        <a href="#products" onClick={onProductsClick}>Products</a>
        <a href="#features">Features</a>
        <a href="#pricing">Pricing</a>
        <a href="#testimonials">Testimonials</a>
        <a href="#faq">FAQ</a>
      </div>
      <div className="nav-right">
        <button className="nav-cart" onClick={onCartClick}>
          🛒
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
        <button className="btn-login">Login</button>
        <button className="btn-started">Get Started</button>
      </div>
    </nav>
  );
}

/* ─── HERO ───────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <div className="hero">
      <div>
        <div className="hero-badge">✦ New AI-Powered Tools Available</div>
        <h1>Supercharge Your Digital Workflow</h1>
        <p>
          Access premium AI tools, design assets, templates, and productivity
          software — all in one place. Start creating faster today.
        </p>
        <div className="hero-btns">
          <button className="btn-primary">🚀 Explore Products</button>
          <button className="btn-secondary">▶ Watch Demo</button>
        </div>
      </div>
      <div className="hero-img-wrap">
        <img
          className="hero-img"
          src="https://i.ibb.co.com/XrXZ632g/banner.png"
          alt="Digital Tools"
        />
      </div>
    </div>
  );
}

/* ─── STATS ──────────────────────────────────────────────────────────────── */
function Stats() {
  const data = [
    { num: "50K+", label: "Active Users" },
    { num: "200+", label: "Premium Tools" },
    { num: "4.9",  label: "Rating" },
  ];
  return (
    <div className="stats">
      <div className="stats-inner">
        {data.map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ───────────────────────────────────────────────────────── */
function ProductCard({ product, onAddToCart }) {
  const [btnText, setBtnText] = useState("Buy Now");
  const [added, setAdded]     = useState(false);

  const tagClass = {
    popular:    "tag-popular",
    new:        "tag-new",
    bestseller: "tag-bestseller",
  }[product.tagType] || "tag-popular";

  const handleBuy = (e) => {
    e.stopPropagation();
    onAddToCart(product);
    setBtnText("Added to Cart ✓");
    setAdded(true);
    setTimeout(() => { setBtnText("Buy Now"); setAdded(false); }, 2000);
  };

  return (
    <div className="product-card" onClick={() => onAddToCart(product)}>
      <span className={`card-tag ${tagClass}`}>{product.tag}</span>
      <div className="card-icon">{product.icon}</div>
      <div className="card-name">{product.name}</div>
      <div className="card-desc">{product.description}</div>
      <div className="card-price">
        <span className="price-num">${product.price}</span>
        <span className="price-period">{product.period}</span>
      </div>
      <ul className="card-features">
        {product.features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <button className={`btn-buy${added ? " added" : ""}`} onClick={handleBuy}>
        {btnText}
      </button>
    </div>
  );
}

/* ─── CART ───────────────────────────────────────────────────────────────── */
function Cart({ cart, onRemove, onCheckout }) {
  const total = cart.reduce((s, p) => s + p.price, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Browse our products and add something to get started!</p>
      </div>
    );
  }

  return (
    <div className="cart-wrap">
      <div className="cart-box">
        <h3>Your Cart</h3>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-icon">{item.icon}</div>
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <span>${item.price}</span>
              </div>
              <button className="btn-remove" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="cart-total">
          <span className="cart-total-label">Total:</span>
          <span className="cart-total-amt">${total}</span>
        </div>
        <button className="btn-checkout" onClick={onCheckout}>
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

/* ─── STEPS ──────────────────────────────────────────────────────────────── */
function Steps() {
  const steps = [
    { icon: "👤", title: "Create Account",  desc: "Sign up for free in seconds. No credit card required to get started." },
    { icon: "📦", title: "Choose Products", desc: "Browse our catalog and select the tools that fit your needs." },
    { icon: "🚀", title: "Start Creating",  desc: "Download and start using your premium tools immediately." },
  ];
  return (
    <div className="steps-section">
      <div className="steps-inner">
        <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>
          Get Started In 3 Steps
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 16 }}>
          Start using premium digital tools in minutes, not hours.
        </p>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-num">{i + 1}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PRICING ────────────────────────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      tier: "Starter", desc: "Perfect for getting started", price: "$0",  period: "/Month",
      badge: null, featured: false,
      features: ["Access to 10 free tools", "Basic templates", "Community access", "1 project per month"],
      btnClass: "btn-plan btn-plan-outline", btnText: "Get Started Free",
    },
    {
      tier: "Pro", desc: "Best for professionals", price: "$29", period: "/Month",
      badge: "Most Popular", featured: true,
      features: ["Access to all premium tools", "Unlimited templates", "Monthly updates", "Priority support", "Unlimited projects", "Advanced analytics"],
      btnClass: "btn-plan btn-plan-white", btnText: "Start Pro Trial",
    },
    {
      tier: "Enterprise", desc: "For teams and businesses", price: "$99", period: "/Month",
      badge: null, featured: false,
      features: ["Everything in Pro", "Team collaboration", "Custom integrations", "Dedicated support", "SLA guarantee", "Custom branding"],
      btnClass: "btn-plan btn-plan-outline", btnText: "Contact Sales",
    },
  ];

  return (
    <div className="pricing-section" id="pricing">
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,3vw,40px)", fontWeight: 800, letterSpacing: "-1px", marginBottom: 8 }}>
          Simple, Transparent Pricing
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 16 }}>
          Choose the plan that fits your needs. Upgrade or downgrade anytime.
        </p>
      </div>
      <div className="pricing-grid">
        {plans.map((p, i) => (
          <div key={i} className={`pricing-card${p.featured ? " featured" : ""}`}>
            {p.badge && <div className="pricing-badge">{p.badge}</div>}
            <div className="pricing-tier">{p.tier}</div>
            <div className="pricing-desc">{p.desc}</div>
            <div className="pricing-price">{p.price}<span>{p.period}</span></div>
            <div className="pricing-divider" />
            <ul className="pricing-features">
              {p.features.map((f, j) => <li key={j}>{f}</li>)}
            </ul>
            <button className={p.btnClass}>{p.btnText}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
function Footer() {
  const cols = [
    { title: "Product",   links: ["Features", "Pricing", "Templates", "Integrations"] },
    { title: "Company",   links: ["About", "Blog", "Careers", "Press"] },
    { title: "Resources", links: ["Documentation", "Help Center", "Community", "Contact"] },
  ];
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">Digi<span>Tools</span></div>
            <p>Premium digital tools for creators, professionals, and businesses. Work smarter with our suite of powerful tools.</p>
            <div className="footer-social">
              <a className="social-btn" href="#">𝕏</a>
              <a className="social-btn" href="#">in</a>
              <a className="social-btn" href="#">f</a>
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={i} className="footer-col">
              <h4>{col.title}</h4>
              <ul>{col.links.map((l, j) => <li key={j}><a href="#">{l}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© 2025 DigiTools. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── APP (main) ─────────────────────────────────────────────────────────── */
export default function App() {
  const [cart, setCart] = useState([]);
  const [tab, setTab]   = useState("products");

  const handleAddToCart = useCallback((product) => {
    if (cart.find((p) => p.id === product.id)) {
      toast.warning(`${product.name} is already in your cart!`);
      return;
    }
    setCart((prev) => [...prev, product]);
    toast.success(`✅ ${product.name} added to cart!`);
  }, [cart]);

  const handleRemove = useCallback((id) => {
    const item = cart.find((p) => p.id === id);
    setCart((prev) => prev.filter((p) => p.id !== id));
    if (item) toast.error(`❌ ${item.name} removed from cart.`);
  }, [cart]);

  const handleCheckout = useCallback(() => {
    if (cart.length === 0) return;
    setCart([]);
    toast.success("🎉 Order placed! Thank you for your purchase!");
  }, [cart]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Navbar
        cartCount={cart.length}
        onCartClick={() => setTab("cart")}
        onProductsClick={() => setTab("products")}
      />

      <Hero />
      <Stats />

      {/* ── PRODUCTS / CART SECTION ── */}
      <div className="main" id="products">
        <div className="sec-header">
          <h2>Premium Digital Tools</h2>
          <p>
            Choose from our curated collection of premium digital products
            designed to boost your productivity and creativity.
          </p>
        </div>

        <div className="tab-bar">
          <button
            className={`tab-btn${tab === "products" ? " active" : ""}`}
            onClick={() => setTab("products")}
          >
            Products
          </button>
          <button
            className={`tab-btn${tab === "cart" ? " active" : ""}`}
            onClick={() => setTab("cart")}
          >
            Cart {cart.length > 0 ? `(${cart.length})` : ""}
          </button>
        </div>

        {tab === "products" && (
          <div className="products-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        )}

        {tab === "cart" && (
          <Cart cart={cart} onRemove={handleRemove} onCheckout={handleCheckout} />
        )}
      </div>

      <Steps />
      <Pricing />

      {/* CTA */}
      <div className="cta">
        <h2>Ready To Transform Your Workflow?</h2>
        <p>Join thousands of professionals who are already using DigiTools to work smarter.</p>
        <div className="cta-btns">
          <button className="btn-white">Explore Products</button>
          <button className="btn-outline-white">View Pricing</button>
        </div>
        <p className="cta-note">14-day free trial · No credit card required · Cancel any time.</p>
      </div>

      <Footer />
    </>
  );
}
