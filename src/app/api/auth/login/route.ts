import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import crypto from "crypto";

// Simple password hashing function (in production, use bcrypt)
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();
    console.log("🚀 ~ POST ~ username:", username);
    console.log("🚀 ~ POST ~ password:", password);
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Hash the provided password
    const hashedPassword = hashPassword(password);

    // Check user credentials
    const { data, error } = await supabase
      .from("users")
      .select("id, username, email, role")
      .eq("username", username)
      .eq("password", password);

    console.log("🚀 ~ POST ~ data:", data);
    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Generate a simple token (in production, use JWT)
    const token = crypto.randomBytes(32).toString("hex");

    return NextResponse.json({
      accessToken: token,
      expiresIn: 3600,
      user: {
        username: username,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// Register new user
export async function PUT(req: NextRequest) {
  try {
    const { username, password, email, role = "viewer" } = await req.json();

    if (!username || !password || !email) {
      return NextResponse.json(
        { error: "Username, password, and email are required" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`username.eq.${username},email.eq.${email}`)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = hashPassword(password);

    // Create new user
    const { data, error } = await supabase
      .from("users")
      .insert({
        username,
        password: hashedPassword,
        email,
        role,
        createdDate: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Registration failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
