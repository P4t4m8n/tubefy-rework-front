import { httpService } from "./http.service";

export const uploadImg = async (file: Blob): Promise<string> => {
  const CLOUD_NAME = import.meta.env.VITE_PUBLIC_CLOUD_NAME!;
  const UPLOAD_PRESET = import.meta.env.VITE_PUBLIC_UPLOAD_PRESET!;
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  try {
    const formData = new FormData();
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("file", file);

    const res = await httpService.post<{ secure_url: string }>(
      UPLOAD_URL,
      formData
    );
    const { secure_url: imgUrl } = res;
    return imgUrl;
  } catch (err) {
    throw new Error(`Failed to upload image to cloudinary: ${err}`);
  }
};
