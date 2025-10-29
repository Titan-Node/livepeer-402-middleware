# Livepeer 402 Middleware

A Next.js application that provides video transcoding services using Livepeer's decentralized infrastructure with crypto payment integration via the 402 protocol.

## Features

- **Video Transcoding**: Transcode videos on demand using Livepeer's asset.createViaUrl API
- **Crypto Payments**: Pay for transcoding services using cryptocurrency via the 402 protocol
- **Precise Control**: Specify exact video dimensions, bitrate, FPS, and quality settings
- **Instant Playback**: Get playback URLs immediately after transcoding starts
- **AI Agent Ready**: Designed for automated discovery and usage by AI agents

## API Endpoints

### POST `/api/x402/transcode/VOD`

Creates a new video transcoding job using Livepeer's asset.createViaUrl API.

**Request Body:**
```json
{
  "videoUrl": "https://example.com/video.mp4",
  "width": 1920,
  "height": 1080,
  "bitrate": 6000000,
  "fps": 30,
  "quality": 20
}
```

**Parameters:**
- `videoUrl` (required): URL of the video to transcode
- `width` (optional): Output width in pixels (default: 1280, max: 7680)
- `height` (optional): Output height in pixels (default: 720, max: 4320)
- `bitrate` (optional): Video bitrate in bps (default: 3000000, range: 100k-50M)
- `fps` (optional): Frames per second (default: 30, range: 1-120)
- `quality` (optional): CRF quality 0-51, lower=better (default: 23)

**Response:**
```json
{
  "jobId": "3c658da2-6a8e-48f1-b255-d2d64445e163",
  "status": "queued",
  "playbackId": "3c65977mw6tc1j3i",
  "transcodedUrl": "https://lvpr.tv/?v=3c65977mw6tc1j3i",
  "raw": {
    "id": "3c658da2-6a8e-48f1-b255-d2d64445e163",
    "status": "queued",
    "hasPlaybackId": true
  }
}
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
LIVEPEER_API_KEY=your_livepeer_server_api_key
```

**Note**: Use a Server API key (not CORS-enabled) for backend transcoding calls.

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see above)

4. Run the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3005`

## Payment Integration

This application uses the 402 protocol for crypto payments. The middleware automatically handles payment verification for the `/api/x402/transcode/VOD` endpoint.

- **Price**: $0.01 per transcoding request
- **Network**: Base network
- **Wallet**: Configure your receiving wallet address in `middleware.ts`
- **Protocol**: 402 payment middleware intercepts requests and requires X-PAYMENT header

## Usage Examples

### High Quality (1080p)
```json
{
  "videoUrl": "https://example.com/video.mp4",
  "width": 1920,
  "height": 1080,
  "bitrate": 6000000,
  "fps": 30,
  "quality": 20
}
```

### Mobile Optimized (360p)
```json
{
  "videoUrl": "https://example.com/video.mp4",
  "width": 640,
  "height": 360,
  "bitrate": 1000000,
  "fps": 30,
  "quality": 28
}
```

### Default Settings
```json
{
  "videoUrl": "https://example.com/video.mp4"
}
```

## Technologies Used

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type safety and development experience
- **Tailwind CSS**: Utility-first styling
- **Livepeer SDK**: Video transcoding via asset.createViaUrl
- **402 Protocol**: Crypto payment middleware
- **Coinbase X402**: Payment verification and processing

## API Discovery

This service is designed for AI agent discovery with:
- **Domain**: `api.livepeer.bot` (recommended)
- **Path**: `/api/x402/transcode/VOD`
- **Protocol**: 402 payment required
- **Schema**: OpenAPI-compatible input/output schemas
- **Middleware**: Automatic payment verification

## License

MIT License