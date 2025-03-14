"use client";

import { useDebouncedCallback } from "use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

export function Search() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const currentParams = useSearchParams();

  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(currentParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <Input
      type="search"
      placeholder="Search"
      className="w-full max-w-md"
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={currentParams.get("search") || ""}
    />
  );
}
