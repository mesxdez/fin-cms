'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
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
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          New tag
        </Typography>
        <Button variant="contained" color="primary" sx={{ maxWidth: 500, width: '100%' }}>
          Save
        </Button>
      </Box>

      {/* Main Fields */}
      <Stack spacing={3} sx={{ maxWidth: 500 }}>
        <Box display="flex" gap={2}>
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
          <Box>
            <InputLabel shrink>Color</InputLabel>
            <OutlinedInput
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              sx={{ width: 64, height: 56, padding: 0 }}
            />
          </Box>
        </Box>

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

      {/* Meta Data Accordion */}
      <Accordion sx={{ mt: 4, maxWidth: 500 }}>
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

      {/* X Card Accordion */}
      <Accordion sx={{ mt: 2, maxWidth: 500 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">X card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Button variant="outlined" fullWidth>
              Add X image
            </Button>
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

      {/* Facebook Card Accordion */}
      <Accordion sx={{ mt: 2, maxWidth: 500 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Facebook card</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack spacing={2}>
            <Button variant="outlined" fullWidth>
              Add Facebook image
            </Button>
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

      {/* Code Injection Accordion */}
      <Accordion sx={{ mt: 2, maxWidth: 500 }}>
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
