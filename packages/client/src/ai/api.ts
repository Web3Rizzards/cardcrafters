import { sleep } from '@latticexyz/utils'
import crypto_bro_png from '../public/crypto_bro.png'

export async function createTextCompletion(prompt: string): Promise<string> {
  prompt = prompt.trim()
  // throw new Error('TODO: createTextCompletion')
  await sleep(500)
  // return "<createTextCompletion result>"
  return "DUMMY"
}

export async function createImage(prompt: string): Promise<string> {
  prompt = prompt.trim()
  // throw new Error('TODO: createImage')
  await sleep(500)
  return crypto_bro_png
}
