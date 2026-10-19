import useReveal from '../hooks/useReveal.js'

export default function Reveal({ children, className = '', as: Tag = 'div', ...rest }) {
  const ref = useReveal()
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>
}
