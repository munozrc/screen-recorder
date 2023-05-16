import type { ButtonHTMLAttributes, FC } from "react"
import styles from "./button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "red"
}

export const Button: FC<ButtonProps> = ({ color, children, ...props }) => (
  <button className={`${styles.button} ${styles[color ?? "primary"]}`} {...props}>
    {children}
  </button>
)
