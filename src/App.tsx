import { useRef, useState } from "react"
import fixWebmDuration from "fix-webm-duration"
import { GithubIcon, ScreenPreview } from "./components"

import styles from "./styles/app.module.css"

type StatusType = "IDLE" | "NO_MEDIA" | "RECORDING" | "STOPPING"
type MediaStreamSettigs = {
  videoSource: string,
  audioSource?: string,
  resolution?: string,
  frameRate?: number
}

function getMediaStreamDeviceInfo (stream: MediaStream | undefined): MediaStreamSettigs {
  if (!stream) return { videoSource: "Seleccionar Fuente" }

  const videoTrack = stream.getVideoTracks().at(0) as MediaStreamTrack
  const audioTrack = stream.getAudioTracks().at(0)
  const { height, width, frameRate } = videoTrack.getSettings()

  return {
    videoSource: videoTrack?.label as string,
    audioSource: audioTrack?.label ?? "Sin Audio",
    resolution: `${width} x ${height}`,
    frameRate
  }
}

async function getBlobRecording (mediaParts: Array<Blob>, startTime: number): Promise<Blob> {
  const duration = Date.now() - startTime
  const blob = new Blob(mediaParts, { type: "video/webm" })
  return await fixWebmDuration(blob, duration, { logger: false })
}

export default function App () {
  const mediaRecorder = useRef<MediaRecorder>()
  const mediaStream = useRef<MediaStream>()
  const startTime = useRef<number>(0)
  const mediaParts = useRef<Array<Blob>>([])
  const [status, setStatus] = useState<StatusType>("NO_MEDIA")
  const [lastRecording, setLastRecording] = useState<string | undefined>(undefined)

  const { videoSource, audioSource, frameRate, resolution } = getMediaStreamDeviceInfo(mediaStream.current)

  const onSelectMediaStream = async (): Promise<void> => {
    if (status === "RECORDING") return

    const { mediaDevices } = navigator

    const stream = await mediaDevices.getDisplayMedia({
      video: true,
      audio: {
        autoGainControl: false,
        echoCancellation: false,
        noiseSuppression: false
      }
    }).catch(() => {
      setStatus("NO_MEDIA")
      return undefined
    })

    if (!stream) return

    stream.getVideoTracks()[0].addEventListener("ended", stopRecording)

    mediaStream.current = stream
    mediaRecorder.current = new MediaRecorder(stream)
    startTime.current = Date.now()

    setStatus("IDLE")
  }

  const stopRecording = () => {
    mediaStream.current?.getTracks().forEach((track) => track.stop())
    mediaStream.current = undefined
    mediaRecorder.current = undefined
    setStatus("NO_MEDIA")
  }

  const onRecordingActive = ({ data }: BlobEvent): void => {
    if (!data || data.size < 0) return
    mediaParts.current.push(data)
  }

  const onRecordingStop = async () => {
    const videoMediaBlob = await getBlobRecording(mediaParts.current, startTime.current)
    const videoURL = URL.createObjectURL(videoMediaBlob)
    setLastRecording(videoURL)
    stopRecording()
  }

  const onStartRecording = () => {
    if (!mediaStream.current) return

    mediaRecorder.current = new MediaRecorder(mediaStream.current)
    startTime.current = Date.now()
    mediaParts.current = []

    mediaRecorder.current.ondataavailable = onRecordingActive
    mediaRecorder.current.onstop = onRecordingStop
    mediaRecorder.current.onerror = (error) => { console.log({ error }) }
    mediaRecorder.current.start()

    setStatus("RECORDING")
  }

  const handleClick = () => {
    if (status === "IDLE") return onStartRecording()
    else if (status === "RECORDING") return mediaRecorder.current?.stop()
  }

  return (
    <>
      <header className={styles.appHeader}>
        <h1 className={styles.branding}>ScreenRecorder</h1>
        <a
          className={styles.githubButton}
          href="https://github.com/munozrc/screen-recorder"
          target="_blank"
          rel="noreferrer"
        >
          <GithubIcon size="1.2rem" color="#d9e1e8"/>
        </a>
      </header>
      <div className={styles.appBody}>
        <ScreenPreview
          srcPreview={mediaStream.current}
          src={lastRecording}
        />
        <aside className={styles.appControls}>
          <h3 className={styles.title}>Configuraciones</h3>
          <section className={styles.controlContainer}>
            <label className={styles.controlOption}>
              <span>Pantalla</span>
              <button onClick={onSelectMediaStream}>{videoSource}</button>
            </label>
            <label className={styles.controlOption}>
              <span>Audio</span>
              <button>{audioSource}</button>
            </label>
            <label className={styles.controlOption}>
              <span>Resolución</span>
              <button>{resolution}</button>
            </label>
            <label className={styles.controlOption}>
              <span>FrameRate</span>
              <button>{frameRate}</button>
            </label>
          </section>
          <button
            onClick={handleClick}
            className={styles.recordButton}
            disabled={typeof mediaStream.current === "undefined"}
          >
            {status === "RECORDING" ? "Detener" : "Grabar"}
          </button>
        </aside>
      </div>
    </>
  )
}
