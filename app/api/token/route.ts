import { headers } from "next/headers";
import { SignJWT } from "jose";
import { auth } from "@/lib/auth";

export async function GET() {
  const secretValue = process.env.JWT_SECRET;
  if (!secretValue) {
    return Response.json(
      { message: "Server is not configured" },
      { status: 500 }
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = await new SignJWT({
    email: session.user.email,
    name: session.user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.user.id)
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(secretValue));

  return Response.json({ token });
}