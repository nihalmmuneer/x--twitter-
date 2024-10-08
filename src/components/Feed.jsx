import React from "react";
import {
  getDocs,
  collection,
  getFirestore,
  query,
  orderBy,
} from "firebase/firestore";
import { app } from "@/firebase";
import Post from "./Post";

const Feed = async () => {
  const db = getFirestore(app);
  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  console.log(data, "data");
  return (
    <div>
      {data.map((post) => (
        <Post key={post.id} post={post} id={post.id} />
      ))}
    </div>
  );
};

export default Feed;
