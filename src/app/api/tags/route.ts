import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase"; // อย่าลืมสร้างไฟล์นี้

// GET: fetch tags with optional pagination & search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search")?.toLowerCase() || "";

    let query = supabase.from("tags");

    // filter by search
    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    // total count
    const { count, error: countError } = await query
      .select("*", { count: "exact", head: true });

    if (countError) {
      console.error("❌ Count error:", countError.message || countError);
      return NextResponse.json({ error: "Count failed" }, { status: 500 });
    }

    // fetch data
    const { data, error } = await query
      .select("*")
      .order("createddate", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    if (error) {
      console.error("❌ Supabase fetch error:", error.message || error);
      return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
    }

    return NextResponse.json({
      data: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error: any) {
    console.error("❌ GET error:", error.message || error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

// POST: create new tag
export async function POST(req: NextRequest) {
  try {
    const {
      name,
      slug,
      color = "#1976d2",
      description,
      metaTitle,
      metaDesc,
      canonicalUrl,
      xTitle,
      xDesc,
      fbTitle,
      fbDesc,
      tagHeader,
      tagFooter,
    } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ error: "Missing name or slug" }, { status: 400 });
    }

    // check duplicate
    const { data: existingTag, error: checkError } = await supabase
      .from("tags")
      .select("id")
      .or(`name.eq.${name},slug.eq.${slug}`)
      .maybeSingle();

    if (checkError) {
      console.error("❌ Check error:", checkError.message || checkError);
      return NextResponse.json({ error: "Failed to check existing tag" }, { status: 500 });
    }

    if (existingTag) {
      return NextResponse.json({ error: "Tag already exists" }, { status: 409 });
    }

    const { data, error } = await supabase
      .from("tags")
      .insert([{
        name,
        slug,
        color,
        description,
        meta_title: metaTitle,
        meta_description: metaDesc,
        canonical_url: canonicalUrl,
        x_title: xTitle,
        x_description: xDesc,
        fb_title: fbTitle,
        fb_description: fbDesc,
        tag_header: tagHeader,
        tag_footer: tagFooter,
        createddate: new Date().toISOString(), // ✅ ต้องมีในตาราง
      }])
      .select()
      .single();

    if (error) {
      console.error("❌ Insert error:", error.message || error);
      return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Tag created successfully", data },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ POST error:", error.message || error);
    return NextResponse.json({ error: "Failed to create tag" }, { status: 500 });
  }
}
