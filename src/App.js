import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/JoinUs/Login";
import Layout from "./components/layout/Layout";
import "./App.css";

// Placeholder component for pages under construction
const Placeholder = ({ title }) => (
  <main className="App-main placeholder-page">
    <h1>{title}</h1>
    <p>This page is under construction. It will display data from your database.</p>
  </main>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Home page */}
        <Route index element={<Home />} />
        
        {/* Main navigation pages */}
        <Route path="working-groups" element={<Placeholder title="Working Groups" />} />
        <Route path="activities" element={<Placeholder title="Activities" />} />
        <Route path="resources" element={<Placeholder title="Resources" />} />
        <Route path="grants" element={<Placeholder title="Grant Opportunities" />} />
        <Route path="about" element={<Placeholder title="About AccelNet" />} />
        <Route path="structure" element={<Placeholder title="Structure" />} />
        <Route path="contact" element={<Placeholder title="Contact Us" />} />
        <Route path="privacy" element={<Placeholder title="Privacy Policy" />} />
        <Route path="multimedia" element={<Placeholder title="Multimedia" />} />
        
        {/* News detail pages */}
        <Route path="news/:id" element={<Placeholder title="News Article" />} />
        
        {/* 404 Page */}
        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Route>
      
      {/* Login page without layout (if you want it separate) */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;