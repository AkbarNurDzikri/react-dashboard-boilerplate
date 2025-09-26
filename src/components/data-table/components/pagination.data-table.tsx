import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import type { PaginationMeta } from "../interfaces/data-table.interface";

interface PaginationProps {
  onPaginationChange: (page: number, limit: number) => void;
  meta: PaginationMeta;
}

export const Pagination = ({ onPaginationChange, meta }: PaginationProps) => {
  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={meta.limit.toString()}
          onValueChange={(value) => {
            onPaginationChange(1, parseInt(value));
          }}
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[5, 10, 25, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-24 items-center justify-center text-sm font-medium">
          Page {meta.page} of {meta.totalPages}
        </div>
        <div className="text-sm text-muted-foreground">
          Showing {(meta.page - 1) * meta.limit + 1} to{" "}
          {Math.min(meta.page * meta.limit, meta.total)} of {meta.total} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange(1, meta.limit)}
            disabled={!meta.hasPrevPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange(meta.page - 1, meta.limit)}
            disabled={!meta.hasPrevPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => onPaginationChange(meta.page + 1, meta.limit)}
            disabled={!meta.hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => onPaginationChange(meta.totalPages, meta.limit)}
            disabled={!meta.hasNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
