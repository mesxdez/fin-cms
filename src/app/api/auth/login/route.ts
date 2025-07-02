import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  // Mock authentication logic
  if (username === "admin" && password === "password123") {
    return NextResponse.json({
      accessToken: "jwt_token_here",
      expiresIn: 3600,
    });
  }

  return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
}
