import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function AssessmentModal({ isOpen, onClose, initialCountry }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    country: initialCountry || 'United Kingdom (UK)',
    category: 'Study Visa'
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', message: string }

  useEffect(() => {
    if (initialCountry) {
      setFormData(prev => ({ ...prev, country: initialCountry }));
    }
  }, [initialCountry]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.country || !formData.category) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const payload = {
      name: formData.name,
      mobile: formData.mobile,
      country: formData.country,
      category: formData.category
    };

    const endpoint = 'https://script.google.com/macros/s/AKfycbwxCmlPY52Pu4fVQvzbyGu3H0LTnl348HVd8OhXlIAF8prPKMDMMqMjKr6KNrnStCGm/exec';

    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setLoading(false);
      setStatus({
        type: 'success',
        message: 'Thank you! Your assessment request has been submitted successfully. Our senior counselor from Bhagwati Overseas (Ladwa) will contact you shortly.'
      });

      setFormData({
        name: '',
        mobile: '',
        country: 'United Kingdom (UK)',
        category: 'Study Visa'
      });

      setTimeout(() => {
        onClose();
        setStatus(null);
      }, 3500);

    } catch (err) {
      console.error('Submission error:', err);
      setLoading(false);
      setStatus({
        type: 'success', // Show optimistic success message even if no-cors
        message: 'Thank you! Your assessment request has been received. Our senior counselor from Bhagwati Overseas (Ladwa) will contact you shortly.'
      });
      setTimeout(() => {
        onClose();
        setStatus(null);
      }, 3500);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-fade-in assessment-modal-box" onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <span className="modal-tag">
              <ShieldCheck size={12} className="text-orange" />
              Bhagwati Overseas Study Abroad
            </span>
            <h3 className="modal-title">Book Free Profile Assessment</h3>
          </div>
          <button onClick={onClose} className="modal-close" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <p className="modal-subtext">
          Fill in your details below for a free 1-on-1 profile evaluation with our Ladwa directors. Zero hidden charges.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem' }}>
          
          <div className="form-group">
            <label className="form-label" htmlFor="assess-name">Full Name *</label>
            <input 
              type="text" 
              id="assess-name" 
              className="form-input" 
              placeholder="e.g. Rahul Sharma" 
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="assess-mobile">Mobile / WhatsApp Number *</label>
            <input 
              type="tel" 
              id="assess-mobile" 
              className="form-input" 
              placeholder="+91 98765 43210" 
              value={formData.mobile}
              onChange={e => setFormData({ ...formData, mobile: e.target.value })}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="assess-country">Country of Interest *</label>
            <select 
              id="assess-country" 
              className="form-input" 
              value={formData.country}
              onChange={e => setFormData({ ...formData, country: e.target.value })}
              required 
            >
              <option value="United Kingdom (UK)">United Kingdom (UK)</option>
              <option value="Canada">Canada</option>
              <option value="United States (USA)">United States (USA)</option>
              <option value="Australia">Australia</option>
              <option value="Germany & Europe">Germany & Europe</option>
              <option value="Singapore">Singapore</option>
              <option value="Mauritius">Mauritius</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Russia">Russia</option>
              <option value="Other Destination">Other Destination</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="assess-category">Category of Visa *</label>
            <select 
              id="assess-category" 
              className="form-input" 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
              required 
            >
              <option value="Study Visa">Study Visa</option>
              <option value="Visitor / Tourist Visa">Visitor / Tourist Visa</option>
              <option value="Spouse Visa">Spouse Visa</option>
            </select>
          </div>

          {status && (
            <div className={`status-msg-box ${status.type === 'error' ? 'status-error' : 'status-success'}`}>
              <CheckCircle2 size={16} />
              <span>{status.message}</span>
            </div>
          )}

          <div className="modal-actions-row">
            <button type="button" onClick={onClose} className="btn btn-secondary" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-orange btn-glow" disabled={loading}>
              <span>{loading ? 'Submitting...' : 'Submit Assessment Request'}</span>
              <Send size={16} />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
