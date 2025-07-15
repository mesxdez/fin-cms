"use client";
import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, Chip
} from "@mui/material";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
}

const CategoryTable = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error(`Failed to fetch categories: ${res.statusText}`);
        const json = await res.json();

        if (!Array.isArray(json.data)) {
          throw new Error("Unexpected API response format");
        }

        setCategories(json.data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  if (categories.length === 0) {
    return <Typography>No categories found.</Typography>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Slug</strong></TableCell>
            <TableCell><strong>Color</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((cat) => (
            <TableRow key={cat.id}>
              <TableCell>{cat.name}</TableCell>
              <TableCell>{cat.slug}</TableCell>
              <TableCell>
                <Chip
                  label={cat.color}
                  style={{
                    backgroundColor: cat.color,
                    color: "#fff",
                  }}
                />
              </TableCell>
              <TableCell>{cat.description || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
