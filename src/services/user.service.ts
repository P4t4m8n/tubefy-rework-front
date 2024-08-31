import { IUserFilter, IUserSmall } from "../models/user.model";
import { httpService } from "./http.service";

const BASE_URL = "user/";

const query = async (filterBy: IUserFilter): Promise<IUserSmall[]> => {
  return await httpService.get<IUserSmall[]>(BASE_URL, filterBy);
};

export const userService = {
  query,
};
