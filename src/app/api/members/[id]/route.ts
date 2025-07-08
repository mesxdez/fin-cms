// app/api/members/route.ts
import { NextResponse } from 'next/server';

// mock store (ชั่วคราว)
let mockMembers: any[] = [];

export async function POST(req: Request) {
  const body = await req.json();

  const newMember = {
    id: Date.now().toString(),
    name: body.name,
    email: body.email,
    labels: body.labels?.split(',').map((l: string) => l.trim()) || [],
    note: body.note || '',
    newsletter: body.newsletter ?? true,
    createdAt: new Date().toISOString()
  };

  mockMembers.push(newMember);

  return NextResponse.json(newMember, { status: 201 });
}
