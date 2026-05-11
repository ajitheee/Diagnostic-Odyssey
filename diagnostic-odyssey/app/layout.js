import "./globals.css";

export const metadata = {
  title: "The Diagnostic Odyssey Ender",
  description: "Powered by Gemma 4 — For people who've been searching for answers too long",
  openGraph: {
    title: "The Diagnostic Odyssey Ender",
    description: "AI-powered rare disease research assistant built with Gemma 4",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
