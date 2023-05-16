import { displayMediaOptions } from "@/constants"

export async function selectDisplayMedia (): Promise<MediaStream | undefined> {
  return await window.navigator.mediaDevices
    .getDisplayMedia(displayMediaOptions)
    .catch(() => undefined)
}
