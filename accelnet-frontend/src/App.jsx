import { Routes, Route } from 'react-router-dom';
import Layout from './componets/Layout.jsx';
import HomePage from './pages/home/HomePage.jsx';
import NewsPage from './pages/News.jsx';
import WgPage from './pages/WgPage.jsx';
import About from './pages/AboutPage.jsx';
import ComingSoon from './componets/ComingSoon.jsx';
import OrganizationsPage from './pages/OrganizationsPage.jsx';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/working-groups" element={<WgPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/leadership" element={<ComingSoon />} />
          <Route path="/student-network" element={<ComingSoon />} />
          <Route path="/organizations" element={<OrganizationsPage />} />
          <Route path="/steering-committee" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}

export default App;