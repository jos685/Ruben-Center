// components/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold text-green-700">
          <Image src="/images/Logo/logo.png" alt="Ruben Hospital Logo" className="h-8 inline-block mr-2" />
          Ruben Hospital
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="#about" className="text-green-800 hover:text-green-600">About</Link>
          <Link href="#services" className="text-green-800 hover:text-green-600">Services</Link>
          <Link href="#contact" className="text-green-800 hover:text-green-600">Contact</Link>
          <Link href="/staff/login" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition">Staff Login</Link>
        </nav>

        {/* Mobile Hamburger */}
        <button className="md:hidden text-green-800" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <nav className="flex flex-col space-y-3">
            <Link href="#about" className="text-green-800 hover:text-green-600">About</Link>
            <Link href="#services" className="text-green-800 hover:text-green-600">Services</Link>
            <Link href="#contact" className="text-green-800 hover:text-green-600">Contact</Link>
            <Link href="/staff/login" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition w-fit">Staff Login</Link>
          </nav>
        </div>
      )}
    </header>
  )
}
