'use client';

import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Avatar, Typography, Box
} from '@mui/material';

const members = [
  {
    name: 'EP',
    email: 'wijitraprr@gmail.com',
    status: 'Free',
    openRate: 'N/A',
    location: 'Unknown',
    created: '22 Jun 2025',
  },
];

const MemberTable = () => (
  <Box sx={{ border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Open Rate</TableCell>
          <TableCell>Location</TableCell>
          <TableCell>Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {members.map((m, i) => (
          <TableRow key={i}>
            <TableCell><Avatar>{m.name[0]}</Avatar></TableCell>
            <TableCell>
              <Typography fontWeight={500}>{m.name}</Typography>
              <Typography variant="body2" color="text.secondary">{m.email}</Typography>
            </TableCell>
            <TableCell>{m.status}</TableCell>
            <TableCell>{m.openRate}</TableCell>
            <TableCell>{m.location}</TableCell>
            <TableCell>{m.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default MemberTable;
