import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/badgetest-gh-pages/' element={ <Home /> } exact />
          <Route path='/badgetest-ghpages/profile' element={ <Profile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App