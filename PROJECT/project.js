// project.js — DealSense India Frontend Logic & 30-Product Catalog

// Format numbers in Indian Rupee style (e.g., ₹1,29,999)
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// Fallback SVG if an external image fails to load
function handleImageError(img, title) {
  const encoded = encodeURIComponent(title.slice(0, 24));
  img.onerror = null;
  img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23eef2ff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="22" font-weight="bold" fill="%234f46e5">${encoded}</text></svg>`;
}

// 30 Real Indian E-Commerce Products (Fallback + Initial Dataset)
let DEALS = [
  { id: 1, title: "Samsung Galaxy S24 Ultra 5G (Titanium Gray, 256GB)", category: "Smartphones & Laptops", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Samsung+Galaxy+S24+Ultra+5G", dealPrice: 99999, originalPrice: 134999, discountPct: 26, dealScore: 96, isATL: true, bankOffer: "₹6,000 Off on HDFC Credit Cards", image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=600&q=80", history: [134999, 134999, 129999, 129999, 124999, 119999, 119999, 114999, 109999, 109999, 104999, 99999] },
  { id: 2, title: "Apple iPhone 16 (Black, 128GB)", category: "Smartphones & Laptops", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=Apple+iPhone+16+128GB", dealPrice: 67999, originalPrice: 79900, discountPct: 15, dealScore: 91, isATL: true, bankOffer: "₹4,000 Instant Off on ICICI Cards", image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80", history: [79900, 79900, 79900, 77900, 76900, 74900, 74900, 72999, 71999, 69999, 69999, 67999] },
  { id: 3, title: "Apple MacBook Air M2 (13.6-inch, 8GB RAM, 256GB SSD)", category: "Smartphones & Laptops", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Apple+MacBook+Air+M2", dealPrice: 73990, originalPrice: 99900, discountPct: 26, dealScore: 95, isATL: true, bankOffer: "₹5,000 Off on SBI Credit Card EMI", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80", history: [99900, 96900, 94900, 92900, 89990, 87990, 85990, 83990, 79990, 78990, 75990, 73990] },
  { id: 4, title: "OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB)", category: "Smartphones & Laptops", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=OnePlus+12+256GB", dealPrice: 54999, originalPrice: 64999, discountPct: 15, dealScore: 88, isATL: false, bankOffer: "₹3,000 Instant Bank Discount", image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=600&q=80", history: [64999, 64999, 62999, 61999, 59999, 59999, 57999, 53999, 56999, 55999, 54999, 54999] },
  { id: 5, title: "ASUS Vivobook 15 Intel Core i5 12th Gen (16GB/512GB)", category: "Smartphones & Laptops", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=ASUS+Vivobook+15+Core+i5+16GB", dealPrice: 44990, originalPrice: 69990, discountPct: 36, dealScore: 93, isATL: true, bankOffer: "10% Off on Axis Bank Credit Cards", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80", history: [69990, 65990, 62990, 59990, 57990, 54990, 52990, 49990, 48990, 47990, 46990, 44990] },
  { id: 6, title: "Nothing Phone (2a) 5G (Black, 8GB RAM, 256GB)", category: "Smartphones & Laptops", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=Nothing+Phone+2a+256GB", dealPrice: 21999, originalPrice: 27999, discountPct: 21, dealScore: 89, isATL: true, bankOffer: "₹2,000 Off on ICICI & SBI Cards", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80", history: [27999, 25999, 25999, 24999, 24999, 23999, 23999, 23499, 22999, 22999, 22499, 21999] },
  { id: 7, title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones", category: "Audio & Wearables", retailer: "Tata CLiQ", url: "https://www.tatacliq.com/search/?searchCategory=all&text=Sony%20WH-1000XM5", dealPrice: 23990, originalPrice: 34990, discountPct: 31, dealScore: 95, isATL: true, bankOffer: "10% Instant Off with Kotak Cards", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80", history: [34990, 32990, 31990, 29990, 29990, 28990, 27990, 26990, 25990, 24990, 24490, 23990] },
  { id: 8, title: "Apple AirPods Pro (2nd Gen) with USB-C MagSafe Case", category: "Audio & Wearables", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=AirPods+Pro+2nd+Gen+USB+C", dealPrice: 18999, originalPrice: 24900, discountPct: 24, dealScore: 92, isATL: true, bankOffer: "₹1,500 Off on HDFC Credit Cards", image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=600&q=80", history: [24900, 24900, 23900, 23499, 22999, 22499, 21999, 20999, 20499, 19999, 19499, 18999] },
  { id: 9, title: "Samsung Galaxy Watch6 Classic LTE (47mm, Black)", category: "Audio & Wearables", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=Samsung+Galaxy+Watch+6+Classic+47mm", dealPrice: 19999, originalPrice: 40999, discountPct: 51, dealScore: 97, isATL: true, bankOffer: "₹2,000 Extra Off on Axis Cards", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80", history: [40999, 36999, 34999, 32999, 29999, 27999, 25999, 24999, 22999, 21999, 20999, 19999] },
  { id: 10, title: "boAt Nirvana Ion ANC True Wireless Earbuds (120H Playback)", category: "Audio & Wearables", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=boAt+Nirvana+Ion+ANC", dealPrice: 1799, originalPrice: 7990, discountPct: 77, dealScore: 86, isATL: false, bankOffer: "5% Cashback on Amazon Pay ICICI", image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80", history: [2799, 2499, 2499, 2299, 2199, 1999, 1999, 1699, 1999, 1899, 1799, 1799] },
  { id: 11, title: "JBL Flip 6 Wireless Portable Bluetooth Speaker (IP67)", category: "Audio & Wearables", retailer: "Tata CLiQ", url: "https://www.tatacliq.com/search/?searchCategory=all&text=JBL%20Flip%206", dealPrice: 8499, originalPrice: 14999, discountPct: 43, dealScore: 90, isATL: true, bankOffer: "₹750 Off via Tata Neu HDFC Card", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80", history: [11999, 11499, 10999, 10999, 10499, 9999, 9999, 9499, 9299, 8999, 8799, 8499] },
  { id: 12, title: "Garmin Forerunner 55 GPS Running Smartwatch", category: "Audio & Wearables", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Garmin+Forerunner+55", dealPrice: 16490, originalPrice: 22990, discountPct: 28, dealScore: 87, isATL: false, bankOffer: "No-Cost EMI on Major Credit Cards", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", history: [20990, 19990, 19990, 18990, 18490, 17990, 17990, 15990, 17490, 16990, 16490, 16490] },
  { id: 13, title: "Nike Revolution 7 Men's Road Running Shoes", category: "Fashion & Footwear", retailer: "Myntra", url: "https://www.myntra.com/nike-revolution-7", dealPrice: 2695, originalPrice: 3695, discountPct: 27, dealScore: 89, isATL: true, bankOffer: "Extra 10% Off with Code MYNTRA10", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80", history: [3695, 3695, 3495, 3395, 3295, 3195, 3095, 2995, 2895, 2895, 2795, 2695] },
  { id: 14, title: "Adidas Ultraboost Light Running Shoes (Core Black)", category: "Fashion & Footwear", retailer: "Myntra", url: "https://www.myntra.com/adidas-ultraboost", dealPrice: 8999, originalPrice: 17999, discountPct: 50, dealScore: 95, isATL: true, bankOffer: "₹1,000 Off on Kotak & ICICI Cards", image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80", history: [17999, 16999, 15999, 14999, 13999, 12999, 11999, 11499, 10999, 9999, 9499, 8999] },
  { id: 15, title: "Levi's 511 Slim Fit Stretchable Men's Jeans", category: "Fashion & Footwear", retailer: "Myntra", url: "https://www.myntra.com/levis-511-slim-fit-jeans", dealPrice: 1799, originalPrice: 3599, discountPct: 50, dealScore: 91, isATL: true, bankOffer: "Buy 2 Get Extra 15% Off", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80", history: [3599, 3299, 2999, 2799, 2699, 2499, 2399, 2199, 2099, 1999, 1899, 1799] },
  { id: 16, title: "Puma Palermo Leather Unisex Sneakers", category: "Fashion & Footwear", retailer: "Tata CLiQ", url: "https://www.tatacliq.com/search/?searchCategory=all&text=Puma%20Palermo", dealPrice: 4549, originalPrice: 6999, discountPct: 35, dealScore: 88, isATL: false, bankOffer: "10% Instant Discount on SBI Cards", image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=600&q=80", history: [6999, 6999, 6499, 6299, 5999, 5599, 5299, 4399, 4999, 4799, 4699, 4549] },
  { id: 17, title: "Fossil Gen 6 Chronometer Stainless Steel Analog Watch", category: "Fashion & Footwear", retailer: "Myntra", url: "https://www.myntra.com/fossil-watches", dealPrice: 7495, originalPrice: 14995, discountPct: 50, dealScore: 92, isATL: true, bankOffer: "₹750 Off on HDFC Credit Cards", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80", history: [14995, 13995, 12995, 11995, 11495, 10995, 9995, 9495, 8995, 8495, 7995, 7495] },
  { id: 18, title: "Allen Solly Men's Regular Fit Cotton Casual Shirt", category: "Fashion & Footwear", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Allen+Solly+Mens+Cotton+Shirt", dealPrice: 1049, originalPrice: 2299, discountPct: 54, dealScore: 87, isATL: false, bankOffer: "5% Back with Amazon Pay ICICI", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80", history: [1899, 1799, 1699, 1599, 1499, 1399, 1299, 999, 1199, 1149, 1099, 1049] },
  { id: 19, title: "Dyson V8 Absolute Cord-Free Vacuum Cleaner", category: "Home & Appliances", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Dyson+V8+Absolute+Vacuum+Cleaner", dealPrice: 27900, originalPrice: 43900, discountPct: 36, dealScore: 94, isATL: true, bankOffer: "₹2,500 Instant Off on HDFC Cards", image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=600&q=80", history: [43900, 39900, 38900, 36900, 35900, 34900, 33900, 32900, 30900, 29900, 28900, 27900] },
  { id: 20, title: "Philips Air Fryer HD9252/90 (4.1L, Digital Touch Panel)", category: "Home & Appliances", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=Philips+Air+Fryer+HD9252", dealPrice: 6499, originalPrice: 11995, discountPct: 46, dealScore: 93, isATL: true, bankOffer: "₹650 Off on Flipkart Axis Bank Card", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80", history: [10995, 9999, 9499, 8999, 8499, 8199, 7999, 7499, 7199, 6999, 6799, 6499] },
  { id: 21, title: "LG 1.5 Ton 5 Star AI Dual Inverter Split AC (2025 Model)", category: "Home & Appliances", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=LG+1.5+Ton+5+Star+Dual+Inverter+AC", dealPrice: 43990, originalPrice: 78990, discountPct: 44, dealScore: 91, isATL: false, bankOffer: "₹3,000 Off on SBI Credit Cards", image: "https://images.unsplash.com/photo-1631545806609-c2b999c8f4c6?auto=format&fit=crop&w=600&q=80", history: [52990, 51990, 49990, 48990, 47990, 46990, 45990, 42990, 45490, 44990, 44490, 43990] },
  { id: 22, title: "Atomberg Renesa 1200mm BLDC Motor Ceiling Fan with Remote", category: "Home & Appliances", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=Atomberg+Renesa+1200mm+BLDC+Fan", dealPrice: 3199, originalPrice: 5190, discountPct: 38, dealScore: 90, isATL: true, bankOffer: "5% Unlimited Cashback on Axis Card", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80", history: [4299, 4199, 3999, 3899, 3799, 3699, 3599, 3499, 3399, 3349, 3249, 3199] },
  { id: 23, title: "Coway Airmega 150 HEPA Air Purifier (Anti-Virus True HEPA)", category: "Home & Appliances", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Coway+Airmega+150+Air+Purifier", dealPrice: 12999, originalPrice: 34900, discountPct: 63, dealScore: 96, isATL: true, bankOffer: "₹1,250 Instant Off on ICICI Cards", image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80", history: [18999, 17999, 17499, 16999, 16499, 15999, 15499, 14999, 14499, 13999, 13499, 12999] },
  { id: 24, title: "De'Longhi Dedica Style EC685 Espresso Coffee Machine", category: "Home & Appliances", retailer: "Tata CLiQ", url: "https://www.tatacliq.com/search/?searchCategory=all&text=DeLonghi%20Dedica", dealPrice: 19499, originalPrice: 28999, discountPct: 33, dealScore: 89, isATL: false, bankOffer: "₹1,500 Off via Tata Neu Card", image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80", history: [24999, 23999, 23499, 22999, 21999, 21499, 20999, 18999, 20499, 19999, 19799, 19499] },
  { id: 25, title: "Sony PlayStation 5 Slim Console (Disc Edition, 1TB SSD)", category: "Gaming & Cameras", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=Sony+PlayStation+5+Slim+Disc", dealPrice: 49990, originalPrice: 54990, discountPct: 9, dealScore: 92, isATL: true, bankOffer: "₹2,500 Off on HDFC & ICICI Cards", image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80", history: [54990, 54990, 54990, 54990, 53990, 53990, 52990, 52990, 51990, 50990, 50490, 49990] },
  { id: 26, title: "Canon EOS R50 Mirrorless Camera with RF-S 18-45mm Lens", category: "Gaming & Cameras", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Canon+EOS+R50+18-45mm", dealPrice: 58990, originalPrice: 75995, discountPct: 22, dealScore: 90, isATL: true, bankOffer: "₹3,000 Off on SBI Credit Cards", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80", history: [71990, 69990, 68990, 67990, 65990, 64990, 63990, 62990, 61990, 60990, 59990, 58990] },
  { id: 27, title: "Logitech G502 HERO High Performance Wired Gaming Mouse", category: "Gaming & Cameras", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=Logitech+G502+HERO", dealPrice: 3695, originalPrice: 5495, discountPct: 33, dealScore: 91, isATL: false, bankOffer: "5% Cashback on Amazon Pay ICICI", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80", history: [4695, 4495, 4395, 4295, 4195, 3995, 3995, 3495, 3895, 3795, 3695, 3695] },
  { id: 28, title: "GoPro HERO12 Black Waterproof Action Camera (5.3K60)", category: "Gaming & Cameras", retailer: "Flipkart", url: "https://www.flipkart.com/search?q=GoPro+HERO12+Black", dealPrice: 32990, originalPrice: 45000, discountPct: 27, dealScore: 93, isATL: true, bankOffer: "₹2,000 Off on Axis Bank Credit Cards", image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80", history: [42990, 41990, 39990, 38990, 37990, 36990, 35990, 34990, 34490, 33990, 33490, 32990] },
  { id: 29, title: "LG UltraGear 27-inch QHD 180Hz IPS Gaming Monitor (27GS75Q)", category: "Gaming & Cameras", retailer: "Amazon.in", url: "https://www.amazon.in/s?k=LG+UltraGear+27+inch+QHD+180Hz", dealPrice: 21499, originalPrice: 34000, discountPct: 37, dealScore: 94, isATL: true, bankOffer: "₹1,750 Off on HDFC Credit Cards", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80", history: [28999, 27999, 26999, 25999, 25499, 24999, 23999, 23499, 22999, 22499, 21999, 21499] },
  { id: 30, title: "Keychron K2 V2 Wireless Mechanical Keyboard (Hot-Swappable)", category: "Gaming & Cameras", retailer: "Tata CLiQ", url: "https://www.tatacliq.com/search/?searchCategory=all&text=Keychron%20K2", dealPrice: 7999, originalPrice: 10999, discountPct: 27, dealScore: 89, isATL: false, bankOffer: "10% Off on Kotak Credit Cards", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80", history: [9999, 9499, 9299, 8999, 8799, 8499, 8499, 7699, 8299, 8199, 7999, 7999] }
];

// Application State
let state = {
  search: '',
  category: 'All',
  retailer: 'All Stores',
  atlOnly: false,
  sortBy: 'score',
  watchlist: JSON.parse(localStorage.getItem('dealsense_inr_watchlist') || '[]'),
  activeModalDealId: null
};

const CATEGORIES = ['All', 'Smartphones & Laptops', 'Audio & Wearables', 'Fashion & Footwear', 'Home & Appliances', 'Gaming & Cameras'];
const RETAILERS = ['All Stores', 'Amazon.in', 'Flipkart', 'Myntra', 'Tata CLiQ'];

// Retailer Badge Colors
function getRetailerBadgeStyle(retailer) {
  const map = {
    'Amazon.in': 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    'Flipkart': 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    'Myntra': 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    'Tata CLiQ': 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800'
  };
  return map[retailer] || 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200';
}

// Generate Mini Inline SVG Sparkline
function createSparklineSVG(history, isATL) {
  const min = Math.min(...history);
  const max = Math.max(...history);
  const range = max - min || 1;
  const width = 120;
  const height = 32;
  const pad = 3;

  const points = history.map((val, idx) => {
    const x = pad + (idx / (history.length - 1)) * (width - pad * 2);
    const y = height - pad - ((val - min) / range) * (height - pad * 2);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const lastCoords = points.split(' ').pop().split(',');
  const strokeColor = isATL ? '#10b981' : '#6366f1';

  return `
    <svg viewBox="0 0 ${width} ${height}" class="w-28 h-8 overflow-visible">
      <polyline fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${points}" />
      <circle cx="${lastCoords[0]}" cy="${lastCoords[1]}" r="3" fill="${strokeColor}" />
    </svg>
  `;
}

// Render Category & Store Filter Pills
function renderFilterPills() {
  const catContainer = document.getElementById('categoryFilters');
  catContainer.innerHTML = CATEGORIES.map(cat => {
    const active = state.category === cat;
    return `
      <button
        onclick="setCategory('${cat}')"
        class="px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
          active
            ? 'bg-indigo-600 text-white shadow-sm'
            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
        }"
      >${cat}</button>
    `;
  }).join('');

  const retContainer = document.getElementById('retailerFilters');
  retContainer.innerHTML = RETAILERS.map(ret => {
    const active = state.retailer === ret;
    return `
      <button
        onclick="setRetailer('${ret}')"
        class="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
          active
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
            : 'bg-slate-200/70 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-300/70 dark:hover:bg-slate-700'
        }"
      >${ret}</button>
    `;
  }).join('');
}

// Update Hero Stats
function updateStats() {
  document.getElementById('statTotal').textContent = DEALS.length;
  const atlCount = DEALS.filter(d => d.isATL).length;
  document.getElementById('statATL').textContent = atlCount;
  const avgDisc = Math.round(DEALS.reduce((sum, d) => sum + d.discountPct, 0) / DEALS.length);
  document.getElementById('statAvgDiscount').textContent = avgDisc + '%';
}

// Main Grid Rendering
function renderDeals() {
  const query = state.search.trim().toLowerCase();

  let filtered = DEALS.filter(deal => {
    const matchesSearch =
      !query ||
      deal.title.toLowerCase().includes(query) ||
      deal.category.toLowerCase().includes(query) ||
      deal.retailer.toLowerCase().includes(query) ||
      (deal.bankOffer && deal.bankOffer.toLowerCase().includes(query));
    const matchesCategory = state.category === 'All' || deal.category === state.category;
    const matchesRetailer = state.retailer === 'All Stores' || deal.retailer === state.retailer;
    const matchesATL = !state.atlOnly || deal.isATL;
    return matchesSearch && matchesCategory && matchesRetailer && matchesATL;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (state.sortBy === 'discount') return b.discountPct - a.discountPct;
    if (state.sortBy === 'priceLow') return a.dealPrice - b.dealPrice;
    if (state.sortBy === 'priceHigh') return b.dealPrice - a.dealPrice;
    return b.dealScore - a.dealScore;
  });

  // Count & Reset Button
  document.getElementById('resultsCount').textContent = `Showing ${filtered.length} of ${DEALS.length} deals`;
  const hasActiveFilters = query || state.category !== 'All' || state.retailer !== 'All Stores' || state.atlOnly;
  document.getElementById('resetFiltersBtn').classList.toggle('hidden', !hasActiveFilters);

  const grid = document.getElementById('dealsGrid');
  const emptyState = document.getElementById('emptyState');

  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');

  grid.innerHTML = filtered.map(deal => {
    const isSaved = state.watchlist.includes(deal.id);
    const scoreColor = deal.dealScore >= 93 ? 'bg-emerald-600' : deal.dealScore >= 88 ? 'bg-indigo-600' : 'bg-amber-600';

    return `
      <article class="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
        <!-- Image Header -->
        <div class="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src="${deal.image}"
            alt="${deal.title}"
            loading="lazy"
            onerror="handleImageError(this, '${deal.title.replace(/'/g, '')}')"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div class="absolute top-3 left-3 px-2.5 py-1 rounded-lg ${scoreColor} text-white text-xs font-extrabold shadow">
            AI Score ${deal.dealScore}
          </div>

          ${deal.isATL ? `
            <div class="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-emerald-500/95 text-white text-[11px] font-bold uppercase tracking-wide shadow">
              ★ All-Time Low
            </div>
          ` : ''}

          <button
            onclick="toggleWatchlist(${deal.id})"
            aria-label="Save to Watchlist"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition ${
              isSaved ? 'text-indigo-600' : 'text-slate-500 dark:text-slate-300'
            }"
          >
            <svg class="w-4 h-4" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        <!-- Card Body -->
        <div class="p-4 flex-1 flex flex-col">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="px-2.5 py-0.5 rounded-md border text-[11px] font-bold ${getRetailerBadgeStyle(deal.retailer)}">
              ${deal.retailer}
            </span>
            <span class="text-[11px] font-medium text-slate-400 truncate">${deal.category}</span>
          </div>

          <h3 class="font-bold text-sm sm:text-base leading-snug line-clamp-2 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
            ${deal.title}
          </h3>

          ${deal.bankOffer ? `
            <div class="mb-3 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/50 text-[11px] font-semibold text-amber-800 dark:text-amber-300 truncate">
              💳 ${deal.bankOffer}
            </div>
          ` : ''}

          <div class="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-end justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">${formatINR(deal.dealPrice)}</span>
                <span class="px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold">
                  -${deal.discountPct}%
                </span>
              </div>
              <div class="text-xs text-slate-400 line-through mt-0.5">MRP ${formatINR(deal.originalPrice)}</div>
            </div>

            <div class="text-right">
              ${createSparklineSVG(deal.history, deal.isATL)}
              <span class="block text-[10px] text-slate-400 mt-0.5">90d trend</span>
            </div>
          </div>

          <div class="mt-4 grid grid-cols-2 gap-2">
            <button
              onclick="openHistoryModal(${deal.id})"
              class="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 transition"
            >
              Price History
            </button>
            <a
              href="${deal.url}"
              target="_blank"
              rel="noopener noreferrer"
              class="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold text-center transition"
            >
              View Deal ↗
            </a>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// Price History Modal Logic
