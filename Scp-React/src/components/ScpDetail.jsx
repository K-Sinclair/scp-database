import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function ScpDetail() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch the specific SCP entry matching the URL id param
  useEffect(() => {
    const fetchEntry = async () => {
      const { data, error } = await supabase
        .from('scp_entries')
        .select('*')
        .eq('id', id)
        .single()  // expects exactly one row

      if (error) {
        setError(error.message)
      } else {
        setItem(data)
      }
      setLoading(false)
    }

    fetchEntry()
  }, [id])

  if (loading) return <p>Loading...</p>
  if (error)   return (
    <div>
      <h2>ACCESS DENIED</h2>
      <p>Invalid identifier. This incident has been recorded.</p>
      <Link to="/scp">← Back to Archive</Link>
    </div>
  )

  return (
    <div style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px' }}>
      <Link to="/scp">← Back to Archive</Link>

      <h2>{item.item}</h2>
      <p><strong>Object Class:</strong> {item.object_class}</p>

      {/* Show image if one exists in the database */}
      {item.image_url && (
        <img
          src={item.image_url}
          alt={item.item}
          style={{ maxWidth: '100%', maxHeight: '340px', objectFit: 'contain', margin: '16px 0' }}
          onError={(e) => {
            e.target.onerror = null
            e.target.src = 'https://placehold.co/400x300/0a0e14/67c9ff?text=REDACTED'
          }}
        />
      )}

      <h3>Special Containment Procedures</h3>
      <p>{item.containment}</p>

      <h3>Description</h3>
      <p>{item.description}</p>

      {item.notes && (
        <>
          <h3>Addendum / Notes</h3>
          <p><em>{item.notes}</em></p>
        </>
      )}
    </div>
  )
}