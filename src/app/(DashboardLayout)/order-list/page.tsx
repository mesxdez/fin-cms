"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import { Box, Grid } from "@mui/material";
import OrderList from "../components/dashboard/OrderList";

const orderListScreen = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid
            size={{
              xs: 12,
              lg: 12,
            }}
          >
            <OrderList />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default orderListScreen;
