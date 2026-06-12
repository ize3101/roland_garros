import { useState, useEffect } from 'react'
import { motion } from 'motion/react'
import './App.scss'

const TABS = [
  { id: 'tab1', label: '롤랑가로스' },
  { id: 'tab2', label: 'VIP티켓' },
  { id: 'tab3', label: '신세계혜택' },
  { id: 'tab4', label: '구매방법' },
]

export default function App() {
  const [activeTab, setActiveTab] = useState('tab1')
  
  // tab active 위치 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    
    TABS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    
    return () => observer.disconnect()
  }, [])
  
  // scroll 이동
  const handleTabClick = (id) => {
    setActiveTab(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }
  
  return (
    <div className="tab-wrap">
      <nav className="tab-list">
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            className={`tab-item ${activeTab === id ? 'is-active' : ''}`}
            onClick={() => handleTabClick(id)}
          >
            {label}
            {activeTab === id && (
              <motion.div
                className="is-indicator"
                layoutId="indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>
      {TABS.map(({ id, label }) => (
        <section key={id} id={id} className="section">
          <h2>{label}</h2>
          <p>내용</p>
        </section>
      ))}
    </div>
  )
}