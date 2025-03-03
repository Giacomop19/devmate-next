"use client"

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/helper/ctx";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
        {children}
      </SessionProvider>
      </body>
    </html>
  );
}

// function RootLayoutNav({children}: Readonly<{children: React.ReactNode}>) {
//   return(
//     <SessionProvider>
//       <html lang="en">
//           <body
//             className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//           >
//             <main>{children}</main>
//           </body>
//       </html>
//     </SessionProvider>
  
//   )
// }
