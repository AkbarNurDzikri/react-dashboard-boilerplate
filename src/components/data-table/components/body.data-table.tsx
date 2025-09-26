import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, type ColumnDef, type Table } from "@tanstack/react-table";

interface BodyTableProps<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
  loading: boolean;
}
export const BodyTable = <TData,>({
  table,
  columns,
  loading,
}: BodyTableProps<TData>) => {
  return (
    <TableBody>
      {loading ? (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="ml-2">Loading...</span>
            </div>
          </TableCell>
        </TableRow>
      ) : table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results found.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};
