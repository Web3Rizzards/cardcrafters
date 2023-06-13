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
// import { EndpointServiceClient } from '@google-cloud/aiplatform'
const aiplatform = __importStar(require("@google-cloud/aiplatform"));
const projectId = 'cardcrafters';
const location = 'us-central1';
// aiplatform
const client = new aiplatform.PredictionServiceClient({
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
    projectId,
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // let result = await client.predict({
        //   // instances: [{stringValue: "hello"}],
        // })
        let result = yield client.predict({
            instances: [{ "stringValue": "hello" }],
        }, {});
        console.log("result: ", result);
        console.log("done");
    });
}
main();
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
