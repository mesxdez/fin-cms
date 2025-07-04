import { NextRequest, NextResponse } from "next/server";

// Use a global variable for mock content data (simulate shared state)
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

function checkAuth(req: NextRequest) {
  const auth = req.headers.get("authorization");
  return auth === "Bearer jwt_token_here";
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const contentId = parseInt(id, 10);
  const content = contents.find((c: any) => c.id === contentId);
  if (!content) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const contentId = parseInt(id, 10);
  const idx = contents.findIndex((c: any) => c.id === contentId);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  const body = await req.json();
  contents[idx] = {
    ...contents[idx],
    ...body,
    updatedBy: "Admin",
    updatedDate: new Date().toISOString().slice(0, 10),
  };
  return NextResponse.json(contents[idx]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const contentId = parseInt(id, 10);
  const idx = contents.findIndex((c: any) => c.id === contentId);
  if (idx === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  contents.splice(idx, 1);
  return NextResponse.json({ message: "Deleted" });
}
