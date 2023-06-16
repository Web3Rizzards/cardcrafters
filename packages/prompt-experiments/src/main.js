"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const google_auth_library_1 = require("google-auth-library");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
function getAccessToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new google_auth_library_1.GoogleAuth({
            credentials: {
                client_email: process.env.client_email,
                private_key: process.env.private_key
            },
            scopes: "https://www.googleapis.com/auth/cloud-platform"
        });
        const client = yield auth.getClient();
        const accessToken = yield client.getAccessToken();
        const token = accessToken.token;
        if (token === undefined || token === null)
            throw new Error("token is undefined or null");
        return token;
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new google_auth_library_1.GoogleAuth({
            credentials: {
                client_email: process.env.client_email,
                private_key: process.env.private_key
            },
            scopes: "https://www.googleapis.com/auth/cloud-platform"
        });
        const client = yield auth.getClient();
        const result = yield client.request({
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
        });
        let data = result.data;
        // console.log(result)
        // console.log((result.data as PredictionData).predictions)
        data.predictions.forEach(prediction => console.log(prediction.content));
    });
}
main();
// import { EndpointServiceClient } from '@google-cloud/aiplatform'
// import * as aiplatform from '@google-cloud/aiplatform'
// const projectId = 'cardcrafters';
// const location = 'us-central1';
// aiplatform
// const endpoint = `projects/${projectId}/locations/${location}/endpoints/${endpointId}`
// const client = new aiplatform.PredictionServiceClient({
//   apiEndpoint: "us-central1-aiplatform.googleapis.com",
//   credentials: {
//     client_email: "TODO",
//     private_key: "TODO"
//   }
// })
// async function main(): Promise<void> {
//   let result = await client.predict({
//     apiEndpoint: "us-central1-aiplatform.googleapis.com",
//     instances: [{stringValue: "hello"}],
//   })
//   // let result = await client.predict(
//   //   {
//   //     instances: [{ "stringValue": "hello" }],
//   //   },
//   //   {
//   //   }
//   // )
//   // console.log("result: ", result)
//   // console.log("done")
// }
// main()
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
