import { app } from "@/firebase";
import { getDoc, getFirestore, doc } from "firebase/firestore";
import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import Link from "next/link";
import Post from "@/components/Post";

const postPage = async ({ params }) => {
  const db = getFirestore(app);
  let data = {};
  const querySnapshot = await getDoc(doc(db, "posts", params.id));
  console.log(querySnapshot.data(), "query-snap-shot");
  console.log(querySnapshot.id);
  data = { ...querySnapshot.data(), id: querySnapshot.id };
  return (
    <div className="max-w-xl mx-auto border-r border-l min-h-screen">
      <div className="flex items-center space-x-2  py-2 px-3 top-0 sticky border-b border-gray-200 bg-white">
        <Link href={"/"} className="p-2 hover:bg-gray-200 rounded-full">
          <HiArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="sm:text-lg">Back</h2>
      </div>
      <Post post={data} id={data.id} />
    </div>
  );
};

export default postPage;
