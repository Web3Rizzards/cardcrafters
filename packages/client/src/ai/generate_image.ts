import { sleep } from "@latticexyz/utils";
import crypto_bro_png from "../public/crypto_bro.png";

import * as Generation from "./generation/generation_pb";
import {GenerationServiceClient} from "./generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";

// This is a NodeJS-specific requirement - browsers implementations should omit this line.
GRPCWeb.setDefaultTransport(NodeHttpTransport());

// Authenticate using your API key, don't commit your key to a public repository!
const metadata = new GRPCWeb.Metadata();
metadata.set("Authorization", "Bearer " + process.env.dreamstudio_api_key);

// Create a generation client to use with all future requests
const client = new GenerationServiceClient("https://grpc.stability.ai", {});

export default async function createImage(prompt: string): Promise<string> {
  prompt = prompt.trim()
  // throw new Error('TODO: createImage')
  await sleep(500)

  console.log('createImage.print:', prompt)

  return crypto_bro_png
}
