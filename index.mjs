import * as express from "express";
import cors from "cors";
import { getNewestXMLFile } from "./controllers/xml.controller.mjs";
import { scheduleJob } from "node-schedule";
import { DailyLoader } from "./utils/dailyLoader.mjs";
import { updatesFromPoster } from "./controllers/updates.controller.mjs";

const app = express.default();
const port = 8088;

const clientSecret = "e87cc234e3ec594cacfebb0aacf138fe";

app.use(cors());
app.use(express.json());
app.get("/feed", getNewestXMLFile);
app.post("/hook", updatesFromPoster);

scheduleJob("55 15 * * *", DailyLoader);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
