import { NextResponse } from 'next/server';

let tags: any[] = [
  { id: '1', name: 'Design', slug: 'design', color: '#4CAF50', description: 'UI & Design topics' }
];

// GET /api/tags
export async function GET() {
  return NextResponse.json(tags);
}

// POST /api/tags
export async function POST(req: Request) {
  const body = await req.json();
  const newTag = {
    id: Date.now().toString(),
    ...body,
  };
  tags.push(newTag);
  return NextResponse.json(newTag, { status: 201 });
}
