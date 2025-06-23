// components/EditContentModal.tsx
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Avatar,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { FC, useRef, useState } from "react";
import {
  IconUpload,
  IconPhoto,
  IconBold,
  IconItalic,
  IconUnderline,
  IconList,
  IconListNumbers,
  IconQuote,
  IconCode,
  IconImageInPicture,
} from "@tabler/icons-react";

type Content = {
  id?: number;
  title: string;
  textHtml: string;
  banner: string;
  status: string;
  createdBy?: string;
  createdDate?: string;
  updatedBy?: string;
  updatedDate?: string;
};

interface EditContentModalProps {
  open: boolean;
  content: Content | null;
  isEditMode: boolean;
  onClose: () => void;
  onChange: (field: keyof Content, value: string | number) => void;
  onSave: () => void;
}

const EditContentModal: FC<EditContentModalProps> = ({
  open,
  content,
  isEditMode,
  onClose,
  onChange,
  onSave,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showImageDialog, setShowImageDialog] = useState(false);

  if (!content) return null;

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a preview URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      onChange("banner", imageUrl);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleTextChange = (newValue: string) => {
    setTextAreaValue(newValue);
    onChange("textHtml", newValue);
  };

  const insertHtmlTag = (tag: string) => {
    const textarea = document.getElementById(
      "html-editor"
    ) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);

      let insertText = "";
      switch (tag) {
        case "bold":
          insertText = `<strong>${selectedText || "Bold Text"}</strong>`;
          break;
        case "italic":
          insertText = `<em>${selectedText || "Italic Text"}</em>`;
          break;
        case "underline":
          insertText = `<u>${selectedText || "Underlined Text"}</u>`;
          break;
        case "ul":
          insertText = `<ul>\n  <li>${selectedText || "List Item"}</li>\n</ul>`;
          break;
        case "ol":
          insertText = `<ol>\n  <li>${selectedText || "List Item"}</li>\n</ol>`;
          break;
        case "quote":
          insertText = `<blockquote>${
            selectedText || "Quote Text"
          }</blockquote>`;
          break;
        case "code":
          insertText = `<code>${selectedText || "Code Text"}</code>`;
          break;
        case "image":
          setShowImageDialog(true);
          return;
        default:
          insertText = selectedText;
      }

      const newValue =
        textarea.value.substring(0, start) +
        insertText +
        textarea.value.substring(end);
      handleTextChange(newValue);

      // Set cursor position after the inserted tag
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(
          start + insertText.length,
          start + insertText.length
        );
      }, 0);
    }
  };

  const insertImage = () => {
    if (imageUrl.trim()) {
      const textarea = document.getElementById(
        "html-editor"
      ) as HTMLTextAreaElement;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);

        const altText = selectedText || "Image";
        const insertText = `<img src="${imageUrl}" alt="${altText}" style="max-width: 100%; height: auto;" />`;

        const newValue =
          textarea.value.substring(0, start) +
          insertText +
          textarea.value.substring(end);
        handleTextChange(newValue);

        // Set cursor position after the inserted image tag
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(
            start + insertText.length,
            start + insertText.length
          );
        }, 0);
      }
      setImageUrl("");
      setShowImageDialog(false);
    }
  };

  const handleImageDialogClose = () => {
    setShowImageDialog(false);
    setImageUrl("");
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
        <DialogTitle>
          {isEditMode ? "Edit Content" : "Create New Content"}
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Title"
            value={content.title}
            onChange={(e) => onChange("title", e.target.value)}
            fullWidth
            required
          />

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Content Editor
            </Typography>

            {/* HTML Editor Toolbar */}
            <Box
              sx={{
                mb: 1,
                p: 1,
                border: "1px solid #e0e0e0",
                borderRadius: 1,
                bgcolor: "#fafafa",
              }}
            >
              <ToggleButtonGroup size="small" sx={{ gap: 0.5 }}>
                <ToggleButton
                  value="bold"
                  onClick={() => insertHtmlTag("bold")}
                  title="Bold"
                >
                  <IconBold size={16} />
                </ToggleButton>
                <ToggleButton
                  value="italic"
                  onClick={() => insertHtmlTag("italic")}
                  title="Italic"
                >
                  <IconItalic size={16} />
                </ToggleButton>
                <ToggleButton
                  value="underline"
                  onClick={() => insertHtmlTag("underline")}
                  title="Underline"
                >
                  <IconUnderline size={16} />
                </ToggleButton>
                <ToggleButton
                  value="ul"
                  onClick={() => insertHtmlTag("ul")}
                  title="Unordered List"
                >
                  <IconList size={16} />
                </ToggleButton>
                <ToggleButton
                  value="ol"
                  onClick={() => insertHtmlTag("ol")}
                  title="Ordered List"
                >
                  <IconListNumbers size={16} />
                </ToggleButton>
                <ToggleButton
                  value="quote"
                  onClick={() => insertHtmlTag("quote")}
                  title="Quote"
                >
                  <IconQuote size={16} />
                </ToggleButton>
                <ToggleButton
                  value="code"
                  onClick={() => insertHtmlTag("code")}
                  title="Code"
                >
                  <IconCode size={16} />
                </ToggleButton>
                <ToggleButton
                  value="image"
                  onClick={() => insertHtmlTag("image")}
                  title="Insert Image"
                >
                  <IconImageInPicture size={16} />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* HTML Editor Textarea */}
            <TextField
              id="html-editor"
              value={content.textHtml}
              onChange={(e) => handleTextChange(e.target.value)}
              multiline
              rows={8}
              fullWidth
              required
              placeholder="Enter your content here... Use the toolbar above to format your text."
              sx={{
                "& .MuiInputBase-input": {
                  fontFamily: "monospace",
                  fontSize: "14px",
                },
              }}
            />

            <Typography
              variant="caption"
              color="textSecondary"
              sx={{ mt: 0.5 }}
            >
              Use the toolbar buttons to format your content with HTML tags
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Banner Image
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar
                src={content.banner}
                variant="square"
                sx={{
                  height: 80,
                  width: 120,
                  borderRadius: "8px",
                  border: "2px dashed #ccc",
                }}
              >
                <IconPhoto size={40} />
              </Avatar>
              <Stack spacing={1} sx={{ flexGrow: 1 }}>
                <Button
                  variant="outlined"
                  startIcon={<IconUpload size={20} />}
                  onClick={handleImageUpload}
                  sx={{ alignSelf: "flex-start" }}
                >
                  Upload Image
                </Button>
                <Typography variant="caption" color="textSecondary">
                  Or enter image URL below
                </Typography>
              </Stack>
            </Stack>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </Box>

          <TextField
            label="Banner Image URL"
            value={content.banner}
            onChange={(e) => onChange("banner", e.target.value)}
            fullWidth
            helperText="Enter the URL for the banner image or upload a file above"
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={content.status}
              label="Status"
              onChange={(e) => onChange("status", e.target.value)}
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Published">Published</MenuItem>
              <MenuItem value="Archived">Archived</MenuItem>
            </Select>
          </FormControl>

          {isEditMode && (
            <Box sx={{ mt: 2, p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography
                variant="subtitle2"
                color="textSecondary"
                gutterBottom
              >
                Content Information
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created by: {content.createdBy || "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Created date: {content.createdDate || "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Last updated by: {content.updatedBy || "N/A"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Last updated: {content.updatedDate || "N/A"}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSave} variant="contained" color="primary">
            {isEditMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image Insert Dialog */}
      <Dialog
        open={showImageDialog}
        onClose={handleImageDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Insert Image</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            fullWidth
            placeholder="https://example.com/image.jpg"
            helperText="Enter the URL of the image you want to insert"
          />
          <TextField
            label="Alt Text (optional)"
            fullWidth
            placeholder="Description of the image"
            helperText="This text will be used as alt text for accessibility"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleImageDialogClose}>Cancel</Button>
          <Button onClick={insertImage} variant="contained" color="primary">
            Insert Image
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditContentModal;
