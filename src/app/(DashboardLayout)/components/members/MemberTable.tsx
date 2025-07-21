'use client';

import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Avatar, Typography, Box, CircularProgress
} from '@mui/material';
import { useEffect, useState } from 'react';

type Member = {
  id: string;
  name: string;
  email: string;
  role?: string;
  status?: string;
  // ลบ openRate, location, createdAt ออก
};

const MemberTable = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch('/api/members');
        if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
        const data = await res.json();
        setMembers(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center', color: 'red' }}>
        <Typography>Error loading members: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Status</TableCell>
            {/* ลบ TableCell ของ Open Rate, Location, Created ออก */}
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((m) => (
            <TableRow key={m.id}>
              <TableCell>
                <Avatar>{m.name?.charAt(0).toUpperCase() ?? '-'}</Avatar>
              </TableCell>
              <TableCell>
                <Typography fontWeight={500}>{m.name}</Typography>
                <Typography variant="body2" color="text.secondary">{m.email}</Typography>
              </TableCell>
              <TableCell>{m.role ?? 'Member'}</TableCell>
              <TableCell>{m.status ?? 'Free'}</TableCell>
              {/* ลบ cell ของ openRate, location, createdAt ออก */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default MemberTable;
