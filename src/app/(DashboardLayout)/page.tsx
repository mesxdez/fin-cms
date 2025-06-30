"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 8,
            }}
          >
            <SalesOverview />
          </Grid>
          <Grid
            size={{
              xs: 12,
              lg: 4,
            }}
          >
            <RecentTransactions />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
