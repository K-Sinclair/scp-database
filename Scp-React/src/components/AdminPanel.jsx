import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const emptyForm = { item: '', object_class: '', image_url: '', containment: '', description: '', notes: '' }

export default function AdminPanel() {
  const [entries, setEntries] = useState([])
  const [newRecord, setNewRecord] = useState(emptyForm)
  const [editRecord, setEditRecord] = useState(null)
  const [error, setError] = useState(null)

  // Read: fetch all entries to display in list
  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from('scp_entries')
        .select('*')
        .order('item', { ascending: true })
      if (error) { console.error(error); setError(error.message) }
      else setEntries(data)
    }
    fetchEntries()
  }, [])

  // Create: add new record to database, then refresh list
  const addRecord = async () => {
    setError(null)
    const { error } = await supabase.from('scp_entries').insert([newRecord])
    if (error) { console.error(error); setError(error.message) }
    else { setNewRecord(emptyForm); window.location.reload() }
  }

  // Delete: remove record from database, then refresh list
  const deleteRecord = async (id) => {
    if (!window.confirm('Delete this entry? This cannot be undone.')) return
    setError(null)
    const { error } = await supabase.from('scp_entries').delete().eq('id', id)
    if (error) { console.error(error); setError(error.message) }
    else window.location.reload()
  }

  // Edit: populate form with existing record data, allowing user to make changes
  const startEditing = (entry) => {
    // Replace any null values with empty strings so inputs stay controlled
    const safe = Object.fromEntries(
      Object.entries(entry).map(([k, v]) => [k, v ?? ''])
    )
    setEditRecord(safe)
  }

  // Update: save changes to database, then refresh list
  const saveEdit = async (id) => {
    setError(null)
    const { error } = await supabase.from('scp_entries').update(editRecord).eq('id', id)
    if (error) { console.error(error); setError(error.message) }
    else { setEditRecord(null); window.location.reload() }
  }

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <p className="admin-subtitle">Manage SCP database entries</p>

      {error && <div className="error-banner">⚠ {error}</div>}

      {/* Entries List */}
      <ul className="record-list">
        {entries.map((entry) => (
          <li key={entry.id} className="record-item">
            {editRecord && editRecord.id === entry.id ? (
              <div className="edit-form">
                <input value={editRecord.item}           onChange={(e) => setEditRecord({ ...editRecord, item: e.target.value })}          placeholder="Item (e.g. SCP-001)" />
                <select value={editRecord.object_class}  onChange={(e) => setEditRecord({ ...editRecord, object_class: e.target.value })}>
                  <option value="">-- Object Class --</option>
                  <option>Safe</option><option>Euclid</option><option>Keter</option><option>Thaumiel</option><option>Neutralised</option>
                </select>
                <input value={editRecord.image_url}      onChange={(e) => setEditRecord({ ...editRecord, image_url: e.target.value })}     placeholder="Image URL" />
                <textarea value={editRecord.containment} onChange={(e) => setEditRecord({ ...editRecord, containment: e.target.value })}   placeholder="Containment" rows={3} />
                <textarea value={editRecord.description} onChange={(e) => setEditRecord({ ...editRecord, description: e.target.value })}   placeholder="Description" rows={3} />
                <textarea value={editRecord.notes}       onChange={(e) => setEditRecord({ ...editRecord, notes: e.target.value })}         placeholder="Notes (optional)" rows={2} />
                <div className="edit-actions">
                  <button className="btn-save" onClick={() => saveEdit(entry.id)}>Save</button>
                  <button onClick={() => setEditRecord(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <p><strong>{entry.item}</strong> — {entry.object_class}</p>
                <div className="record-actions">
                  <button onClick={() => startEditing(entry)}>Edit</button>
                  <button className="btn-danger" onClick={() => deleteRecord(entry.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add New Entry */}
      <div className="add-record-section">
        <h2>Add New SCP Entry</h2>
        <div className="add-form">
          <input value={newRecord.item}           onChange={(e) => setNewRecord({ ...newRecord, item: e.target.value })}         placeholder="Item (e.g. SCP-001)" />
          <select value={newRecord.object_class}  onChange={(e) => setNewRecord({ ...newRecord, object_class: e.target.value })}>
            <option value="">-- Object Class --</option>
            <option>Safe</option><option>Euclid</option><option>Keter</option><option>Thaumiel</option><option>Neutralised</option>
          </select>
          <input value={newRecord.image_url}      onChange={(e) => setNewRecord({ ...newRecord, image_url: e.target.value })}    placeholder="Image URL (optional)" />
          <textarea value={newRecord.containment} onChange={(e) => setNewRecord({ ...newRecord, containment: e.target.value })}  placeholder="Containment procedures" rows={3} />
          <textarea value={newRecord.description} onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}  placeholder="Description" rows={3} />
          <textarea value={newRecord.notes}       onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}        placeholder="Notes / Addendum (optional)" rows={2} />
          <button className="add-btn" onClick={addRecord}>Add Entry</button>
        </div>
      </div>
    </div>
  )
}