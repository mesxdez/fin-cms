"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function NewCategoryPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("#15171A");
  const [description, setDescription] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [xTitle, setXTitle] = useState("");
  const [xDesc, setXDesc] = useState("");
  const [fbTitle, setFbTitle] = useState("");
  const [fbDesc, setFbDesc] = useState("");
  const [categoryHeader, setCategoryHeader] = useState("");
  const [categoryFooter, setCategoryFooter] = useState("");
  const [openModal, setOpenModal] = useState(false); // ✅ Modal state

  const handleSave = async () => {
    const payload = {
      name,
      slug,
      color,
      description,
      metaTitle,
      metaDesc,
      canonicalUrl,
      xTitle,
      xDesc,
      fbTitle,
      fbDesc,
      categoryHeader,
      categoryFooter,
    };

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      const result = await res.json();
      console.log("✅ Category saved:", result);
      setOpenModal(true); // ✅ Show modal
    } catch (err) {
      console.error("❌ Error saving category:", err);
      alert("Failed to save category");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      {/* ✅ Modal Success */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>🎉 Category Saved Successfully</DialogTitle>
        <DialogContent>
          <Typography>
            The category "<strong>{name}</strong>" has been saved successfully.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={3} alignItems="center">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h5" fontWeight="bold">
            New Category
          </Typography>
        </Box>

        {/* Main Fields */}
        <Stack spacing={3} sx={{ width: "100%", maxWidth: 500 }}>
          <Box display="flex" gap={2}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                setName(value);
                setSlug(value.toLowerCase().replace(/\s+/g, "-"));
              }}
              helperText="Start with # to create internal Category"
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
            helperText="https://your-site.com/category/[slug]"
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
        <Accordion sx={{ mt: 2, width: "100%", maxWidth: 500 }}>
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
        <Accordion sx={{ mt: 2, width: "100%", maxWidth: 500 }}>
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
        <Accordion sx={{ mt: 2, width: "100%", maxWidth: 500 }}>
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
        <Accordion sx={{ mt: 2, width: "100%", maxWidth: 500 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">Code injection</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <TextField
                label="Category header"
                fullWidth
                multiline
                minRows={3}
                value={categoryHeader}
                onChange={(e) => setCategoryHeader(e.target.value)}
              />
              <TextField
                label="Category footer"
                fullWidth
                multiline
                minRows={3}
                value={categoryFooter}
                onChange={(e) => setCategoryFooter(e.target.value)}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 4, width: "100%", maxWidth: 500 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </Stack>
    </Container>
  );
}
