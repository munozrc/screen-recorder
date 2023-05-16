import { videoMimeTypes } from "@/constants"

export const getMimeType = (): string => {
  for (const type of videoMimeTypes) {
    if (MediaRecorder.isTypeSupported(type)) return type
  }

  throw new Error("No MIME Type supported by MediaRecorder")
}

export function createMediaRecorder (stream: MediaStream): MediaRecorder {
  return new MediaRecorder(stream, {
    mimeType: getMimeType(),
    videoBitsPerSecond: 2500000
  })
}
