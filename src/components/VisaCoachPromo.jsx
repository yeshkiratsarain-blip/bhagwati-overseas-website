import React from 'react';
import { Sparkles, Video, Mic, BarChart3, Shield, ArrowUpRight, GraduationCap } from 'lucide-react';

const VISA_COACH_URL = 'http://localhost:8080';

export default function VisaCoachPromo() {
  return (
    <section className="section-padding coach-promo-section animate-fade-in" id="visa-coach-view">
      <div className="container">
        
        <div className="coach-promo-card">
          <div className="coach-promo-grid">
            
            {/* Promo Text and Features */}
            <div>
              <span className="coach-promo-tag">
                <Sparkles size={12} style={{ color: 'var(--gold-accent)' }} />
                Smart Prep Tool
              </span>
              <h2 className="coach-promo-title">Interview Preparation Tool</h2>
              <p className="coach-promo-desc">
                Walk into your embassy visa interview with total confidence. Our advanced interactive simulator records your responses and provides a detailed credibility debrief modeled after VFS and consulate grading rubrics.
              </p>

              <div className="coach-features-list">
                
                <div className="coach-feature-item">
                  <div className="coach-feature-icon">
                    <Video size={16} />
                  </div>
                  <div className="coach-feature-text-box">
                    <span className="coach-feature-title">Real-Time Video Capture</span>
                    <span className="coach-feature-desc">Records your facial expression and speech pacing to assess composure under embassy-style pressure.</span>
                  </div>
                </div>

                <div className="coach-feature-item">
                  <div className="coach-feature-icon">
                    <Mic size={16} />
                  </div>
                  <div className="coach-feature-text-box">
                    <span className="coach-feature-title">Audio & Pacing Metrics</span>
                    <span className="coach-feature-desc">Analyzes speaking rate and filters out filler words to ensure clear, precise delivery of your responses.</span>
                  </div>
                </div>

                <div className="coach-feature-item">
                  <div className="coach-feature-icon">
                    <BarChart3 size={16} />
                  </div>
                  <div className="coach-feature-text-box">
                    <span className="coach-feature-title">Credibility Analysis & Reports</span>
                    <span className="coach-feature-desc">Checks key interview components (funding details, home ties, course details) and rates answer relevance.</span>
                  </div>
                </div>

              </div>

              <a 
                href={VISA_COACH_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold"
                style={{ textDecoration: 'none' }}
              >
                <span>START INTERVIEW</span>
                <ArrowUpRight size={18} />
              </a>
              <span style={{ 
                display: 'block', 
                fontSize: '0.75rem', 
                color: 'var(--text-light-muted)', 
                marginTop: '0.85rem',
                fontWeight: 500 
              }}>
                Requires webcam & microphone access.
              </span>
            </div>

            {/* Mock Simulator UI Visual */}
            <div className="coach-promo-visual">
              
              <div className="visual-screen-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div className="visual-dot" />
                  <span style={{ fontSize: '0.65rem', fontWeight: 800, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Live Recording
                  </span>
                </div>
                <span className="visual-screen-title">Interview Lab v1.2</span>
              </div>

              {/* Mock Video Container */}
              <div className="visual-mock-webcam">
                <div className="visual-avatar-placeholder">
                  <GraduationCap size={32} style={{ color: 'var(--blue-accent)' }} />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  left: '0.75rem',
                  right: '0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(15, 23, 42, 0.75)',
                  padding: '0.4rem 0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(4px)'
                }}>
                  <span style={{ fontSize: '0.65rem', color: '#ffffff', fontWeight: 600 }}>Webcam Pre-check</span>
                  <span style={{ fontSize: '0.65rem', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Shield size={10} /> Active
                  </span>
                </div>
              </div>

              {/* Mock Question */}
              <div className="visual-mock-question">
                <span className="visual-question-tag">Embassy Prompt:</span>
                <p className="visual-question-text">
                  "Why have you chosen this specific university and why are you not pursuing this degree in your home country?"
                </p>
              </div>

              {/* Sound Wave Representation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.5rem' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--text-light-muted)', fontWeight: 600 }}>Audio Input</span>
                <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                  {[20, 45, 15, 60, 30, 75, 40, 55, 25, 50, 10, 35].map((h, i) => (
                    <span 
                      key={i} 
                      style={{ 
                        display: 'block', 
                        width: '3px', 
                        height: `${h * 0.25}px`, 
                        backgroundColor: i % 2 === 0 ? 'var(--blue-accent)' : 'var(--gold-accent)', 
                        borderRadius: '2px' 
                      }} 
                    />
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
