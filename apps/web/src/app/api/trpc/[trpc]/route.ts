import { createContext } from "@test-deploy/api/context";
import { appRouter } from "@test-deploy/api/routers/index";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

function handler(req: Request) {
	return fetchRequestHandler({
		endpoint: "/api/trpc",
		req,
		router: appRouter,
		createContext: () => createContext(req),
	});
}
export { handler as GET, handler as POST };
