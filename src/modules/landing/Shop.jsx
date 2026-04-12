import React, { useState, useEffect, useRef } from 'react';

const allProducts = [
  {
    id: 1,
    name: 'Aredash Classic Waite Tarot Deck',
    price: '₹840',
    originalPrice: null,
    image: '/assets/shop/tarot1.png',
    desc: 'Standard Edition Classic Waite Tarot Deck — perfect for beginners and expert spiritual readers alike.',
    rating: 4.8, reviews: 215,
    badge: 'bestseller',
    category: 'Tarot',
  },
  {
    id: 2,
    name: 'Classic Rider Waite Smith Tarot',
    price: '₹1,211',
    originalPrice: '₹1,850',
    image: '/assets/shop/tarot2.png',
    desc: "The world's most authentic Rider Waite Smith Tarot deck with beautifully illustrated cards for divine readings.",
    rating: 4.9, reviews: 312,
    badge: 'bestseller',
    category: 'Tarot',
  },
  {
    id: 3,
    name: 'Original Rider Waite Tarot Deck',
    price: '₹998',
    originalPrice: null,
    image: '/assets/shop/tarot3.png',
    desc: 'A faithful reproduction of the original 1910 Rider-Waite deck with timeless sacred illustrated imagery.',
    rating: 4.7, reviews: 148,
    badge: 'new',
    category: 'Tarot',
  },
  {
    id: 4,
    name: 'Green Tara Maa Statue Goddess',
    price: '₹1,553',
    originalPrice: '₹2,299',
    image: '/assets/shop/statue1.png',
    desc: 'Tibetan Buddhist Green Tara Maa Statue Goddess, 21cm — beautifully handcrafted sacred deity idol.',
    rating: 4.9, reviews: 184,
    badge: 'bestseller',
    category: 'Sacred Idols',
  },
  {
    id: 5,
    name: 'Green Tara Maa Decorative Showpiece',
    price: '₹1,487',
    originalPrice: '₹2,100',
    image: '/assets/shop/statue2.png',
    desc: 'Tibetan Buddhist Green Tara Maa premium decorative showpiece — a divine addition to your sacred altar.',
    rating: 4.8, reviews: 96,
    badge: null,
    category: 'Sacred Idols',
  },
  {
    id: 6,
    name: 'Tara Maa Resin Sacred Idol',
    price: '₹793',
    originalPrice: '₹1,100',
    image: '/assets/shop/statue3.png',
    desc: 'Green Tara Maa beautifully crafted Resin religious idol — ideal for home shrine and daily spiritual practice.',
    rating: 4.6, reviews: 72,
    badge: 'new',
    category: 'Sacred Idols',
  },
];

const categories = ['All', 'Tarot', 'Sacred Idols'];

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span style={{ color: 'var(--color-accent-gold)', fontSize: '13px', letterSpacing: '1px' }}>
      {'★'.repeat(full)}{half ? '½' : ''}{'☆'.repeat(5 - full - (half ? 1 : 0))}
    </span>
  );
};

const getDiscount = (orig, curr) => {
  if (!orig) return null;
  const o = parseInt(orig.replace(/[₹,]/g, ''));
  const c = parseInt(curr.replace(/[₹,]/g, ''));
  return Math.round(((o - c) / o) * 100);
};

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [wishlist, setWishlist] = useState(new Set());
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  const toggleWishlist = (id) => {
    setWishlist(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <section
      id="shop"
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
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div className="badge badge-gold" style={{ marginBottom: '20px' }}>✦ Sacred Store ✦</div>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 58px)',
            marginBottom: '16px',
            fontFamily: "'Cormorant Garamond', serif",
            color: 'var(--text-main)',
          }}>
            Sacred <span className="text-gradient">Shop</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto', fontSize: '16px', lineHeight: 1.7 }}>
            Curated selection of authentic tarot decks, divine sacred idols, and spiritual tools for your journey.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--section-header-mb)' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '9px 22px',
                borderRadius: '30px',
                border: '1.5px solid',
                borderColor: activeCategory === cat ? 'var(--color-primary)' : 'var(--color-border-soft)',
                background: activeCategory === cat ? 'var(--color-primary)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--text-muted)',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'var(--transition)',
                fontFamily: 'inherit',
              }}
            >{cat}</button>
          ))}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 'var(--section-gap)',
        }}>
          {filtered.map(product => {
            const discount = getDiscount(product.originalPrice, product.price);
            return (
              <div
                key={product.id}
                className="glass-card"
                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}
              >
                {product.badge && (
                  <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
                    <span style={{
                      background: product.badge === 'bestseller' ? 'var(--color-accent-gold)' : 'var(--color-primary)',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: '700',
                      padding: '4px 10px',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                      {product.badge === 'bestseller' ? '🏆 Best Seller' : '✨ New'}
                    </span>
                  </div>
                )}

                {discount && (
                  <div style={{
                    position: 'absolute', top: product.badge ? '40px' : '12px', left: '12px', zIndex: 2,
                    background: '#e63946',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '20px',
                  }}>
                    {discount}% OFF
                  </div>
                )}

                <button
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Toggle wishlist"
                  style={{
                    position: 'absolute', top: '12px', right: '12px', zIndex: 2,
                    width: '34px', height: '34px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '16px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    transition: 'var(--transition)',
                  }}
                >
                  {wishlist.has(product.id) ? '❤️' : '🤍'}
                </button>

                <div className="card-img-wrap" style={{ height: 'clamp(180px, 28vw, 220px)', background: 'var(--color-bg-surface)', flexShrink: 0 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="hover-zoom"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{
                    fontSize: '17px',
                    marginBottom: '6px',
                    fontFamily: "'Cormorant Garamond', serif",
                    color: 'var(--text-main)',
                    lineHeight: 1.3,
                  }}>
                    {product.name}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                    <StarRating rating={product.rating} />
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '18px', lineHeight: 1.6, flex: 1 }}>
                    {product.desc}
                  </p>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--color-border-soft)',
                    paddingTop: '14px',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}>
                    <div>
                      {product.originalPrice && (
                        <div style={{
                          fontSize: '13px',
                          color: 'var(--text-muted)',
                          textDecoration: 'line-through',
                          lineHeight: 1.2,
                        }}>
                          {product.originalPrice}
                        </div>
                      )}
                      <div style={{
                        fontWeight: '700',
                        fontSize: '20px',
                        color: 'var(--color-primary)',
                        fontFamily: "'Cormorant Garamond', serif",
                        lineHeight: 1.2,
                      }}>
                        {product.price}
                      </div>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '9px 18px', fontSize: '12px', flexShrink: 0 }}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Shop;
