// fileUtils.js
import axios from "axios";
import { toast } from "react-toastify";
import { Zoom } from "react-toastify";

const handleFileChange = async (files, handleFieldChange) => {
  const data = new FormData();
  for (let i = 0; i < files.length; i++) {
    data.append("photos", files[i]);
  }

  try {
    const uploadPromise = axios.post("/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.promise(
      uploadPromise,
      {
        pending: "Uploading images...",
        success: "Images uploaded successfully!",
        error: "Upload failed. Please try to upload images less than 350kb.",
      },
      { position: "top-center", theme: "dark", transition: Zoom }
    );
    const response = await uploadPromise;
    handleFieldChange("images", response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export default handleFileChange;
