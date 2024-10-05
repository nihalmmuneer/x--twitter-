"use client";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import { app } from "@/firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Input = () => {
  const { data: session } = useSession();
  const imageUploadRef = useRef();
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);

  const addImageToPost = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (selectedFile) {
      uploadImageToStorage();
    }
  }, [selectedFile]);

  const uploadImageToStorage = () => {
    setImageFileUploading(true);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + "" + selectedFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is" + progress + "%");
      },
      (error) => {
        console.log(error);
        setImageFileUploading(false);
        setSelectedFileUrl(null);
        setSelectedFile(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setSelectedFileUrl(downloadUrl);
          setImageFileUploading(false);
        });
      }
    );
  };
  if (!session) return null;
  return (
    <div className="flex border-b border-gray-200 p-3 space-x-3">
      <img
        src={session.user.image}
        alt="user-img"
        className="w-11 h-11 rounded-full cursor-pointer hover:brightness-95"
      />
      <div className="w-full divide-y divide-gray-200">
        <textarea
          rows="2"
          placeholder="What's Happening.."
          className="w-full border-none outline-none min-h-[50px] text-gray-700 tracking-wide"
        ></textarea>
        {selectedFile && (
          <img
            src={selectedFileUrl}
            alt="selected-img"
            className="w-full max-h-[250px] object-cover cursor-pointer"
          />
        )}
        <div className="flex items-center justify-between pt-2.5">
          <HiOutlinePhotograph
            className="w-10 h-10 text-sky-500 p-2 hover:bg-sky-100 cursor-pointer rounded-full"
            onClick={() => imageUploadRef.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={imageUploadRef}
            onChange={addImageToPost}
            hidden
          />
          <button
            disabled
            className="bg-blue-400 px-4 rounded-full py-1.5 text-white shadow-md font-bold hover:brightness-95 disabled:opacity-50"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Input;
