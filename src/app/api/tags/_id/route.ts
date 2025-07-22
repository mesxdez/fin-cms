import { NextResponse } from "next/server";

let tags: any[] = [
  {
    id: "1",
    name: "Design",
    slug: "design",
    color: "#4CAF50",
    description: "UI & Design topics",
  },
];

// GET /api/tags/:id
export async function GET(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const tag = tags.find((t) => t.id === id);
  if (!tag)
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });
  return NextResponse.json(tag);
}

// PUT /api/tags/:id
export async function PUT(req: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const index = tags.findIndex((t) => t.id === id);
  if (index === -1)
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });

  const data = await req.json();
  tags[index] = { ...tags[index], ...data };
  return NextResponse.json(tags[index]);
}

// DELETE /api/tags/:id
export async function DELETE(_: Request, context: { params: { id: string } }) {
  const { id } = context.params;
  const index = tags.findIndex((t) => t.id === id);
  if (index === -1)
    return NextResponse.json({ message: "Tag not found" }, { status: 404 });

  const removed = tags.splice(index, 1);
  return NextResponse.json(removed[0]);
}
