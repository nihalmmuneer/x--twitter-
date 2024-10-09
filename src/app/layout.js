import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/Sidebar";
import News from "@/components/News";
import SessionWrapper from "@/components/SessionWrapper";
import CommentModal from "@/components/CommentModal";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "X-Twitter",
  description: "Create X-Twitter Using NextJs and Tailwind Css",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <div className="flex justify-between max-w-6xl mx-auto">
            <div className="hidden sm:inline border-r h-screen sticky top-0">
              <SideBar />
            </div>
            <div className="flex-1 ">{children}</div>
            <div className="p-3 border-l hidden lg:flex flex-col w-[24rem]">
              <div className="sticky top-0 bg-white py-2">
                <input
                  type="text"
                  placeholder="Search"
                  className="border bg-gray-100 rounded-3xl px-4 py-2 text-sm border-gray-200"
                />
              </div>
              <News />
            </div>
          </div>
          <CommentModal />
        </SessionWrapper>
      </body>
    </html>
  );
}
