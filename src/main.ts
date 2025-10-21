import './style.css'

const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <header class="header">
    <nav class="nav">
      <div class="nav-brand">
        <h1>National Skills Wallet</h1>
      </div>
      <div class="nav-links">
        <a href="#features">Features</a>
        <a href="#how-it-works">How it Works</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div class="hero-content">
        <h2>Your Digital Skills, Securely Stored</h2>
        <p>National Skills Wallet is the UK's premier platform for secure digital credentials, skills verification, and lifelong learning records.</p>
        <div class="hero-buttons">
          <button class="btn btn-primary">Get Started</button>
          <button class="btn btn-secondary">Learn More</button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="badge-showcase">
          <div class="badge">🏆</div>
          <div class="badge">🎓</div>
          <div class="badge">🔧</div>
          <div class="badge">💼</div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <div class="container">
        <h3>Why Choose National Skills Wallet?</h3>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h4>Secure & Private</h4>
            <p>Your credentials are protected with enterprise-grade security and you control who can access your information.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h4>Instant Verification</h4>
            <p>Employers and institutions can instantly verify your credentials without compromising your privacy.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🌐</div>
            <h4>Universal Standards</h4>
            <p>Built on international W3C standards for verifiable credentials, ensuring compatibility worldwide.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-it-works">
      <div class="container">
        <h3>How It Works</h3>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h4>Receive Credentials</h4>
            <p>Educational institutions and training providers issue your digital credentials directly to your wallet.</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h4>Store Securely</h4>
            <p>Your credentials are encrypted and stored securely in your personal digital wallet.</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h4>Share When Needed</h4>
            <p>Present your credentials to employers or institutions with full control over what information you share.</p>
          </div>
        </div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h4>National Skills Wallet</h4>
          <p>Empowering lifelong learning through secure digital credentials.</p>
        </div>
        <div class="footer-links">
          <div class="footer-section">
            <h5>Platform</h5>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#standards">Standards</a>
          </div>
          <div class="footer-section">
            <h5>Support</h5>
            <a href="#help">Help Center</a>
            <a href="#contact">Contact Us</a>
            <a href="#documentation">Documentation</a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 National Skills Wallet. All rights reserved.</p>
      </div>
    </div>
  </footer>
`