function openHistoryModal(dealId) {
  const deal = DEALS.find(d => d.id === dealId);
  if (!deal) return;

  state.activeModalDealId = dealId;
  const min = Math.min(...deal.history);
  const max = Math.max(...deal.history);

  document.getElementById('modalRetailer').textContent = deal.retailer;
  document.getElementById('modalCategory').textContent = deal.category;
  document.getElementById('modalTitle').textContent = deal.title;
  document.getElementById('modalCurrentPrice').textContent = formatINR(deal.dealPrice);
  document.getElementById('modalMinPrice').textContent = formatINR(min);
  document.getElementById('modalMaxPrice').textContent = formatINR(max);
  document.getElementById('modalBuyLink').href = deal.url;
  document.getElementById('modalUpdatedAt').textContent = deal.lastUpdated
    ? `Synced ${new Date(deal.lastUpdated).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
    : 'Verified 90-day tracking';

  const verdictEl = document.getElementById('modalVerdict');
  if (deal.isATL) {
    verdictEl.textContent = `Strong Buy — Currently sitting at its lowest recorded price (${formatINR(deal.dealPrice)}) over the last 90 days, saving you ${formatINR(deal.originalPrice - deal.dealPrice)} off MRP.`;
  } else {
    verdictEl.textContent = `Good Deal — Priced ${formatINR(deal.dealPrice - min)} above its 90-day floor (${formatINR(min)}). Applying the ${deal.bankOffer || 'available card offer'} brings it near all-time low territory.`;
  }

  const isSaved = state.watchlist.includes(deal.id);
  document.getElementById('modalSaveBtn').textContent = isSaved ? '✓ Saved in Watchlist' : 'Save to Watchlist';

  const w = 480, h = 150, padX = 16, padY = 18;
  const range = max - min || 1;
  const coords = deal.history.map((val, i) => {
    const x = padX + (i / (deal.history.length - 1)) * (w - padX * 2);
    const y = h - padY - ((val - min) / range) * (h - padY * 2);
    return { x, y, val };
  });

  const linePoints = coords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const areaPoints = `${padX},${h - padY} ${linePoints} ${w - padX},${h - padY}`;

  document.getElementById('modalChartContainer').innerHTML = `
    <svg viewBox="0 0 ${w} ${h}" class="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#6366f1" stop-opacity="0.3" />
          <stop offset="100%" stop-color="#6366f1" stop-opacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points="${areaPoints}" fill="url(#chartGrad)" />
      <polyline fill="none" stroke="#6366f1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${linePoints}" />
      ${coords.map((c, idx) => `
        <circle cx="${c.x.toFixed(1)}" cy="${c.y.toFixed(1)}" r="${idx === coords.length - 1 ? 5 : 3}" fill="${idx === coords.length - 1 ? '#10b981' : '#6366f1'}" />
      `).join('')}
    </svg>
  `;

  const modal = document.getElementById('historyModal');
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}

function closeHistoryModal() {
  const modal = document.getElementById('historyModal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  state.activeModalDealId = null;
}

// Watchlist Management
function toggleWatchlist(dealId) {
  if (state.watchlist.includes(dealId)) {
    state.watchlist = state.watchlist.filter(id => id !== dealId);
  } else {
    state.watchlist.push(dealId);
  }
  localStorage.setItem('dealsense_inr_watchlist', JSON.stringify(state.watchlist));
  renderDeals();
  updateWatchlistUI();
  if (state.activeModalDealId === dealId) {
    const isSaved = state.watchlist.includes(dealId);
    document.getElementById('modalSaveBtn').textContent = isSaved ? '✓ Saved in Watchlist' : 'Save to Watchlist';
  }
}

function updateWatchlistUI() {
  document.getElementById('watchlistBadge').textContent = state.watchlist.length;
  const container = document.getElementById('watchlistItems');
  const savedDeals = DEALS.filter(d => state.watchlist.includes(d.id));

  if (savedDeals.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 text-slate-400">
        <p class="text-sm font-semibold">Your watchlist is empty</p>
        <p class="text-xs mt-1">Click the bookmark icon on any product to track price drops.</p>
      </div>
    `;
    document.getElementById('watchlistTotalSavings').textContent = '₹0';
    return;
  }

  const totalSavings = savedDeals.reduce((sum, d) => sum + (d.originalPrice - d.dealPrice), 0);
  document.getElementById('watchlistTotalSavings').textContent = formatINR(totalSavings);

  container.innerHTML = savedDeals.map(deal => `
    <div class="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
      <img src="${deal.image}" alt="${deal.title}" onerror="handleImageError(this, '${deal.title.replace(/'/g, '')}')" class="w-14 h-14 rounded-lg object-cover shrink-0" />
      <div class="flex-1 min-w-0">
        <div class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400">${deal.retailer}</div>
        <h4 class="text-xs font-bold truncate">${deal.title}</h4>
        <div class="flex items-center gap-2 mt-1">
          <span class="text-sm font-extrabold">${formatINR(deal.dealPrice)}</span>
          <span class="text-[11px] text-emerald-600 font-bold">Save ${formatINR(deal.originalPrice - deal.dealPrice)}</span>
        </div>
      </div>
      <button onclick="toggleWatchlist(${deal.id})" class="p-1.5 text-slate-400 hover:text-rose-500" title="Remove">✕</button>
    </div>
  `).join('');
}

