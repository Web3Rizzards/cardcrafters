import { sleep } from '@latticexyz/utils'
import crypto_bro_png from '../public/crypto_bro.png'
import { GoogleAuth } from 'google-auth-library'

import 'dotenv'

/*
export type Prediction = {
  content: string
}

export type PredictionData = {
  predictions: Prediction[]
}

console.log(process.env)

const auth = new GoogleAuth({
  credentials: {
    client_email: process.env.client_email,
    private_key: process.env.private_key,
  },
  projectId: process.env.projectId,
  scopes: "https://www.googleapis.com/auth/cloud-platform"
})

const predictionClient = await auth.getClient()

export default async function createTextCompletion(prompt: string): Promise<string> {
  prompt = prompt.trim()

  if (false) {
    await sleep(500)
  } else {
    const result = await predictionClient.request({
      method: 'POST',
      url: `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.projectId}/locations/us-central1/publishers/google/models/text-bison:predict`,
      data: {
        instances: [{ "prompt": prompt }],
        parameters: {
          temperature: 0.6,
          maxOutputTokens: 256,
          topK: 40,
          topP: 0.95
        }
      }
    })
    const data = result.data as PredictionData
    if (data.predictions.length === 0)
      throw new Error('empty predictions 0')
    return data.predictions[0].content
  }
}
*/

export default async function createTextCompletion(prompt: string): Promise<string> {
  await sleep(500)
  return "DUMMY"
}
