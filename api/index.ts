import type { Request, Response } from "express";

let databasePromise: Promise<void> | null = null;

async function ensureDatabaseConnection(): Promise<void> {
  if (!databasePromise) {
    const { connectDatabase } = await import("../apps/api/src/config/database.js");

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
  const [{ default: app }] = await Promise.all([
    import("../apps/api/src/app.js"),
    ensureDatabaseConnection(),
  ]);

  app(req, res);
}
