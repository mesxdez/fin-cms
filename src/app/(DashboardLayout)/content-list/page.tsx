"use client";
import React from "react";
import PageContainer from "../components/container/PageContainer";
import { Box, Grid } from "@mui/material";
import ContentList from "../components/dashboard/ContentList";

const ContentListScreen = () => {
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
            <ContentList />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default ContentListScreen;
