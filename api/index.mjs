let databasePromise = null;

async function ensureDatabaseConnection() {
  if (!databasePromise) {
    const { connectDatabase } = await import("../apps/api/dist/config/database.js");

    databasePromise = connectDatabase().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  await databasePromise;
}

export default async function handler(req, res) {
  const [{ default: app }] = await Promise.all([
    import("../apps/api/dist/app.js"),
    ensureDatabaseConnection(),
  ]);

  return app(req, res);
}
