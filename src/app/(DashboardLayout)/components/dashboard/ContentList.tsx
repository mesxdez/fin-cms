import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Select,
  FormControl,
  TablePagination,
  InputLabel,
} from "@mui/material";
import { IconDots, IconPlus } from "@tabler/icons-react";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { useState } from "react";
import EditContentModal from "../modal/EditContentModal";

const contentItems = [
  {
    id: 1,
    title: "Getting Started with React",
    textHtml: "<p>Learn the basics of React development...</p>",
    banner: "/images/products/s4.jpg",
    createdBy: "John Doe",
    createdDate: "2023-09-14",
    updatedBy: "John Doe",
    updatedDate: "2023-09-15",
    status: "Published",
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    textHtml: "<p>Master advanced TypeScript concepts...</p>",
    banner: "/images/products/s5.jpg",
    createdBy: "Jane Smith",
    createdDate: "2023-09-14",
    updatedBy: "Jane Smith",
    updatedDate: "2023-09-16",
    status: "Published",
  },
  {
    id: 3,
    title: "CSS Grid Layout Mastery",
    textHtml: "<p>Complete guide to CSS Grid layouts...</p>",
    banner: "/images/products/s7.jpg",
    createdBy: "Mike Johnson",
    createdDate: "2023-09-14",
    updatedBy: "Mike Johnson",
    updatedDate: "2023-09-14",
    status: "Draft",
  },
  {
    id: 4,
    title: "State Management with Redux",
    textHtml: "<p>Understanding Redux state management...</p>",
    banner: "/images/products/s11.jpg",
    createdBy: "Sarah Wilson",
    createdDate: "2023-09-14",
    updatedBy: "Sarah Wilson",
    updatedDate: "2023-09-17",
    status: "Archived",
  },
  {
    id: 5,
    title: "Next.js Best Practices",
    textHtml: "<p>Learn the best practices for Next.js development...</p>",
    banner: "/images/products/s4.jpg",
    createdBy: "Alex Brown",
    createdDate: "2023-09-18",
    updatedBy: "Alex Brown",
    updatedDate: "2023-09-18",
    status: "Published",
  },
  {
    id: 6,
    title: "CSS Flexbox Complete Guide",
    textHtml: "<p>Master CSS Flexbox layout techniques...</p>",
    banner: "/images/products/s5.jpg",
    createdBy: "Emma Davis",
    createdDate: "2023-09-19",
    updatedBy: "Emma Davis",
    updatedDate: "2023-09-19",
    status: "Draft",
  },
  {
    id: 7,
    title: "JavaScript ES6+ Features",
    textHtml: "<p>Explore modern JavaScript features...</p>",
    banner: "/images/products/s7.jpg",
    createdBy: "Chris Wilson",
    createdDate: "2023-09-20",
    updatedBy: "Chris Wilson",
    updatedDate: "2023-09-20",
    status: "Published",
  },
  {
    id: 8,
    title: "React Hooks Deep Dive",
    textHtml: "<p>Understanding React Hooks in detail...</p>",
    banner: "/images/products/s11.jpg",
    createdBy: "Lisa Chen",
    createdDate: "2023-09-21",
    updatedBy: "Lisa Chen",
    updatedDate: "2023-09-21",
    status: "Published",
  },
  {
    id: 9,
    title: "Web Performance Optimization",
    textHtml: "<p>Techniques for optimizing web performance...</p>",
    banner: "/images/products/s4.jpg",
    createdBy: "Mark Taylor",
    createdDate: "2023-09-22",
    updatedBy: "Mark Taylor",
    updatedDate: "2023-09-22",
    status: "Draft",
  },
  {
    id: 10,
    title: "API Design Principles",
    textHtml: "<p>Best practices for designing RESTful APIs...</p>",
    banner: "/images/products/s5.jpg",
    createdBy: "Rachel Green",
    createdDate: "2023-09-23",
    updatedBy: "Rachel Green",
    updatedDate: "2023-09-23",
    status: "Archived",
  },
];

