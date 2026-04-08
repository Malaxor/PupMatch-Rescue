import './style/global-style.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { DogsSearchList } from './pages/DogsSearchList'
import { LikedDogs } from './pages/LikedDogs'
import { MatchedDog } from './pages/MatchedDog'

export function App () {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/PupMatch-Rescue" replace />} />
        <Route path="/PupMatch-Rescue/dog-search-list" element={<DogsSearchList />} />
        <Route path="/PupMatch-Rescue/liked-dogs" element={<LikedDogs />} />
        <Route path="/PupMatch-Rescue/matched-dog" element={<MatchedDog />} />
        <Route path="*" element={<Navigate to="/PupMatch-Rescue" replace />} />
      </Routes>
    </Router>
  )
}
