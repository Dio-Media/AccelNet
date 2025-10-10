import logo from './logo.svg';
import './App.css';

function Header() {
  return(
    <header className="App-header">
      <div className="Header-logo">
        <div className="Logo">AccelNet</div>
        <nav className='Nav-bar'>
          <a href="/" className='Nav-link'>Home</a>
          <a href="/working-groups" className='Nav-link'>Working Groups</a>
          <a href="/grants" className='Nav-link'>Grants</a>
          <a href="/events" className='Nav-link'>Events</a>
          <a href="/login" className='Nav-link Primary-cta'>Login / Register</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return(
    <footer className="App-footer">
      <div className="Footer-content">
        <p>© 2025 AccelNet</p>
        <div className="Footer-links">
          <a href="/about">About</a> |
          <a href="/contact">Contact</a> |
          <a href="/privacy">Privacy Policy</a>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  return(
    <main className="App-main">
      <h1>Welcome to AccelNet</h1>
      <p>Your gateway to accelerator research and collaboration.</p>
      <div className='Cta-section'>
        <button className='Button-primary'>Explore Working Groups</button>
        <button className='Button-secondary'>View Upcoming Events</button>
      </div>

      <section className='Content-feed'>
        <h2>Latest News & Events</h2>
        <p>News and event cards will be dynamically displayed here.</p>
      </section>
    </main>
  );
}

function App() {
  return (
    <div className="App">
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
