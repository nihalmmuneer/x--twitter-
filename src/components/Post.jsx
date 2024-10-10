import Link from "next/link";
import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import Icons from "./Icons";
const Post = ({ post, id }) => {
  return (
    <div className=" flex border-b p-3 border-gray-200">
      <img
        src={post?.profileImg}
        alt="profile-img"
        className="w-11 h-11 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-xs truncate">{post.name}</h4>
            <span className="text-xs truncate text-gray-900">
              @{post.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm cursor-pointer" />
        </div>
        <Link href={`posts/${post.id}`}>
          <p className="text-gray-800 text-sm my-2">{post.text}</p>
        </Link>
        <Link href={`posts/${post.id}`}>
          <img
            src={post?.image}
            alt="post-img"
            className="rounded-2xl max-h-[300px] w-full object-cover"
          />
        </Link>
        <Icons id={post.id} uuid={post.uuid} />
      </div>
    </div>
  );
};

export default Post;
