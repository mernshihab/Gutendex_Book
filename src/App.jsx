import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import BookPage from "./pages/BookPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 300,
      once: false,
    });
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book/:id" element={<BookPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
