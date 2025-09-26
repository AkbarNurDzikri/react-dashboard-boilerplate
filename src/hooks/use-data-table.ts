import { useState, useCallback, useEffect } from "react";
import { ApiService, type ApiParams } from "@/services/api.service";
import { useFlashMessage } from "./use-flash-message";

interface UseDataTableOptions {
  endpoint: string;
  defaultPageSize?: number;
}

export function useDataTable<T>({
  endpoint,
  defaultPageSize = 10,
}: UseDataTableOptions) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState({
    page: 1,
    limit: defaultPageSize,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  const { showApiError } = useFlashMessage();

  const fetchData = useCallback(
    async (params: ApiParams = {}) => {
      setLoading(true);
      setError(null);

      try {
        const response = await ApiService.get<T>(endpoint, {
          ...params,
          limit: params.limit || defaultPageSize,
        });

        setData(response.data);
        setMeta(response.meta);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        showApiError(err);
      } finally {
        setLoading(false);
      }
    },
    [endpoint, defaultPageSize, showApiError]
  );

  useEffect(() => {
    fetchData({ page: 1, limit: defaultPageSize });
  }, [fetchData, defaultPageSize]);

  // Handler functions untuk DataTable
  const handlePaginationChange = useCallback(
    (page: number, limit: number) => {
      fetchData({ page, limit });
    },
    [fetchData]
  );

  const handleSearchChange = useCallback(
    (search: string, searchField?: string) => {
      fetchData({
        page: 1,
        search: search || undefined,
        searchField: searchField || undefined,
      });
    },
    [fetchData]
  );

  const handleSortChange = useCallback(
    (sortBy: string, sortOrder: "asc" | "desc") => {
      fetchData({
        page: 1,
        sortBy,
        sortOrder,
      });
    },
    [fetchData]
  );

  // Refresh data
  const refresh = useCallback(() => {
    fetchData({ page: meta.page, limit: meta.limit });
  }, [fetchData, meta.page, meta.limit]);

  return {
    data,
    meta,
    loading,
    error,
    fetchData,
    handlePaginationChange,
    handleSearchChange,
    handleSortChange,
    refresh,
  };
}
