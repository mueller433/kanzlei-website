import { Public_Sans, Source_Serif_4 } from 'next/font/google'
import React from 'react'

import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import './styles.css'

const headline = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700'],
})

const grotesk = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
})

export const metadata = {
  title: {
    default: 'Müller & Partner – Insolvenzverwaltung & Restrukturierung',
    template: '%s | Müller & Partner',
  },
  description:
    'Müller & Partner ist eine spezialisierte Kanzlei für Insolvenzrecht, Sanierung und Restrukturierung. Zusätzlich betreiben wir einen Verwertungskatalog für Vermögenswerte aus laufenden Verfahren.',
}

export const viewport = {
  themeColor: '#f7f5f0',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className={`${headline.variable} ${grotesk.variable} bg-background`}>
      <body className="flex min-h-screen flex-col font-sans text-foreground antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
