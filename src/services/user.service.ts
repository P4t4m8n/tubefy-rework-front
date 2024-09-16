import { IUser, IUserDTO, IUserFilter, IUserSmall } from "../models/user.model";
import { httpService } from "./http.service";

const BASE_URL = "user/";

const query = async (filterBy: IUserFilter): Promise<IUserSmall[]> => {
  return await httpService.get<IUserSmall[]>(BASE_URL, filterBy);
};

const update = async (user: IUserDTO): Promise<IUser> => {
  return await httpService.put<IUser>(BASE_URL + user.id, user);
};

export const userService = {
  query,
  update,
};
