import type React from "react"
import type { Metadata, Viewport } from "next"
import { Montserrat, Inter } from "next/font/google"
import { CartProvider } from "@/contexts/CartContext"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Ceylon Nature Link - Premium Sri Lankan Natural Products",
  description:
    "Premium dehydrated fruits, spices, and herbal products from Sri Lanka for local retail, export, and tourists.",
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable} antialiased`}>
      <body className="min-h-screen overflow-x-hidden">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
