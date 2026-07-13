import type { Metadata } from "next";
import { Outfit, Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider} from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const outFitFont = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "IntelliLearn AI",
  description: "AI Learning Platform to Connect with Other Learners",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn("h-full", "antialiased", outFitFont.className, "font-sans", geist.variable)}
      >
        <body className={`${outFitFont.className} antialiased`}>
          <Header />
          <QueryClientProvider client={queryClient} >
            {children}
          </QueryClientProvider>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
