// import {
//   getDownloadURL,
//   ref,
//   storage,
//   uploadBytesResumable,
// } from "../../src/Utils/config.jsx";

// export default function useUploadImage(img, fileName) {
//   console.log("img", img);
//   return new Promise((resolve, reject) => {
//     //const fileName = img.name;
//     const storageRef = ref(storage, `posts/${fileName}`);
//     const uploadTask = uploadBytesResumable(storageRef, img);
//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log("Upload is " + progress + "% done");

//         switch (snapshot.state) {
//           case "paused":
//             console.log("Upload is paused");
//             break;
//           case "running":
//             console.log("Upload is running");
//             break;
//         }
//       },
//       (error) => {
//         reject(error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//           resolve(downloadURL);
//         });
//       }
//     );
//   });
// }
import axios from "axios";

export default async function useUploadImage(img) {
  // Cloudinary Details (Jo aapne batayi hain)
  const cloudName = "sameerdev";
  const uploadPreset = "my_preset_123"; // Agar aapne preset ka naam badla hai toh wo likhein

  const formData = new FormData();
  formData.append("file", img);
  formData.append("upload_preset", uploadPreset);

  try {
    console.log("Uploading to Cloudinary...");
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );
    
    console.log("Upload Success:", response.data.secure_url);
    return response.data.secure_url; // Yeh aapko final image URL dega
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
}