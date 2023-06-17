import "@styles/globals.css";
import NavBar from "@components/common/navBar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blogr",
  description: "Write and Connect!",
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
        <main className="relative z-10">
          <NavBar />
          {children}
        </main>
      </body>
    </html>
  );
}
