import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'
import Hero from './components/sections/HeroSection'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/generate-your-portfolio' element={<DetailsPage />} />
        <Route path='/hero' element={<Hero />} />
      </Routes>
    </div>
  )
}

export default App
