import React from "react";
import { HiOutlineChat, HiOutlineHeart, HiOutlineTrash } from "react-icons/hi";
const Icons = () => {
  return (
    <div className="flex text-gray-700 justify-start gap-5 p-2">
      <HiOutlineChat className=" cursor-pointer rounded-full hover:text-sky-500 p-2 hover:bg-sky-100 w-8 h-8" />
      <HiOutlineHeart className="cursor-pointer rounded-full hover:text-red-500 p-2 hover:bg-red-100 w-8 h-8" />
      <HiOutlineTrash className="cursor-pointer rounded-full hover:text-red-500 hover: hover:bg-red-100 w-8  h-8 p-2" />
    </div>
  );
};

export default Icons;
