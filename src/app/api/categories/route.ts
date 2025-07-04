import { NextResponse } from 'next/server';

let categories = [
  { id: '1', name: 'Design', slug: 'design', color: '#4CAF50' },
  { id: '2', name: 'Marketing', slug: 'marketing', color: '#2196F3' }
];

// GET /api/categories
export async function GET() {
  return NextResponse.json(categories);
}

// POST /api/categories
export async function POST(req: Request) {
  const body = await req.json();
  const newCategory = {
    id: Date.now().toString(),
    name: body.name,
    slug: body.slug,
    color: body.color,
    description: body.description || ''
  };
  categories.push(newCategory);
  return NextResponse.json(newCategory, { status: 201 });
}
