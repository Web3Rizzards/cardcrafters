import { GoogleAuth } from 'google-auth-library'

import * as dotenv from 'dotenv'
dotenv.config()

async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.client_email,
      private_key: process.env.private_key
    },
    scopes: "https://www.googleapis.com/auth/cloud-platform"
  })
  const client = await auth.getClient()
  const accessToken = await client.getAccessToken()
  const token = accessToken.token
  if (token === undefined || token === null) throw new Error("token is undefined or null")
  return token
}

type Prediction = {
  content: string
}

type PredictionData = {
  predictions: Prediction[]
}

async function main(): Promise<void> {
  const auth = new GoogleAuth({
    credentials: {
      client_email: process.env.client_email,
      private_key: process.env.private_key
    },
    scopes: "https://www.googleapis.com/auth/cloud-platform"
  })
  const client = await auth.getClient()
  const result = await client.request({
    method: 'POST',
    url: `https://us-central1-aiplatform.googleapis.com/v1/projects/${process.env.project_id}/locations/us-central1/publishers/google/models/text-bison:predict`,
    data: {
      instances: [
        { "prompt": "Give me ten interview questions for the role of program manager." }
      ],
      parameters: {
        temperature: 0.2,
        maxOutputTokens: 256,
        topK: 40,
        topP: 0.95
      }
    }
  })
  let data = result.data as PredictionData
  // console.log(result)
  // console.log((result.data as PredictionData).predictions)
  data.predictions.forEach(prediction => console.log(prediction.content))
}

main()
