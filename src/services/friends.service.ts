import { IFriend, IFriendFilter } from "../models/friend.model";
import { httpService } from "./http.service";

const BASE_URL = "friend/";

const query = async (filterBy: IFriendFilter): Promise<IFriend[]> => {
  return await httpService.get<IFriend[]>(BASE_URL, filterBy);
};

const get = async (id: string): Promise<IFriend> => {
  return await httpService.get<IFriend>(`${BASE_URL}${id}`);
};

const create = async (friendId: string): Promise<IFriend> => {
  return await httpService.post<IFriend>(BASE_URL, { friendId });
};

const update = async (friend: IFriend): Promise<IFriend> => {
  return await httpService.put<IFriend>(`${BASE_URL}${friend.id}`, friend);
};

const remove = async (id: string, friendId: string): Promise<boolean> => {
  return await httpService.delete<boolean>(`${BASE_URL}${id}`, { friendId });
};

export const friendsService = {
  query,
  get,
  create,
  update,
  remove,
};