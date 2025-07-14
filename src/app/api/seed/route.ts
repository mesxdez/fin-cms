import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    // Add admin user
    const { data, error } = await supabase
      .from("users")
      .insert({
        username: "admin",
        password:
          "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        email: "admin@example.com",
        role: "admin",
        createdDate: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create admin user" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Admin user created successfully",
      data: { username: data.username, email: data.email, role: data.role },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
}
