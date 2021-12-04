import { useRef, useState } from 'react'

interface ReturnType {
  startRecording: () => void
  stopRecording: () => void
  status: StatusMessages
}

export type StatusMessages =
  | 'idle'
  | 'recording'
  | 'stopping'

function useMediaRecorder (): ReturnType {
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const stream = useRef<MediaStream | null>(null)
  const [status, changeStatus] = useState<StatusMessages>('idle')

  const getMediaStream = async (): Promise<void> => {
    stream.current = await navigator.mediaDevices.getDisplayMedia({ audio: false, video: true })
    changeStatus('idle')
  }

  const startRecording = async (): Promise<void> => {
    if (stream.current == null) await getMediaStream()

    if (stream.current != null) {
      const isStreamEnded = stream.current.getTracks().some((track) => track.readyState === 'ended')
      if (isStreamEnded) await getMediaStream()

      recorder.current = new MediaRecorder(stream.current)
      chunks.current = []

      recorder.current.ondataavailable = onRecordingActive
      recorder.current.onstop = onRecordingStop
      recorder.current.onerror = (error) => { console.log({ error }) }

      recorder.current.start()
      changeStatus('recording')
    }
  }

  const stopRecording = (): void => {
    if (recorder.current === null) return
    if (recorder.current.state === 'inactive') return

    changeStatus('stopping')
    recorder.current.stop()
    stream.current?.getTracks().forEach((track) => track.stop())
  }

  const handleDownload = (blob: Blob): void => {
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${Date.now()}.mp4`
    link.click()
  }

  const onRecordingActive = ({ data }: BlobEvent): void => {
    chunks.current.push(data)
  }

  const onRecordingStop = (): void => {
    const blob = new Blob(chunks.current, { type: 'video/mp4' })
    handleDownload(blob)
    changeStatus('idle')
  }

  return { status, startRecording, stopRecording }
}

export default useMediaRecorder
