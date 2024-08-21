import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { MdHome } from "react-icons/md";

const SideBar = () => {
  return (
    <div className="flex flex-col gap-4 p-3">
      <Link href="/">
        <FaXTwitter className=" hidden xl:inline w-16 h-16 p-3 cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200" />
      </Link>
      <Link href="/" className="flex items-center hover:bg-gray-100 rounded-full p-3 transition-all duration-200">
        <MdHome className="w-6 h-6" />
        <span className="font-bold hidden sm:inline"> Home </span>
      </Link>
      <button className="font-semibold hidden xl:inline bg-blue-400 rounded-full w-48 h-9 hover:brightness-95 text-white transition-all duration-200 shadow-md text-center">Sign In</button>
    </div>
  );
};

export default SideBar;
