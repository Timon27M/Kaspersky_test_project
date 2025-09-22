import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import { createBackup, restore } from "../controllers/backup";

const router = Router();

const BACKUP_PATH = path.join(__dirname, "../../backup");

if (!fs.existsSync(BACKUP_PATH)) {
  fs.mkdirSync(BACKUP_PATH);
}

router.get("/backup", createBackup);

router.post("/restore", restore);

export default router;