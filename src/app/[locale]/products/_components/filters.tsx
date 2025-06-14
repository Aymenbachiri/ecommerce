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
import { useTranslations } from "next-intl";

type Value = "name" | "price-low" | "price-high" | "rating";

export function Filters(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [selectedCategory, setSelectedCategory] = useAtom(selectedCategoryAtom);
  const [sortBy, setSortBy] = useAtom(sortByAtom);
  const t = useTranslations("ProductsPage.Filters");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <section>
          <Label htmlFor="search" className="mb-2">
            {t("searchLabel")}
          </Label>
          <div className="relative">
            <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
            <Input
              id="search"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </section>

        <section>
          <Label htmlFor="category" className="mb-2">
            {t("categoryLabel")}
          </Label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder={t("categoryPlaceholder")} />
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
            {t("sortLabel")}
          </Label>
          <Select
            value={sortBy}
            onValueChange={(value: Value) => setSortBy(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("sortPlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">{t("sort.name")}</SelectItem>
              <SelectItem value="price-low">{t("sort.priceLow")}</SelectItem>
              <SelectItem value="price-high">{t("sort.priceHigh")}</SelectItem>
              <SelectItem value="rating">{t("sort.rating")}</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </CardContent>
    </Card>
  );
}
