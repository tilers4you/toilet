import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://denvertoiletpros.com'),
  title: {
    default: 'Denver Toilet Pros | Toilet Installation, Replacement & Repair',
    template: '%s | Denver Toilet Pros',
  },
  description: 'Denver toilet installation, toilet replacement, and toilet repair for running toilets, leaks at the base, weak flushes, fill valves, flappers, wax rings, and new installs.',
  keywords: [
    'Denver toilet installation',
    'Denver toilet replacement',
    'toilet repair Denver',
    'running toilet repair Denver',
    'toilet plumber Denver',
    'wax ring replacement Denver',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Denver Toilet Pros',
    description: 'Local toilet repair, replacement, and installation service for Denver, CO homes, landlords, and property managers.',
    url: 'https://denvertoiletpros.com',
    siteName: 'Denver Toilet Pros',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
