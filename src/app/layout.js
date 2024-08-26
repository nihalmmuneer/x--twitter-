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
          <div className="hidden sm:inline border-r h-screen">
            <SideBar />
          </div>
          <div>{children}</div>
          <div className="p-3 border-l hidden lg:flex flex-col w-[24rem]">
          <div className="sticky top-0 bg-white py-2">
            <input type="text" placeholder="Search" className="border bg-gray-100 rounded-3xl px-4 py-2 text-sm border-gray-200"/>
          </div>
            <News />
          </div>
        </div>
      </body>
    </html>
  );
}
