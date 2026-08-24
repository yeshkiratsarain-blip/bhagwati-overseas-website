import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, Clock, ArrowRight, GraduationCap, Globe, 
  MapPin, Menu, X, ArrowUpRight, ShieldCheck, CheckCircle2,
  Calendar, Award, HeartHandshake, BookOpen, Bot, Sparkles, MessageSquare
} from 'lucide-react';
import './App.css';

// Import logo images
import logoHorizontal from './assets/logo_horizontal.png';
import logoHorizontalWhite from './assets/logo_horizontal_white.png';
import logoCircular from './assets/logo_circular.png';

// Import custom components
import Destinations from './components/Destinations';
import LiveRadar from './components/LiveRadar';
import Services from './components/Services';
import VisaCoachPromo from './components/VisaCoachPromo';
import AboutUs from './components/AboutUs';
import AICounselorChat from './components/AICounselorChat';
import AssessmentModal from './components/AssessmentModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('United Kingdom (UK)');
  const [aiChatOpen, setAiChatOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [activeTab]);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenAssessment = (countryName) => {
    setSelectedCountry(countryName || 'United Kingdom (UK)');
    setAssessmentOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      
      {/* Top Highlighted Phone Header Bar */}
      <div className="top-bar">
        <div className="container top-bar-content-centered">
          <div className="top-bar-phone-highlight">
            <span className="top-bar-lead-text">Have Questions? Talk Directly with Our Senior Visa Specialist:</span>
            <a href="tel:+918278089882" className="phone-highlight-badge" title="Click to Call +91 82780 89882">
              <Phone size={14} className="phone-icon-pulse" />
              <span>+91 82780 89882</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="main-header">
        <div className="container nav-container">
          
          {/* Brand Logo */}
          <a href="#" className="brand" onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}>
            <img src={logoHorizontal} alt="Bhagwati Overseas Study Abroad" className="brand-logo" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-menu">
              <li>
                <button 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => handleNavClick('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'destinations' ? 'active' : ''}`}
                  onClick={() => handleNavClick('destinations')}
                >
                  Destinations
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'radar' ? 'active' : ''}`}
                  onClick={() => handleNavClick('radar')}
                >
                  Daily News/Updates
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'coach' ? 'active' : ''}`}
                  onClick={() => handleNavClick('coach')}
                >
                  Interview Prep Tool
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
                  onClick={() => handleNavClick('services')}
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => handleNavClick('about')}
                >
                  About Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Action Buttons Right Group */}
          <div className="nav-header-actions">
            <button 
              className="btn btn-orange"
              style={{ borderRadius: '9999px', padding: '0.45rem 0.9rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
              onClick={() => setAiChatOpen(true)}
            >
              <Bot size={14} />
              <span>Talk to AI Expert</span>
            </button>

            <button 
              className="btn btn-orange btn-glow nav-cta-orange"
              onClick={() => handleOpenAssessment('General')}
              style={{ padding: '0.45rem 0.9rem', fontSize: '0.78rem', whiteSpace: 'nowrap' }}
            >
              Book Free Assessment
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* Mobile Navigation Dropdown */}
        <div className={`nav-menu mobile-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <button 
            className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            Home
          </button>
          <button 
            className={`nav-link ${activeTab === 'destinations' ? 'active' : ''}`}
            onClick={() => handleNavClick('destinations')}
          >
            Top Study Destinations
          </button>
          <button 
            className={`nav-link ${activeTab === 'radar' ? 'active' : ''}`}
            onClick={() => handleNavClick('radar')}
          >
            Daily News/Updates
          </button>
          <button 
            className={`nav-link ${activeTab === 'coach' ? 'active' : ''}`}
            onClick={() => handleNavClick('coach')}
          >
            Interview Prep Tool
          </button>
          <button 
            className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => handleNavClick('services')}
          >
            Services
          </button>
          <button 
            className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => handleNavClick('about')}
          >
            About Us
          </button>
          
          <button 
            className="btn btn-orange"
            onClick={() => { setMobileMenuOpen(false); setAiChatOpen(true); }}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            <Bot size={16} />
            <span>Talk to AI Expert</span>
          </button>

          <button 
            className="btn btn-orange btn-glow"
            onClick={() => { setMobileMenuOpen(false); handleOpenAssessment('General'); }}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Book Free Assessment
          </button>
        </div>
      </header>

      {/* Main Content Sections */}
      <main style={{ flexGrow: 1 }}>
        
        {activeTab === 'home' && (
          <>
            {/* Hero Banner Section */}
            <section className="hero-sec">
              <div className="container hero-grid">
                
                {/* Hero Text Content */}
                <div className="animate-fade-in">
                  <span className="hero-tag section-tag-orange">
                    <ShieldCheck size={13} style={{ marginRight: '4px' }} />
                    Your Global Journey Starts Here
                  </span>
                  
                  <h1 className="hero-title">
                    Top Study Abroad Consultant & <span className="text-gradient">Visa Experts</span>
                  </h1>
                  
                  <p className="hero-description">
                    Expert guidance, test prep, and transparent pathways to top destinations — bringing world-class education directly to Ladwa, Kurukshetra.
                  </p>
                  
                  <div className="hero-buttons">
                    <button 
                      className="btn btn-orange btn-glow"
                      onClick={() => handleOpenAssessment('General')}
                    >
                      <Sparkles size={16} />
                      <span>Book Free Counseling</span>
                    </button>

                    <a 
                      href="https://bhagwati-visa-coach.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-primary"
                      style={{ textDecoration: 'none' }}
                    >
                      <GraduationCap size={16} />
                      <span>PRACTICE MOCK INTERVIEW</span>
                      <ArrowRight size={16} />
                    </a>
                  </div>

                  <div className="hero-trust-badges">
                    <div className="trust-badge">
                      <span className="trust-badge-number text-orange">98%</span>
                      <span className="trust-badge-text">Visa Success<br />Rate</span>
                    </div>
                    <div style={{ width: '1px', height: '2rem', backgroundColor: 'var(--border-color)' }} />
                    <div className="trust-badge">
                      <span className="trust-badge-number text-orange">500+</span>
                      <span className="trust-badge-text">Partner<br />Universities</span>
                    </div>
                    <div style={{ width: '1px', height: '2rem', backgroundColor: 'var(--border-color)' }} />
                    <div className="trust-badge">
                      <span className="trust-badge-number text-orange">100%</span>
                      <span className="trust-badge-text">Transparent<br />Process</span>
                    </div>
                  </div>
                </div>

                {/* Hero Visual Area - Modern Study Abroad Showcase */}
                <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="hero-showcase-card">
                    
                    {/* Card Top Live Status Header */}
                    <div className="showcase-header">
                      <div className="showcase-live-badge">
                        <span className="live-pulse-dot" />
                        <span>2026/2027 Intakes Open</span>
                      </div>
                      <span className="showcase-tag">Direct DLI Partners</span>
                    </div>

                    {/* Destination Flags Showcase */}
                    <div className="showcase-destinations-bar">
                      <div className="showcase-dest-chip" onClick={() => handleNavClick('destinations')}>
                        <span className="dest-flag">🇬🇧</span>
                        <span>UK</span>
                      </div>
                      <div className="showcase-dest-chip" onClick={() => handleNavClick('destinations')}>
                        <span className="dest-flag">🇦🇺</span>
                        <span>Australia</span>
                      </div>
                      <div className="showcase-dest-chip" onClick={() => handleNavClick('destinations')}>
                        <span className="dest-flag">🇨🇦</span>
                        <span>Canada</span>
                      </div>
                      <div className="showcase-dest-chip" onClick={() => handleNavClick('destinations')}>
                        <span className="dest-flag">🇩🇪</span>
                        <span>Germany</span>
                      </div>
                      <div className="showcase-dest-chip" onClick={() => handleNavClick('destinations')}>
                        <span className="dest-flag">🇺🇸</span>
                        <span>USA</span>
                      </div>
                      <div className="showcase-dest-chip" onClick={() => handleNavClick('destinations')}>
                        <span className="dest-flag">🇳🇿</span>
                        <span>NZ</span>
                      </div>
                    </div>

                    {/* Feature Showcase Grid */}
                    <div className="showcase-features-grid">
                      <div className="showcase-feature-item">
                        <div className="feature-item-icon bg-blue-subtle">
                          <GraduationCap size={18} className="text-blue" />
                        </div>
                        <div>
                          <h4 className="feature-item-title">Top University Admissions</h4>
                          <p className="feature-item-desc">500+ Global DLIs • Fast 48h Offer Letters</p>
                        </div>
                      </div>

                      <div className="showcase-feature-item">
                        <div className="feature-item-icon bg-orange-subtle">
                          <ShieldCheck size={18} className="text-orange" />
                        </div>
                        <div>
                          <h4 className="feature-item-title">98% Visa Success Rate</h4>
                          <p className="feature-item-desc">Certified Pre-CAS & GST SOP Verification</p>
                        </div>
                      </div>

                      <div className="showcase-feature-item">
                        <div className="feature-item-icon bg-emerald-subtle">
                          <Bot size={18} style={{ color: '#10b981' }} />
                        </div>
                        <div>
                          <h4 className="feature-item-title">AI Visa Coach & Mock Prep</h4>
                          <p className="feature-item-desc">Real-time Credibility Interview Simulations</p>
                        </div>
                      </div>
                    </div>

                    {/* Fast Action Footer */}
                    <div className="showcase-card-footer">
                      <button 
                        className="showcase-eval-btn"
                        onClick={() => handleOpenAssessment('General')}
                      >
                        <Sparkles size={14} />
                        <span>Check My Admission & Visa Eligibility</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>

                  </div>

                  {/* Floating Badge 1: Top University Admissions */}
                  <div className="hero-floating-card floating-card-1">
                    <div className="floating-icon" style={{ backgroundColor: 'var(--orange-light-bg)', color: 'var(--orange-bright)' }}>
                      <GraduationCap size={16} />
                    </div>
                    <div className="floating-card-text">
                      <span className="floating-card-title">Top University Admissions</span>
                      <span className="floating-card-desc">UK • Australia • Canada • Germany</span>
                    </div>
                  </div>

                  {/* Floating Badge 2: AI Profile Expert */}
                  <div className="hero-floating-card floating-card-2" onClick={() => setAiChatOpen(true)} style={{ cursor: 'pointer' }}>
                    <div className="floating-icon" style={{ backgroundColor: 'var(--blue-light-bg)', color: 'var(--blue-accent)' }}>
                      <Bot size={16} />
                    </div>
                    <div className="floating-card-text">
                      <span className="floating-card-title">AI Profile Evaluator</span>
                      <span className="floating-card-desc">Instant 24/7 Gap & Score Audit</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* 4-Stat Banner Section (Matching User Screenshot 1) */}
            <section className="stat-banner-sec animate-fade-in">
              <div className="container stat-banner-grid">
                <div className="stat-banner-item">
                  <span className="stat-banner-number">850<span className="accent-plus">+</span></span>
                  <span className="stat-banner-label">University Partners</span>
                </div>
                <div className="stat-banner-item">
                  <span className="stat-banner-number">30<span className="accent-plus">+</span></span>
                  <span className="stat-banner-label">Countries to study</span>
                </div>
                <div className="stat-banner-item">
                  <span className="stat-banner-number">Up to 100<span className="accent-plus">%</span></span>
                  <span className="stat-banner-label">Scholarships Possible</span>
                </div>
                <div className="stat-banner-item">
                  <span className="stat-banner-number">100<span className="accent-plus">%</span></span>
                  <span className="stat-banner-label">Visa Application Support</span>
                </div>
              </div>
            </section>

            {/* Top Study & Visa Destinations Section */}
            <Destinations onSelectCountry={handleOpenAssessment} />

            {/* Live Daily News/Updates */}
            <LiveRadar />

            {/* Quick Introduction features cards */}
            <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <div className="container">
                <div className="section-header" style={{ marginBottom: '3rem' }}>
                  <span className="section-tag section-tag-orange">Why Bhagwati Overseas</span>
                  <h2 className="section-title">Build Your Future with Experts</h2>
                  <p className="section-desc">Our values and structure guarantee transparent admissions and documentation guidance.</p>
                </div>

                <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  
                  <div className="service-card" style={{ padding: '2rem' }}>
                    <div className="service-icon-box" style={{ width: '2.75rem', height: '2.75rem', backgroundColor: 'var(--orange-light-bg)', color: 'var(--orange-bright)' }}>
                      <Award size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>Qualified Counsellors</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-secondary)' }}>
                      Our advising panel has over a decade of immigration experience. We map out academic and post-study opportunities carefully.
                    </p>
                  </div>

                  <div className="service-card" style={{ padding: '2rem' }}>
                    <div className="service-icon-box" style={{ width: '2.75rem', height: '2.75rem', backgroundColor: 'var(--blue-glow)', color: 'var(--blue-accent)' }}>
                      <HeartHandshake size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>End-to-End Support</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-secondary)' }}>
                      From selecting the right courses and filing applications to SOP reviews and flight planning, we handle it all.
                    </p>
                  </div>

                  <div className="service-card" style={{ padding: '2rem' }}>
                    <div className="service-icon-box" style={{ width: '2.75rem', height: '2.75rem', backgroundColor: 'rgba(16,185,129,0.1)', color: '#10b981' }}>
                      <ShieldCheck size={20} />
                    </div>
                    <h4 style={{ fontSize: '1.15rem', color: 'var(--navy-deep)', marginBottom: '0.75rem' }}>Embassy Interview Labs</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-dark-secondary)' }}>
                      Our custom interview labs and Visa Coach tool help students address typical questions and sound credible under pressure.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* Interactive Visa Coach Promo Section */}
            <VisaCoachPromo />

            {/* About Us Section */}
            <AboutUs />
          </>
        )}

        {activeTab === 'destinations' && <Destinations onSelectCountry={handleOpenAssessment} />}
        {activeTab === 'radar' && <LiveRadar />}
        {activeTab === 'coach' && <VisaCoachPromo />}
        {activeTab === 'services' && <Services />}
        {activeTab === 'about' && <AboutUs />}

      </main>

      {/* Main Website Footer */}
      <footer className="main-footer">
        <div className="container footer-grid">
          
          {/* Logo and Description */}
          <div className="footer-brand">
            <div className="footer-brand-container">
              <img src={logoHorizontalWhite} alt="Bhagwati Overseas Study Abroad" className="footer-logo" />
            </div>
            <p className="footer-brand-desc">
              Bhagwati Overseas is Ladwa's leading study abroad and visa consultancy, dedicated to helping students secure admissions in top institutions globally.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNavClick('home')} className="footer-link">Home Page</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('destinations')} className="footer-link">Top Study Destinations</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('radar')} className="footer-link">Daily News/Updates</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('coach')} className="footer-link">Interview Preparation Tool</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="footer-link">Consultancy Services</button>
              </li>
              <li>
                <button onClick={() => handleNavClick('about')} className="footer-link">About Us</button>
              </li>
            </ul>
          </div>

          {/* Contact Details Quick View */}
          <div>
            <h3 className="footer-title">Ladwa Office</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light-secondary)', lineHeight: '1.6', marginBottom: '1rem' }}>
              Bhagwati Overseas Study Abroad,<br />
              Above Nirula Clinic, Behind Bus Stand,<br />
              Ladwa, Haryana 136132
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-light-secondary)', lineHeight: '1.6' }}>
              Phone: <a href="tel:+918278089882" style={{ color: 'inherit', fontWeight: 600 }}>+91 82780 89882</a><br />
              Email: <a href="mailto:official.bhagwatioverseas@gmail.com" style={{ color: 'inherit' }}>official.bhagwatioverseas@gmail.com</a>
            </p>
          </div>

        </div>

        {/* Footer Bottom copyright */}
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Bhagwati Overseas. All Rights Reserved.</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-light-muted)' }}>
            Developed for Bhagwati Overseas Main Office (Ladwa).
          </span>
        </div>
      </footer>

      {/* Floating Bright Orange AI Expert Widget */}
      <button 
        className="floating-ai-widget" 
        onClick={() => setAiChatOpen(true)}
        title="Talk to AI Expert"
      >
        <span className="floating-ai-pill">
          <Sparkles size={13} className="text-orange" />
          Talk to AI Expert
        </span>
        <div className="floating-ai-btn">
          <Bot size={24} />
        </div>
      </button>

      {/* AI Counselor Chatbot Modal */}
      <AICounselorChat 
        isOpen={aiChatOpen} 
        onClose={() => setAiChatOpen(false)} 
        onOpenAssessment={() => handleOpenAssessment('General')}
      />

      {/* Free Profile Assessment Modal */}
      <AssessmentModal 
        isOpen={assessmentOpen} 
        onClose={() => setAssessmentOpen(false)} 
        initialCountry={selectedCountry}
      />

    </div>
  );
}
