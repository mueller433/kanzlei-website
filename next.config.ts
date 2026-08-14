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
      // Die Sofortkauf-Anfrage erlaubt bis zu 3 Dokumente à max. 10 MB
      // (Personalausweis Vorder-/Rückseite, ggf. Firmennachweis). Das
      // Next.js-Standardlimit von 1 MB reicht dafür nicht aus.
      bodySizeLimit: "35mb",
    },
  },
};

export default withPayload(nextConfig);
