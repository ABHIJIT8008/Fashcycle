import React, { useState, useEffect } from 'react';
import { 
  Menu, X, CheckCircle2, Search, Calendar, CreditCard, RefreshCcw, 
  Package, BarChart3, Leaf, Droplets, RefreshCw, ArrowRight, MapPin
} from 'lucide-react';

const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>);
const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>);
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2.5 7.1 2 9.5 2 12c0 2.5.5 4.9.5 4.9C3.1 18.5 4.5 19 8.5 19.5 10.8 19.8 12 20 12 20s1.2-.2 3.5-.5c4-.5 5.4-1 6-2.6.5 0 1-2.4 1-4.9 0-2.5-.5-4.9-.5-4.9C20.9 5.5 19.5 5 15.5 4.5 13.2 4.2 12 4 12 4s-1.2.2-3.5.5C4.5 5 3.1 5.5 2.5 7.1z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>);

const Logo = ({ className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <img 
      src="/LOGO1.png" 
      alt="Fashcycle" 
      className="h-10 md:h-12 w-auto object-contain" 
    />
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

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToDownload = () => {
    document.getElementById('download-section')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

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
            <a href="#store-owners" className="text-sm font-medium hover:opacity-70 transition-opacity">For Store Owners</a>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 gap-4 text-text-dark">
            <a href="#how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">How It Works</a>
            <a href="https://www.fashcycle.com/sustainability" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">Sustainability</a>
            <a href="https://www.fashcycle.com/about-us" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">About Us</a>
            <a href="#store-owners" onClick={() => setIsMobileMenuOpen(false)} className="text-base font-medium py-2 border-b border-gray-50">For Store Owners</a>
            <button onClick={scrollToDownload} className="mt-4 bg-primary text-white px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide w-full">
              Download App
            </button>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-24 md:pt-0 md:h-screen min-h-[600px] flex items-center">
        <div className="absolute inset-0 z-0">
          {/* <!-- REPLACE: featured hero photo --> */}
          <img 
            src="https://fashcycle-official-media.s3.amazonaws.com/image/e67c5ee7-653c-428c-af81-8ea752adc26f.webp" 
            alt="Indian occasion wear fashion rental" 
            className="w-full h-full object-cover object-[center_15%] md:object-[center_top]"
          />
          <div className="absolute inset-0 bg-[#1b3226]/60"></div>
        </div>
        
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-0 w-full">
          <div className="max-w-2xl text-white">
            <h1 className="font-heading text-5xl md:text-7xl font-bold leading-tight mb-6">
              India's Fashion Rental Marketplace
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
              Discover lehengas, gowns & occasion wear in Indore — rent it, love it, return it.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <PlayStoreBadge />
              <AppStoreBadge />
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span>Real-time Availability</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-white" />
                <span>Secure Payments</span>
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
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">500+</h3>
              <p className="text-sm md:text-base opacity-80 uppercase tracking-wider font-medium">Rental Stores</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">10k+</h3>
              <p className="text-sm md:text-base opacity-80 uppercase tracking-wider font-medium">Outfits Listed</p>
            </div>
            <div>
              <h3 className="font-heading text-4xl md:text-5xl font-bold mb-2">XS-3XL</h3>
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
            {/* Steps */}
            <div className="w-full lg:w-1/2 space-y-10 order-2 lg:order-1">
              {[
                { icon: <MapPin className="text-white" size={24} />, title: "Discover Near You", desc: "Search by size, style, occasion & your city." },
                { icon: <Calendar className="text-white" size={24} />, title: "Book Your Look", desc: "Reserve your outfit in real-time." },
                { icon: <CreditCard className="text-white" size={24} />, title: "Secure Payment", desc: "Pay safely through the app." },
                { icon: <RefreshCcw className="text-white" size={24} />, title: "Wear & Return", desc: "Enjoy it, return it hassle-free." }
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 items-start group">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg group-hover:scale-110 group-hover:bg-accent transition-all duration-300">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl font-bold text-primary mb-2 flex items-center gap-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Mockups */}
            <div className="w-full lg:w-1/2 flex justify-center gap-4 md:gap-8 order-1 lg:order-2 overflow-x-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-off-white via-transparent to-off-white z-10 pointer-events-none md:hidden"></div>
              
              {/* Mockup 1 */}
              <div className="relative w-48 md:w-64 h-[400px] md:h-[500px] rounded-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden flex-shrink-0 transform -rotate-3 hover:rotate-0 transition-transform duration-500 group/mockup">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
                <img src="https://fashcycle-official-media.s3.amazonaws.com/image/c49087d6-575b-4924-9ab1-1fcb2ca03187.webp" alt="App Discover" className="w-full h-full object-cover opacity-60 group-hover/mockup:opacity-80 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <Search size={48} className="text-white mb-4 drop-shadow-lg" />
                  <p className="text-white font-semibold text-sm drop-shadow-md">Discover Outfits</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
              </div>

              {/* Mockup 2 */}
              <div className="relative w-48 md:w-64 h-[400px] md:h-[500px] rounded-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden flex-shrink-0 transform translate-y-8 hover:translate-y-4 transition-transform duration-500 group/mockup">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
                <img src="https://fashcycle-official-media.s3.amazonaws.com/image/ca87284d-15f5-474f-a2ba-729b4f5112ad.webp" alt="App Booking" className="w-full h-full object-cover opacity-60 group-hover/mockup:opacity-80 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
                  <Calendar size={48} className="text-white mb-4 drop-shadow-lg" />
                  <p className="text-white font-semibold text-sm drop-shadow-md">Book Real-time</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>
              </div>
              
              {/* Mockup 3 (Hidden on very small screens) */}
              <div className="hidden md:block relative w-64 h-[500px] rounded-[2rem] border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden flex-shrink-0 transform rotate-3 hover:rotate-0 transition-transform duration-500 group/mockup">
                <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-xl w-32 mx-auto z-20"></div>
                <img src="https://fashcycle-official-media.s3.amazonaws.com/image/8018e31e-e8bf-4992-bae9-1ac3a4b78ffb.webp" alt="App Return" className="w-full h-full object-cover opacity-60 group-hover/mockup:opacity-80 transition-opacity duration-300" />
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
            {[
              { title: "Lehengas", img: "https://fashcycle-official-media.s3.amazonaws.com/image/e67c5ee7-653c-428c-af81-8ea752adc26f.webp" },
              { title: "Sarees", img: "https://fashcycle-official-media.s3.amazonaws.com/image/391d38cd-3461-4536-bff5-e0ab59f17ed3.webp" },
              { title: "Gowns", img: "https://fashcycle-official-media.s3.amazonaws.com/image/c2aa2ca5-acb6-468a-b1bb-0f447c96baf0.webp" },
              { title: "Anarkalis", img: "https://fashcycle-official-media.s3.amazonaws.com/image/8018e31e-e8bf-4992-bae9-1ac3a4b78ffb.webp" },
              { title: "Sharara Sets", img: "https://fashcycle-official-media.s3.amazonaws.com/image/5eb98e09-583f-4a1f-834e-75d2153a8b3a.webp" },
              { title: "Suits", img: "https://fashcycle-official-media.s3.amazonaws.com/image/ca87284d-15f5-474f-a2ba-729b4f5112ad.webp" },
              { title: "Western Wear", img: "https://fashcycle-official-media.s3.amazonaws.com/image/e6801b62-56a3-4b0e-80eb-88582d12313d.webp" }
            ].map((cat, idx) => (
              <div key={idx} className="relative w-64 md:w-auto h-80 flex-shrink-0 snap-start rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300">
                {/* <!-- REPLACE: Category images --> */}
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
            {/* <!-- REPLACE: upload partner logo images here --> */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-32 h-20 md:w-40 md:h-24 bg-gray-200/60 rounded-xl flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-widest">Partner Logo</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY SECTION */}
      <section className="py-20 md:py-32 bg-off-white relative overflow-hidden border-t border-gray-200">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1b3226 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-16">Fashion That Doesn't Cost the Earth</h2>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Leaf size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Reduce Fashion Waste</h3>
              <p className="text-gray-600 leading-relaxed">Over half of fast fashion is discarded within a year. Renting extends the lifecycle of every garment.</p>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <Droplets size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4">Save Resources</h3>
              <p className="text-gray-600 leading-relaxed">Renting saves up to 24% water compared to buying new. Look good while conserving precious resources.</p>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                <RefreshCw size={32} />
              </div>
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
      <section id="store-owners" className="py-20 md:py-32 bg-primary text-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Own a Rental Store? Go Digital.</h2>
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
              
              <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold uppercase tracking-wide hover:bg-gray-100 transition-colors w-full sm:w-auto">
                List Your Store →
              </button>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="bg-[#15271d] rounded-2xl p-8 border border-white/10 shadow-2xl relative">
                <div className="absolute -top-4 -right-4 bg-accent text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">BETA</div>
                {/* <!-- REPLACE: SaaS Dashboard Mockup --> */}
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Total Revenue</div>
                    <div className="text-3xl font-heading font-bold">₹42,500</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Active Bookings</div>
                    <div className="text-3xl font-heading font-bold text-right">18</div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                      <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-white/10 rounded-lg"></div>
                        <div>
                          <div className="font-semibold">Red Bridal Lehenga</div>
                          <div className="text-xs text-gray-400">Size: M • Rented</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">₹3,000</div>
                        <div className="text-xs text-green-400">Due in 2 days</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* USER TESTIMONIALS */}
      <section className="py-20 md:py-32 bg-off-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">What F-Cians Are Saying</h2>
            <p className="text-lg text-gray-600">Join a community of conscious fashion lovers.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya Sharma",
                role: "Regular Renter, Indore",
                text: "Rented a designer lehenga for a wedding — the process was seamless and saved a lot of money.",
                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Rahul Verma",
                role: "Lender & Renter",
                text: "Earns extra income listing clothes, reduces waste, loves the community.",
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Ananya Patel",
                role: "Fashion Enthusiast",
                text: "Can wear designer occasion wear affordably without contributing to fast fashion.",
                img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm relative">
                <div className="absolute top-6 right-8 text-6xl font-heading text-primary/10 leading-none">"</div>
                <p className="text-gray-700 text-lg leading-relaxed mb-8 relative z-10">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  {/* <!-- REPLACE: Testimonial Avatars --> */}
                  <img src={testimonial.img} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
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
      <section id="download-section" className="bg-primary py-24 relative overflow-hidden">
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
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
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
            
            <div className="flex gap-6">
              <a href="https://www.instagram.com/fashcycle.official?igsh=NXhpYjRkZGw3Y21v&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61577640128490&sk=about" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <FacebookIcon />
              </a>
              <a href="https://x.com/fashcycle19878" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <TwitterIcon />
              </a>
              <a href="https://www.youtube.com/@fashcycle" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
