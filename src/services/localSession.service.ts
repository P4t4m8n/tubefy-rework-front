import LZString from "lz-string";
import CryptoJS from "crypto-js";
import { utilService } from "../util/util.util";
import { TSessionDataKeys } from "../models/app.model";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

const EXPIRATION_TIME = 1000 * 60 * 60 * 24; // 24 hours

export const storeSessionData = <T>(
  key: TSessionDataKeys,
  item?: T | T[]
): void => {
  // Remove the item from the session storage and return
  if (!item) {
    localStorage.removeItem(key);
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

  // Create an object that includes the encrypted data and the timestamp
  const dataToStore = {
    data: encryptedData,
    timestamp: new Date().getTime(),
  };

  localStorage.setItem(key, JSON.stringify(dataToStore));
};

export const getSessionData = <T>(key: TSessionDataKeys): T | null => {
  const storedItem = localStorage.getItem(key);
  if (!storedItem) return null;

  try {
    const parsedItem: { data: string; timestamp: number } =
      JSON.parse(storedItem);

    // Check if the data is expired, Remove and return null if expired
    const now = new Date().getTime();
    if (now - parsedItem.timestamp > EXPIRATION_TIME) {
      localStorage.removeItem(key);
      return null;
    }

    // Decrypt the data
    const bytes = CryptoJS.AES.decrypt(parsedItem.data, SECRET_KEY);
    const compressedData = bytes.toString(CryptoJS.enc.Utf8);

    // Decompress the data
    const jsonData = LZString.decompressFromUTF16(compressedData);

    return jsonData ? JSON.parse(jsonData) : null;
  } catch (error) {
    utilService.handleError("getSessionData", "GENERAL_ERROR", error as Error);
    return null;
  }
};


