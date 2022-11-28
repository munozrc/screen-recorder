import { useRef, useState } from "react"
import fixWebmDuration from "fix-webm-duration"
import { ScreenPreview } from "./components"

import styles from "./styles/app.module.css"

export default function App () {
  const recorder = useRef<MediaRecorder>()
  const stream = useRef<MediaStream>()
  const startTime = useRef<number>(0)
  const mediaParts = useRef<Array<Blob>>([])
  const video = useRef<HTMLVideoElement>(null)
  const [status, setStatus] = useState<"idle" | "recording">("idle")

  const onRecordingActive = ({ data }: BlobEvent): void => {
    if (!data || data.size < 0) return
    mediaParts.current.push(data)
  }

  const onRecordingStop = async () => {
    setStatus("idle")

    const duration = Date.now() - startTime.current
    const blob = new Blob(mediaParts.current, { type: "video/webm" })

    stream.current?.getTracks().forEach((track) => {
      console.log({ settings: track.getSettings() })
      track.stop()
    })

    const fixBlob = await fixWebmDuration(blob, duration, { logger: false })

    stream.current = undefined
    mediaParts.current = []
    startTime.current = 0

    if (!video.current) return
    video.current.srcObject = null
    video.current.src = URL.createObjectURL(fixBlob)
    video.current.controls = true
    video.current.muted = false
    video.current.autoplay = false
  }

  const handleClick = async () => {
    if (status === "recording") {
      recorder.current?.stop()
      return
    }

    const mediaStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false
      }
    })

    stream.current = mediaStream
    recorder.current = new MediaRecorder(mediaStream)
    startTime.current = Date.now()

    recorder.current.ondataavailable = onRecordingActive
    recorder.current.onstop = onRecordingStop
    recorder.current.onerror = (error) => { console.log({ error }) }

    if (video.current) {
      video.current.srcObject = mediaStream
      video.current.autoplay = true
      video.current.muted = true
      video.current.controls = false
    }

    recorder.current.start()
    setStatus("recording")
  }

  return (
    <div className={styles.appWrapper}>
      <h1>srecorder</h1>
      <button onClick={handleClick}>
        {status === "idle" ? "Grabar" : "Detener"}
      </button>
      <ScreenPreview ref={video}/>
    </div>
  )
}
