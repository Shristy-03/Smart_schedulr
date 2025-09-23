import React, { useEffect, useState } from 'react'

export default function CrudPage({ title, columns, list, create, update, remove, initial }) {
  const [rows, setRows] = useState([])
  const [form, setForm] = useState(initial || {})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try { setRows(await list()); setError('') } catch (e) { setError(e.message) } finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    try { await create(form); setForm(initial || {}); await load() } catch (e2) { setError(e2.message) }
  }

  const onEdit = async (row) => {
    const payload = {}
    columns.forEach(c => { if (!c.readonly) { const v = prompt(`Update ${c.label}`, row[c.key] ?? ''); if (v !== null) payload[c.key] = c.type==='number'? Number(v): v } })
    try { await update(row.id, payload); await load() } catch (e) { setError(e.message) }
  }

  const onDelete = async (row) => {
    if (!confirm('Delete item?')) return
    try { await remove(row.id); await load() } catch (e) { setError(e.message) }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">{title}</h1>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="bg-white border rounded p-4 mb-4 grid md:grid-cols-3 gap-3">
        {columns.filter(c=>!c.readonly).map(c => (
          <div key={c.key}>
            <label className="block text-sm mb-1">{c.label}</label>
            <input
              className="w-full border rounded px-3 py-2"
              type={c.type==='number'?'number':'text'}
              value={form[c.key] ?? ''}
              onChange={e=>setForm(f=>({...f, [c.key]: c.type==='number'? Number(e.target.value): e.target.value}))}
              required={c.required}
            />
          </div>
        ))}
        <div className="md:col-span-3">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </form>
      <div className="bg-white border rounded">
        {loading ? <div className="p-4">Loading...</div> : (
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                {columns.map(c => <th key={c.key} className="text-left p-2 border-b">{c.label}</th>)}
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id} className="border-b">
                  {columns.map(c => <td key={c.key} className="p-2">{String(r[c.key] ?? '')}</td>)}
                  <td className="p-2 space-x-2">
                    <button className="px-2 py-1 bg-gray-800 text-white rounded" onClick={()=>onEdit(r)}>Edit</button>
                    <button className="px-2 py-1 bg-red-600 text-white rounded" onClick={()=>onDelete(r)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    
  )
}

// import React, { useEffect, useState } from 'react'
// import './styles.css' // make sure this path is correct

// export default function CrudPage({ title, columns, list, create, update, remove, initial }) {
//   const [rows, setRows] = useState([])
//   const [form, setForm] = useState(initial || {})
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')

//   const load = async () => {
//     setLoading(true)
//     try {
//       setRows(await list())
//       setError('')
//     } catch (e) {
//       setError(e.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => { load() }, [])

//   const onSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       await create(form)
//       setForm(initial || {})
//       await load()
//     } catch (e2) {
//       setError(e2.message)
//     }
//   }

//   const onEdit = async (row) => {
//     const payload = {}
//     columns.forEach(c => {
//       if (!c.readonly) {
//         const v = prompt(`Update ${c.label}`, row[c.key] ?? '')
//         if (v !== null) payload[c.key] = c.type === 'number' ? Number(v) : v
//       }
//     })
//     try {
//       await update(row.id, payload)
//       await load()
//     } catch (e) {
//       setError(e.message)
//     }
//   }

//   const onDelete = async (row) => {
//     if (!window.confirm('Delete item?')) return
//     try {
//       await remove(row.id)
//       await load()
//     } catch (e) {
//       setError(e.message)
//     }
//   }

//   return (
//     <div className="container">
//       <h1 className="title">{title}</h1>
//       {error && <div className="error">{error}</div>}

//       {/* Form Section */}
//       <form onSubmit={onSubmit} className="form">
//         {columns.filter(c => !c.readonly).map(c => (
//           <div key={c.key} className="form-group">
//             <label>{c.label}</label>
//             <input
//               type={c.type === 'number' ? 'number' : 'text'}
//               value={form[c.key] ?? ''}
//               onChange={e =>
//                 setForm(f => ({
//                   ...f,
//                   [c.key]: c.type === 'number' ? Number(e.target.value) : e.target.value
//                 }))
//               }
//               required={c.required}
//             />
//           </div>
//         ))}
//         <button className="btn" type="submit">Create</button>
//       </form>

//       {/* Table Section */}
//       <div className="table-container">
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 {columns.map(c => <th key={c.key}>{c.label}</th>)}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map(r => (
//                 <tr key={r.id}>
//                   {columns.map(c => <td key={c.key}>{String(r[c.key] ?? '')}</td>)}
//                   <td>
//                     <button className="btn btn-edit" onClick={() => onEdit(r)}>Edit</button>
//                     <button className="btn btn-danger" onClick={() => onDelete(r)}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   )
// }




