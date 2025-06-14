"use client";

import { useAtom } from "jotai";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  searchQueryAtom,
  selectedCategoryAtom,
  sortByAtom,
} from "@/lib/store/store";
import { mockCategories } from "@/lib/data/data";

type Value = "name" | "price-low" | "price-high" | "rating";

export function Filters(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <section>
          <Label htmlFor="search" className="mb-2">
            Search
          </Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>

        <section>
          <Label htmlFor="category" className="mb-2">
            Category
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {mockCategories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        <section>
          <Label htmlFor="sort" className="mb-2">
            Sort By
          </Label>
          <Select
            value={sortBy}
            onValueChange={(value: Value) => setSortBy(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </CardContent>
    </Card>
  );
}
