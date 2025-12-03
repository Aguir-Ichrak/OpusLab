import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"
import { Header } from "@/components/header"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1a1a2e" media="(prefers-color-scheme: dark)" />
        <link rel="alternate" type="application/rss+xml" href="/rss.xml" title="Dev Blog RSS Feed" />
      </head>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider><div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
          </div></ThemeProvider>
      </body>
    </html>
  )
}
