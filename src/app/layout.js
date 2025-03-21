import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "../components/ui/provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Benjamin Mato - Software Engineer",
  description: "Spanish software engineer, licensed in Compute Engineering",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <script src="http://localhost:8097"></script>
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}