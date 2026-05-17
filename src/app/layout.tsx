import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlowMind AI",
  description:
    "FlowMind AI is a modern productivity dashboard to manage tasks, notes, analytics, and AI-powered workflows in one place.",

  keywords: [
    "AI productivity app",
    "task management",
    "notes app",
    "AI dashboard",
    "productivity tool",
    "Next.js SaaS",
    "FlowMind AI",
  ],

  authors: [
    {
      name: "Rishabh Goswami",
    },
  ],

  creator: "Rishabh Goswami",

  metadataBase: new URL("https://flowmind-ai.vercel.app"),

  openGraph: {
    title: "FlowMind AI",
    description:
      "AI-powered productivity dashboard for managing tasks, notes, and workflows.",
    url: "https://flowmind-ai.vercel.app",
    siteName: "FlowMind AI",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "FlowMind AI",
    description:
      "AI-powered productivity dashboard built with Next.js and TypeScript.",
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
