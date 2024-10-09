"use client";
import { modalState, postIdState } from "@/atom/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import { useSession } from "next-auth/react";
import { HiX } from "react-icons/hi";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";
import { app } from "@/firebase";
const commentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [input, setInput] = useState("");
  const [post, setPost] = useState({});
  const { data: session } = useSession();
  const db = getFirestore(app);

  const sendComment = () => {
    
  }
  useEffect(() => {
    if (postId !== "") {
      const postRef = doc(db, "posts", postId);
      const unsubscribe = onSnapshot(postRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          console.log("No such document!");
        }
      });
      return () => unsubscribe();
    }
  }, [postId]);
  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          ariaHideApp={false}
          className="max-w-lg w-[90%] absolute top-24 left-[50%] translate-x-[-50%]
          bg-white border-2 border-gray-200 rounded-xl shadow-md"
        >
          <div className="p-4">
            <div className="border-b border-gray-200  py-2 px-1.5">
              <HiX
                onClick={() => setOpen(false)}
                className="text-2xl text-gray-700 p-1 rounded-full hover:bg-gray-200 cursor-pointer"
              />
            </div>
            <div className="flex items-center relative space-x-1 p-2">
              <span className="w-0.5 bg-gray-300 h-full absolute top-11 left-8 z-[-1]" />
              <img
                src={post?.profileImg}
                alt="post-img"
                className="h-11 w-11 rounded-full"
              />
              <h4 className="font-bold sm:text-[14px] text-[15px] hover:underline truncate">
                {post?.name}
              </h4>
              <span className="text-sm sm:text-[12px] truncate">
                @{post?.username}
              </span>
            </div>
            <p className="text-gray-500 text-[15px] sm:text-[13px] ml-16 mb-2">
              {post?.text}
            </p>
            <div className="p-3 flex space-x-3">
              <img
                className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
                src={session?.user?.image}
                alt="user-img"
              />
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    rows="2"
                    placeholder="Write something..."
                    className="w-full min-h-[50px] placeholder:text-gray-500 text-[14px] outline-none tracking-wide"
                  />
                </div>
                <div className="flex justify-end items-center p-2.5">
                  <button
                    disabled={input.trim() === ""}
                    onClick={sendComment}
                    className="bg-blue-400 text-white rounded-full px-5 py-1.5 font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default commentModal;
