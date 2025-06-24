'use client';

import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Typography, Box
} from '@mui/material';

const tags = [
  {
    name: 'Trading',
    description: 'Content about trading strategies and tips',
    slug : 'trading',
    postCount: 12,
    created: '10 Jun 2025',
  },
  {
    name: 'Crypto',
    description: 'News and updates on cryptocurrencies',
    slug : 'crypto',
    postCount: 8,
    created: '14 Jun 2025',
  },
];

const TagTable = () => (
  <Box sx={{ border: '1px solid #eee', borderRadius: 2, overflow: 'hidden' }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Slug</TableCell>
          <TableCell>Posts</TableCell>
          <TableCell>Created</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tags.map((tag, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography fontWeight={500}>{tag.name}</Typography>
            </TableCell>
            <TableCell>{tag.description}</TableCell>
            <TableCell>{tag.slug}</TableCell>
            <TableCell>{tag.postCount}</TableCell>
            <TableCell>{tag.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default TagTable;
