import { Public_Sans, Source_Serif_4 } from 'next/font/google'
import React from 'react'
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
  description:
    'Verwertungskatalog der Kanzlei: veröffentlichte Positionen aus laufenden Insolvenzverfahren – Immobilien, Maschinen, Fahrzeuge, Inventar und Sonstiges.',
  title: 'Verwertungskatalog',
}

export const viewport = {
  themeColor: '#ffffff',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="de" className={`${headline.variable} ${grotesk.variable} bg-background`}>
      <body className="font-sans text-foreground antialiased">
        <main>{children}</main>
      </body>
    </html>
  )
}
