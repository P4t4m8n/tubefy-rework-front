import LZString from "lz-string";
import CryptoJS from "crypto-js";
import { utilService } from "../util/util.util";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const storeSessionData = <T>(
  key:
    | "user"
    | "playlists"
    | "likedPlaylist"
    | "friends"
    | "friendRequests"
    | "chats"
    | "notifications",
  item?: T | T[]
): void => {
  // Remove the item from the session storage and return
  if (!item) {
    sessionStorage.removeItem(key);
    return;
  }

  // Compress the data
  const jsonData = JSON.stringify(item);
  const compressedData = LZString.compressToUTF16(jsonData);

  // Encrypt the data
  const encryptedData = CryptoJS.AES.encrypt(
    compressedData,
    SECRET_KEY
  ).toString();

  sessionStorage.setItem(key, encryptedData);
};

export const getSessionData = <T>(key: string): T | null => {
  const encryptedData = sessionStorage.getItem(key);
  if (!encryptedData) return null;

  try {
    // Decrypt the data
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
    const compressedData = bytes.toString(CryptoJS.enc.Utf8);

    // Decompress the data
    const jsonData = LZString.decompressFromUTF16(compressedData);

    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    utilService.handleError("getSessionData", "GENERAL_ERROR", error as Error);
    return null;
  }
};
