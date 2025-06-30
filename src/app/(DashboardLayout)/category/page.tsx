"use client";

import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CategoryTable from "../components/category/CategoryTable";
import CategoryCard from "../components/category/CategoryCard";

const CategoryPage = () => {
  return (
    <Container maxWidth="lg" sx={{ pt: 4 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight="bold">
          Category
        </Typography>
        <Button
          component={Link}
          href="/category/new"
          variant="contained"
          color="primary"
        >
          New Category
        </Button>
      </Stack>

      <CategoryTable />
    </Container>
  );
};

export default CategoryPage;
