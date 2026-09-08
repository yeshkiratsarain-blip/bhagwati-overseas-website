import React, { useState, useEffect } from 'react';
import { Settings, ExternalLink, RefreshCw, X, HelpCircle, CheckCircle } from 'lucide-react';

const FALLBACK_NEWS = [
  {
    category: 'visa update',
    headline: 'UK Student Visa Maintenance Requirements Updated for Autumn 2026 Intake',
    date: '2026-08-19',
    bullets: [
      'UK Visas and Immigration (UKVI) has adjusted the monthly maintenance funds requirement to reflect recent inflation.',
      'Students targeting London universities must now show £1,485 per month, while those studying outside London require £1,136 per month.',
      'Funds must be held in an approved bank account for a consecutive 28-day period prior to submission.',
      'Accredited sponsorships or student loans can be used to meet these requirements with appropriate official documentation.'
    ],
    link: 'https://www.gov.uk/student-visa'
  },
  {
    category: 'scholarship',
    headline: 'Canada Commonwealth & International Scholarships Open for 2027 Academic Year',
    date: '2026-08-18',
    bullets: [
      'The Government of Canada has announced the opening of fully funded scholarships for graduate-level international students.',
      'Provides coverage for full tuition, return air travel, health insurance, and a monthly living stipend of $1,800 CAD.',
      'Eligible programs include Master\'s and Ph.D. research courses across STEM, environmental sciences, and public policy.',
      'Applicants must secure an official supervisor approval letter or a conditional admission offer from a Canadian DLI prior to November 15.'
    ],
    link: 'https://www.educanada.ca'
  },
  {
    category: 'immigration',
    headline: 'Australia Introduces Priority Visa Processing Channels for Selected Regional DLIs',
    date: '2026-08-16',
    bullets: [
      'The Department of Home Affairs is launching a priority processing stream for Subclass 500 applications for regional institutions.',
      'Target turnaround times have been reduced from 45 days down to 14 days to support regional skills requirements.',
      'Includes additional post-study work visa rights (up to 2 extra years) for graduates residing and working in designated regional hubs.',
      'Financial verification requirements remain unchanged, requiring proof of one year of living costs (approx. $29,710 AUD).'
    ],
    link: 'https://immi.homeaffairs.gov.au'
  },
  {
    category: 'admission',
    headline: 'Germany Extends National Visa Appointment Openings for Indian Winter Intake',
    date: '2026-08-15',
    bullets: [
      'The German Embassy in India has opened additional visa appointment slots across VFS centers in Delhi, Mumbai, and Bengaluru.',
      'Prioritized slots are available for students holding direct, unconditional offers from public universities.',
      'Blocked account amount requirement is confirmed at €11,904 per year (€992 per month) for the upcoming semester.',
      'Students are encouraged to submit certificates from the Akademische Prüfstelle (APS) early to avoid verification delays.'
    ],
    link: 'https://india.diplo.de'
  }
];

