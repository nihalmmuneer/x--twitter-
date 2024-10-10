"use client";
import { app } from "@/firebase";
import {
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Comment from "./Comment";
import React, { useEffect, useState } from "react";

const Comments = ({ id }) => {
  const db = getFirestore(app);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [id, db]);
  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment.data()} commentId={comment.id} originalPostId={id} />
      ))}
    </div>
  );
};

export default Comments;
