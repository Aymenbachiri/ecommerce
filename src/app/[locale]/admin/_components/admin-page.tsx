"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { mockAnalytics, mockCategories } from "@/lib/data/data";
import { ordersAtom, productsAtom } from "@/lib/store/store";
import type { ProductWithRelations } from "@/lib/types/types";
import { useAtom } from "jotai";
import {
  BarChart3,
  DollarSign,
  Edit,
  Package,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function AdminPage(): React.JSX.Element {
  const t = useTranslations("AdminPage");
  const [products, setProducts] = useAtom(productsAtom);
  const [orders] = useAtom(ordersAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<ProductWithRelations | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "/placeholder.svg?height=400&width=400",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: "/placeholder.svg?height=400&width=400",
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      id: editingProduct?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      category: formData.category,
      stock: Number.parseInt(formData.stock),
      image: formData.image,
      rating: editingProduct?.averageRating || 4.5,
      reviews: editingProduct?.reviews || 0,
      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingProduct) {
      setProducts(
        products.map((p) => (p.id === editingProduct.id ? productData : p)),
      );
      toast.success(t("ToastMessages.productUpdated"));
    } else {
      setProducts([...products, productData]);
      toast.success(t("ToastMessages.productCreated"));
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (product: ProductWithRelations) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.categories[0].category.name,
      stock: product.stock.toString(),
      image: product.images[0].url,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    toast.success(t("ToastMessages.productDeleted"));
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="mb-8 text-3xl font-bold">{t("Dashboard.title")}</h1>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.totalSales")}
              </CardTitle>
              <DollarSign className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockAnalytics.totalSales.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.totalOrders")}
              </CardTitle>
              <Package className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockAnalytics.totalOrders}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.products")}
              </CardTitle>
              <BarChart3 className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{products.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("Dashboard.avgOrderValue")}
              </CardTitle>
              <Users className="text-muted-foreground h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockAnalytics.averageOrderValue}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{t("ProductManagement.title")}</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t("ProductManagement.addProduct")}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingProduct
                        ? t("ProductManagement.editProduct")
                        : t("ProductManagement.addNewProduct")}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">
                        {t("ProductManagement.form.productName")}
                      </Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">
                        {t("ProductManagement.form.description")}
                      </Label>
                      <Textarea
                        id="description"
                        required
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">
                          {t("ProductManagement.form.price")}
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          required
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                        />
                      </div>

                      <div>
                        <Label htmlFor="stock">
                          {t("ProductManagement.form.stock")}
                        </Label>
                        <Input
                          id="stock"
                          type="number"
                          required
                          value={formData.stock}
                          onChange={(e) =>
                            setFormData({ ...formData, stock: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">
                        {t("ProductManagement.form.category")}
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCategories
                            .filter((c) => c.id !== "all")
                            .map((category) => (
                              <SelectItem
                                key={category.id}
                                value={category.slug}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full">
                      {editingProduct
                        ? t("ProductManagement.form.updateProduct")
                        : t("ProductManagement.form.createProduct")}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("ProductManagement.table.name")}</TableHead>
                  <TableHead>{t("ProductManagement.table.category")}</TableHead>
                  <TableHead>{t("ProductManagement.table.price")}</TableHead>
                  <TableHead>{t("ProductManagement.table.stock")}</TableHead>
                  <TableHead>{t("ProductManagement.table.status")}</TableHead>
                  <TableHead>{t("ProductManagement.table.actions")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell className="capitalize">
                      {product.categories[0].category.name}
                    </TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.stock > 0 ? "default" : "destructive"}
                      >
                        {product.stock > 0
                          ? t("ProductManagement.table.inStock")
                          : t("ProductManagement.table.outOfStock")}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
