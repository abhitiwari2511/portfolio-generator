import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetailsPage from './pages/DetailsPage'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/generate-your-portfolio' element={<DetailsPage />} />
      </Routes>
    </div>
  )
}

export default App
