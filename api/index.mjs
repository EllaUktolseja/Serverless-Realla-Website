let databasePromise = null;

async function ensureDatabaseConnection() {
  if (!databasePromise) {
    const { connectDatabase } = await import("../apps/api/src/config/database.js");

    databasePromise = connectDatabase().catch((error) => {
      databasePromise = null;
      throw error;
    });
  }

  await databasePromise;
}

export default async function handler(req, res) {
  const [{ default: app }] = await Promise.all([
    import("../apps/api/src/app.js"),
    ensureDatabaseConnection(),
  ]);

  app(req, res);
}
