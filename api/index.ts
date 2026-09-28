import type { Request, Response } from "express";

import app from "../apps/api/src/app.js";
import { connectDatabase } from "../apps/api/src/config/database.js";

let databasePromise: Promise<void> | null = null;

async function ensureDatabaseConnection(): Promise<void> {
  if (!databasePromise) {
    databasePromise = connectDatabase().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  await databasePromise;
}

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  await ensureDatabaseConnection();
  app(req, res);
}
