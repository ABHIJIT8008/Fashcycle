import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Menu, X, CheckCircle2, Search, Calendar, CreditCard, RefreshCcw,
  Package, BarChart3, Leaf, Droplets, RefreshCw, ArrowRight, MapPin,
  Phone, MessageSquare, ChevronLeft, ChevronRight
} from 'lucide-react';
import { useContent } from './contexts/ContentContext';

const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2 9.5 2 12c0 2.5.5 4.9.5 4.9C3.1 18.5 4.5 19 8.5 19.5 10.8 19.8 12 20 12 20s1.2-.2 3.5-.5c4-.5 5.4-1 6-2.6.5 0 1-2.4 1-4.9 0-2.5-.5-4.9-.5-4.9C20.9 5.5 19.5 5 15.5 4.5 13.2 4.2 12 4 12 4s-1.2.2-3.5.5C4.5 5 3.1 5.5 2.5 7.1z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>);

const Logo = ({ className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <img src="/LOGO1.png" alt="Fashcycle" className="h-10 md:h-12 w-auto object-contain" />
  </div>
);

const PlayStoreBadge = () => (
  <a href="https://play.google.com/store/apps/details?id=com.fashcycle&hl=en_IN" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform drop-shadow-md">
    <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-12" />
  </a>
);

const AppStoreBadge = () => (
  <a href="https://apps.apple.com/in/app/fashcycle/id6748541060" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform drop-shadow-md">
    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" className="h-12" />
  </a>
);

/* ── Store Owner Image Slider ── */
function StoreOwnerSlider({ slides }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4500);
    return () => clearInterval(timer);
  }, [slides?.length]);

  if (!slides || slides.length === 0) {
    return (
      <div className="h-56 flex flex-col items-center justify-center text-white/40 bg-white/5 rounded-xl border border-white/10 gap-2">
        <BarChart3 size={32} className="opacity-40" />
        <p className="text-sm">Product showcase images coming soon.</p>
      </div>
    );
  }

  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent(c => (c + 1) % slides.length);

  return (
    <div className="relative rounded-xl overflow-hidden">
      <div className="relative h-64">
        {slides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            {slide.image
              ? <img src={slide.image} alt={slide.productName} className="w-full h-full object-cover" />
              : <div className="w-full h-full bg-white/10" />
            }
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              {slide.productName && (
                <p className="text-white font-heading font-semibold text-lg leading-tight">{slide.productName}</p>
              )}
              {slide.revenue && (
                <p className="text-yellow-300 font-bold text-2xl mt-0.5">{slide.revenue}</p>
              )}
              {slide.caption && (
                <p className="text-gray-300 text-sm mt-1">{slide.caption}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-colors z-10">
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === current ? 'bg-white w-5' : 'bg-white/50 w-1.5'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [showContactUs, setShowContactUs] = useState(false);
  const [showStoreForm, setShowStoreForm] = useState(false);
  const [submittingStoreForm, setSubmittingStoreForm] = useState(false);
  const [storeForm, setStoreForm] = useState({
    ownerName: '',
    storeName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    productTypes: '',
    inventorySize: '',
    priceRange: '',
    notes: ''
  });
  const { content, updateSection } = useContent();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDownload = () => {
    document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  async function handleStoreFormSubmit(e) {
    e.preventDefault();
    setSubmittingStoreForm(true);
    const submission = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      submittedAt: new Date().toISOString(),
      ...Object.fromEntries(Object.entries(storeForm).map(([key, value]) => [key, value.trim()]))
    };
    const existingItems = content.storeApplications?.items || [];
    await updateSection('storeApplications', { items: [submission, ...existingItems] });
    setSubmittingStoreForm(false);
    setShowStoreForm(false);
    setStoreForm({
      ownerName: '',
      storeName: '',
      phone: '',
      email: '',
      city: '',
      address: '',
      productTypes: '',
      inventorySize: '',
      priceRange: '',
      notes: ''
    });
    alert('Your store details were submitted successfully. Our team will contact you soon.');
  }

  return (
    <div className="min-h-screen bg-white font-body text-text-dark">

      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-3 text-text-dark' : 'bg-transparent py-5 text-white'}`}>
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex-shrink-0">
            <Logo className={!scrolled ? 'bg-white/90 p-1.5 rounded-lg shadow-sm' : ''} />
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-sm font-medium hover:opacity-70 transition-opacity">How It Works</a>
            <a href="https://www.fashcycle.com/sustainability" className="text-sm font-medium hover:opacity-70 transition-opacity">Sustainability</a>
            <a href="https://www.fashcycle.com/about-us" className="text-sm font-medium hover:opacity-70 transition-opacity">About Us</a>
            <a
              href="#store-owners"
              className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${
                scrolled
                  ? 'bg-primary text-white hover:bg-accent'
                  : 'bg-white/20 border border-white/50 hover:bg-white/30'
              }`}
            >
              For Store Owners
            </a>
          </div>

          <div className="hidden md:block">
            <button onClick={scrollToDownload} className={`px-6 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wide transition-colors ${scrolled ? 'bg-primary text-white hover:bg-accent' : 'bg-white text-primary hover:bg-gray-100'}`}>
              Download App
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} className={scrolled ? 'text-primary' : 'text-white'} /> : <Menu size={28} className={scrolled ? 'text-primary' : 'text-white'} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 gap-4 text-text-dark">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">How It Works</a>
            <a href="https://www.fashcycle.com/sustainability" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">Sustainability</a>
            <a href="https://www.fashcycle.com/about-us" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">About Us</a>
            <a href="#store-owners" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-semibold py-2 border-b border-gray-50 flex items-center justify-between text-primary">
              For Store Owners
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded-full">Owners</span>
            </a>
            <button onClick={scrollToDownload} className="mt-4 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide w-full">
              Download App
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-0 md:h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src={content.hero.backgroundImage}
            alt="Indian occasion wear fashion rental"
            className="w-full h-full object-cover object-[center_15%] md:object-[center_top]"
          />
          <div className="absolute inset-0 bg-[#1b3226]/60"></div>
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-0 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
              India's Rental Fashion Marketplace.
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
              Discover Lehenga, Gown, Sherwani and Occasion Wear in — Select Dress — Visit/Call Shop and Book.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <PlayStoreBadge />
              <AppStoreBadge />
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span>Verified Rental Store</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span>Real-time Availability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span>Verify Booking by Calling Store Directly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">20+</h3>
              <p className="text-sm md:text-base opacity-80 uppercase tracking-wider font-medium">Rental Stores</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">10k+</h3>
              <p className="text-sm md:text-base opacity-80 uppercase tracking-wider font-medium">Outfits Listed</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">XS-XXXL</h3>
              <p className="text-sm md:text-base opacity-80 uppercase tracking-wider font-medium">Size Inclusive</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">90%</h3>
              <p className="text-sm md:text-base opacity-80 uppercase tracking-wider font-medium">Savings vs Retail</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 md:py-32 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">How Fashcycle Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your next stunning look is just a few taps away.</p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1">
              {[
                { icon: <MapPin className="text-white" size={24} />, title: "Discover Near You", desc: "Search by size, style, occasion & your city." },
                { icon: <Calendar className="text-white" size={24} />, title: "Book Your Look", desc: "Reserve your outfit in real-time." },
                { icon: <Phone className="text-white" size={24} />, title: "Directly Call/Visit store for Booking", desc: "Visit or call the store directly to confirm your booking." },
                { icon: <RefreshCcw className="text-white" size={24} />, title: "Wear & Return", desc: "Enjoy it, return it hassle-free." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-primary mb-2 flex items-center gap-3">{step.title}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-1/2 flex justify-center gap-4 md:gap-8 order-1 lg:order-2 overflow-x-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-off-white via-transparent to-off-white z-10 pointer-events-none md:hidden"></div>

              <div className="relative w-48 md:w-64 h-[400px] md:h-[500px] rounded-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden flex-shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-500 group/mockup">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
                <img src={content.howItWorks.phone1Image} alt="App Discover" className="w-full h-full object-cover opacity-60 group-hover/mockup:opacity-80 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <Search size={48} className="text-white mb-4 drop-shadow-lg" />
                  <p className="text-white font-semibold text-sm drop-shadow-md">Discover Outfits</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
              </div>

              <div className="relative w-48 md:w-64 h-[400px] md:h-[500px] rounded-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden flex-shrink-0 transform translate-y-8 hover:translate-y-4 transition-transform duration-500 group/mockup">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
                <img src={content.howItWorks.phone2Image} alt="App Booking" className="w-full h-full object-cover opacity-60 group-hover/mockup:opacity-80 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <Calendar size={48} className="text-white mb-4 drop-shadow-lg" />
                  <p className="text-white font-semibold text-sm drop-shadow-md">Book Real-time</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
              </div>

              <div className="hidden md:block relative w-64 h-[500px] rounded-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden flex-shrink-0 transform rotate-3 hover:rotate-0 transition-transform duration-500 group/mockup">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
                <img src={content.howItWorks.phone3Image} alt="App Return" className="w-full h-full object-cover opacity-60 group-hover/mockup:opacity-80 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <RefreshCcw size={48} className="text-white mb-4 drop-shadow-lg" />
                  <p className="text-white font-semibold text-sm drop-shadow-md">Wear & Return</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">Find Your Perfect Look</h2>
              <p className="text-lg text-gray-600">Browse by occasion, style, or category.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 font-semibold text-primary hover:text-accent transition-colors">
              View All <ArrowRight size={20} />
            </button>
          </div>

          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-4 gap-6 snap-x hide-scrollbar">
            {(content.categories.items || []).map((cat, idx) => (
              <div key={cat.id || idx} className="relative w-64 md:w-auto h-80 flex-shrink-0 snap-start rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                <img src={cat.img} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1b3226]/90 via-[#1b3226]/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                  <h3 className="font-heading text-2xl font-bold mb-2">{cat.title}</h3>
                  <div className="flex items-center gap-2 text-sm font-medium opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Browse</span> <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-4 md:hidden flex justify-center items-center gap-2 font-semibold text-primary border border-gray-200 rounded-xl">
            View All Categories <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* PARTNERS SECTION */}
      <section className="py-20 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Fashcycle works with local rental stores across Indore and beyond.</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            {(content.partners.items || []).length > 0
              ? (content.partners.items).map((partner, idx) => (
                  <div key={partner.id || idx} className="w-32 h-20 md:w-40 md:h-24 bg-white rounded-xl flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    {partner.logo
                      ? <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-2" />
                      : <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest px-2 text-center">{partner.name || 'Partner'}</span>
                    }
                  </div>
                ))
              : [1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="w-32 h-20 md:w-40 md:h-24 bg-gray-200/60 rounded-xl flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Partner Logo</span>
                  </div>
                ))
            }
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY SECTION */}
      <section className="py-12 md:py-20 bg-off-white relative overflow-hidden border-t border-gray-200">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1b3226 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16">Fashion That Doesn't Cost the Earth</h2>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"><Leaf size={32} /></div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Reduce Fashion Waste</h3>
              <p className="text-gray-600 leading-relaxed">Over half of fast fashion is discarded within a year. Renting extends the lifecycle of every garment.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"><Droplets size={32} /></div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Save Resources</h3>
              <p className="text-gray-600 leading-relaxed">Renting saves up to 24% water compared to buying new. Look good while conserving precious resources.</p>
            </div>
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary"><RefreshCw size={32} /></div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Circular Economy</h3>
              <p className="text-gray-600 leading-relaxed">1 in 5 garments must be traded circularly by 2030 to meet Paris Agreement goals. Be part of the solution.</p>
            </div>
          </div>

          <a href="https://www.fashcycle.com/sustainability" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors border-b-2 border-primary pb-1">
            Learn More About Sustainability <ArrowRight size={20} />
          </a>
        </div>
      </section>

      {/* FOR STORE OWNERS */}
      <section id="store-owners" className="py-12 md:py-20 bg-primary text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
                Own a Rental Store? Go Digital.{' '}
                <span className="text-yellow-300">Free Trial for 1-Year.</span>
              </h2>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Join Fashcycle's SaaS platform — <strong>The Rent Manager</strong> — and put your inventory online. Manage bookings, track availability, reach thousands.
              </p>

              <div className="space-y-6 mb-12">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg"><Package size={24} className="text-white" /></div>
                  <div>
                    <h4 className="font-heading text-xl font-bold mb-1">Smart Inventory Management</h4>
                    <p className="text-gray-400">Track all your outfits in one place.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg"><MessageSquare size={24} className="text-white" /></div>
                  <div>
                    <h4 className="font-heading text-xl font-bold mb-1">WhatsApp Notifications</h4>
                    <p className="text-gray-400">Get all booking & return notifications on your WhatsApp.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg"><Calendar size={24} className="text-white" /></div>
                  <div>
                    <h4 className="font-heading text-xl font-bold mb-1">Real-time Booking Calendar</h4>
                    <p className="text-gray-400">Never double-book an outfit again.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white/10 rounded-lg"><BarChart3 size={24} className="text-white" /></div>
                  <div>
                    <h4 className="font-heading text-xl font-bold mb-1">Business Analytics Dashboard</h4>
                    <p className="text-gray-400">Understand your top performing inventory.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowStoreForm(true)}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors w-full sm:w-auto"
              >
                List Your Store →
              </button>
            </div>

            {/* Dynamic image slider replaces static stats */}
            <div className="w-full lg:w-1/2">
              <div className="bg-[#15271d] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 z-10 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">BETA</div>
                <StoreOwnerSlider slides={content.storeOwnerSlides?.items || []} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USER TESTIMONIALS */}
      <section className="py-12 md:py-20 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">What F-Cians Are Saying</h2>
            <p className="text-lg text-gray-600">Join a community of conscious fashion lovers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {(content.testimonials.items || []).map((testimonial, idx) => (
              <div key={testimonial.id || idx} className="bg-white p-8 rounded-2xl shadow-sm relative">
                <div className="absolute top-6 right-8 text-6xl font-heading text-primary/10 leading-none">"</div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  {testimonial.img && (
                    <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                  )}
                  <div>
                    <h4 className="font-heading font-bold text-primary">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* APP DOWNLOAD CTA BANNER */}
      <section id="download-section" className="bg-primary py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6">
            Start Renting. Start Earning.<br />Start Today.
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join the F-Cian tribe — download the Fashcycle app now.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <PlayStoreBadge />
            <AppStoreBadge />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-primary pt-20 pb-8 text-white border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6">
                <Logo className="bg-white/10 p-2 rounded-lg inline-block" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Fashcycle is India's fashion rental marketplace — connecting conscious women with local rental stores. Rent. Lend. Wear. Repeat.
              </p>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="https://www.fashcycle.com/about-us" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Vision</a></li>
                <li><a href="https://www.fashcycle.com/sustainability" className="text-gray-400 hover:text-white transition-colors">Sustainability</a></li>
                <li><a href="#store-owners" className="text-gray-400 hover:text-white transition-colors">For Store Owners</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-4">
                <li>
                  <button onClick={() => setShowHelpCenter(true)} className="text-gray-400 hover:text-white transition-colors text-left">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowContactUs(true)} className="text-gray-400 hover:text-white transition-colors text-left">
                    Contact Us
                  </button>
                </li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-4">
                <li><a href="https://www.fashcycle.com/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="https://www.fashcycle.com/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="https://www.fashcycle.com/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2025 AMKA JHAMKA PRIVATE LIMITED. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon /></a>
              <a href={content.contact.facebook}  target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon /></a>
              <a href={content.contact.twitter}   target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
              <a href={content.contact.youtube}   target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><YoutubeIcon /></a>
              <Link to="/admin/login" className="text-[10px] uppercase tracking-[0.2em] text-white/20 hover:text-white/45 transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* STORE LISTING FORM MODAL */}
      {showStoreForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => !submittingStoreForm && setShowStoreForm(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[88vh] overflow-y-auto p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="font-heading text-3xl font-bold text-primary">List Your Store</h2>
                <p className="text-sm text-gray-500 mt-1">Tell us about your rental store and products.</p>
              </div>
              <button onClick={() => !submittingStoreForm && setShowStoreForm(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleStoreFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" required value={storeForm.ownerName} onChange={e => setStoreForm(prev => ({ ...prev, ownerName: e.target.value }))} placeholder="Owner Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" required value={storeForm.storeName} onChange={e => setStoreForm(prev => ({ ...prev, storeName: e.target.value }))} placeholder="Store Name" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="tel" required value={storeForm.phone} onChange={e => setStoreForm(prev => ({ ...prev, phone: e.target.value }))} placeholder="Phone Number" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="email" required value={storeForm.email} onChange={e => setStoreForm(prev => ({ ...prev, email: e.target.value }))} placeholder="Email Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" required value={storeForm.city} onChange={e => setStoreForm(prev => ({ ...prev, city: e.target.value }))} placeholder="City" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" required value={storeForm.address} onChange={e => setStoreForm(prev => ({ ...prev, address: e.target.value }))} placeholder="Store Address" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" required value={storeForm.productTypes} onChange={e => setStoreForm(prev => ({ ...prev, productTypes: e.target.value }))} placeholder="Products You Rent (e.g. Lehenga, Gown)" className="md:col-span-2 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" value={storeForm.inventorySize} onChange={e => setStoreForm(prev => ({ ...prev, inventorySize: e.target.value }))} placeholder="Approx. Inventory Size (optional)" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <input type="text" value={storeForm.priceRange} onChange={e => setStoreForm(prev => ({ ...prev, priceRange: e.target.value }))} placeholder="Rental Price Range (optional)" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
              <textarea rows={4} value={storeForm.notes} onChange={e => setStoreForm(prev => ({ ...prev, notes: e.target.value }))} placeholder="Anything else you'd like us to know? (optional)" className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" />

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowStoreForm(false)} className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={submittingStoreForm} className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-accent transition-colors disabled:opacity-60">
                  {submittingStoreForm ? 'Submitting...' : 'Submit Details'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HELP CENTER MODAL */}
      {showHelpCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowHelpCenter(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-primary">Help Center</h2>
              <button onClick={() => setShowHelpCenter(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-6">
              {[
                { q: "How do I rent an outfit?", a: "Browse outfits on the app, select your size and rental dates, then visit or call the store directly to confirm your booking." },
                { q: "How do I return an outfit?", a: "Return the outfit to the store on or before your return date. The store owner will inspect it and confirm the return." },
                { q: "What if the outfit doesn't fit?", a: "Visit the store before your event to try the outfit. If it doesn't fit, the store owner will help find a suitable alternative." },
                { q: "What sizes are available?", a: "Fashcycle is size-inclusive — we offer sizes from XS to XXXL across all categories." },
                { q: "How do I list my store on Fashcycle?", a: "Click 'List Your Store' on the website and fill in your store details. Our team will get in touch within 24 hours." },
                { q: "Is there a free trial for store owners?", a: "Yes! Store owners get a free 1-year trial on The Rent Manager SaaS platform." },
                { q: "How do WhatsApp notifications work?", a: "Store owners automatically receive booking and return notifications on their registered WhatsApp number after onboarding." },
              ].map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-6 last:border-0">
                  <h3 className="font-heading text-lg font-bold text-primary mb-2">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CONTACT US MODAL */}
      {showContactUs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={() => setShowContactUs(false)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold text-primary">Contact Us</h2>
              <button onClick={() => setShowContactUs(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={24} className="text-gray-600" />
              </button>
            </div>
            <div className="space-y-4 mb-8">
              <a href={`https://wa.me/${content.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors group">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-green-700">WhatsApp</h3>
                  <p className="text-sm text-gray-500">Chat with us on WhatsApp</p>
                </div>
              </a>
              <a href={`mailto:${content.contact.email}`} className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="22,4 12,13 2,4"/></svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary">Email</h3>
                  <p className="text-sm text-gray-500">{content.contact.email}</p>
                </div>
              </a>
              <a href={content.contact.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors group">
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shrink-0 text-white">
                  <InstagramIcon />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-primary">Instagram</h3>
                  <p className="text-sm text-gray-500">@fashcycle.official</p>
                </div>
              </a>
            </div>
            <p className="text-sm text-gray-400 text-center">We typically respond within 24 hours.</p>
          </div>
        </div>
      )}

    </div>
  );
}
