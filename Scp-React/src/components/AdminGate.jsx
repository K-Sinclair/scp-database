import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Placeholder gate — thumbprint scan UI to be implemented later
// For now, the "scan" button immediately grants access to the admin panel
export default function AdminGate() {
  const [status, setStatus] = useState('HOLD THUMB ON PAD')
  const navigate = useNavigate()

  const handleAccess = () => {
    setStatus('IDENTITY CONFIRMED')
    // Short delay so the user sees the confirmed message before redirect
    setTimeout(() => navigate('/admin/panel'), 800)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h2>TERMINAL LOCKED</h2>
      <p>Biometric Scan Required for Admin Access</p>

      {/* Thumbprint pad placeholder — real scan animation to be added later */}
      <div
        onClick={handleAccess}
        style={{
          width: '150px',
          height: '180px',
          border: '2px solid #aaa',
          borderRadius: '12px',
          margin: '24px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '48px' }}>👍</span>
      </div>

      <p><strong>{status}</strong></p>
    </div>
  )
}import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Placeholder gate — thumbprint scan UI to be implemented later
// For now, the "scan" button immediately grants access to the admin panel
export default function AdminGate() {
  const [status, setStatus] = useState('HOLD THUMB ON PAD')
  const navigate = useNavigate()

  const handleAccess = () => {
    setStatus('IDENTITY CONFIRMED')
    // Short delay so the user sees the confirmed message before redirect
    setTimeout(() => navigate('/admin/panel'), 800)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '60px' }}>
      <h2>TERMINAL LOCKED</h2>
      <p>Biometric Scan Required for Admin Access</p>

      {/* Thumbprint pad placeholder — real scan animation to be added later */}
      <div
        onClick={handleAccess}
        style={{
          width: '150px',
          height: '180px',
          border: '2px solid #aaa',
          borderRadius: '12px',
          margin: '24px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: '48px' }}>👍</span>
      </div>

      <p><strong>{status}</strong></p>
    </div>
  )
}