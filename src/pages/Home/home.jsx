import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      {/* Hero Section - COST.eu style */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Connecting Researchers Across Europe and Beyond</h1>
          <p>
            AccelNet is a funding organization for research and innovation networks. 
            Our platform helps connect research initiatives across Europe and enables 
            researchers to grow their ideas by sharing them with their peers.
          </p>
          <Link to="/login" className="Button-primary" style={{
            background: 'white',
            color: '#004494',
            display: 'inline-block',
            marginTop: '10px'
          }}>
            Join Our Network
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <main className="App-main">
        {/* Info Cards Section */}
        <h2 className="section-title">How Can We Help You?</h2>
        <div className="info-cards">
          <div className="info-card">
            <div className="card-icon">📚</div>
            <h3>Find Events</h3>
            <p>Discover upcoming conferences, workshops, and training schools in your field.</p>
          </div>
          <div className="info-card">
            <div className="card-icon">🤝</div>
            <h3>Network</h3>
            <p>Connect with researchers and organizations across multiple disciplines.</p>
          </div>
          <div className="info-card">
            <div className="card-icon">💰</div>
            <h3>Apply for Grants</h3>
            <p>Access funding opportunities for research mobility and collaboration.</p>
          </div>
          <div className="info-card">
            <div className="card-icon">📰</div>
            <h3>Stay Updated</h3>
            <p>Read the latest news and success stories from our community.</p>
          </div>
        </div>

        {/* News Section */}
        <section className="Content-feed">
          <h2 className="section-title">News & Success Stories</h2>
          <div className="news-grid">
            <div className="news-card">
              <div className="news-image">📊</div>
              <div className="news-content">
                <div className="news-date">October 5, 2025</div>
                <h3>Building bridges in science</h3>
                <p>The strategic power of research networks in shaping policy and driving global collaboration.</p>
                <Link to="/news/1" className="read-more">Read more</Link>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image">🔬</div>
              <div className="news-content">
                <div className="news-date">October 2, 2025</div>
                <h3>Investigating AI applications</h3>
                <p>How artificial intelligence is transforming archaeological research and discoveries.</p>
                <Link to="/news/2" className="read-more">Read more</Link>
              </div>
            </div>
            <div className="news-card">
              <div className="news-image">🌍</div>
              <div className="news-content">
                <div className="news-date">September 28, 2025</div>
                <h3>Supporting minority rights</h3>
                <p>Cross-border research initiatives advancing human rights and social justice.</p>
                <Link to="/news/3" className="read-more">Read more</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section>
          <h2 className="section-title">Upcoming Events</h2>
          <div className="events-list">
            <div className="event-item">
              <div className="event-date">
                <strong>SEP 14-22</strong>
                <span>2025</span>
              </div>
              <div className="event-details">
                <h4>CaLISTA General Meeting 2025</h4>
                <p>Cartan geometry, Lie, Integrable Systems, quantum group Theories for Applications</p>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <strong>SEP 9-11</strong>
                <span>2025</span>
              </div>
              <div className="event-details">
                <h4>Evidence-based physical activity in old age</h4>
                <p>Training school with online participation available</p>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <strong>OCT 15</strong>
                <span>2025</span>
              </div>
              <div className="event-details">
                <h4>Virtual Mobility Grant Info Session</h4>
                <p>Learn about grant opportunities and application process</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <div className="Cta-section" style={{marginTop: '60px'}}>
          <Link to="/working-groups" className="Button-primary">Explore Working Groups</Link>
          <Link to="/grants" className="Button-secondary">View Grant Opportunities</Link>
        </div>
      </main>

      {/* Statistics Section */}
      <section className="statistics-section">
        <h2 style={{ marginBottom: '40px', fontSize: '2rem' }}>
          Statistics at a Glance
        </h2>
        <div className="stats-grid">
          <div className="stat-item">
            <h3>150+</h3>
            <p>Running Actions</p>
          </div>
          <div className="stat-item">
            <h3>45,000+</h3>
            <p>Researchers Involved</p>
          </div>
          <div className="stat-item">
            <h3>2,500+</h3>
            <p>Scientific Missions</p>
          </div>
          <div className="stat-item">
            <h3>400+</h3>
            <p>Training Schools</p>
          </div>
        </div>
      </section>
    </>
  );
}