import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PostDetail from './pages/PostDetail'
import CategoryPage from './pages/CategoryPage'
import Tags from './pages/Tags'
import About from './pages/About'
import MomentsPage from './pages/MomentsPage'
import AlbumPage from './pages/AlbumPage'
import GuestbookPage from './pages/GuestbookPage'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:id" element={<CategoryPage />} />
          <Route path="/moment" element={<MomentsPage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/guestbook" element={<GuestbookPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
