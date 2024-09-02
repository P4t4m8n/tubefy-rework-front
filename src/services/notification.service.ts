import { httpService } from "./http.service";

const remove = async (id: string): Promise<void> => {
  return httpService.delete(`notification/${id}`);
};

export const notificationService = {
  remove,
};
