import { NextRequest, NextResponse } from "next/server";

// Use the same global mock content data
let globalAny = global as any;
globalAny.contents = globalAny.contents || [
  {
    id: 1,
    title: "Getting Started with React",
    textHtml: "<p>Learn the basics of React development...</p>",
    banner: "/images/products/s4.jpg",
    createdBy: "John Doe",
    createdDate: "2023-09-14",
    updatedBy: "John Doe",
    updatedDate: "2023-09-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Draft Article",
    textHtml: "<p>This is a draft...</p>",
    banner: "/images/products/s5.jpg",
    createdBy: "Jane Smith",
    createdDate: "2023-09-16",
    updatedBy: "Jane Smith",
    updatedDate: "2023-09-17",
    status: "Draft",
  },
];
const contents: any[] = globalAny.contents;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";

  let filtered = contents.filter((c: any) => c.status === "Published");
  if (search) {
    filtered = filtered.filter(
      (c: any) =>
        c.title.toLowerCase().includes(search) ||
        c.textHtml.toLowerCase().includes(search)
    );
  }
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);
  return NextResponse.json(data);
}
