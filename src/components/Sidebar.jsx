"use client";
import Link from "next/link";
import React from "react";
import { FaXTwitter } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { signIn, signOut, useSession } from "next-auth/react";
import { HiDotsHorizontal } from "react-icons/hi";

const SideBar = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col justify-between h-screen">
      <div className="flex flex-col gap-4 p-3">
        <Link href="/">
          <FaXTwitter className=" hidden xl:inline w-16 h-16 p-3 cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200" />
        </Link>
        <Link
          href="/"
          className="flex items-center hover:bg-gray-100 rounded-full p-3 transition-all duration-200"
        >
          <MdHome className="w-6 h-6" />
          <span className="font-bold hidden sm:inline"> Home </span>
        </Link>
        {session ? (
          <button
            className="font-semibold hidden xl:inline bg-blue-400 rounded-full w-48 h-9 hover:brightness-95 text-white transition-all duration-200 shadow-md text-center"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="font-semibold hidden xl:inline bg-blue-400 rounded-full w-48 h-9 hover:brightness-95 text-white transition-all duration-200 shadow-md text-center"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
      {session && (
        <div className="text-gray-700 text-sm flex p-3 items-center cursor-pointer hover:bg-gray-100 rounded-full transition-all duration-200">
          <img
            src={session?.user?.image}
            alt="user-img"
            className="w-10 h-10 rounded-full xl:mr-2"
          />
          <div className="hidden xl:inline">
            <h4 className="font-bold">{session?.user.name}</h4>
            <p className="text-gray-500">{session.user.username}</p>
          </div>
          <HiDotsHorizontal className="h-5 xl:ml-8 hidden xl:inline" />
        </div>
      )}
    </div>
  );
};

export default SideBar;
