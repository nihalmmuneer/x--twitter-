import React, { useState, useEffect } from "react";
import { HiDotsHorizontal, HiOutlineHeart, HiHeart } from "react-icons/hi";
import {
  getFirestore,
  setDoc,
  deleteDoc,
  doc,
  onSnapshot,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { signIn, useSession } from "next-auth/react";
import { app } from "@/firebase";
const Comment = ({ comment, commentId, originalPostId }) => {
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const { data: session } = useSession();

  const db = getFirestore(app);
  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uuid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uuid
          ),
          {
            username: session?.user?.username,
            timestamp: serverTimestamp(),
          }
        );
      }
    } else {
      signIn();
    }
  };
  useEffect(() => {
    onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => {
        setLikes(snapshot.docs);
      }
    );
  }, [db]);
  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uuid) !== -1
    );
  }, [likes]);

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
        <div className="flex items-center">
          {isLiked ? (
            <HiHeart
              onClick={likePost}
              className="cursor-pointer rounded-full text-red-500 p-2 hover:bg-red-100 w-8 h-8"
            />
          ) : (
            <HiOutlineHeart
              onClick={likePost}
              className="cursor-pointer rounded-full hover:text-red-500 p-2 hover:bg-red-100 w-8 h-8"
            />
          )}
          {likes.length > 0 && (
            <span className={`text-xs ${isLiked && "text-red-600"}`}>
              {likes.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
