"use client";

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from "@mui/material";

const Category = [
  {
    name: "Trading",
    description: "Content about trading strategies and tips",
    slug: "trading",
    postCount: 12,
    created: "10 Jun 2025",
  },
  {
    name: "Crypto",
    description: "News and updates on cryptocurrencies",
    slug: "crypto",
    postCount: 8,
    created: "14 Jun 2025",
  },
];

const CategoryTable = () => (
  <Box sx={{ border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
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
        {Category.map((Category, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography fontWeight={500}>{Category.name}</Typography>
            </TableCell>
            <TableCell>{Category.description}</TableCell>
            <TableCell>{Category.slug}</TableCell>
            <TableCell>{Category.postCount}</TableCell>
            <TableCell>{Category.created}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);

export default CategoryTable;
