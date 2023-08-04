import * as express from "express";
import cors from 'cors';
import { getNewestXMLFile } from "./controllers/xml.controller.mjs";
import { scheduleJob } from "node-schedule";
import { DailyLoader } from "./utils/dailyLoader.mjs";

const app = express.default();
const port = 3000;



app.use(cors());
app.get('/feed', getNewestXMLFile);

scheduleJob('* * * * *', DailyLoader);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});