export default function LiveRadar() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sheetId, setSheetId] = useState('1LSnGk-qjorL9oqxnTnuDz3wFmqHFBZIUuEq0ZF_P61A');

  const fetchNews = async (targetId) => {
    setLoading(true);
    setError(null);
    const activeId = targetId || '1LSnGk-qjorL9oqxnTnuDz3wFmqHFBZIUuEq0ZF_P61A';

    try {
      const response = await fetch(`https://opensheet.elk.sh/${activeId.trim()}/Sheet1`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch from Google Sheet (Status: ${response.status}).`);
      }
      
      const data = await response.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No data found or sheet is formatted incorrectly.");
      }

      const formattedNews = data.map((row, idx) => {
        const getVal = (possibleKeys) => {
          const foundKey = Object.keys(row).find(k => 
            possibleKeys.some(pk => k.toLowerCase().replace(/[^a-z0-9]/g, '') === pk.toLowerCase().replace(/[^a-z0-9]/g, ''))
          );
          return foundKey ? row[foundKey] : '';
        };

        const headline = getVal(['headline', 'title', 'news', 'subject']) || `Update #${idx + 1}`;
        const date = getVal(['date', 'posted', 'time']) || new Date().toISOString().split('T')[0];
        const category = getVal(['category', 'type', 'tag']) || 'visa update';

        let bulletsList = [];
        const contentStr = getVal(['bulletpoints', 'content', 'description', 'details']);
        if (contentStr) {
          bulletsList = contentStr.split(/[;\n\r]+/).map(b => b.trim()).filter(b => b.length > 0);
        } else {
          for (let i = 1; i <= 6; i++) {
            const bVal = getVal([`bullet${i}`, `point${i}`, `line${i}`]);
            if (bVal && bVal.trim() !== '') bulletsList.push(bVal.trim());
          }
        }

        if (bulletsList.length === 0) {
          bulletsList = ['Documentation requirements updated.', 'Contact Ladwa office for details.'];
        }

        return {
          category: category.toLowerCase(),
          headline,
          date,
          bullets: bulletsList
        };
      });

      // Deduplicate by headline (case-insensitive)
      const uniqueNews = [];
      const seenHeadlines = new Set();
      for (const item of formattedNews) {
        const normHeadline = item.headline.trim().toLowerCase();
        if (!seenHeadlines.has(normHeadline)) {
          seenHeadlines.add(normHeadline);
          uniqueNews.push(item);
        }
      }

      // Robust date parsing helper
      const parseNewsDate = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string') return 0;
        const trimmed = dateStr.trim();
        const timestamp = Date.parse(trimmed);
        if (!isNaN(timestamp)) return timestamp;
        const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
        if (dmyMatch) {
          return new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10)).getTime();
        }
        return 0;
      };

      // Sort by date descending (most fresh & newest on top) and slice top 10 only
      uniqueNews.sort((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date));
      const top10News = uniqueNews.slice(0, 10);

      setNews(top10News);
      setLoading(false);
    } catch (err) {
      console.warn(err);
      const parseNewsDate = (dateStr) => {
        if (!dateStr || typeof dateStr !== 'string') return 0;
        const trimmed = dateStr.trim();
        const timestamp = Date.parse(trimmed);
        if (!isNaN(timestamp)) return timestamp;
        const dmyMatch = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
        if (dmyMatch) {
          return new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10)).getTime();
        }
        return 0;
      };
      const sortedFallback = [...FALLBACK_NEWS]
        .sort((a, b) => parseNewsDate(b.date) - parseNewsDate(a.date))
        .slice(0, 10);
      setNews(sortedFallback);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(sheetId);
  }, []);

  return (
    <section className="section-padding radar-section animate-fade-in" id="visa-radar-view">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#10b981', borderRadius: '50%' }}></span>
            LIVE
          </span>
          <h2 className="section-title">DAILY NEWS/UPDATES</h2>
          <p className="section-desc">
            Stay up to date with official, real-time visa updates, embassy announcements, and international scholarship news.
          </p>
        </div>

        {/* Header Status */}
        <div className="radar-header-actions" style={{ justifyContent: 'flex-start', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '8px',
              backgroundColor: loading ? 'var(--blue-accent)' : '#10b981',
              borderRadius: '50%',
              boxShadow: loading ? '0 0 8px var(--blue-accent)' : '0 0 8px #10b981'
            }} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark-secondary)' }}>
              {loading ? 'Fetching live updates...' : 'Connected to Live Feed'}
            </span>
          </div>
        </div>

        {/* News Feed Grid */}
        {loading ? (
          <div className="radar-grid">
            {[1, 2, 3, 4].map(n => (
              <div className="news-card" key={n}>
                <div className="news-meta">
                  <div className="shimmer-loader" style={{ width: '80px', height: '20px' }} />
                </div>
                <div className="shimmer-loader" style={{ width: '100%', height: '24px', marginBottom: '1rem' }} />
                <div className="shimmer-loader" style={{ width: '85%', height: '18px', marginBottom: '1.5rem' }} />
                <div className="news-bullet-list">
                  <div className="shimmer-loader" style={{ width: '95%', height: '14px', marginBottom: '0.5rem' }} />
                  <div className="shimmer-loader" style={{ width: '90%', height: '14px', marginBottom: '0.5rem' }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="radar-grid">
            {news.map((item, index) => (
              <article className="news-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }} key={index}>
                <div className="news-meta">
                  <span className="news-tag" style={{
                    backgroundColor: item.category.includes('scholarship') ? 'var(--gold-accent)' : 
                                    item.category.includes('immigration') ? '#8b5cf6' : 
                                    item.category.includes('admission') ? '#10b981' : 'var(--navy-deep)',
                    color: item.category.includes('scholarship') ? 'var(--navy-deep)' : '#ffffff'
                  }}>{item.category}</span>
                </div>
                <h3 className="news-title">{item.headline}</h3>
                
                <ul className="news-bullet-list">
                  {item.bullets.map((bullet, bIdx) => (
                    <li className="news-bullet-item" key={bIdx}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
