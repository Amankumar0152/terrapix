'use client'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import WallpaperCard from '../components/WallpaperCard'

export default function Home() {
  const [wallpapers, setWallpapers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWallpapers() {
      const res = await fetch('/api/wallpapers')
      const data = await res.json()
      setWallpapers(data)
      setLoading(false)
    }
    loadWallpapers()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <main>
      <Navbar />
      <div className="grid grid-cols-3 gap-4 p-4">
        {wallpapers.map(wp => (
          <WallpaperCard key={wp.id} wallpaper={wp} />
        ))}
      </div>
    </main>
  )
}