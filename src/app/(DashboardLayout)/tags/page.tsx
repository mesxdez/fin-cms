'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import TagTable from '../components/tags/TagTable';
import TagCard from '../components/tags/TagCard';


const TagsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Tags</Typography>
        <Button variant="contained" color="primary">New tag</Button>
      </Stack>

      <TagTable />

    </Container>
  );
};

export default TagsPage;
