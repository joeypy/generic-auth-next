import { auth } from "@/shared/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";

const authHandlers = toNextJsHandler(auth);

export const { GET } = authHandlers;

export async function POST(request: Request) {
  return authHandlers.POST(request);
}
