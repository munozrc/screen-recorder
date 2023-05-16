import { type FC } from "react"
import { Button, ScreenPreview } from "@/components"
import styles from "@/styles/recorder-view.module.css"

interface PlaybackViewProps {
  show: boolean
  recording?: string
  onDownloadRecording: () => Promise<void>
}

export const PlaybackView: FC<PlaybackViewProps> = ({ show, recording, onDownloadRecording }) => {
  if (!show) return null
  return (
    <div className={styles.container}>
      <ScreenPreview src={recording}/>
      <div className={styles.buttonGroup}>
        <Button onClick={onDownloadRecording}>Descargar</Button>
      </div>
    </div>
  )
}
