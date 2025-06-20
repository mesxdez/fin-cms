// components/EditProductModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { FC } from "react";

type Product = {
  id: number;
  title: string;
  salesPrice: number;
  count: number;
  status: string;
};

interface EditProductModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onChange: (field: keyof Product, value: string | number) => void;
  onSave: () => void;
}

const EditProductModal: FC<EditProductModalProps> = ({
  open,
  product,
  onClose,
  onChange,
  onSave,
}) => {
  if (!product) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
      >
        <TextField
          label="Title"
          value={product.title}
          onChange={(e) => onChange("title", e.target.value)}
        />
        <TextField
          label="Sales Price"
          type="number"
          value={product.salesPrice}
          onChange={(e) => onChange("salesPrice", parseFloat(e.target.value))}
        />
        <TextField
          label="Stock Count"
          type="number"
          value={product.count}
          onChange={(e) => onChange("count", parseInt(e.target.value))}
        />
        <TextField
          label="Status"
          value={product.status}
          onChange={(e) => onChange("status", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductModal;
