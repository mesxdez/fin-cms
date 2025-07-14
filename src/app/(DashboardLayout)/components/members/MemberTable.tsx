'use client';

import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Avatar, Typography, Box
} from '@mui/material';
import { useEffect, useState } from 'react';

type Member = {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  openRate?: string;
  location?: string;
  createdAt?: string;
};

const MemberTable = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch('/api/members');
      const data = await res.json();
      setMembers(data);
    };
    fetchMembers();
  }, []);

  return (
    <Box sx={{ border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Open Rate</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell><Avatar>{m.name?.[0] ?? '-'}</Avatar></TableCell>
              <TableCell>
                <Typography fontWeight={500}>{m.name}</Typography>
                <Typography variant="body2" color="text.secondary">{m.email}</Typography>
              </TableCell>
              <TableCell>{m.role ?? 'Member'}</TableCell>
              <TableCell>{m.status ?? 'Free'}</TableCell>
              <TableCell>{m.openRate ?? 'N/A'}</TableCell>
              <TableCell>{m.location ?? 'Unknown'}</TableCell>
              <TableCell>
                {m.createdAt
                  ? new Date(m.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })
                  : '-'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MemberTable;
