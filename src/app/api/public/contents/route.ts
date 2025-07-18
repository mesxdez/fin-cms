import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search")?.toLowerCase() || "";

    let query = supabase.from("contents").select("*", { count: "exact" });

    // Only published content
    query = query.eq("status", "Published");

    // Filter by search term
    if (search) {
      query = query.or(`title.ilike.%${search}%,textHtml.ilike.%${search}%`);
    }

    // Get total count first
    const { count } = await query;

    // Get paginated data
    const { data, error } = await query
      .order("createddate", { ascending: false })
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
