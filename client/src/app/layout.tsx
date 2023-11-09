import "@styles/globals.css";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blogr",
  description: "Write and Connect!",
  meta: "utf-8"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
