import { useEffect, useRef } from "react"
import styles from "./screen-preview.module.css"

interface ScreenPreviewProps {
  srcPreview: MediaStream | undefined
  src: string | undefined
}

export default function ScreenPreview ({ srcPreview, src }: ScreenPreviewProps) {
  const videoElement = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!videoElement.current) return
    videoElement.current.srcObject = srcPreview ?? null
  }, [srcPreview])

  return (
    <div className={styles.container}>
      <video
        className={styles.video}
        ref={videoElement}
        src={src}
        autoPlay={srcPreview !== undefined}
        muted={srcPreview !== undefined}
        controls={typeof src === "string"}
        poster={typeof src === "string" ? undefined : "/no-video.svg"}
      />
    </div>
  )
}
