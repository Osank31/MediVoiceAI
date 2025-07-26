import React from 'react'
import AppHeader from './_components/AppHeader'

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <AppHeader />
      <div>
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout