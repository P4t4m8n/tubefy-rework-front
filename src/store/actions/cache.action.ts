import { TItem } from "../../models/cache.model";
import { AppDispatch } from "../store";

export const setCache = (query: string, data: TItem[]) => ({
  type: "SET_CACHE",
  payload: { query, data },
});

export const fetchDataThunk =
  (query: string) => async (dispatch: AppDispatch, getState: any) => {
    const { cache, timestamps } = getState().cache;

    const twentyFourHours = 24 * 60 * 60 * 1000; 
    const currentTime = Date.now();

    // Check if the data for the specific query is in the cache and still valid
    if (cache[query] && currentTime - timestamps[query] < twentyFourHours) {
      return cache[query]; 
    }

    // Fetch fresh data if not in cache or if cache is expired
    const response = await fetch(
      `/api/data?query=${encodeURIComponent(query)}`
    );
    const data: TItem[] = await response.json();

    dispatch(setCache(query, data));

    return data;
  };
