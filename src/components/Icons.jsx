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
import { useRecoilState } from "recoil";
import { modalState } from "@/atom/atom";
import { postIdState } from "@/atom/atom";
const Icons = ({ id, uuid }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
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

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      if (session.user.uuid === uuid) {
        await deleteDoc(doc(db, "posts", id))
          .then(() => {
            console.log("Document Successfully Deleted!");
            window.location.reload();
          })
          .catch((error) => console.log("Error removing the document:", error));
      } else {
        alert("You are not authorized to delete this post");
      }
    }
  };
  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs);
    });
  }, [db]);

  useEffect(() => {
    setIsLiked(
      likes.findIndex((like) => like.id === session?.user?.uuid) !== -1
    );
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
      <HiOutlineChat
        onClick={() => {
          if (!session) {
            signIn();
          } else {
            setIsOpen(!isOpen);
            setPostId(id);
          }
        }}
        className=" cursor-pointer rounded-full hover:text-sky-500 p-2 hover:bg-sky-100 w-8 h-8"
      />
      {session?.user?.uuid === uuid && (
        <HiOutlineTrash
          className="cursor-pointer rounded-full hover:text-red-500 hover: hover:bg-red-100 w-8  h-8 p-2"
          onClick={deletePost}
        />
      )}
    </div>
  );
};

export default Icons;
