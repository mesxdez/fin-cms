"use client";

import {
  Container,
  Stack,
  TextField,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

export default function NewTagPage() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [color, setColor] = useState("#1976d2");
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

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
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

      const res = await fetch("/api/tags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to save tag");
      }

      // success
      setOpenModal(true);

      // reset form
      setName("");
      setSlug("");
      setColor("#1976d2");
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
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  // auto-generate slug when name changes
  const onNameChange = (val: string) => {
    setName(val);
    setSlug(val.toLowerCase().trim().replace(/\s+/g, "-"));
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Create New Tag
      </Typography>

      <Stack spacing={3}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          fullWidth
          required
          helperText="Start with # for internal tags"
        />

        <TextField
          label="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          fullWidth
          required
          helperText="Unique slug for URL"
        />

        <Box>
          <Typography>Color</Typography>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: 50, height: 40, border: "none", cursor: "pointer" }}
          />
        </Box>

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Meta Title"
          value={metaTitle}
          onChange={(e) => setMetaTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="Meta Description"
          value={metaDesc}
          onChange={(e) => setMetaDesc(e.target.value)}
          multiline
          rows={2}
          fullWidth
        />

        <TextField
          label="Canonical URL"
          value={canonicalUrl}
          onChange={(e) => setCanonicalUrl(e.target.value)}
          fullWidth
        />

        <TextField
          label="X Title"
          value={xTitle}
          onChange={(e) => setXTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="X Description"
          value={xDesc}
          onChange={(e) => setXDesc(e.target.value)}
          multiline
          rows={2}
          fullWidth
        />

        <TextField
          label="Facebook Title"
          value={fbTitle}
          onChange={(e) => setFbTitle(e.target.value)}
          fullWidth
        />

        <TextField
          label="Facebook Description"
          value={fbDesc}
          onChange={(e) => setFbDesc(e.target.value)}
          multiline
          rows={2}
          fullWidth
        />

        <TextField
          label="Tag Header (Code Injection)"
          value={tagHeader}
          onChange={(e) => setTagHeader(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="Tag Footer (Code Injection)"
          value={tagFooter}
          onChange={(e) => setTagFooter(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />

        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={loading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </Stack>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>🎉 Tag Created Successfully</DialogTitle>
        <DialogContent>
          <Typography>The tag "{name}" has been saved.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
