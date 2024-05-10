import { JetBrains_Mono as FontMono, Montserrat as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: "normal",
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
