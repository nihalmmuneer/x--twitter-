"use client";
import { useSession } from "next-auth/react";
import { HiOutlinePhotograph } from "react-icons/hi";

const Input = () => {
  const { data: session } = useSession();
  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src={session.user.image}
        alt="user-img"
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          rows="2"
          placeholder="What's Happening.."
          className="w-full border-none outline-none min-h-[50px] text-gray-700 tracking-wide"
        ></textarea>
        <div>
          <HiOutlinePhotograph className="w-10 h-10 text-sky-500 p-2 hover:text-sky-100 cursor-pointer rounded-full" />
          <button disabled className="bg-blue-400 px-4 rounded-full py-1.5 text-white shadow-md font-bold hover:brightness-95 disabled:opacity-50">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
