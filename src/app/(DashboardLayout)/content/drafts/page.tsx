"use client";
import React, { useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Grid, CircularProgress, Alert } from "@mui/material";
import ContentListCore from "../../components/dashboard/ContentListCore";
import EditContentModal from "../../components/modal/EditContentModal";
import { useContent } from "../../../../utils/useContent";

const DraftsScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState<any>(null);

  // Fetch only draft content
  const { contents, loading, error, refetch } = useContent({ status: "Draft" });

  const handleOnEdit = (id: number) => {
    setIsModalOpen(true);
    setIsEditMode(true);
    setEditContent(contents.find((content) => content.id === id));
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditContent(null);
  };

  const handleModalSave = () => {
    setIsModalOpen(false);
    refetch(); // Refresh data after save
  };

  const handleChange = (field: string, value: string | number) => {
    setEditContent({ ...editContent, [field]: value });
  };

  const handleOnDelete = (id: number) => {
    console.log("Deleting draft with id:", id);
    // TODO: Implement delete API call
    refetch(); // Refresh data after delete
  };

  const handleOnPreview = (id: number) => {
    // TODO: Implement preview
  };

  if (loading) {
    return (
      <PageContainer title="Drafts" description="All Drafts list">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="400px"
        >
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer title="Drafts" description="All Drafts list">
        <Alert severity="error">{error}</Alert>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Drafts" description="All Drafts list">
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 12 }}>
            <ContentListCore
              title={"Drafts"}
              contents={contents}
              onEdit={handleOnEdit}
              onDelete={handleOnDelete}
              onPreview={handleOnPreview}
            />
          </Grid>
        </Grid>
      </Box>
      <EditContentModal
        open={isModalOpen}
        content={editContent}
        isEditMode={isEditMode}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onChange={handleChange}
      />
    </PageContainer>
  );
};
export default DraftsScreen;
