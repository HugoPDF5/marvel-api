import { comicsProps } from "../types/comics";
import { api } from "./apiMarvel";
import MD5 from "crypto-js/md5";

export function useComics() {
  const baseUrl = "comics";
  const publicKey = import.meta.env.VITE_API_URL_PUBLIC_KEY;
  const privateKey = import.meta.env.VITE_API_URL_PRIVATE_KEY;
  const timestamp = new Date().getTime();
  const hash = MD5(timestamp + privateKey + publicKey).toString();

  const getAllComics = async (limit?: number) => {
    const url = `${baseUrl}?apikey=${publicKey}&ts=${timestamp}&hash=${hash}${limit ? `&limit=${limit}` : ""}`;
    const { data } = await api.get(url);
    return data.data.results;
  };

  return {
    getAllComics,
  };
}
