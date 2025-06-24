'use client';

import {
  Box, Button, Container, Grid, Stack, TextField, Typography,
  Accordion, AccordionSummary, AccordionDetails, InputLabel, OutlinedInput
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';

export default function NewTagPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [color, setColor] = useState('#15171A');
  const [description, setDescription] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDesc, setMetaDesc] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [xTitle, setXTitle] = useState('');
  const [xDesc, setXDesc] = useState('');
  const [fbTitle, setFbTitle] = useState('');
  const [fbDesc, setFbDesc] = useState('');
  const [tagHeader, setTagHeader] = useState('');
  const [tagFooter, setTagFooter] = useState('');

  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">New tag</Typography>
        <Button variant="contained" color="primary">Save</Button>
      </Stack>

      {/* 2-Column Main Fields */}
      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
              }}
              helperText="Start with # to create internal tags"
            />
            <TextField
              label="Slug"
              fullWidth
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              helperText="https://your-site.com/tag/[slug]"
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Maximum: 500 characters"
            />
          </Stack>
        </Grid>

        {/* Right Column */}
        <Grid item xs={12} md={6}>
          <InputLabel shrink>Color</InputLabel>
          <OutlinedInput
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            sx={{ width: '100px', height: '56px' }}
          />
        </Grid>
      </Grid>

      {/* Meta Data */}
      <Accordion sx={{ mt: 5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Meta data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <TextField
              label="Meta title"
              fullWidth
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              helperText="Recommended: 70 characters"
            />
            <TextField
              label="Meta description"
              fullWidth
              multiline
              rows={2}
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              helperText="Recommended: 156 characters"
            />
            <TextField
              label="Canonical URL"
              fullWidth
              value={canonicalUrl}
              onChange={(e) => setCanonicalUrl(e.target.value)}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* X Card */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">X card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Button variant="outlined">Add X image</Button>
            <TextField
              label="X title"
              fullWidth
              value={xTitle}
              onChange={(e) => setXTitle(e.target.value)}
              helperText="Recommended: 70 characters"
            />
            <TextField
              label="X description"
              fullWidth
              multiline
              rows={2}
              value={xDesc}
              onChange={(e) => setXDesc(e.target.value)}
              helperText="Recommended: 125 characters"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Facebook Card */}
      <Accordion sx={{ mt: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Facebook card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Button variant="outlined">Add Facebook image</Button>
            <TextField
              label="Facebook title"
              fullWidth
              value={fbTitle}
              onChange={(e) => setFbTitle(e.target.value)}
              helperText="Recommended: 100 characters"
            />
            <TextField
              label="Facebook description"
              fullWidth
              multiline
              rows={2}
              value={fbDesc}
              onChange={(e) => setFbDesc(e.target.value)}
              helperText="Recommended: 65 characters"
            />
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Code Injection */}
      <Accordion sx={{ mt: 2, mb: 5 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Code injection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <TextField
              label="Tag header"
              fullWidth
              multiline
              minRows={3}
              value={tagHeader}
              onChange={(e) => setTagHeader(e.target.value)}
            />
            <TextField
              label="Tag footer"
              fullWidth
              multiline
              minRows={3}
              value={tagFooter}
              onChange={(e) => setTagFooter(e.target.value)}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}
