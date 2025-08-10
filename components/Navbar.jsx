'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaBars, FaTimes, FaDownload, FaSearch } from 'react-icons/fa'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              WallpaperHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/categories" className="nav-link">Categories</Link>
            <Link href="/popular" className="nav-link">Popular</Link>
            <div className="relative group">
              <button className="nav-link flex items-center">
                More <FaChevronDown className="ml-1 text-sm" />
              </button>
              <div className="dropdown-menu">
                <Link href="/about" className="dropdown-item">About</Link>
                <Link href="/contact" className="dropdown-item">Contact</Link>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} transition-all duration-300 ease-in-out`}>
        <div className="px-2 pt-2 pb-4 space-y-1 bg-gray-900/95 backdrop-blur-md">
          <Link href="/" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/categories" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Categories</Link>
          <Link href="/popular" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Popular</Link>
          <Link href="/about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
        </div>
      </div>
    </nav>
  )
}