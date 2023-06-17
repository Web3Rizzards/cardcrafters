import { sleep } from "@latticexyz/utils";
import * as Generation from "./generation/generation_pb";
import { GenerationServiceClient } from "./generation/generation_pb_service";
import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
import fs from "fs";
import { buildGenerationRequest, executeGenerationRequest, onGenerationComplete } from "./helpers";

import crypto_bro_png from "../public/crypto_bro.png";

// This is a NodeJS-specific requirement - browsers implementations should omit this line.
GRPCWeb.setDefaultTransport(NodeHttpTransport());

// Authenticate using your API key, don't commit your key to a public repository!
const metadata = new GRPCWeb.Metadata();
metadata.set("Authorization", "Bearer " + process.env.API_KEY);

// Create a generation client to use with all future requests
const client = new GenerationServiceClient("https://grpc.stability.ai", {});

export default async function createImage(prompt: string): Promise<string> {
  prompt = prompt.trim()
  console.log('createImage.prompt:', prompt)
  // throw new Error('TODO: createImage')

  const request = buildGenerationRequest("stable-diffusion-xl-beta-v2-2-2", {
    type: "text-to-image",
    prompts: [
      {
        text: "expansive landscape rolling greens with blue daisies and weeping willow trees under a blue alien sky, masterful, ghibli",
      },
    ],
    width: 512,
    height: 512,
    samples: 1,
    cfgScale: 8,
    steps: 30,
    seed: 992446758,
    sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
  });

  const response = await executeGenerationRequest(client, request, metadata)
    .then(onGenerationComplete)
    .catch((error) => {
      console.error("Failed to make text-to-image request:", error);
    });

  console.log('createImage.response:', response)

  // await sleep(500)
  return crypto_bro_png
}