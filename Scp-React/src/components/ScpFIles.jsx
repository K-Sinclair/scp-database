import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function ScpFiles() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch all SCP entries from Supabase on mount
  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('scp_entries')
        .select('*')
        .order('item', { ascending: true })

      if (error) {
        setError(error.message)
      } else {
        setEntries(data)
      }
      setLoading(false)
    }

    fetchEntries()
  }, [])

  if (loading) return <p>Loading SCP archive...</p>
  if (error)   return <p>Error: {error}</p>
  if (entries.length === 0) return <p>No SCP entries found.</p>

  return (
    <div>
      <h2>SCP Archive</h2>
      <p>{entries.length} entries on record.</p>

      <div style={{ display: 'grid', gap: '16px' }}>
        {entries.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '16px', borderRadius: '8px' }}>
            <h3>{item.item}</h3>
            <p><strong>Object Class:</strong> {item.object_class}</p>
            <p>{item.description}</p>
            <Link to={`/scp/${item.id}`}>[ View Details ]</Link>
          </div>
        ))}
      </div>
    </div>
  )
}