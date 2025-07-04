import { useState, useEffect, useCallback } from "react";

interface Content {
  id: number;
  title: string;
  textHtml: string;
  banner: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string;
  updatedDate: string;
  status: string;
}

interface ContentResponse {
  data: Content[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface UseContentOptions {
  status?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export const useContent = (options: UseContentOptions = {}) => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const fetchContents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (options.status) params.append("status", options.status);
      if (options.search) params.append("search", options.search);
      if (options.page) params.append("page", options.page.toString());
      if (options.limit) params.append("limit", options.limit.toString());

      const response = await fetch(`/api/contents?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch contents");
      }

      const result: ContentResponse = await response.json();
      setContents(result.data);
      setPagination({
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [options.status, options.search, options.page, options.limit]);

  useEffect(() => {
    fetchContents();
  }, [fetchContents]);

  const refetch = () => {
    fetchContents();
  };

  return {
    contents,
    loading,
    error,
    pagination,
    refetch,
  };
};
