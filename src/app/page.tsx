import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">LP</span>
          </div>
          <h1 className="text-2xl font-bold text-black dark:text-zinc-50">Livepeer 402 Middleware</h1>
        </div>
        
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            Decentralized Video Transcoding
          </h2>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Transform your videos using Livepeer's decentralized infrastructure. 
            Pay only for what you use with instant crypto payments via the 402 protocol.
            No subscriptions, no commitments - just pay-per-transcode.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-5 text-white transition-colors hover:from-blue-600 hover:to-purple-700 md:w-[200px]"
            href="/api/x402/transcode/VOD"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            API Endpoint
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[200px]"
            href="https://livepeer.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Documentation
          </a>
        </div>
        
        <div className="mt-16 w-full space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">Why Choose Our Service?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-zinc-50 mb-2">💰 Pay-Per-Use</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Only $0.01 per transcoding job. No monthly fees or subscriptions.</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-zinc-50 mb-2">⚡ Instant Processing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fast transcoding powered by Livepeer's decentralized network.</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-zinc-50 mb-2">🔒 Crypto Payments</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Secure payments via Base network using the 402 protocol.</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                <h4 className="font-semibold text-black dark:text-zinc-50 mb-2">🎬 Multiple Formats</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Support for MP4, WebM, MOV with quality presets.</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-black dark:text-zinc-50">API Usage</h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
{`POST /api/x402/transcode/VOD
Content-Type: application/json
X-PAYMENT: [crypto payment header]

{
  "videoUrl": "https://example.com/video.mp4",
  "width": 1920,
  "height": 1080,
  "bitrate": 6000000,
  "fps": 30,
  "quality": 20
}`}
              </pre>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              💡 <strong>Note:</strong> Include the X-PAYMENT header with your crypto payment to access the service.
            </p>
            
            <div className="mt-4">
              <h4 className="font-semibold text-black dark:text-zinc-50 mb-2">Parameter Reference:</h4>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <p><strong>videoUrl:</strong> Required - URL of the video to transcode</p>
                <p><strong>width:</strong> Optional - Output width in pixels (default: 1280, max: 7680)</p>
                <p><strong>height:</strong> Optional - Output height in pixels (default: 720, max: 4320)</p>
                <p><strong>bitrate:</strong> Optional - Video bitrate in bps (default: 3000000, range: 100k-50M)</p>
                <p><strong>fps:</strong> Optional - Frames per second (default: 30, range: 1-120)</p>
                <p><strong>quality:</strong> Optional - CRF quality 0-51, lower=better (default: 23)</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
