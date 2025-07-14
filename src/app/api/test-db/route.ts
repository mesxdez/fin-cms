import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    // Test Supabase connection
    const { data: testData, error: testError } = await supabase
      .from("contents")
      .select("count", { count: "exact", head: true });

    if (testError) {
      return NextResponse.json(
        {
          status: "error",
          message: "Supabase connection failed",
          error: testError.message,
        },
        { status: 500 }
      );
    }

    // Get counts
    const { count: contentCount } = await supabase
      .from("contents")
      .select("*", { count: "exact", head: true });

    const { count: userCount } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    return NextResponse.json({
      status: "success",
      message: "Supabase connection successful",
      data: {
        contentsCount: contentCount || 0,
        usersCount: userCount || 0,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Supabase test error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Supabase test failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { action } = await req.json();

    switch (action) {
      case "seed":
        // Seed some sample data
        await seedSampleData();
        return NextResponse.json({
          status: "success",
          message: "Sample data seeded successfully",
        });

      case "reset":
        // Reset database (clear all data)
        await resetDatabase();
        return NextResponse.json({
          status: "success",
          message: "Database reset successfully",
        });

      default:
        return NextResponse.json(
          {
            status: "error",
            message: 'Invalid action. Use "seed" or "reset"',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Database action error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Database action failed",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

async function seedSampleData() {
  // Seed users
  await supabase.from("users").upsert(
    [
      {
        username: "admin",
        password:
          "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        email: "admin@example.com",
        role: "admin",
        createdDate: new Date().toISOString(),
      },
      {
        username: "editor",
        password:
          "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        email: "editor@example.com",
        role: "editor",
        createdDate: new Date().toISOString(),
      },
      {
        username: "viewer",
        password:
          "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
        email: "viewer@example.com",
        role: "viewer",
        createdDate: new Date().toISOString(),
      },
    ],
    { onConflict: "username" }
  );

  // Seed categories
  await supabase.from("categories").upsert(
    [
      {
        name: "Technology",
        description: "Technology related content",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
      {
        name: "Design",
        description: "Design and UI/UX content",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
      {
        name: "Marketing",
        description: "Marketing and business content",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
      {
        name: "Tutorials",
        description: "How-to guides and tutorials",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
    ],
    { onConflict: "name" }
  );

  // Seed tags
  await supabase.from("tags").upsert(
    [
      {
        name: "React",
        color: "#61dafb",
        createdDate: new Date().toISOString(),
      },
      {
        name: "Next.js",
        color: "#000000",
        createdDate: new Date().toISOString(),
      },
      {
        name: "Design",
        color: "#4caf50",
        createdDate: new Date().toISOString(),
      },
      {
        name: "Tutorial",
        color: "#ff9800",
        createdDate: new Date().toISOString(),
      },
      {
        name: "Tips",
        color: "#2196f3",
        createdDate: new Date().toISOString(),
      },
    ],
    { onConflict: "name" }
  );

  // Seed contents
  await supabase.from("contents").upsert(
    [
      {
        title: "Getting Started with React",
        textHtml: "<p>Learn the basics of React development...</p>",
        banner: "/images/products/s4.jpg",
        createdBy: "admin",
        status: "Published",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
      {
        title: "Draft Article",
        textHtml: "<p>This is a draft...</p>",
        banner: "/images/products/s5.jpg",
        createdBy: "editor",
        status: "Draft",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
      {
        title: "Scheduled Post",
        textHtml: "<p>This will be published later...</p>",
        banner: "/images/products/s7.jpg",
        createdBy: "admin",
        status: "Scheduled",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
      {
        title: "Another Draft",
        textHtml: "<p>Another draft content...</p>",
        banner: "/images/products/s11.jpg",
        createdBy: "editor",
        status: "Draft",
        createdDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      },
    ],
    { onConflict: "id" }
  );
}

async function resetDatabase() {
  // Clear all data (in reverse order due to foreign keys)
  await supabase.from("content_tags").delete().neq("contentId", 0);
  await supabase.from("content_categories").delete().neq("contentId", 0);
  await supabase.from("contents").delete().neq("id", 0);
  await supabase.from("categories").delete().neq("id", 0);
  await supabase.from("tags").delete().neq("id", 0);
  await supabase.from("users").delete().neq("id", 0);
}
