import type { FC, InputHTMLAttributes } from "react"
import styles from "./input.module.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input: FC<InputProps> = ({ children, ...props }) => (
  <input className={styles.input} {...props} />
)
