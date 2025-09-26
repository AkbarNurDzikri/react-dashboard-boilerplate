import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import type { DataTableProps } from "./interfaces/data-table.interface";
import { useDataTableActions } from "./hooks/use-data-table-actions";
import { Pagination } from "./components/pagination.data-table";
import { HeaderTable } from "./components/header.data-table";
import { BodyTable } from "./components/body.data-table";
import { SearchControlTable } from "./components/search-control.data-table";
import { ColumnVisibility } from "./components/column-visibility.data-table";

export const DataTable = <T,>({
  columns,
  data,
  meta,
  searchableFields,
  onPaginationChange,
  onSearchChange,
  onSortChange,
  loading = false,
  className = "",
}: DataTableProps<T>) => {
  const {
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
  } = useDataTableActions({ onSearchChange, onSortChange });

  // Table instance
  const table = useReactTable({
    data,
    columns,
    onSortingChange: handleSortingChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualSorting: true,
    manualPagination: true,
    pageCount: meta.totalPages,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SearchControlTable
            handleSearchChange={handleSearchChange}
            handleSearchFieldChange={handleSearchFieldChange}
            search={search}
            searchField={searchField}
            searchableFields={searchableFields}
          />
        </div>

        <ColumnVisibility table={table} />
      </div>

      <div className="rounded-md border">
        <Table>
          <HeaderTable table={table} />
          <BodyTable columns={columns} loading={loading} table={table} />
        </Table>
      </div>

      <Pagination meta={meta} onPaginationChange={onPaginationChange} />
    </div>
  );
};
