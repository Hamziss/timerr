import { MongoClient } from "mongodb"

declare global {
	// eslint-disable-next-line vars-on-top, no-var
	var _mongoClientPromise: Promise<MongoClient>
}
