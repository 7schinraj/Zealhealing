import React, { useState, useEffect, useRef } from 'react';

const contactInfo = [
  { icon: '📧', label: 'Email Us', value: 'hello@thetarotqueen.com', link: 'mailto:hello@thetarotqueen.com' },
  { icon: '📞', label: 'Call Us', value: '+91 98400 00000', link: 'tel:+919840000000' },
  { icon: '📍', label: 'Location', value: 'Salem, Tamil Nadu, India', link: '#' },
  { icon: '🕐', label: 'Hours', value: 'Mon–Sat: 9 AM – 7 PM', link: '#' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="section-alt"
      ref={ref}
      style={{
        padding: 'var(--section-py) var(--section-px)',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div style={{ maxWidth: 'var(--section-max-w)', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 'var(--section-header-mb)' }}>
          <div className="badge badge-green" style={{ marginBottom: '20px' }}>✦ Reach Out ✦</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text-main)',
          }}>
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            We'd love to hear from you. Reach out with any questions, or simply start your healing journey today.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(32px, 5vw, 64px)',
          alignItems: 'start',
        }}>
          <div>
            <h3 style={{
              fontSize: '24px',
              fontFamily: "'Cormorant Garamond', serif",
              color: 'var(--text-main)',
              marginBottom: '32px',
            }}>Get In Touch</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {contactInfo.map(({ icon, label, value, link }) => (
                <a key={label} href={link} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', textDecoration: 'none' }}>
                  <div style={{
                    width: '52px', height: '52px', flexShrink: 0,
                    borderRadius: '14px',
                    background: 'var(--color-primary-subtle)',
                    border: '1px solid rgba(27,107,74,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px',
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                      {label}
                    </div>
                    <div style={{ fontSize: '15px', color: 'var(--text-main)', fontWeight: '500' }}>
                      {value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div style={{
              marginTop: '40px',
              padding: '28px',
              background: 'linear-gradient(135deg, var(--color-primary-subtle), var(--color-accent-gold-light))',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-soft)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '44px', marginBottom: '14px' }}>🌿</div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                <strong style={{ color: 'var(--color-primary)' }}>Free 15-min consultation</strong> available for first-time clients. Book now and begin your healing journey.
              </p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: 'clamp(28px, 4vw, 48px)' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '56px', marginBottom: '20px' }}>✅</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', color: 'var(--color-primary)', marginBottom: '14px' }}>
                  Message Sent!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '15px', lineHeight: 1.7 }}>
                  We'll get back to you within 24 hours. Thank you for reaching out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px', marginBottom: '0' }}>
                  {[
                    { name: 'name', label: 'Your Name', placeholder: 'Priya Sharma', type: 'text' },
                    { name: 'email', label: 'Email Address', placeholder: 'priya@example.com', type: 'email' },
                  ].map(({ name, label, placeholder, type }) => (
                    <div key={name} className="input-group">
                      <label className="input-label">{label}</label>
                      <input
                        className="input-field"
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="input-group">
                  <label className="input-label">Subject</label>
                  <input
                    className="input-field"
                    name="subject"
                    type="text"
                    placeholder="How can we help you?"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="input-group">
                  <label className="input-label">Your Message</label>
                  <textarea
                    className="input-field"
                    name="message"
                    rows="6"
                    placeholder="Share what's on your mind..."
                    value={form.message}
                    onChange={handleChange}
                    required
                    style={{ resize: 'none', lineHeight: 1.7 }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '8px', padding: '16px', fontSize: '15px' }}
                >
                  🌿 Send My Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
