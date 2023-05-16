import { type FC, useEffect, useRef } from "react"
import styles from "./screen-preview.module.css"

interface ScreenPreviewProps {
  src?: MediaStream | string
}

export const ScreenPreview: FC<ScreenPreviewProps> = ({ src }) => {
  const elementRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (elementRef.current == null) return

    if (typeof src === "string") {
      elementRef.current.src = src
      return
    }

    elementRef.current.srcObject = src ?? null
  }, [src])

  return (
    <div className={styles.wrapper}>
      <video
        ref={elementRef}
        className={styles.video}
        autoPlay={typeof src !== "string"}
        muted={typeof src !== "string"}
        controls={typeof src === "string"}
      />
    </div>
  )
}
