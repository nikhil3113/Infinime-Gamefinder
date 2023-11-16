import GameDetails from './pages/GameDetails'
import Games from './pages/Games'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Games />} />
      <Route path='/game/:id' element={<GameDetails />} />
    </Routes>
  )
}

export default App