// Filter Helpers
function setCategory(cat) {
  state.category = cat;
  renderFilterPills();
  renderDeals();
}

function setRetailer(ret) {
  state.retailer = ret;
  renderFilterPills();
  renderDeals();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchInput').addEventListener('input', e => {
    state.search = e.target.value;
    renderDeals();
  });

  document.getElementById('atlOnlyToggle').addEventListener('change', e => {
    state.atlOnly = e.target.checked;
    renderDeals();
  });

  document.getElementById('sortSelect').addEventListener('change', e => {
    state.sortBy = e.target.value;
    renderDeals();
  });

  document.getElementById('resetFiltersBtn').addEventListener('click', () => {
    state.search = '';
    state.category = 'All';
    state.retailer = 'All Stores';
    state.atlOnly = false;
    document.getElementById('searchInput').value = '';
    document.getElementById('atlOnlyToggle').checked = false;
    renderFilterPills();
    renderDeals();
  });

  document.getElementById('themeToggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  document.getElementById('closeModalBtn').addEventListener('click', closeHistoryModal);
  document.getElementById('historyModal').addEventListener('click', e => {
    if (e.target.id === 'historyModal') closeHistoryModal();
  });
  document.getElementById('modalSaveBtn').addEventListener('click', () => {
    if (state.activeModalDealId) toggleWatchlist(state.activeModalDealId);
  });

  document.getElementById('openWatchlistBtn').addEventListener('click', () => {
    document.getElementById('watchlistDrawer').classList.remove('hidden');
  });
  document.getElementById('closeDrawerBtn').addEventListener('click', () => {
    document.getElementById('watchlistDrawer').classList.add('hidden');
  });
  document.getElementById('drawerBackdrop').addEventListener('click', () => {
    document.getElementById('watchlistDrawer').classList.add('hidden');
  });
  document.getElementById('clearWatchlistBtn').addEventListener('click', () => {
    state.watchlist = [];
    localStorage.setItem('dealsense_inr_watchlist', '[]');
    renderDeals();
    updateWatchlistUI();
  });

  // Optional Live Sync with products.json (used when hosted on GitHub Pages)
  async function syncLiveProducts() {
    try {
      const res = await fetch(`./products.json?t=${Date.now()}`);
      if (res.ok) {
        const liveData = await res.json();
        if (Array.isArray(liveData) && liveData.length > 0) {
          DEALS = liveData;
          document.getElementById('syncStatusText').textContent = `Live Synced • ${DEALS.length} Verified INR Deals`;
          updateStats();
          renderDeals();
          updateWatchlistUI();
        }
      }
    } catch (_) {
      // Silently uses embedded 30-product dataset when opened locally
    }
  }

  // Initialize App
  renderFilterPills();
  updateStats();
  renderDeals();
  updateWatchlistUI();
  syncLiveProducts();
});