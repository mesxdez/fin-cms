'use client';

import {
  Box, Button, Container, Stack, TextField, Typography
} from '@mui/material';
import { useState } from 'react';

const CreateTagPage = () => {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#000000');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTag = { name, slug, color, description };
    console.log('New Tag:', newTag);
    // TODO: Add API call or state management
  };

  return (
    <Container maxWidth="sm" sx={{ pt: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>Create New Tag</Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Name"
            fullWidth
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
            }}
          />

          <TextField
            label="Slug"
            fullWidth
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            helperText="URL-friendly version of the name"
          />

          <TextField
            label="Color"
            type="color"
            fullWidth
            value={color}
            onChange={(e) => setColor(e.target.value)}
            sx={{ width: 120 }}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button type="submit" variant="contained" color="primary">
            Save Tag
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default CreateTagPage;
