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

export default function NewTagPage() {
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
  const [tagHeader, setTagHeader] = useState("");
  const [tagFooter, setTagFooter] = useState("");

  // ✅ Modal state
  const [openModal, setOpenModal] = useState(false);

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
      tagHeader,
      tagFooter,
    };

    try {
      const res = await fetch("/api/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save tag");

      const result = await res.json();
      console.log("✅ Tag created:", result);
      setOpenModal(true); // ✅ Show modal

      // Reset form
      setName("");
      setSlug("");
      setColor("#15171A");
      setDescription("");
      setMetaTitle("");
      setMetaDesc("");
      setCanonicalUrl("");
      setXTitle("");
      setXDesc("");
      setFbTitle("");
      setFbDesc("");
      setTagHeader("");
      setTagFooter("");
    } catch (err) {
      console.error("❌ Error saving tag:", err);
      alert("Failed to save tag. Please try again.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      {/* ✅ Modal */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>🎉 Tag Created Successfully</DialogTitle>
        <DialogContent>
          <Typography>
            The tag "<strong>{name}</strong>" has been saved successfully.
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
          <Typography variant="h5" fontWeight="bold">New tag</Typography>
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

        {/* Meta Data */}
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
              />
              <TextField
                label="Meta description"
                fullWidth
                multiline
                rows={2}
                value={metaDesc}
                onChange={(e) => setMetaDesc(e.target.value)}
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
              />
              <TextField
                label="X description"
                fullWidth
                multiline
                rows={2}
                value={xDesc}
                onChange={(e) => setXDesc(e.target.value)}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Facebook Card */}
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
              />
              <TextField
                label="Facebook description"
                fullWidth
                multiline
                rows={2}
                value={fbDesc}
                onChange={(e) => setFbDesc(e.target.value)}
              />
            </Stack>
          </AccordionDetails>
        </Accordion>

        {/* Code Injection */}
        <Accordion sx={{ mt: 2, width: "100%", maxWidth: 500 }}>
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

        {/* Save Button */}
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
