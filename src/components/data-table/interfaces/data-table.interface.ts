import type { ColumnDef } from "@tanstack/react-table";

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface SearchableField {
  key: string;
  label: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  meta: PaginationMeta;
  searchableFields: SearchableField[];
  onPaginationChange: (page: number, limit: number) => void;
  onSearchChange: (search: string, searchField?: string) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
  loading?: boolean;
  className?: string;
}
