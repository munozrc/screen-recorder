import { forwardRef } from "react"
import styles from "./screen-preview.module.css"

const ScreenPreview = forwardRef<HTMLVideoElement>((_, videoElement) => {
  return (
    <div className={styles.container}>
      <video className={styles.video} ref={videoElement}/>
    </div>
  )
})

ScreenPreview.displayName = "ScreenPreview"
export default ScreenPreview
