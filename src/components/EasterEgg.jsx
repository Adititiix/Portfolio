import { useEffect, useState } from 'react'

const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a']
const EASTER_EGG_KEY = 'a'

const messages = [
  '🎉 You found the secret! Aditi says hi!',
  '🚀 Now imagine her on your team!',
  '⚡ Easter egg unlocked. Offer letter incoming?',
  '🤖 AI builder spotted. Hire immediately.',
  '🌟 You have excellent taste in portfolios.',
]

export default function EasterEgg() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [sequence, setSequence] = useState([])

  useEffect(() => {
    const onKey = (e) => {
      const newSeq = [...sequence, e.key].slice(-KONAMI.length)
      setSequence(newSeq)

      // Konami code
      if (newSeq.join(',') === KONAMI.join(',')) {
        triggerEgg('🕹️ KONAMI CODE! You unlocked Aditi\'s cheat mode.')
        setSequence([])
        return
      }

      // Press A key
      if (e.key === EASTER_EGG_KEY && !e.ctrlKey && !e.metaKey && !e.altKey && e.target.tagName !== 'INPUT') {
        // Only trigger if 'a' pressed 3 times quickly
      }

      // Press ? key
      if (e.key === '?' ) {
        triggerEgg(messages[Math.floor(Math.random() * messages.length)])
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [sequence])

  const triggerEgg = (msg) => {
    setMessage(msg)
    setVisible(true)
    setTimeout(() => setVisible(false), 3500)
  }

  return (
    <div
      className={`easter-egg-toast ${visible ? 'show' : ''}`}
      style={{ cursor: 'default' }}
    >
      {message}
    </div>
  )
}
