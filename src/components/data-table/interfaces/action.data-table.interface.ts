export type UseDataTableActionsProps = {
  onSearchChange: (search: string, searchField?: string) => void;
  onSortChange: (sortBy: string, sortOrder: "asc" | "desc") => void;
};
