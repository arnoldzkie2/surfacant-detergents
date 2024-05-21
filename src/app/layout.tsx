import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/ui/theme-provider";
import NextAuthSessionProvider from "@/components/auth/SessionProvider";

export const metadata: Metadata = {
  title: "Surfacant Detergents",
  description: "Surfacant Detergents Sample System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="theme"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
