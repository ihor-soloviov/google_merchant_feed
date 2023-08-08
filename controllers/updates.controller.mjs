import { DailyLoader } from "../utils/dailyLoader.mjs";

export const updatesFromPoster = async (req, res) => {
  DailyLoader();
  res.sendStatus(200);
};
