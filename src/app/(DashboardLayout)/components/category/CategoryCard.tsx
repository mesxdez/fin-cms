"use client";

import {
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
} from "@mui/material";

const CategoryCard = ({
  title,
  desc,
  image,
  linkText,
}: {
  title: string;
  desc: string;
  image: string;
  linkText: string;
}) => (
  <Card sx={{ maxWidth: 400 }}>
    <CardMedia component="img" height="180" image={image} alt={title} />
    <CardContent>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {desc}
      </Typography>
      <Button size="small">{linkText} →</Button>
    </CardContent>
  </Card>
);

export default CategoryCard;
