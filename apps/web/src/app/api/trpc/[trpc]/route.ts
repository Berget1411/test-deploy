import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@test-deploy/api/routers/index";
import { createContext } from "@test-deploy/api/context";
import { NextRequest } from "next/server";

function handler(req: NextRequest) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
	});
}
export { handler as GET, handler as POST };
