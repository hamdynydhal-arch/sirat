import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import DailyRoutine from './pages/DailyRoutine'
import PerformanceAnalysis from './pages/PerformanceAnalysis'
import StatusTracking from './pages/StatusTracking'
import Guidance from './pages/Guidance'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="routine" element={<DailyRoutine />} />
          <Route path="analysis" element={<PerformanceAnalysis />} />
          <Route path="status" element={<StatusTracking />} />
          <Route path="guidance" element={<Guidance />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
