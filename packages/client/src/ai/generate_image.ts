import { sleep } from "@latticexyz/utils";
import crypto_bro_png from "../public/crypto_bro.png";
import fs from "fs";
import { generateAsync, generate } from 'stability-client'

// Returns the base64 encoding of generated image.
export default async function createImage(prompt: string): Promise<string> {
  // const { res, images } = await generateAsync({
  //   prompt: 'A Stunning House',
  //   apiKey: process.env.dreamstudio_api_key as string,
  // }) as any
  // console.log(images)
  // return crypto_bro_png

  // const api = generate({
  //   prompt: 'A Stunning House',
  //   apiKey: process.env.dreamstudio_api_key as string,
  // })

  const api = await generate({
    // prompt: `amazing looking room, Dean Norton style`,
    prompt,
    // apiKey: process.env.dreamstudio_api_key as string,
    apiKey: "sk-zVycyiwCeZtETN80aZJYTo4DNgHPNr5zHnxRAGH8KfouUHTj",
    width: 512,
    height: 512,
    // steps: 10,
    engine: 'stable-diffusion-512-v2-1',
    // cfgScale: 10,
    noStore: true, // if set to true, it won't save files to outDir after generation.
    samples: 1,
    diffusion: 'ddim',

    // // TODO: this doesnt work -- some filesystem-related error i think
    // noStore: false, // if set to true, it won't save files to outDir after generation.
    // outDir: '/output',
  })

  let image: string | undefined

  api.on('image', ({ buffer, filePath }) => {
    console.log('Image', buffer, filePath)

    const blob = new Blob([buffer], { type: 'image/png' })
    if (false) {
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        var base64String = reader.result as string;
        console.log('Base64 String - ', base64String);
        image = base64String
      }
    } else {
      image = URL.createObjectURL(blob)
    }

    // const img = document.createElement('img');
    // img.src = URL.createObjectURL(new Blob([buffer], { type: 'image/png' }));
    // img.alt = 'GENERATED IMAGE';
    // document.body.append(img);
  })


  api.on('end', (data) => {
    console.log('Generating Complete', data)
  })

  while (image === undefined) { await sleep(100) }
  return image

  // return crypto_bro_png
}

function toDataURL(url: string, callback: (dataUrl: string | ArrayBuffer | null) => void) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

// toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function (dataUrl) {
//   console.log('RESULT:', dataUrl)
// })

// import * as Generation from "./generation/generation_pb";
// import { GenerationServiceClient } from "./generation/generation_pb_service";
// import { grpc as GRPCWeb } from "@improbable-eng/grpc-web";
// import { NodeHttpTransport } from "@improbable-eng/grpc-web-node-http-transport";
// import { buildGenerationRequest, executeGenerationRequest, onGenerationComplete } from "./helpers";


// // This is a NodeJS-specific requirement - browsers implementations should omit this line.
// GRPCWeb.setDefaultTransport(NodeHttpTransport());

// // Authenticate using your API key, don't commit your key to a public repository!
// const metadata = new GRPCWeb.Metadata();
// metadata.set("Authorization", "Bearer " + process.env.API_KEY);

// // Create a generation client to use with all future requests
// const client = new GenerationServiceClient("https://grpc.stability.ai", {});

// export default async function createImage(prompt: string): Promise<string> {
//   prompt = prompt.trim()
//   console.log('createImage.prompt:', prompt)
//   // throw new Error('TODO: createImage')

//   const request = buildGenerationRequest("stable-diffusion-xl-beta-v2-2-2", {
//     type: "text-to-image",
//     prompts: [
//       {
//         text: "expansive landscape rolling greens with blue daisies and weeping willow trees under a blue alien sky, masterful, ghibli",
//       },
//     ],
//     width: 512,
//     height: 512,
//     samples: 1,
//     cfgScale: 8,
//     steps: 30,
//     seed: 992446758,
//     sampler: Generation.DiffusionSampler.SAMPLER_K_DPMPP_2M,
//   });

//   const response = await executeGenerationRequest(client, request, metadata)
//     .then(onGenerationComplete)
//     .catch((error) => {
//       console.error("Failed to make text-to-image request:", error);
//     });

//   console.log('createImage.response:', response)

//   // await sleep(500)
//   return crypto_bro_png
// }
