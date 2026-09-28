import type { Request, Response } from "express";

import app from "../apps/api/src/app.js";
import { connectDatabase } from "../apps/api/src/config/database.js";

let databasePromise: Promise<void> | null = null;

function needsDatabase(pathname: string): boolean {
  return !(
    pathname === "/api/v1/health" ||
    pathname === "/api/v1/health/live"
  );
}

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
  const pathname = new URL(req.url ?? "/", "https://vercel.local").pathname;

  if (needsDatabase(pathname)) {
    await ensureDatabaseConnection();
  }

  app(req, res);
}
