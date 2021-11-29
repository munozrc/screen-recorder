import { useRef } from 'react'

interface ReturnType {
  startRecording: () => void
}

function useMediaRecorder (): ReturnType {
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const mediaChunks = useRef<Blob[]>([])
  const mediaStream = useRef<MediaStream | null>(null)

  const startRecording = async (): Promise<void> => {
    mediaStream.current = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    })

    mediaRecorder.current = new MediaRecorder(mediaStream.current, {
      mimeType: 'video/webm'
    })

    mediaRecorder.current.ondataavailable = onRecordingActive
    mediaRecorder.current.onstop = onRecordingStop
    mediaRecorder.current.onerror = (error) => {
      console.log({ error })
    }

    mediaRecorder.current.start()
    console.log('start recording....')
  }

  const onRecordingActive = ({ data }: BlobEvent): void => {
    console.log('recording')
    mediaChunks.current.push(data)
  }

  const onRecordingStop = (): void => {
    const [chunk] = mediaChunks.current
    const blobProperty: BlobPropertyBag = Object.assign(
      { type: chunk.type }
    )
    const blob = new Blob(mediaChunks.current, blobProperty)
    const link = document.createElement('a')

    mediaChunks.current = []

    link.href = URL.createObjectURL(blob)
    link.download = 'video.mp4'
    link.click()
  }

  return { startRecording }
}

export default useMediaRecorder
