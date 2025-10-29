import { paymentMiddleware, Network } from 'x402-next';
import { facilitator } from '@coinbase/x402';

// Configure the payment middleware
export const middleware = paymentMiddleware(
  "0x197640a62840Dad854297806Bfac9202f3402db8", // your receiving wallet address - REPLACE THIS
  {
    '/api/x402/transcode/VOD': {
      price: '$0.01',
      network: "base",
      config: {
        discoverable: true,
        description: 'Transcode video on demand using Livepeer. Provide video URL and transcoding parameters for precise control.',
        inputSchema: {
          bodyFields: {
            videoUrl: {
              type: "string",
              description: "URL of the video to transcode",
              required: true
            },
            width: {
              type: "number",
              description: "Output video width in pixels (default: 1280)",
              required: false
            },
            height: {
              type: "number", 
              description: "Output video height in pixels (default: 720)",
              required: false
            },
            bitrate: {
              type: "number",
              description: "Video bitrate in bits per second (default: 3000000)",
              required: false
            },
            fps: {
              type: "number",
              description: "Frames per second (default: 30)",
              required: false
            },
            quality: {
              type: "number",
              description: "Video quality/CRF value 0-51, lower is better quality (default: 23)",
              required: false
            }
          }
        },
        outputSchema: {
          properties: {
            transcodedUrl: {
              type: "string",
              description: "URL of the transcoded video"
            },
            jobId: {
              type: "string",
              description: "Transcoding job ID for tracking"
            }
          }
        }
      }
    },
  },
  facilitator
);

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/api/x402/transcode/VOD/:path*',
  ]
};
