import React from 'react';
import { ShieldCheck, BookOpen, GraduationCap, Compass, Users } from 'lucide-react';

export default function AboutUs() {
  return (
    <section className="section-padding about-section animate-fade-in" id="about-view">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">Empowering Student Ambitions</span>
          <h2 className="section-title">About Bhagwati Overseas Study Abroad</h2>
          <p className="section-desc">
            Bringing world-class, transparent, and ethical study abroad guidance to students across Ladwa, Kurukshetra, and Haryana.
          </p>
        </div>

        {/* Our Story Box */}
        <div className="about-story-box">
          <div className="about-story-header">
            <div className="about-story-icon">
              <Compass size={24} />
            </div>
            <h3>Our Story</h3>
          </div>
          <p className="about-story-p">
            Founded in 2021 in Ladwa, Haryana, Bhagwati Overseas was created with a clear mission: to bring world-class, ethical, and transparent study abroad guidance to students in our region. We believe every student deserves honest career counseling, zero hidden charges, and genuine end-to-end support—from exam preparation to visa grants.
          </p>
        </div>

        {/* Core Values Section */}
        <div style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
          <h3 className="subsection-title">Our Core Values</h3>
          <p className="subsection-desc">The principles that guide our student-first philosophy every single day.</p>
          
          <div className="values-grid">
            
            <div className="value-card">
              <div className="value-icon-wrapper gold-glow">
                <ShieldCheck size={32} style={{ color: 'var(--gold-accent)' }} />
              </div>
              <h4>100% Transparency</h4>
              <p>Direct, honest advice with complete clarity at every step of the visa process.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrapper blue-glow">
                <BookOpen size={32} style={{ color: 'var(--blue-accent)' }} />
              </div>
              <h4>Cutting-Edge Technology</h4>
              <p>Providing students with modern AI tools, live visa tracking, and automated interview training.</p>
            </div>

            <div className="value-card">
              <div className="value-icon-wrapper green-glow">
                <GraduationCap size={32} style={{ color: '#10b981' }} />
              </div>
              <h4>Personal Mentorship</h4>
              <p>Dedicated one-on-one handholding for university selection, documentation, and visa filing.</p>
            </div>

          </div>
        </div>

        {/* Leadership Team Section */}
        <div style={{ marginTop: '3.5rem' }}>
          <h3 className="subsection-title">Leadership Team</h3>
          <p className="subsection-desc">Dedicated leaders committed to guiding your global education journey.</p>
          
          <div className="leader-grid">
            
            <div className="leader-card">
              <div className="leader-avatar">
                <Users size={30} />
              </div>
              <h4 className="leader-name">Yashkirat</h4>
              <span className="leader-role">Founder & Director</span>
            </div>

            <div className="leader-card">
              <div className="leader-avatar">
                <Users size={30} />
              </div>
              <h4 className="leader-name">Rishabh Punia</h4>
              <span className="leader-role">Director</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
