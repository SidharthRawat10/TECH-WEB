import { useState, useEffect } from 'react';
import { ExternalLink, Zap, Info, Globe, Share2, Mail, MessageCircle } from 'lucide-react';
import { categories, products } from './data';
import './index.css';

function App() {
  const [activeCategory, setActiveCategory] = useState("AC"); // Set AC as default since we are working on it
  const currentCategoryData = products[activeCategory];

  return (
    <>
      <header>
        <div className="logo">TechPicks</div>
        <div style={{ color: 'var(--text-secondary)' }}>Curated for you</div>
      </header>

      <main className="container">
        <section className="hero">
          <div className="hero-content">
            <div className="hero-intro">
              <h1 className="intro-greeting">Hi, I’m <span>Sidharth</span></h1>
              <p className="intro-text">A tech enthusiast passionate about helping you make smarter choices.</p>
              <p className="intro-text">In a world full of endless options and confusing reviews, finding the right tech can feel overwhelming. That’s exactly why this platform exists.</p>
              <p className="intro-text">Here, you won’t find random recommendations or clutter — only carefully selected, high-quality products that truly deliver value. Every product featured is chosen with precision, so you can skip the research, avoid the confusion, and make confident decisions effortlessly.</p>
              <p className="intro-text">Whether you're upgrading your setup, exploring new gadgets, or simply looking for the best in the market — you're in the right place.</p>
              <p className="intro-text">No noise. No wasted time. Just the best tech, curated for you.</p>
            </div>
            <div className="hero-visual">
              <img src="/images/hero_visual.png" alt="Abstract Tech Visualization" />
            </div>
          </div>
        </section>

        <section className="categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              <Zap size={20} color={activeCategory === category ? '#fff' : 'var(--accent-color)'} />
              {category}
            </button>
          ))}
        </section>

        <section className="category-content" key={activeCategory}>
          {currentCategoryData.introText && (
            <div className="category-intro">
              <Info size={24} color="var(--accent-color)" className="intro-icon" />
              <p>{currentCategoryData.introText}</p>
            </div>
          )}

          <div className="products-list">
            {currentCategoryData.sections ? (
              currentCategoryData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="category-section">
                  <h3 className="section-title">{section.title}</h3>
                  {section.items.map((product, index) => (
                    <div className="showcase-container" key={index}>
                      <div className="showcase-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="showcase-info">
                        <span className="badge">Rank #{index + 1} Pick</span>
                        <h2>{product.name}</h2>
                        <p>{product.description}</p>
                        <a href={product.link} target="_blank" rel="noopener noreferrer" className="buy-btn">
                          Get the Best Deal <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              currentCategoryData.items && currentCategoryData.items.map((product, index) => (
                <div className="showcase-container" key={index}>
                  <div className="showcase-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="showcase-info">
                    <span className="badge">Rank #{index + 1} Best Pick</span>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <a href={product.link} target="_blank" rel="noopener noreferrer" className="buy-btn">
                      Get the Best Deal <ExternalLink size={20} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          {currentCategoryData.essentials && currentCategoryData.essentials.length > 0 && (
            <div className="essentials-section">
              <h3 className="essentials-title">Essential Accessories</h3>
              <div className="essentials-grid">
                {currentCategoryData.essentials.map((item, index) => (
                  <div className="essential-card" key={index}>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="buy-btn essential-btn">
                      Buy Now <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      
      <footer className="tech-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">TechPicks</div>
            <p>Curating the absolute best tech gear so you can make smarter decisions without the noise. Elevate your setup today.</p>
            <div className="social-links">
              <a href="#" aria-label="Website"><Globe size={20} /></a>
              <a href="#" aria-label="Share"><Share2 size={20} /></a>
              <a href="#" aria-label="Chat"><MessageCircle size={20} /></a>
              <a href="#" aria-label="Email"><Mail size={20} /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Top Categories</h3>
            <ul>
              {categories.slice(0, 5).map(cat => (
                <li key={cat}>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveCategory(cat); }}>{cat}</button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-links">
            <h3>Explore</h3>
            <ul>
              {categories.slice(5).map(cat => (
                <li key={cat}>
                  <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setActiveCategory(cat); }}>{cat}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">&copy; {new Date().getFullYear()} TechPicks by Sidharth. All rights reserved.</p>
          <p className="affiliate-disclaimer">* Disclosure: Some of the links on this website are affiliate links. This means that, at zero cost to you, we will earn an affiliate commission if you click through the link and finalize a purchase.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
