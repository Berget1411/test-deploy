import { neon, neonConfig } from "@neondatabase/serverless";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

// To work in edge environments (Cloudflare Workers, Vercel Edge, etc.), enable querying over fetch
// neonConfig.poolQueryViaFetch = true

let _db: NeonHttpDatabase | null = null;

export const db = new Proxy({} as NeonHttpDatabase, {
	get(target, prop) {
		if (!_db) {
			if (!process.env.DATABASE_URL) {
				throw new Error("DATABASE_URL environment variable is not set");
			}
			const sql = neon(process.env.DATABASE_URL);
			_db = drizzle(sql);
		}
		return Reflect.get(_db, prop);
	},
});
