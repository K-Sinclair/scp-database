import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'
import ScpFiles from './components/ScpFiles'
import ScpDetail from './components/ScpDetail'
import AdminGate from './components/AdminGate'
import AdminPanel from './components/AdminPanel'

// Home page — shown at route "/"
const Home = () => (
  <div>
    <h2>Welcome, Site Director.</h2>
    <p>Security clearance verified. All terminal activity is recorded.</p>
    <p>Use the navigation above to access the SCP archive or the admin panel.</p>
  </div>
)

export default function App() {
  return (
    <Router>
      <NavMenu />
      <main style={{ padding: '20px', maxWidth: '1100px', margin: '0 auto' }}>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/scp"          element={<ScpFiles />} />
          <Route path="/scp/:id"      element={<ScpDetail />} />
          {/* Admin gate sits at /admin — passes user through to /admin/panel */}
          <Route path="/admin"        element={<AdminGate />} />
          <Route path="/admin/panel"  element={<AdminPanel />} />
        </Routes>
      </main>
    </Router>
  )
}