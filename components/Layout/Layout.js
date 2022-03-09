

import React from 'react'

export default function Layout({ children }) {
  return (
    <div className='layout'>
      <main>
      {children}
      </main>
    </div>
  )
}
