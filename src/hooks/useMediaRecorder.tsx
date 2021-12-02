import { useRef } from 'react'

interface ReturnType {
  startRecording: () => void
}

function useMediaRecorder (): ReturnType {
  const recorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])
  const mediaStream = useRef<MediaStream | null>(null)

  const startRecording = async (): Promise<void> => {
    const constraints = { audio: true, video: true }

    mediaStream.current = await navigator.mediaDevices.getDisplayMedia(constraints)

    const mime = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm; codecs=vp9'
      : 'video/webm'

    recorder.current = new MediaRecorder(mediaStream.current, { mimeType: mime })

    recorder.current.ondataavailable = onRecordingActive
    recorder.current.onstop = onRecordingStop
    recorder.current.onerror = (error) => {
      console.log({ error })
    }

    recorder.current.start()
    console.log('start recording....')
  }

  const onRecordingActive = ({ data }: BlobEvent): void => {
    if (data.size > 0) chunks.current.push(data)
  }

  const onRecordingStop = (): void => {
    console.log('stop recording...')

    const [chunk] = chunks.current
    const blob = new Blob(chunks.current, { type: chunk.type })
    const link = document.createElement('a')

    chunks.current = []

    link.href = URL.createObjectURL(blob)
    link.download = `${Date.now()}.webm`
    link.click()
  }

  return { startRecording }
}

export default useMediaRecorder
