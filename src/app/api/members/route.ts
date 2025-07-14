import { NextResponse } from 'next/server'

const mockMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    note: 'Top member in July campaign',
    labels: ['subscriber', 'vip'],
    newsletter: true,
    role: 'Admin',
    createdAt: new Date().toISOString(),
    status: 'Active',
    openRate: '68%',
    location: 'Bangkok, TH',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    note: 'Joined from webinar',
    labels: ['free'],
    newsletter: false,
    role: 'Member',
    createdAt: new Date().toISOString(),
    status: 'Free',
    openRate: '25%',
    location: 'Chiang Mai, TH',
  },
  {
    id: '3',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    note: '',
    labels: ['editor', 'newsletter'],
    newsletter: true,
    role: 'Editor',
    createdAt: new Date().toISOString(),
    status: 'Active',
    openRate: '52%',
    location: 'Singapore',
  },
  {
    id: '4',
    name: 'Michael Lee',
    email: 'michael@example.com',
    note: 'Contacted support for integration',
    labels: [],
    newsletter: false,
    role: 'Member',
    createdAt: new Date().toISOString(),
    status: 'Free',
    openRate: 'N/A',
    location: 'Unknown',
  }
];

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
