import { Input } from "@/components/ui/input";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Select } from "@radix-ui/react-select";
import { Search } from "lucide-react";
import type { SearchableField } from "../interfaces/data-table.interface";

interface SearchControlTableProps {
  search: string;
  searchField: string;
  handleSearchChange: (value: string) => void;
  searchableFields: SearchableField[];
  handleSearchFieldChange: (value: string) => void;
}

export const SearchControlTable = ({
  search,
  searchField,
  handleSearchChange,
  searchableFields,
  handleSearchFieldChange,
}: SearchControlTableProps) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-8 w-64"
        />
      </div>

      <Select value={searchField} onValueChange={handleSearchFieldChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Search in search-by fields" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="search-by" disabled>
            Search by
          </SelectItem>
          {searchableFields.map((field) => (
            <SelectItem key={field.key} value={field.key}>
              {field.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
