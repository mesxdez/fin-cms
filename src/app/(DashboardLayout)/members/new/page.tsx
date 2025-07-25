"use client";

import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

type ErrorData = { error?: string };

export default function NewMemberPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [labels, setLabels] = useState("");
  const [note, setNote] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [role, setRole] = useState("Member");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          labels: labels ? labels.split(",").map((l) => l.trim()) : [],
          note,
          newsletter,
        }),
      });

      if (res.ok) {
        setOpenModal(true);
        setMessage("Member created successfully!");
        // reset form if needed
        setName("");
        setEmail("");
        setPassword("");
        setLabels("");
        setNote("");
        setNewsletter(true);
        setRole("Member");
      } else {
        // อ่าน response body อย่างปลอดภัย
        const text = await res.text();
        let data: ErrorData = {};
        try {
          data = JSON.parse(text);
        } catch {
          data = { error: text || "Unknown error" };
        }
        setMessage(`Failed: ${data.error || "Unknown error"}`);
      }
    } catch (error: any) {
      setMessage(`Failed: ${error.message || "Unknown error"}`);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>✅ Member Created</DialogTitle>
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
      </Box>

      <Box display="flex" gap={4} alignItems="flex-start" mb={4}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>
            {name ? name[0].toUpperCase() : "N"}
          </Avatar>
          <Typography mt={1} fontWeight="medium">
            New member
          </Typography>
        </Box>

        <Paper variant="outlined" sx={{ flexGrow: 1, p: 3, borderRadius: 2 }}>
          <Stack spacing={3}>
            <Box display="flex" gap={2}>
              <TextField
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>

            <TextField
              label="Password"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              select
              label="Role"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="Member">Member</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Editor">Editor</MenuItem>
            </TextField>

            <TextField
              label="Labels (comma separated)"
              fullWidth
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              placeholder="e.g. vip,subscriber"
            />

            <TextField
              label="Note"
              fullWidth
              multiline
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              helperText="Maximum: 500 characters. Not visible to member"
            />
          </Stack>
        </Paper>
      </Box>

      <Box sx={{ maxWidth: 800, ml: "auto", mr: "auto" }}>
        <Paper variant="outlined" sx={{ p: 3, mb: 4, borderRadius: 2 }}>
          <Typography fontWeight="bold" mb={2}>
            NEWSLETTERS
          </Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontWeight="medium">Receive newsletter?</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                />
              }
              label=""
            />
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            If disabled, member will <strong>not</strong> receive newsletter
            emails.
          </Typography>
        </Paper>

        <Paper
          variant="outlined"
          sx={{ p: 4, textAlign: "center", borderRadius: 2 }}
        >
          <Typography fontWeight="bold" mb={2}>
            ACTIVITY
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Activity
          </Typography>
          <Typography variant="body2" color="text.secondary">
            All events related to this member will be shown here.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
