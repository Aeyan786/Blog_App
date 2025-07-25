"use client"
import { searchAction } from "@/actions/search";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";

const SearchInupt = () => {
  const params = useSearchParams()
  return (
    <form action={searchAction}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 text-muted-foreground -translate-y-1/2" />
        <Input
          placeholder="Search articles..."
          name="search"
          defaultValue={params.get("search")|| ""}
          type="text"
          className="pl-10 w-full focus-visible:ring-1"
        />
      </div>
    </form>
  );
};

export default SearchInupt;
