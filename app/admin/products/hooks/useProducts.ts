import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { getProducts } from "../../../lib/adminBussiness/product";
import { Product } from "../types";

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  total: number;
  currentPage: number;
  pageSize: number;
  search: string;
  setSearch: (value: string) => void;
  fetchProducts: (page?: number, searchValue?: string) => Promise<void>;
}

export const useProducts = (): UseProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const [search, setSearch] = useState<string>("");

  const fetchProducts = useCallback(
    async (page = 1, searchValue = search) => {
      try {
        setLoading(true);

        const res = await getProducts(page, pageSize, searchValue);

        setProducts(res.data);
        setTotal(res.total);
        setCurrentPage(page);
      } catch (error: unknown) {
        if (error instanceof Error) {
          message.error(error.message);
        } else {
          message.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    },
    [pageSize, search]
  );

  useEffect(() => {
    fetchProducts(1, search);
  }, [search]);

  return {
    products,
    loading,
    total,
    currentPage,
    pageSize,
    search,
    setSearch,
    fetchProducts,
  };
};
