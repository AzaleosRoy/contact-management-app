import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import './App.css'

function App() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [company, setCompany] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [editingIndex, setEditingIndex] = useState(null)
  const [currentView, setCurrentView] = useState('new')

  useEffect(() => {
    const saved = localStorage.getItem('nameSubmissions')
    if (saved) {
      setSubmissions(JSON.parse(saved))
    }
  }, [])

  const saveToLocalStorage = (updatedSubmissions) => {
    localStorage.setItem('nameSubmissions', JSON.stringify(updatedSubmissions))
  }

  const handleCancel = () => {
    setFirstName('')
    setLastName('')
    setCompany('')
    setCity('')
    setState('')
    setEditingIndex(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validation
    if (firstName.length < 3 || lastName.length < 3 || company.length < 3 || city.length < 3 || state.length < 3) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'All fields must be at least 3 characters long.',
        confirmButtonColor: '#e74c3c'
      })
      return
    }
    
    const newSubmission = { firstName, lastName, company, city, state }
    let updatedSubmissions
    if (editingIndex !== null) {
      updatedSubmissions = [...submissions]
      updatedSubmissions[editingIndex] = newSubmission
      setEditingIndex(null)
    } else {
      updatedSubmissions = [...submissions, newSubmission]
    }
    setSubmissions(updatedSubmissions)
    saveToLocalStorage(updatedSubmissions)
    
    // Success alert
    Swal.fire({
      icon: 'success',
      title: editingIndex !== null ? 'Entry Updated!' : 'Entry Saved!',
      text: `${firstName} ${lastName} has been ${editingIndex !== null ? 'updated' : 'added'} successfully.`,
      confirmButtonColor: '#3498db',
      timer: 2000,
      timerProgressBar: true
    })
    
    // Clear form
    setFirstName('')
    setLastName('')
    setCompany('')
    setCity('')
    setState('')
  }

  const handleEdit = (index) => {
    const sub = submissions[index]
    setFirstName(sub.firstName)
    setLastName(sub.lastName)
    setCompany(sub.company)
    setCity(sub.city || '')
    setState(sub.state || '')
    setEditingIndex(index)
    setCurrentView('new') // Switch to form view when editing
  }

  const handleDelete = (index) => {
    const updatedSubmissions = submissions.filter((_, i) => i !== index)
    setSubmissions(updatedSubmissions)
    saveToLocalStorage(updatedSubmissions)
  }

  const exportToCSV = () => {
    const headers = ['First Name', 'Last Name', 'Company', 'City', 'State']
    const csvContent = [
      headers.join(','),
      ...submissions.map(sub => [sub.firstName, sub.lastName, sub.company, sub.city || '', sub.state || ''].join(','))
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'contacts.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(submissions, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'contacts.json')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'new':
        return (
          <div className="content-section">
            <h1>New Entry</h1>
            <form onSubmit={handleSubmit} className="name-form">
              <div className="input-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  minLength="3"
                />
              </div>
              <div className="input-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  minLength="3"
                />
              </div>
              <div className="input-group">
                <label htmlFor="company">Company:</label>
                <input
                  type="text"
                  id="company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  minLength="3"
                />
              </div>
              <div className="input-group">
                <label htmlFor="city">City:</label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  minLength="3"
                />
              </div>
              <div className="input-group">
                <label htmlFor="state">State:</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                  minLength="3"
                />
              </div>
              <div className="button-group">
                <button type="submit">{editingIndex !== null ? 'Update' : 'Submit'}</button>
                {editingIndex !== null && (
                  <button type="button" onClick={handleCancel} className="cancel-btn">Cancel</button>
                )}
              </div>
            </form>
          </div>
        )
      case 'manage':
        return (
          <div className="content-section">
            <h1>Manage Entries</h1>
            <div className="export-buttons">
              <button onClick={exportToCSV} className="export-btn csv-btn">Export to CSV</button>
              <button onClick={exportToJSON} className="export-btn json-btn">Export to JSON</button>
            </div>
            {submissions.length > 0 ? (
              <div className="table-container">
                <table className="entries-table">
                  <thead>
                    <tr>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Company</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((sub, index) => (
                      <tr key={index}>
                        <td>{sub.firstName}</td>
                        <td>{sub.lastName}</td>
                        <td>{sub.company}</td>
                        <td>{sub.city || ''}</td>
                        <td>{sub.state || ''}</td>
                        <td className="actions-cell">
                          <button onClick={() => handleEdit(index)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDelete(index)} className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No entries yet. Add some from the New Entry section.</p>
            )}
          </div>
        )
      case 'about':
        return (
          <div className="content-section">
            <h1>About</h1>
            <p>This is a professional contact management application built with React and Vite. It allows you to create, view, edit, and delete contact entries including first name, last name, company, city, and state information. All data is stored locally in your browser for privacy and convenience.</p>
            <p>Features:</p>
            <ul>
              <li>Add new contact entries</li>
              <li>Manage existing entries with edit and delete options</li>
              <li>Data persistence using localStorage</li>
              <li>Responsive design with professional styling</li>
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>Contact Manager</h2>
        </div>
        <ul className="nav-list">
          <li>
            <button
              className={currentView === 'new' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentView('new')}
            >
              New Entry
            </button>
          </li>
          <li>
            <button
              className={currentView === 'manage' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentView('manage')}
            >
              Manage Entries
            </button>
          </li>
          <li>
            <button
              className={currentView === 'about' ? 'nav-item active' : 'nav-item'}
              onClick={() => setCurrentView('about')}
            >
              About
            </button>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
