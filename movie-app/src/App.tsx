import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import GenreMovies from "./pages/GenreMovies";
import ScrollToTop from "./components/ScrollToTop";
import MoodPicker from "./pages/MoodPicker";
import InstallPrompt from "./components/InstallPrompt";
import ComingSoon from "./pages/ComingSoon";
import AIRecommender from "./pages/AIRecommender";
import WatchHistory from "./pages/WatchHistory";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop />
      <InstallPrompt />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/genre/:id" element={<GenreMovies />} />
        <Route path="/mood" element={<MoodPicker />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/ai-recommender" element={<AIRecommender />} />
        <Route path="/history" element={<WatchHistory />} />
      </Routes>
    </BrowserRouter>
  );
}
