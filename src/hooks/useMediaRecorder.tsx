import { useRef } from 'react'

interface ReturnType {
  startRecording: () => void
}

function useMediaRecorder (): ReturnType {
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const stream = useRef<MediaStream | null>(null)

  const startRecording = async (): Promise<void> => {
    const constraints = { audio: true, video: true }

    stream.current = await navigator.mediaDevices.getDisplayMedia(constraints)
    recorder.current = new MediaRecorder(stream.current)

    recorder.current.ondataavailable = onRecordingActive
    recorder.current.onstop = onRecordingStop
    recorder.current.onerror = (error) => { console.log({ error }) }
    recorder.current.start()
  }

  const onRecordingActive = ({ data }: BlobEvent): void => {
    chunks.current.push(data)
  }

  const onRecordingStop = (): void => {
    const blob = new Blob(chunks.current, { type: 'video/mp4' })
    const link = document.createElement('a')

    chunks.current = []

    link.href = URL.createObjectURL(blob)
    link.download = `${Date.now()}.mp4`
    link.click()
  }

  return { startRecording }
}

export default useMediaRecorder
