"use client";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from "@mui/material";

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export default function CategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Slug</TableCell>
            <TableCell>Color</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell>
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor: category.color,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                  }}
                ></span>{" "}
                {category.color}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
