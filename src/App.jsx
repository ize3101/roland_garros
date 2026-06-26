import {useState, useEffect, useRef} from 'react'
import ReactPlayer from 'react-player'
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
  const isScrolling = useRef(false)
  const scrollTimeOut = useRef(null)
  
  // tab active 위치 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrolling.current) return // 스크롤 중이면 back
        
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0 -55% 0' }
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
    <div className="wrap">
      <div className="intro-wrap">
        ~ intro ~
      </div>
      <div className="tab-wrap">
        <nav className="tab-list">
          {TABS.map(({ id, label }) => (
            <div
              key={id}
              className={`tab-item ${activeTab === id ? 'is-active' : ''}`}
              onClick={() => handleTabClick(id)}
            >
              <button className={`link-tab`}>
                <div className={`tab-text`}>{label}</div>
              </button>
              {activeTab === id && (
                <motion.div
                  className="is-indicator"
                  layoutId="indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </div>
          ))}
        </nav>
        {TABS.map(({ id, label }) => (
          <section key={id} id={id} className="section">
            <h2>{label}</h2>
            <p>내용</p>
          </section>
        ))}
      </div>
    </div>
  )
}