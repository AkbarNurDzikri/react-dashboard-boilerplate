import { DataTable } from "@/components/data-table";
import { userColumns } from "@/features/user/components/columns";
import { searchableFields } from "@/features/user/constants/searchable-fields.const";
import type { IUser } from "@/features/user/interfaces/user.interface";
import { useDataTable } from "@/hooks/use-data-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/user/")({
  component: UserPage,
});

function UserPage() {
  const {
    data,
    meta,
    loading,
    handlePaginationChange,
    handleSearchChange,
    handleSortChange,
  } = useDataTable<IUser>({ endpoint: "users" });

  return (
    <DataTable
      columns={userColumns}
      data={data}
      meta={meta}
      searchableFields={searchableFields}
      onPaginationChange={handlePaginationChange}
      onSearchChange={handleSearchChange}
      onSortChange={handleSortChange}
      loading={loading}
      className="bg-white rounded-lg shadow-sm"
    />
  );
}
