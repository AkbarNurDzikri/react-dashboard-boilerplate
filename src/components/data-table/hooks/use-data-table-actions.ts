import type {
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import type { UseDataTableActionsProps } from "../interfaces/action.data-table.interface";

export const useDataTableActions = ({
  onSearchChange,
  onSortChange,
}: UseDataTableActionsProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState<string>("search-by");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchTimeout]);

  // Handle search with debounce
  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(() => {
      onSearchChange(
        value,
        searchField === "search-by" ? undefined : searchField
      );
    }, 500);

    setSearchTimeout(timeout);
  };

  const handleSearchFieldChange = (value: string) => {
    setSearchField(value);
    if (search) {
      onSearchChange(search, value === "search-by" ? undefined : value);
    }
  };

  const handleSortingChange: OnChangeFn<SortingState> = (updaterOrValue) => {
    const newSorting =
      typeof updaterOrValue === "function"
        ? updaterOrValue(sorting)
        : updaterOrValue;

    setSorting(newSorting);

    if (newSorting.length > 0) {
      const sort = newSorting[0];
      onSortChange(sort.id, sort.desc ? "desc" : "asc");
    }
  };

  return {
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    handleSearchChange,
    handleSearchFieldChange,
    handleSortingChange,
    sorting,
    search,
    searchField,
  };
};
