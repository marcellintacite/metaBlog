import { getServerSession } from "next-auth";
import { authOptions } from "@/app/libs/authAuptions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);

  return NextResponse.json({
    authenticated: session !== null,
    session,
  });
}
