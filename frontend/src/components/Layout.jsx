import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Breadcrumb from './Breadcrumb'

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb />
        <Outlet />
      </main>
    </div>
  )
}
