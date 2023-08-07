import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promisify } from "util";
import { getNewestFile } from "../utils/getNewestFile.mjs";

const readdir = promisify(fs.readdir);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, "..", "uploads");

export const getNewestXMLFile = async (req, res) => {
  try {
    const files = await readdir(uploadsDir);

    if (files.length === 0) {
      return res.status(404).send("No XML files found");
    }

    const newestFile = getNewestFile(files);
    const filePath = path.join(uploadsDir, newestFile);

    res.set("Content-Type", "text/xml");
    res.set("Content-Disposition", `attachment; filename="${newestFile}"`);
    res.sendFile(filePath);
  } catch (err) {
    console.error("Error reading directory:", err);
    return res.status(500).send("Internal Server Error");
  }
};
