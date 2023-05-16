import fixWebmDuration from "webm-duration-fix"
import { getMimeType } from "./media-recorder"

export async function downloadRecording (url: string, name: string): Promise<void> {
  const type = getMimeType()
  const extension = type.slice(type.indexOf("/") + 1, type.indexOf(";"))
  const anchor = document.createElement("a")

  anchor.style.display = "none"
  anchor.download = `${sanitizeFileName(name)}.${extension}`
  anchor.href = url
  anchor.click()
}

export async function saveRecording (chunks: BlobPart[]): Promise<string | undefined> {
  const type = getMimeType()
  return await fixWebmDuration(new Blob(chunks, { type }))
    .then((blob) => window.URL.createObjectURL(blob))
    .catch(() => undefined)
}

function sanitizeFileName (fileName: string): string {
  const invalidChars = /[/\\?%*:|"<>]/g
  return fileName.replace(invalidChars, "")
}
