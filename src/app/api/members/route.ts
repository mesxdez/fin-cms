import { NextResponse } from 'next/server'

// Mock data (จำลองสมาชิก)
let mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    note: 'Top member',
    labels: ['subscriber', 'vip'],
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    note: '',
    labels: ['free'],
    createdAt: new Date().toISOString()
  }
]

// GET /api/members
export async function GET() {
  return NextResponse.json(mockMembers)
}

// POST /api/members
export async function POST(req: Request) {
  const body = await req.json()
  const newMember = {
    ...body,
    id: Date.now().toString(), // mock id
    createdAt: new Date().toISOString()
  }
  mockMembers.push(newMember)
  return NextResponse.json(newMember, { status: 201 })
}
