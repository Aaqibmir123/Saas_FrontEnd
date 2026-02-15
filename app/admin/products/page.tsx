"use client";

import {
  Table,
  Button,
  Typography,
  Row,
  Col,
  message,
  Popconfirm,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

import { useProducts } from "./hooks/useProducts";
import { getProductColumns } from "./components/ProductColumns";
import ProductModal from "./components/ProductModal";

import {
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../lib/adminBussiness/product";

import { Product } from "./types";
import type { UploadFile } from "antd/es/upload/interface";

const { Title } = Typography;

interface ProductFormValues {
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  status: "active" | "inactive";
  image?: UploadFile[];
}

export default function ProductsPage() {
  const {
    products,
    loading,
    total,
    currentPage,
    fetchProducts,
    pageSize,
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  /* ================= EDIT ================= */

  const handleEdit = (record: Product) => {
    setEditingProduct(record);
    setIsModalOpen(true);
  };

  /* ================= DELETE ================= */

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      message.success("Product deleted");
      fetchProducts(currentPage);
    } catch {
      message.error("Delete failed");
    }
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (key === "image" && value?.length) {
          formData.append(
            "image",
            value[0].originFileObj as Blob
          );
        } else {
          formData.append(key, String(value ?? ""));
        }
      });

      if (editingProduct) {
        await updateProduct(editingProduct._id, formData);
        message.success("Product updated");
      } else {
        await createProduct(formData);
        message.success("Product created");
      }

      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts(currentPage);
    } catch {
      message.error("Something went wrong");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* HEADER */}
      <Row
        justify="space-between"
        align="middle"
        style={{ marginBottom: 24 }}
      >
        <Col>
          <Title level={3} style={{ margin: 0 }}>
            Products
          </Title>
        </Col>

        <Col>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
          >
            Add Product
          </Button>
        </Col>
      </Row>

      {/* TABLE */}
      <Table
        columns={getProductColumns(
          currentPage,
          pageSize,
          handleEdit,
          handleDelete
        )}
        dataSource={products}
        rowKey="_id"
        loading={loading}
        scroll={{ x: 1000 }} // better than max-content
        pagination={{
          total,
          pageSize,
          current: currentPage,
          onChange: (page) => fetchProducts(page),
        }}
      />

      {/* MODAL */}
      <ProductModal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={handleSubmit}
        isEditing={!!editingProduct}
        initialValues={
          editingProduct
            ? {
                ...editingProduct,
                image: editingProduct.image,
              }
            : undefined
        }
      />
    </div>
  );
}
