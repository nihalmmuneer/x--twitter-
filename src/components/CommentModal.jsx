"use client";
import { modalState } from "@/atom/atom";
import React from "react";
import { useRecoilState } from "recoil";
const commentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      commentModal
      {open && <h1>Modal is Open</h1>}
    </div>
  );
};

export default commentModal;
