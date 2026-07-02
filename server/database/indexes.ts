import {
  ANALYTICS_COLLECTIONS,
  ANALYTICS_INDEXES,
} from "@/server/database/collections";
import { getDatabase, isMongoConfigured } from "@/server/database/mongodb";

let indexesEnsured = false;

export async function ensureAnalyticsIndexes(): Promise<void> {
  if (!isMongoConfigured() || indexesEnsured) return;

  const db = await getDatabase();
  const collection = db.collection(ANALYTICS_COLLECTIONS.EVENTS);

  for (const index of ANALYTICS_INDEXES.EVENTS) {
    await collection.createIndex(index.key);
  }

  indexesEnsured = true;
}
