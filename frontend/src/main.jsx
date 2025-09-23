import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// import './styles/global.css'
import  './style/style.css';


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
    //  2nd time adding and shows nothing
// import React from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from 'react-router-dom'
// import App from './App.jsx'
// // import './styles/global.css'
// import './style/style.css'

// const root = createRoot(document.getElementById('root'))

// root.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// )

// // -------------------------------
// // Global JavaScript Enhancements
// // -------------------------------
// document.addEventListener('DOMContentLoaded', () => {

//   // 1️⃣ Highlight table rows on click
//   document.querySelectorAll('table tbody tr').forEach(row => {
//     row.addEventListener('click', () => {
//       row.classList.toggle('bg-gray-200') // highlights the row
//     })
//   })

//   // 2️⃣ Smooth scroll for anchor links
//   document.querySelectorAll('a[href^="#"]').forEach(link => {
//     link.addEventListener('click', (e) => {
//       e.preventDefault()
//       const target = document.querySelector(link.getAttribute('href'))
//       if (target) target.scrollIntoView({ behavior: 'smooth' })
//     })
//   })

//   // 3️⃣ Dark mode toggle
//   const toggle = document.getElementById('darkModeToggle')
//   if (toggle) {
//     toggle.addEventListener('click', () => {
//       document.body.classList.toggle('dark')
//     })
//   }

// })




