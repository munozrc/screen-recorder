import { type FC } from "react"
import { Button, ScreenPreview } from "@/components"
import styles from "@/styles/recorder-view.module.css"

interface RecordingViewProps {
  show: boolean
  preview?: MediaStream
  onStopRecording: () => Promise<void>
}

export const RecordingView: FC<RecordingViewProps> = ({ show, preview, onStopRecording }) => {
  if (!show) return null
  return (
    <div className={styles.container}>
      <ScreenPreview src={preview}/>
      <div className={styles.buttonGroup}>
        <Button onClick={onStopRecording} color="red">Detener</Button>
      </div>
    </div>
  )
}
