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

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id, 10);
  const content = contents.find(
    (c: any) => c.id === id && c.status === "Published"
  );
  if (!content) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(content);
}