const ContentList = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedContentId, setSelectedContentId] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState<any>(null);
  const [contents, setContents] = useState(contentItems);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedContentId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedContentId(null);
  };

  const handleCreate = () => {
    setIsEditMode(false);
    setEditContent({
      title: "",
      textHtml: "",
      banner: "",
      status: "Draft",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const content = contents.find((c) => c.id === id);
    if (content) {
      setIsEditMode(true);
      setEditContent({ ...content });
      setIsModalOpen(true);
    }
    handleClose();
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditContent(null);
    setIsEditMode(false);
  };

  const handleModalSave = () => {
    if (isEditMode) {
      console.log("Updating content:", editContent);
      // Update the content in the list
      setContents((prev) =>
        prev.map((item) => (item.id === editContent.id ? editContent : item))
      );
    } else {
      console.log("Creating new content:", editContent);
      // Add new content to the list
      const newContent = {
        ...editContent,
        id: Math.max(...contents.map((c) => c.id)) + 1,
        createdBy: "Current User",
        createdDate: new Date().toISOString().split("T")[0],
        updatedBy: "Current User",
        updatedDate: new Date().toISOString().split("T")[0],
      };
      setContents((prev) => [...prev, newContent]);
    }
    setIsModalOpen(false);
    setEditContent(null);
    setIsEditMode(false);
  };

  const handleChange = (field: string, value: string | number) => {
    setEditContent((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    setContents((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: newStatus,
              updatedBy: "Current User",
              updatedDate: new Date().toISOString().split("T")[0],
            }
          : item
      )
    );
    console.log(`Status changed for content ${id} to ${newStatus}`);
  };

  const handleDelete = (id: number) => {
    console.log("Delete content:", id);
    setContents((prev) => prev.filter((item) => item.id !== id));
    handleClose();
  };

  // Pagination handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "success";
      case "Draft":
        return "warning";
      case "Archived":
        return "default";
      default:
        return "default";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const truncateHtml = (html: string, maxLength: number = 50) => {
    const textContent = html.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  // Calculate paginated data
  const paginatedContents = contents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <DashboardCard
        title="Content List"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<IconPlus size={20} />}
            onClick={handleCreate}
          >
            Create Content
          </Button>
        }
      >
        <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
          <Table
            aria-label="content table"
            sx={{
              whiteSpace: "nowrap",
              mt: 2,
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Title
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Banner
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    textAlign={"center"}
                  >
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Created By
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Created Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Updated By
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Updated Date
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="subtitle2" fontWeight={600}>
                    Actions
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedContents.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: "500",
                      }}
                    >
                      {content.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Avatar
                      src={content.banner}
                      variant="square"
                      sx={{
                        height: 40,
                        width: 60,
                        borderRadius: "4px",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "right" }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <Select
                        value={content.status}
                        onChange={(e) =>
                          handleStatusChange(content.id, e.target.value)
                        }
                        sx={{
                          "& .MuiSelect-select": {
                            py: 0.5,
                          },
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&:hover .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                          },
                        }}
                      >
                        <MenuItem value="Draft">
                          <Chip
                            label="Draft"
                            color="warning"
                            size="small"
                            variant="outlined"
                          />
                        </MenuItem>
                        <MenuItem value="Published">
                          <Chip
                            label="Published"
                            color="success"
                            size="small"
                            variant="outlined"
                          />
                        </MenuItem>
                        <MenuItem value="Archived">
                          <Chip
                            label="Archived"
                            color="default"
                            size="small"
                            variant="outlined"
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {content.createdBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      {formatDate(content.createdDate)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">
                      {content.updatedBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      {formatDate(content.updatedDate)}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-controls={`menu-${content.id}`}
                      aria-haspopup="true"
                      onClick={(e) => handleMenuClick(e, content.id)}
                    >
                      <IconDots />
                    </IconButton>
                    <Menu
                      id={`menu-${content.id}`}
                      anchorEl={anchorEl}
                      keepMounted
                      open={selectedContentId === content.id}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={() => handleEdit(content.id)}>
                        Edit
                      </MenuItem>
                      <MenuItem onClick={() => handleDelete(content.id)}>
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={contents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Rows per page:"
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} of ${count !== -1 ? count : `more than ${to}`}`
            }
          />
        </Box>
      </DashboardCard>
      <EditContentModal
        open={isModalOpen}
        content={editContent}
        isEditMode={isEditMode}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onChange={handleChange}
      />
    </>
  );
};

export default ContentList;
