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
import { useEffect, useState } from "react";

type ErrorData = { error?: string };

export default function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [labels, setLabels] = useState("");
  const [note, setNote] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [role, setRole] = useState("Member");
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Load user data from localStorage (or fetch from API)
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      setName(parsed.username || "");
      setEmail(parsed.email || "");
      // password intentionally not prefilled
    }
  }, []);

  const handleSave = async () => {
    setMessage("");
    try {
      const res = await fetch("/api/members/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password: password || undefined, // ถ้าไม่กรอก password ใหม่ ก็ไม่ส่ง
          role,
          labels: labels ? labels.split(",").map((l) => l.trim()) : [],
          note,
          newsletter,
        }),
      });

      const result = await res.text();
      if (res.ok) {
        setOpenModal(true);
        setMessage("Profile updated successfully!");
      } else {
        let data: ErrorData = {};
        try {
          data = JSON.parse(result);
        } catch {
          data = { error: result || "Unknown error" };
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
        <DialogTitle>✅ Profile Updated</DialogTitle>
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
            {name ? name[0].toUpperCase() : "U"}
          </Avatar>
          <Typography mt={1} fontWeight="medium">
            Edit Profile
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
              label="New Password (optional)"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Leave blank to keep current password"
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
            If disabled, you will <strong>not</strong> receive newsletter
            emails.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
