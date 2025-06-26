'use client';

import {
  Avatar,
  Box,
  Button,
  Container,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';

export default function NewMemberPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [labels, setLabels] = useState('');
  const [note, setNote] = useState('');
  const [newsletter, setNewsletter] = useState(true);

  return (
    <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
      {/* Save Button */}
      <Box display="flex" justifyContent="flex-end" mb={3}>
        <Button variant="contained" color="primary">
          Save
        </Button>
      </Box>

      {/* Header: Avatar + Form */}
      <Box display="flex" gap={4} alignItems="flex-start" mb={4}>
        {/* Avatar Section */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, fontSize: 32 }}>
            {name ? name[0].toUpperCase() : 'N'}
          </Avatar>
          <Typography mt={1} fontWeight="medium">New member</Typography>
        </Box>

        {/* Form */}
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
              label="Labels"
              fullWidth
              value={labels}
              onChange={(e) => setLabels(e.target.value)}
              placeholder="Add label..."
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

      {/* Extra Sections: Newsletter + Activity */}
      <Box sx={{ maxWidth: 800, ml: 'auto', mr: 'auto' }}>
        {/* Newsletter Section */}
        <Paper
          variant="outlined"
          sx={{ p: 3, mb: 4, borderRadius: 2, bgcolor: 'background.paper' }}
        >
          <Typography fontWeight="bold" mb={2}>
            NEWSLETTERS
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight="medium">test</Typography>
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
            If disabled, member will <strong>not</strong> receive newsletter emails
          </Typography>
        </Paper>

        {/* Activity Section */}
        <Paper
          variant="outlined"
          sx={{ p: 4, textAlign: 'center', borderRadius: 2, bgcolor: 'background.paper' }}
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
