"use client";
import React, { useEffect, useState } from "react";
import {
  HiOutlineChat,
  HiOutlineHeart,
  HiOutlineTrash,
  HiHeart,
} from "react-icons/hi";
import { signIn, useSession } from "next-auth/react";
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { app } from "@/firebase";
const Icons = ({ id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const db = getFirestore(app);
  const likePost = async () => {
    if (session) {
      if (isLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uuid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session.user.uuid), {
          username: session.user.username,
          timestamp: serverTimestamp(),
        });
      }
    } else {
      signIn();
    }
  };
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(likes.findIndex((like) => like.id === session.user.uuid) !== -1);
  }, [likes]);
  return (
    <div className="flex text-gray-700 justify-start gap-5 p-2">
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
      <HiOutlineChat className=" cursor-pointer rounded-full hover:text-sky-500 p-2 hover:bg-sky-100 w-8 h-8" />
      <HiOutlineTrash className="cursor-pointer rounded-full hover:text-red-500 hover: hover:bg-red-100 w-8  h-8 p-2" />
    </div>
  );
};

export default Icons;
