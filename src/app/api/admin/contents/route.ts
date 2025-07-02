import { NextRequest, NextResponse } from "next/server";

// Mock content data
let contents = [
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

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === "Bearer jwt_token_here";
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const status = searchParams.get("status");

  let filtered = contents;
  if (status) {
    filtered = filtered.filter((c) => c.status === status);
  }
  const total = filtered.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const data = filtered.slice(start, end);

  return NextResponse.json({
    data,
    meta: {
      page,
      limit,
      total,
    },
  });
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const newId = contents.length
    ? Math.max(...contents.map((c) => c.id)) + 1
    : 1;
  const newContent = {
    id: newId,
    ...body,
    createdBy: "Admin",
    createdDate: new Date().toISOString().slice(0, 10),
    updatedBy: "Admin",
    updatedDate: new Date().toISOString().slice(0, 10),
  };
  contents.push(newContent);
  return NextResponse.json(newContent, { status: 201 });
}
