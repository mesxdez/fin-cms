import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search")?.toLowerCase() || "";

    let query = supabase.from("tags").select("*", { count: "exact" });

    // Filter by search term
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    // Get total count first
    const { count } = await query;

    // Get paginated data
    const { data, error } = await query
      .order("createdDate", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to fetch tags" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch tags" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, color = "#1976d2" } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Tag name is required" },
        { status: 400 }
      );
    }

    // Check if tag already exists
    const { data: existingTag } = await supabase
      .from("tags")
      .select("id")
      .eq("name", name)
      .single();

    if (existingTag) {
      return NextResponse.json(
        { error: "Tag already exists" },
        { status: 409 }
      );
    }

    const { data, error } = await supabase
      .from("tags")
      .insert({
        name,
        color,
        createdDate: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create tag" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Tag created successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tag:", error);
    return NextResponse.json(
      { error: "Failed to create tag" },
      { status: 500 }
    );
  }
}
