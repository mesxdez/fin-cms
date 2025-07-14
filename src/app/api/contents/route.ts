import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search")?.toLowerCase() || "";
    const status = searchParams.get("status") || "";

    let query = supabase.from("contents").select("*", { count: "exact" });

    // Filter by status if provided
    if (status) {
      query = query.eq("status", status);
    }

    // Filter by search term
    if (search) {
      query = query.or(`title.ilike.%${search}%,textHtml.ilike.%${search}%`);
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
        { error: "Failed to fetch contents" },
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
    console.error("Error fetching contents:", error);
    return NextResponse.json(
      { error: "Failed to fetch contents" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      textHtml,
      banner,
      createdBy,
      status = "Draft",
    } = await req.json();

    if (!title || !textHtml || !createdBy) {
      return NextResponse.json(
        { error: "Title, content, and author are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("contents")
      .insert({
        title,
        textHtml,
        banner,
        createdBy,
        status,
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create content" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Content created successfully",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating content:", error);
    return NextResponse.json(
      { error: "Failed to create content" },
      { status: 500 }
    );
  }
}
