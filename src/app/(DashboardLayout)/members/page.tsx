'use client';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import MemberTable from '../components/members/MemberTable';
import MemberCard from '../components/members/MemberCard';
import Link from 'next/link';


const MembersPage = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">Members</Typography>
      <Button 
      variant="contained" 
      color="primary" 
      component={Link} 
      href="/members/new"
      // If you want to preserve the <a> behavior you can add legacyBehavior or passHref, but usually not needed here
    >
      New member
    </Button>
      </Stack>

      <MemberTable />

      <Typography variant="subtitle1" fontWeight={500} mt={6} mb={2}>
        Get Started With Memberships
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <MemberCard
          title="Building your audience with subscriber signups"
          desc="Learn how to turn anonymous visitors into logged-in members with memberships in Ghost."
          image="/images/signup-guide.jpg"
          linkText="Start building"
        />
        <MemberCard
          title="Get your first 100 email subscribers"
          desc="Starting from zero? Use this guide to find your founding audience members."
          image="/images/email-subscribers.jpg"
          linkText="Become an expert"
        />
      </Stack>
    </Container>
  );
};

export default MembersPage;
