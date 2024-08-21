import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import News from "@/components/News";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X-Twitter",
  description: "Create X-Twitter Using NextJs and Tailwind Css",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex justify-between max-w-6xl mx-auto">
          <div>
            <SideBar />
          </div>
          <div>{children}</div>
          <div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
