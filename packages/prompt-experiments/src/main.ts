// import { EndpointServiceClient } from '@google-cloud/aiplatform'
import * as aiplatform from '@google-cloud/aiplatform'

const projectId = 'cardcrafters';
const location = 'us-central1';

// aiplatform

const client = new aiplatform.PredictionServiceClient({
  apiEndpoint: "us-central1-aiplatform.googleapis.com",
  projectId,
})

async function main(): Promise<void> {
  // let result = await client.predict({
  //   // instances: [{stringValue: "hello"}],
  // })
  let result = await client.predict(
    {
      instances: [{ "stringValue": "hello" }],
    },
    {
    }
  )
  console.log("result: ", result)

  console.log("done")
}

main()

// // Specifies the location of the api endpoint
// const clientOptions = {
//   apiEndpoint: 'us-central1-aiplatform.googleapis.com',
// };

// const client = new aiplatform.EndpointServiceClient(clientOptions);

// async function listEndpoints() {
//   // Configure the parent resource
//   const parent = `projects/${projectId}/locations/${location}`;
//   const request = {
//     parent,
//   };

//   // Get and print out a list of all the endpoints for this resource
//   const [result] = await client.listEndpoints(request);
//   console.log("result: ", result)
//   for (const endpoint of result) {
//     console.log(`\nEndpoint name: ${endpoint.name}`);
//     console.log(`Display name: ${endpoint.displayName}`);
//     if (endpoint.deployedModels !== null && endpoint.deployedModels !== undefined && endpoint.deployedModels[0]) {
//       console.log(
//         `First deployed model: ${endpoint.deployedModels[0].model}`
//       );
//     } else {
//       console.log(
//         `No deployed models.`
//       )
//     }
//   }
// }
// listEndpoints();