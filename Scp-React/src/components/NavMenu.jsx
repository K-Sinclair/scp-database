import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function NavMenu() {
  const [entries, setEntries] = useState([])

  // Fetch just id and item name - enough to build nav links
  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('scp_entries')
        .select('id, item')
        .order('item', { ascending: true })
      if (error) console.error(error)
      else setEntries(data)
    }
    fetchEntries()
  }, [])

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scp">All SCP</Link></li>
        {entries.map((entry) => (
          <li key={entry.id}>
            <Link to={`/scp/${entry.id}`}>{entry.item}</Link>
          </li>
        ))}
        <li><Link to="/admin">Admin Panel</Link></li>
      </ul>
    </nav>
  )
}