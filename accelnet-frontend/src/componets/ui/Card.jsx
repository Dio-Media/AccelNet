export function Card({ children, className = "", ...props }) {
  return (
    <div className={`bg-white shadow rounded-lg ${className}`} {...props}>
      {children}
    </div>
  )
}