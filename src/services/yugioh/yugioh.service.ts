import { api } from "../api";
import { IGetAllCardsResponse } from "./types";

const YugiohServices = {
  getAllCards: async (
    num: number,
    offset: number
  ): Promise<IGetAllCardsResponse> => {
    const { data } = await api.get<IGetAllCardsResponse>(
      `/cardinfo.php?num=${num}&offset=${offset}`
    );
    return data;
  },
};

export { YugiohServices };
