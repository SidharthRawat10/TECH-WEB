import { useState, useEffect } from 'react';
import { ExternalLink, Zap, Info, Globe, Share2, Mail, MessageCircle, Search, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { categories, products } from './data';
import './index.css';

function App() {
  const [activeCategory, setActiveCategory] = useState("AC"); // Set AC as default since we are working on it
  const [requestText, setRequestText] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");

  const currentCategoryData = products[activeCategory];

  const loadingSteps = [
    "Searching Google & organic forums...",
    "Scanning Reddit comment threads for real opinions...",
    "Filtering out sponsored content & brand-promoted videos...",
    "Analyzing tech specs and community consensus...",
    "Ranking the top products for your budget...",
    "Generating authentic pros, cons, and affiliate deals..."
  ];

  useEffect(() => {
    let interval;
    if (isLoading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 2000);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleAISearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearchError("");
    setSearchResult(null);

    try {
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
      const apiUrl = isLocalhost ? "http://localhost:5000/api/search" : "/api/search";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: searchQuery })
      });

      const data = await response.json();
      if (response.ok) {
        setSearchResult(data);
      } else {
        setSearchError(data.error || "An error occurred while fetching recommendations.");
      }
    } catch (error) {
      console.error("AI Search Error:", error);
      setSearchError("Could not connect to the AI search server. Make sure the backend server is running on port 5000.");
    } finally {
      setIsLoading(false);
    }
  };


  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!requestText.trim()) return;

    setSubmitStatus("Sending suggestion...");

    try {
      const response = await fetch("https://formsubmit.co/ajax/sidharthrawat684@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          suggestion: requestText,
          _subject: "TechPicks: New Product/Category Suggestion!"
        })
      });

      const data = await response.json();
      if (data.success === "true" || data.success === true) {
        setSubmitStatus("Suggestion sent successfully! Thank you.");
        setRequestText("");
      } else if (data.message && data.message.includes("Activation")) {
        setSubmitStatus("Activation required! Check your email (sidharthrawat684@gmail.com) and click 'Activate Form'.");
        setRequestText("");
      } else {
        setSubmitStatus(data.message || "Failed to send suggestion. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      setSubmitStatus("Failed to send suggestion. Please try again.");
    }

    setTimeout(() => {
      setSubmitStatus("");
    }, 6000);
  };


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

        <section className="ai-search-section">
          <div className="search-container-card">
            <div className="search-header">
              <span className="search-badge"><Sparkles size={14} /> AI Product Researcher</span>
              <h2>Instant Unbiased Tech Research</h2>
              <p>Search for any product or budget range (e.g. <i>"best AC under 40k"</i>, <i>"gaming keyboard under 5000"</i>). Our AI agent scans real Reddit discussions and YouTube comments to build an honest, ad-free summary and finds deals using your affiliate link.</p>
            </div>
            
            <form onSubmit={handleAISearchSubmit} className="ai-search-form">
              <div className="search-input-wrapper">
                <Search className="search-icon-inside" size={20} />
                <input
                  type="text"
                  placeholder="Ask anything... e.g., Best noise cancelling headphones under 15000"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="ai-search-input"
                  disabled={isLoading}
                  required
                />
              </div>
              <button type="submit" className="buy-btn ai-search-btn" disabled={isLoading}>
                {isLoading ? "Researching..." : "Research"}
              </button>
            </form>

            {isLoading && (
              <div className="loading-container">
                <div className="spinner"></div>
                <p className="loading-text">{loadingSteps[loadingStep]}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}></div>
                </div>
              </div>
            )}

            {searchError && (
              <div className="search-error-card">
                <AlertCircle size={24} color="#ef4444" />
                <p>{searchError}</p>
              </div>
            )}

            {searchResult && (
              <div className="search-results-container">
                <div className="results-summary">
                  <div className="summary-title">
                    <ShieldCheck size={20} color="var(--accent-color)" />
                    <h3>AI Research Verdict</h3>
                  </div>
                  <p>{searchResult.summary}</p>
                </div>

                <div className="recommended-grid">
                  {searchResult.products && searchResult.products.map((product, idx) => (
                    <div className="ai-product-card" key={idx}>
                      <div className="card-rank">Rank #{idx + 1} Recommendation</div>
                      <h3 className="product-title">{product.name}</h3>
                      <p className="product-desc">{product.description}</p>
                      
                      {product.specs && (
                        <div className="product-specs-box">
                          <strong>Specs:</strong> {product.specs}
                        </div>
                      )}
                      
                      <div className="why-suggested-box">
                        <strong>Why we suggest this:</strong> {product.whySuggested}
                      </div>

                      <div className="pros-cons-grid">
                        <div className="pros-box">
                          <h4>Pros</h4>
                          <ul>
                            {product.pros && product.pros.map((pro, pIdx) => (
                              <li key={pIdx}>✓ {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="cons-box">
                          <h4>Cons</h4>
                          <ul>
                            {product.cons && product.cons.map((con, cIdx) => (
                              <li key={cIdx}>✗ {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <a 
                        href={product.affiliateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="buy-btn ai-buy-btn"
                      >
                        Get the Best Deal on Amazon <ExternalLink size={16} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
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

        <section className="request-section">
          <div className="request-card">
            <div className="request-icon">
              <Mail size={32} />
            </div>
            <div className="request-content">
              <h2>Can't find what you're looking for?</h2>
              <p>Tell me what product or category is missing, and I'll find the best deals and add it for you!</p>
              <form onSubmit={handleRequestSubmit} className="request-form">
                <input
                  type="text"
                  placeholder="e.g., Mechanical Keyboards, 4K Monitors, AC under 30k..."
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  className="request-input"
                  required
                />
                <button type="submit" className="buy-btn request-btn">
                  Send Request
                </button>
              </form>
              {submitStatus && <p className="submit-status">{submitStatus}</p>}
            </div>
          </div>
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
