"use client";
import React, { useMemo, useState } from "react";
import PageContainer from "../../components/container/PageContainer";
import { Box, Grid } from "@mui/material";
import ContentListCore from "../../components/dashboard/ContentListCore";
import { contentItems } from "../../components/dashboard/ContentListCore";
import EditContentModal from "../../components/modal/EditContentModal";

const PublishedScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editContent, setEditContent] = useState<any>(null);
  const [contents, setContents] = useState(contentItems);

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
  };
  const handleChange = (field: string, value: string | number) => {
    setEditContent({ ...editContent, [field]: value });
  };
  const handleOnDelete = (id: number) => {
    console.log(
      "🚀 ~ handleOnDelete ~ handleOnDelete:",
      contents.filter((content) => content.id !== id)
    );
    setContents(contents.filter((content) => content.id !== id));
  };
  const handleOnPreview = (id: number) => {
    // TODO: Implement preview
  };
  console.log(contents.length);
  return (
    <PageContainer title="Published" description="All Published list">
      <Box>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 12 }}>
            <ContentListCore
              title={"Published"}
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
export default PublishedScreen;
