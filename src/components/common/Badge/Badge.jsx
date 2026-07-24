import './Badge.scss'

export default function Badge({ color, type='round', size, text }) {
  const className = type === 'square'
    ? `badge-square-${color}-${size}`
    : `badge-${color}-${size}`
  
  return (
    <span className={className}>
      <span className="text">{text}</span>
    </span>
  )
}