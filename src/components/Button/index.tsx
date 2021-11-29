import { ButtonHTMLAttributes, FC } from 'react'
import styles from './styles.module.css'

interface PropsButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string
}

const Button: FC<PropsButton> = ({ children, variant = 'primary', ...props }) => {
  return (
    <button
      className={`${styles.btnWrapper} ${styles[variant]}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
