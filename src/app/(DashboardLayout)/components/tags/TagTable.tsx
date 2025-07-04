'use client';
import { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Chip
} from '@mui/material';

interface Tag {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
}

const TagTable = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch('/api/tags');
        const data = await res.json();
        setTags(data);
      } catch (err) {
        console.error('❌ Failed to fetch tags:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Slug</strong></TableCell>
            <TableCell><strong>Color</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tags.map((tag) => (
            <TableRow key={tag.id}>
              <TableCell>{tag.name}</TableCell>
              <TableCell>{tag.slug}</TableCell>
              <TableCell>
                <Chip
                  label={tag.color}
                  style={{
                    backgroundColor: tag.color,
                    color: '#fff'
                  }}
                />
              </TableCell>
              <TableCell>{tag.description || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TagTable;
