import React from 'react';
import { ArrowUpRight, GraduationCap, CheckCircle2, Globe2, Sparkles } from 'lucide-react';

const DESTINATIONS_DATA = [
  {
    id: 'uk',
    name: 'United Kingdom (UK)',
    badge: 'Up to 3-Year Post Study Work Permit',
    subtext: 'MOI & English Waiver Options Available',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'Business, Tech, Healthcare, Data Science',
    intakes: 'Jan / Feb & Sept / Oct'
  },
  {
    id: 'canada',
    name: 'Canada',
    badge: 'Fast-Track Visa Intakes & PGWP Pathways',
    subtext: 'Up to 3-Year Post-Graduation Work Permit & PR Points',
    image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'IT, Engineering, Project Management, Nursing',
    intakes: 'Jan, May & Sept'
  },
  {
    id: 'usa',
    name: 'United States (USA)',
    badge: '3-Year STEM OPT & High Scholarships',
    subtext: 'Top Ivy League & State Universities with Assistantships',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'Computer Science, AI, Business Analytics, Finance',
    intakes: 'Fall (Aug) & Spring (Jan)'
  },
  {
    id: 'australia',
    name: 'Australia',
    badge: 'Priority Regional Processing',
    subtext: 'Up to 4-Year Work Rights & High Hourly Wages',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'Cybersecurity, Public Health, Hospitality, Accounting',
    intakes: 'Feb & July'
  },
  {
    id: 'germany',
    name: 'Germany & Europe',
    badge: 'Zero / Low Tuition & 18-Month Job Seeker',
    subtext: 'Public University Admissions (Ireland, France, Italy, Cyprus)',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'Automotive, Mechanical, Robotics, Renewable Energy',
    intakes: 'Winter (Oct) & Summer (April)'
  },
  {
    id: 'singapore',
    name: 'Singapore',
    badge: 'Global Financial Hub & Fast Visa Approval',
    subtext: '2-3 Week Visa Turnaround with Top Asian Universities',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'Fintech, Logistics, Hospitality Management, AI',
    intakes: 'Rolling Intakes (Multiple Entries)'
  },
  {
    id: 'mauritius',
    name: 'Mauritius',
    badge: 'Affordable Quality Education',
    subtext: 'Easy Visa Clearance & Zero Academic Gap Obstacles',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'International Business, Tourism, Law, IT',
    intakes: 'Feb & July'
  },
  {
    id: 'nz',
    name: 'New Zealand',
    badge: 'Spouse Work Rights & High PR Points',
    subtext: 'Safe, Peaceful Environment & Excellent Quality of Life',
    image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'Agriculture, Environmental Science, Nursing, IT',
    intakes: 'Feb & July'
  },
  {
    id: 'russia',
    name: 'Russia',
    badge: 'Top Ranked MBBS & Medical Programs',
    subtext: 'WHO / NMC Approved Universities with No IELTS Required',
    image: 'https://images.unsplash.com/photo-1513326718677-b964603b136b?auto=format&fit=crop&w=800&q=80',
    popularCourses: 'MBBS, General Medicine, Aviation, Engineering',
    intakes: 'Sept / Oct Intake'
  }
];

export default function Destinations({ onSelectCountry }) {
  return (
    <section className="section-padding destinations-section animate-fade-in" id="destinations-view">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag section-tag-orange">
            <Globe2 size={13} style={{ marginRight: '4px' }} />
            GLOBAL ACADEMIC PATHWAYS
          </span>
          <h2 className="section-title">Top Study & Visa Destinations</h2>
          <p className="section-desc">
            Explore world-renowned education hubs. Our Ladwa team provides specialized profile evaluation, application fee waivers, and guaranteed visa support for each destination.
          </p>
        </div>

        {/* Destinations 9-Card Grid */}
        <div className="destinations-grid">
          {DESTINATIONS_DATA.map((dest) => (
            <div 
              key={dest.id} 
              className="destination-card animate-fade-in"
              onClick={() => onSelectCountry && onSelectCountry(dest.name)}
            >
              <div className="destination-image-wrapper">
                <img src={dest.image} alt={`${dest.name} Study Abroad`} className="destination-image" />
                <div className="destination-overlay" />
                <span className="destination-badge">{dest.badge}</span>
              </div>
              
              <div className="destination-content">
                <div className="destination-header-row">
                  <h3 className="destination-name">{dest.name}</h3>
                  <div className="destination-arrow-box">
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p className="destination-subtext">{dest.subtext}</p>

                <div className="destination-footer">
                  <div className="destination-info-item">
                    <GraduationCap size={14} className="info-icon" />
                    <span>{dest.popularCourses}</span>
                  </div>
                  <div className="destination-info-item">
                    <CheckCircle2 size={14} className="info-icon" />
                    <span>Intakes: {dest.intakes}</span>
                  </div>
                </div>

                <button className="destination-btn">
                  <span>Explore Pathways & Apply</span>
                  <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Destination Bottom CTA Bar */}
        <div className="destinations-bottom-bar">
          <div className="destinations-bar-text">
            <Sparkles size={20} className="text-orange" />
            <div>
              <h4>Not sure which destination fits your academic profile and budget?</h4>
              <p>Get a free, transparent 1-on-1 profile assessment with our senior director in Ladwa.</p>
            </div>
          </div>
          <button 
            className="btn btn-orange btn-glow"
            onClick={() => onSelectCountry && onSelectCountry('General')}
          >
            <span>Book Free Assessment</span>
            <ArrowUpRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
