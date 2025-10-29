import { NextRequest, NextResponse } from 'next/server';
import { Livepeer } from "livepeer";
import {
  TranscodeProfileEncoder,
  TranscodeProfileProfile,
} from "livepeer/models/components";

const LIVEPEER_API_KEY = process.env.LIVEPEER_API_KEY;

// Ensure this route runs on the Node.js runtime (not Edge)
export const runtime = 'nodejs';

interface TranscodeRequest {
  videoUrl: string;
  width?: number;
  height?: number;
  bitrate?: number;
  fps?: number;
  quality?: number;
}

interface TranscodeResponse {
  transcodedUrl?: string;
  jobId?: string;
  playbackId?: string;
  status?: string;
  error?: string;
  raw?: {
    id: string | null;
    status: string;
    hasPlaybackId: boolean;
  };
}

async function createTranscodeJob(
  videoUrl: string,
  width: number = 1280,
  height: number = 720,
  bitrate: number = 3000000,
  fps: number = 30,
  quality: number = 23
): Promise<TranscodeResponse> {
  if (!LIVEPEER_API_KEY) {
    throw new Error('LIVEPEER_API_KEY is not set');
  }

  const livepeer = new Livepeer({
    apiKey: LIVEPEER_API_KEY,
  });


  try {
    const result = await livepeer.asset.createViaUrl({
      name: `asset-${Date.now()}.mp4`,
      staticMp4: true,
      url: videoUrl,
      profiles: [
        {
          width: width,
          name: `${height}p`,
          height: height,
          bitrate: bitrate,
          quality: quality,
          fps: fps,
          fpsDen: 1,
          gop: "2",
          profile: TranscodeProfileProfile.H264Baseline,
          encoder: TranscodeProfileEncoder.H264,
        },
      ],
    });

    console.log('Livepeer transcoding job created successfully');
    const r: any = result as any;
    // Log the full response shape for debugging
    try { console.dir(r, { depth: 6 }); } catch {}

    // Defensive extraction across common shapes
    const jobId = r.id
      ?? r.asset?.id
      ?? r.taskId
      ?? r.requestId
      ?? r.task?.id
      ?? r.data?.id
      ?? r.job?.id;

    const playbackId = r.playbackId
      ?? r.asset?.playbackId
      ?? r.data?.asset?.playbackId
      ?? r.data?.playbackId
      ?? r.twoHundredAndOneApplicationJsonData?.asset?.playbackId;

    const status = r.status
      ?? r.task?.status
      ?? r.data?.status
      ?? r.asset?.status
      ?? 'queued';

    return {
      jobId,
      status,
      playbackId,
      transcodedUrl: playbackId ? `https://lvpr.tv/?v=${playbackId}` : undefined,
      raw: {
        id: r.id ?? r.asset?.id ?? r.data?.id ?? r.task?.id ?? null,
        status: status,
        hasPlaybackId: Boolean(playbackId),
      }
    };
  } catch (error) {
    console.log(`Livepeer API call failed: ${error}`);
    throw error;
  }
}

// Status retrieval is not implemented with the current SDK typing.
// Consider adding a job polling endpoint when available in the SDK.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      videoUrl, 
      width = 1280, 
      height = 720, 
      bitrate = 3000000, 
      fps = 30, 
      quality = 23 
    }: TranscodeRequest = body;

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
    }

    // Validate video URL format
    try {
      new URL(videoUrl);
    } catch {
      return NextResponse.json({ error: 'Invalid video URL format' }, { status: 400 });
    }

    // Validate parameters
    if (width < 1 || width > 7680) {
      return NextResponse.json({ error: 'Width must be between 1 and 7680 pixels' }, { status: 400 });
    }
    if (height < 1 || height > 4320) {
      return NextResponse.json({ error: 'Height must be between 1 and 4320 pixels' }, { status: 400 });
    }
    if (bitrate < 100000 || bitrate > 50000000) {
      return NextResponse.json({ error: 'Bitrate must be between 100,000 and 50,000,000 bps' }, { status: 400 });
    }
    if (fps < 1 || fps > 120) {
      return NextResponse.json({ error: 'FPS must be between 1 and 120' }, { status: 400 });
    }
    if (quality < 0 || quality > 51) {
      return NextResponse.json({ error: 'Quality must be between 0 and 51' }, { status: 400 });
    }

    const result = await createTranscodeJob(videoUrl, width, height, bitrate, fps, quality);
    console.log('Transcoding result:', result);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Transcoding error:', error);
    return NextResponse.json({ 
      error: 'Failed to create transcoding job',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// export async function GET() {
//   return NextResponse.json({ error: 'Status check not implemented' }, { status: 501 });
// }
