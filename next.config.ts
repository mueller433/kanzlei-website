import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // Die Sofortkauf-Anfrage erlaubt bis zu 3 Dokumente à max. 5 MB
      // (Personalausweis Vorder-/Rückseite, ggf. Firmennachweis). Das
      // Next.js-Standardlimit von 1 MB reicht dafür nicht aus. Die Dokumente
      // werden ausschließlich als Resend-E-Mail-Anhang verschickt und nie
      // dauerhaft gespeichert.
      bodySizeLimit: "20mb",
    },
  },
};

export default withPayload(nextConfig);
