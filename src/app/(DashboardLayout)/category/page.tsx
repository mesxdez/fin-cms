import { Container, Stack, Typography, Button } from "@mui/material";
import Link from "next/link";
import CategoryTable from "../components/category/CategoryTable";


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
          Categories
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
