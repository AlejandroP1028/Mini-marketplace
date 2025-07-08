import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";
/**
 * Uploads an image file to Supabase storage and returns the public URL.
 *
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} - The public URL of the uploaded image.
 * @throws {Error} - If the file type is not allowed or if the file size exceeds the limit.
 */
export const uploadImage = async (file: File) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 5 * 1024 * 1024; // 5MB

  if (!allowedTypes.includes(file.type)) {
    throw new Error("Only JPG, PNG, and WEBP images are allowed.");
  }

  if (file.size > maxSize) {
    throw new Error("File size exceeds 5MB limit.");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `uploads/${fileName}`;

  const { error } = await supabase.storage
    .from("listing-images") // or your bucket name
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from("listing-images")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
};
