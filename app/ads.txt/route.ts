import { adsConfig } from "@/lib/ads/config";

export async function GET() {
  const publisherId =
    adsConfig.publisherId || adsConfig.clientId.replace(/^ca-/, "");

  if (!publisherId) {
    return new Response(
      "google.com, pub-0000000000000000, DIRECT, f08c47fec0942fa0",
      {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      },
    );
  }

  const body = `google.com, pub-${publisherId}, DIRECT, f08c47fec0942fa0`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
