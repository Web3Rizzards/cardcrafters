/*
async function getAccessToken(): string {
  const auth = new GoogleAuth({
    credentials: {
      client_email: "TODO",
      private_key: "TODO"
    },
    scopes: "https://www.googleapis.com/auth/cloud-platform"
  })
  const client = await auth.getClient()
  const accessToken = await client.getAccessToken()
  return accessToken
}
*/

/*
curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/text-bison:predict -d \
$'{
  "instances": [
    { "prompt": "Give me ten interview questions for the role of program manager."}
  ],
  "parameters": {
    "temperature": 0.2,
    "maxOutputTokens": 256,
    "topK": 40,
    "topP": 0.95
  }
}'
*/

/*
curl \
-X POST \
-H "Authorization: Bearer $(gcloud auth print-access-token)" \
-H "Content-Type: application/json" \
https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/text-bison:predict -d \
$'{
  "instances": [
    { "prompt": "Give me ten interview questions for the role of program manager."}
  ],
  "parameters": {
    "temperature": 0.2,
    "maxOutputTokens": 256,
    "topK": 40,
    "topP": 0.95
  }
}'
*/