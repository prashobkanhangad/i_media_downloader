import { MongoClient, type Db } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  _mongoClient?: MongoClient;
  _mongoDb?: Db;
};

function getMongoUri(): string | null {
  return process.env.MONGODB_URI ?? null;
}

export function isMongoConfigured(): boolean {
  return Boolean(getMongoUri());
}

export async function getMongoClient(): Promise<MongoClient> {
  const uri = getMongoUri();

  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (!globalForMongo._mongoClient) {
    globalForMongo._mongoClient = new MongoClient(uri);
    await globalForMongo._mongoClient.connect();
  }

  return globalForMongo._mongoClient;
}

export async function getDatabase(): Promise<Db> {
  if (!globalForMongo._mongoDb) {
    const client = await getMongoClient();
    const dbName = process.env.MONGODB_DB_NAME ?? "instagram_downloader";
    globalForMongo._mongoDb = client.db(dbName);
  }

  return globalForMongo._mongoDb;
}

export async function closeMongoConnection(): Promise<void> {
  if (globalForMongo._mongoClient) {
    await globalForMongo._mongoClient.close();
    globalForMongo._mongoClient = undefined;
    globalForMongo._mongoDb = undefined;
  }
}
