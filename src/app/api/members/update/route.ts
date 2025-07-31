import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, role, labels, note, newsletter, userId } =
      body;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Prepare update data
    const updateData: any = {
      username: name,
      email,
      role,
      labels: labels || [],
      note,
      newsletter,
      updatedDate: new Date().toISOString(),
    };

    // Only include password if provided
    if (password) {
      // In a real app, you'd hash the password here
      updateData.password = password;
    }

    // Update the user in the database
    const { data, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", userId)
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
