import React from 'react';
import { BookOpen, GraduationCap, FileCheck, Users, MapPin, Phone, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

const SERVICES_DATA = [
  {
    icon: GraduationCap,
    title: 'Study Abroad Counselling',
    desc: 'Get one-on-one expert mentoring to clarify your career roadmap. We match your academic record, financial budget, and aspirations with top global destinations.',
    items: ['Destinations: UK, Canada, USA, Australia, Germany', 'Detailed profile assessment', 'Country and course viability reports']
  },
  {
    icon: BookOpen,
    title: 'Admission & University Selection',
    desc: 'Access our network of hundreds of global universities. We handle application forms, review SOPs, draft reference letters, and secure conditional/unconditional offers.',
    items: ['Official SOP writing guidelines', 'Application fee waivers (where eligible)', 'Fast offer letter turnarounds']
  },
  {
    icon: FileCheck,
    title: 'Visa Filing & Documentation',
    desc: 'Our visa success rate stands among the highest in the region. We ensure flawless documentation, financial proof checks, and strict adherence to embassy guidelines.',
    items: ['Mock credibility interview prep', 'Blocked account setup (Germany)', 'GIC support (Canada) & Financial checking']
  },
  {
    icon: Users,
    title: 'Test Prep (IELTS & PTE)',
    desc: 'Ace your English proficiency tests with our expert instructors. We offer customized classroom batches in Ladwa and online practice modules with high-scoring secrets.',
    items: ['Weekly mock testing & evaluation', 'Speaking & writing focus strategies', 'Authorized exam registration assistance']
  }
];

export default function Services() {
  return (
    <section className="section-padding services-section animate-fade-in" id="services-view">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">Our Expertise</span>
          <h2 className="section-title">Professional Study Abroad Solutions</h2>
          <p className="section-desc">
            From your very first counselling session in our Ladwa office to your airport pickup abroad, Bhagwati Overseas supports you at every step of your study journey.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid" style={{ marginBottom: '5rem' }}>
          {SERVICES_DATA.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div className="service-card animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }} key={idx}>
                <div className="service-icon-box">
                  <Icon size={24} />
                </div>
                <h3 className="service-card-title">{srv.title}</h3>
                <p className="service-card-desc">{srv.desc}</p>
                <ul className="service-card-list">
                  {srv.items.map((item, itemIdx) => (
                    <li className="service-card-item" key={itemIdx}>
                      <CheckCircle2 size={14} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Ladwa Office Contact Map Section */}
        <div className="section-header" style={{ marginBottom: '3rem' }}>
          <span className="section-tag">Visit Us</span>
          <h2 className="section-title">Ladwa Head Office</h2>
          <p className="section-desc">
            Have questions? Walk into our office in Ladwa (Kurukshetra) for a free initial profile assessment session with our senior counsellors.
          </p>
        </div>

        <div className="map-grid">
          {/* Contact Details Card */}
          <div className="contact-card">
            <h3 className="contact-title">Contact Information</h3>
            <div className="contact-list">
              
              <div className="contact-item">
                <div className="contact-icon-box">
                  <MapPin size={18} />
                </div>
                <div className="contact-item-details">
                  <span className="contact-item-label">Address</span>
                  <span className="contact-item-value">
                    Bhagwati Overseas, Above Nirula Clinic,<br />
                    Behind Bus Stand, Ladwa,<br />
                    Haryana 136132
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Phone size={18} />
                </div>
                <div className="contact-item-details">
                  <span className="contact-item-label">Call / WhatsApp</span>
                  <span className="contact-item-value">
                    <a href="tel:+918278089882">+91 82780 89882</a>
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Mail size={18} />
                </div>
                <div className="contact-item-details">
                  <span className="contact-item-label">Email Support</span>
                  <span className="contact-item-value">
                    <a href="mailto:info@bhagwatioverseas.com">info@bhagwatioverseas.com</a>
                  </span>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-box">
                  <Clock size={18} />
                </div>
                <div className="contact-item-details">
                  <span className="contact-item-label">Office Hours</span>
                  <span className="contact-item-value">
                    Monday – Saturday: 09:30 AM – 06:00 PM<br />
                    Sunday: Closed
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Interactive Google Map iframe */}
          <div className="map-wrapper">
            <iframe 
              src="https://maps.google.com/maps?q=Bhagwati%20Overseas,%20above%20Nirula%20Clinic,%20behind%20Bus%20Stand,%20Ladwa,%20Haryana%20136132&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              className="map-iframe" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Bhagwati Overseas Office Location Map"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
