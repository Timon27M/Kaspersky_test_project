import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import User from "../models/user"; 

const BACKUP_PATH = path.join(__dirname, "../../backup");

export const createBackup = async (req: Request, res: Response) => {
  try {
    const users = await User.find({});
    const filePath = path.join(BACKUP_PATH, "users-backup.json");

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");

    return res.download(filePath); // отдаем файл клиенту
  } catch (err) {
    console.error("Ошибка экспорта:", err);
    return res.status(500).json({ message: "Ошибка при создании бэкапа" });
  }
}

export const restore = async (req: Request, res: Response) => {
  try {
    const filePath = path.join(BACKUP_PATH, "users-backup.json");

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Файл бэкапа не найден" });
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    await User.deleteMany({}); // очищаем коллекцию (опционально)
    await User.insertMany(users);

    return res.json({ message: "Коллекция users восстановлена из бэкапа" });
  } catch (err) {
    console.error("Ошибка восстановления:", err);
    return res.status(500).json({ message: "Ошибка при восстановлении" });
  }
}