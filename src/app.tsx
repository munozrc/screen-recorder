import { useRecorder } from "@/hooks/use-recorder"
import { MainView, PlaybackView, RecordingView } from "@/views"

import styles from "@/styles/app.module.css"

export default function App (): JSX.Element {
  const { status, preview, playback, startRecording, downloadRecording, stopRecording } = useRecorder()

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Screen Recorder</h1>
      <MainView
        onStartRecording={startRecording}
        show={status === "IDLE"}
      />
      <RecordingView
        show={status === "RECORDING"}
        preview={preview}
        onStopRecording={stopRecording}
      />
      <PlaybackView
        show={status === "PLAYING"}
        recording={playback}
        onDownloadRecording={downloadRecording}
      />
    </main>
  )
}
