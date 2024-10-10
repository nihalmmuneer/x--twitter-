import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
const Comment = ({ comment, id }) => {
  console.log(comment);
  return (
    <div className=" flex border-b p-6 border-gray-200">
      <img
        src={comment?.userImg}
        alt="profile-img"
        className="w-9 h-9 rounded-full mr-4"
      />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 items-center whitespace-nowrap">
            <h4 className="font-bold text-xs truncate">{comment.name}</h4>
            <span className="text-xs truncate text-gray-900">
              @{comment.username}
            </span>
          </div>
          <HiDotsHorizontal className="text-sm cursor-pointer" />
        </div>
        <p className="text-gray-800 text-xs my-2">{comment.comment}</p>
      </div>
    </div>
  );
};

export default Comment;
