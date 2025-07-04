import { NextResponse } from "next/server";

let categories = [
  { id: "1", name: "Design", slug: "design", color: "#4CAF50" },
  { id: "2", name: "Marketing", slug: "marketing", color: "#2196F3" },
];

// GET /api/categories/:id
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const category = categories.find((c) => c.id === id);
  if (!category)
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

// PUT /api/categories/:id
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  const data = await req.json();
  categories[index] = { ...categories[index], ...data };
  return NextResponse.json(categories[index]);
}

// DELETE /api/categories/:id
export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  const removed = categories.splice(index, 1);
  return NextResponse.json(removed[0]);
}
