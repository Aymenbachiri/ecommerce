import {
  searchQueryAtom,
  selectedCategoryAtom,
  sortByAtom,
} from "@/lib/store/store";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { SetStateAction, useAtom } from "jotai";

type UseFilterReturn = {
  t: ReturnType<typeof useTranslations>;
  searchQuery: string;
  selectedCategory: string;
  sortBy: string;
  setLocalSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: (
    args_0: SetStateAction<"name" | "rating" | "price-low" | "price-high">,
  ) => void;
};

export function useFilter(): UseFilterReturn {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const t = useTranslations("ProductsPage.Filters");
  const debouncedSearchQuery = useDebounce(localSearchQuery, 100);

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  return {
    t,
    searchQuery,
    selectedCategory,
    sortBy,
    setLocalSearchQuery,
    setSelectedCategory,
    setSortBy,
  };
}
