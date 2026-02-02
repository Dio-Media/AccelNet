import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NewsPage from './pages/News.jsx';
import EventsPage from './pages/Events.jsx';
import WgPage from './pages/WgPage.jsx';
import About from './pages/AboutPage.jsx';
import Layout from './componets/Layout.jsx';
import Participants from './pages/ParticipantsPage.jsx'
import Grants from './pages/GrantPage.jsx'
import Organizations from './pages/OrganizationsPage.jsx'



function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/working-groups" element={<WgPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/participants" element={<Participants />} />
        <Route path="/grants" element={<Grants />}/>
        <Route path="/interactive-map" element={<Organizations />}/>
      </Route>
    </Routes>
  )
}

export default App;