import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopMenu from "@/component/TopMenu";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Campground Reservation",
  description: "Laaatte",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const Session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
      <NextAuthProvider session={Session}>
        <TopMenu/>
        {children}
      </NextAuthProvider>
      </ReduxProvider>
      </body>
    </html>
  );
}
