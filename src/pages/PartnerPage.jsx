import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './PartnerPage.css';

const PartnerPage = () => {
  const [formData, setFormData] = useState({
    startupName: '',
    founderName: '',
    location: '',
    phone: '',
    email: ''
  });
  const [status, setStatus] = useState('idle'); // 'idle', 'submitting', 'success', 'error'
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const yHeader = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdbv1_mhVZNHuh-kn5PO_5DMggkZSXr7XVgNpQ_4YS-RxDOzQ/formResponse";
    
    const formPayload = new URLSearchParams();
    formPayload.append("entry.31366759", formData.startupName);
    formPayload.append("entry.1705616871", formData.founderName);
    formPayload.append("entry.1867333943", formData.location);
    formPayload.append("entry.218636556", formData.phone);
    formPayload.append("entry.2072718394", formData.email);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formPayload
      });
      
      setStatus('success');
      setFormData({ startupName: '', founderName: '', location: '', phone: '', email: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <motion.main 
      className="partner-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      ref={ref}
    >
      <div className="container">
        <motion.div 
          className="partner-header"
          style={{ y: yHeader }}
        >
          <span className="mono-label">PARTNERSHIPS</span>
          <h2>Let's build something together.</h2>
          <p>Fill out the form below and we'll get back to you shortly.</p>
        </motion.div>

        <div className="form-container">
          {status === 'success' ? (
            <motion.div className="success-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3>Thank you!</h3>
              <p>Your details have been submitted successfully. We will be in touch soon.</p>
            </motion.div>
          ) : (
            <form className="partner-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="startupName">Registered Venture Name <span style={{ color: 'var(--color-coral)' }}>*</span></label>
                <input type="text" id="startupName" name="startupName" value={formData.startupName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="founderName">Lead Founder / CEO <span style={{ color: 'var(--color-coral)' }}>*</span></label>
                <input type="text" id="founderName" name="founderName" value={formData.founderName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="location">HQ Location (City) <span style={{ color: 'var(--color-coral)' }}>*</span></label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Contact No. <span style={{ color: 'var(--color-coral)' }}>*</span></label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Corporate Email Address <span style={{ color: 'var(--color-coral)' }}>*</span></label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary form-submit interactive" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Submitting...' : 'Submit Details'}
              </button>
              {status === 'error' && <p className="error-message">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default PartnerPage;
