import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovering, setHovering] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ringPos = useRef({ x: -100, y: -100 })
  const rafRef = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }
    const animate = () => {
      const dx = pos.current.x - ringPos.current.x
      const dy = pos.current.y - ringPos.current.y
      ringPos.current.x += dx * 0.28
      ringPos.current.y += dy * 0.28
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    const onOver = (e) => {
      if (e.target.closest('a, button, [data-hover], .jelly-btn')) setHovering(true)
    }
    const onOut = () => setHovering(false)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mouseout', onOut)
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  )
}
