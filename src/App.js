import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home";
import Layout from "./components/layout/layout";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} /> 
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;