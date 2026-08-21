import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, Clock, ArrowRight, GraduationCap, Globe, 
  MapPin, Menu, X, ArrowUpRight, ShieldCheck, CheckCircle2,
  Calendar, Award, HeartHandshake, BookOpen
} from 'lucide-react';
import './App.css'; // Just in case, though we rely on index.css

// Import logo images
import logoHorizontal from './assets/logo_horizontal.png';
import logoCircular from './assets/logo_circular.png';

// Import custom components
import LiveRadar from './components/LiveRadar';
import Services from './components/Services';
import VisaCoachPromo from './components/VisaCoachPromo';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [activeTab]);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCtaClick = () => {
    setActiveTab('services');
    setTimeout(() => {
      const element = document.getElementById('services-view');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Top Contact Header Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <div className="info-item">
              <MapPin size={13} />
              <span>Ladwa, Kurukshetra (Haryana)</span>
            </div>
            <div className="info-item">
              <Phone size={13} />
              <span><a href="tel:+918278089882" style={{ color: 'inherit' }}>+91 82780 89882</a></span>
            </div>
            <div class="info-item">
              <Mail size={13} />
              <span><a href="mailto:official.bhagwatioverseas@gmail.com" style={{ color: 'inherit' }}>official.bhagwatioverseas@gmail.com</a></span>
            </div>
          </div>
          <div className="top-bar-info">
            <div className="info-item">
              <Clock size={13} />
              <span>Mon – Sat: 9:30 AM – 5:00 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="main-header">
        <div className="container nav-container">
          
          {/* Brand Logo & Name */}
          <a href="#" className="brand" onClick={() => handleNavClick('home')}>
            <img src={logoHorizontal} alt="Bhagwati Overseas logo" className="brand-logo" />
            <div className="brand-text">
              <span className="brand-name">BHAGWATI</span>
              <span className="brand-subtitle">Overseas Study Abroad</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav>
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
                  Interview Preparation Tool
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
              <li style={{ marginLeft: '1rem' }}>
                <button 
                  className="nav-link nav-cta"
                  onClick={handleCtaClick}
                >
                  Book Free Assessment
                </button>
              </li>
            </ul>
          </nav>

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
            className={`nav-link ${activeTab === 'radar' ? 'active' : ''}`}
            onClick={() => handleNavClick('radar')}
          >
            Daily News/Updates
          </button>
          <button 
            className={`nav-link ${activeTab === 'coach' ? 'active' : ''}`}
            onClick={() => handleNavClick('coach')}
          >
            Interview Preparation Tool
          </button>
          <button 
            className={`nav-link ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => handleNavClick('services')}
          >
            Services
          </button>
          <button 
            className="nav-link nav-cta"
            onClick={handleCtaClick}
            style={{ marginTop: '1rem' }}
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
                  <span className="hero-tag">
                    <ShieldCheck size={12} style={{ color: 'var(--blue-accent)', marginRight: '4px' }} />
                    Ladwa's Premier Study Advisor
                  </span>
                  <h1 className="hero-title">
                    Your Trusted Gateway to <span className="text-gradient">Global Education</span>
                  </h1>
                  <p className="hero-description">
                    Empowering students from Kurukshetra and beyond to achieve high-score test records and visa approvals for top destinations including the UK, Canada, USA, Australia, and Germany.
                  </p>
                  
                  <div className="hero-buttons">
                    <button className="btn btn-primary" onClick={() => window.open('http://localhost:8080', '_blank')}>
                      <span>START INTERVIEW</span>
                      <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-secondary" onClick={handleCtaClick}>
                      <span>Visit Ladwa Office</span>
                    </button>
                  </div>

                  <div className="hero-trust-badges">
                    <div className="trust-badge">
                      <span className="trust-badge-number">98%</span>
                      <span className="trust-badge-text">Visa Success<br />Rate</span>
                    </div>
                    <div style={{ width: '1px', height: '2rem', backgroundColor: 'var(--border-color)' }} />
                    <div className="trust-badge">
                      <span className="trust-badge-number">500+</span>
                      <span className="trust-badge-text">Partner<br />Universities</span>
                    </div>
                    <div style={{ width: '1px', height: '2rem', backgroundColor: 'var(--border-color)' }} />
                    <div className="trust-badge">
                      <span className="trust-badge-number">100%</span>
                      <span className="trust-badge-text">Transparent<br />Process</span>
                    </div>
                  </div>
                </div>

                {/* Hero Visual Area */}
                <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="hero-image-wrapper">
                    <img src={logoCircular} alt="Bhagwati Overseas Circular Logo" className="hero-image-logo animate-float" />
                  </div>
                  
                  {/* Floating badge 1: UK Visas */}
                  <div className="hero-floating-card floating-card-1">
                    <div className="floating-icon">
                      <GraduationCap size={16} />
                    </div>
                    <div className="floating-card-text">
                      <span className="floating-card-title">Study in UK</span>
                      <span className="floating-card-desc">Credibility Interview Support</span>
                    </div>
                  </div>

                  {/* Floating badge 2: Live Updates */}
                  <div className="hero-floating-card floating-card-2" onClick={() => handleNavClick('radar')} style={{ cursor: 'pointer' }}>
                    <div className="floating-icon">
                      <Globe size={16} />
                    </div>
                    <div className="floating-card-text">
                      <span className="floating-card-title">Daily Updates</span>
                      <span className="floating-card-desc">Live Visa Feed Active</span>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Live Daily News/Updates - Placed Prominently Right Below Hero! */}
            <LiveRadar />

            {/* Quick Introduction features cards */}
            <section className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <div className="container">
                <div className="section-header" style={{ marginBottom: '3rem' }}>
                  <span className="section-tag">Why Bhagwati Overseas</span>
                  <h2 className="section-title">Build Your Future with Experts</h2>
                  <p className="section-desc">Our values and structure guarantee transparent admissions and documentation guidance.</p>
                </div>

                <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
                  
                  <div className="service-card" style={{ padding: '2rem' }}>
                    <div className="service-icon-box" style={{ width: '2.75rem', height: '2.75rem', backgroundColor: 'rgba(234,179,8,0.1)', color: 'var(--gold-accent)' }}>
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
                      Our custom interview labs and Interview Preparation Tool help students address typical questions and sound credible under pressure.
                    </p>
                  </div>

                </div>
              </div>
            </section>

            {/* Interactive Interview Preparation Tool Section */}
            <VisaCoachPromo />
          </>
        )}

        {activeTab === 'radar' && <LiveRadar />}
        {activeTab === 'coach' && <VisaCoachPromo />}
        {activeTab === 'services' && <Services />}

      </main>

      {/* Main Website Footer */}
      <footer className="main-footer">
        <div className="container footer-grid">
          
          {/* Logo and Description */}
          <div className="footer-brand">
            <div className="brand" style={{ color: 'var(--text-light-primary)' }}>
              <img src={logoCircular} alt="Bhagwati Overseas Circular Logo" className="footer-logo" />
              <div className="brand-text">
                <span className="brand-name" style={{ color: 'var(--text-light-primary)' }}>BHAGWATI</span>
                <span className="brand-subtitle" style={{ color: 'var(--blue-accent)' }}>Overseas Study Abroad</span>
              </div>
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
                <button onClick={() => handleNavClick('home')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('radar')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Daily News/Updates
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('coach')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Interview Preparation Tool
                </button>
              </li>
              <li>
                <button onClick={() => handleNavClick('services')} className="footer-link" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Consultancy Services
                </button>
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
              Phone: <a href="tel:+918278089882" style={{ color: 'inherit' }}>+91 82780 89882</a><br />
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

    </div>
  );
}
