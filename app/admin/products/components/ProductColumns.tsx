import { Tag, Image, Avatar, Button, Space, Tooltip } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, UserOutlined } from "@ant-design/icons";

import { Product } from "../types";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export const getProductColumns = (
  currentPage: number,
  pageSize: number,
  onEdit: (record: Product) => void,
  onDelete: (id: string) => void,
): ColumnsType<Product> => [
  /* INDEX */
  {
    title: "#",
    key: "index",
    width: 60,
    align: "center",
    render: (_value, _record, index) =>
      (currentPage - 1) * pageSize + index + 1,
  },

  /* IMAGE */
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    width: 80,
    align: "center",
    render: (image?: string) =>
      image ? (
        <Image
          src={`${IMAGE_BASE_URL}${image}`}
          width={45}
          height={45}
          preview={false}
          style={{
            objectFit: "cover",
            borderRadius: 6,
          }}
          alt="product"
        />
      ) : (
        <Avatar size={45} icon={<UserOutlined />} />
      ),
  },

  /* NAME */
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    render: (name: string) => (
      <Tooltip title={name}>
        <span>{name}</span>
      </Tooltip>
    ),
  },

  /* PRICE */
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    width: 110,
    align: "right",
    render: (price: number) => `$${price}`,
  },

  /* STOCK */
  {
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
    width: 120,
    align: "center",
    render: (stock: number) => {
      if (stock === 0) {
        return <Tag color="red">Out of Stock</Tag>;
      }
      if (stock < 5) {
        return <Tag color="orange">Low ({stock})</Tag>;
      }
      return <Tag color="green">{stock}</Tag>;
    },
  },

  /* CATEGORY (Hidden on mobile) */
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    responsive: ["md"], // hide on small screens
    ellipsis: true,
  },

  /* STATUS */
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
    align: "center",
    render: (status: "active" | "inactive") =>
      status === "active" ? (
        <Tag color="green">Active</Tag>
      ) : (
        <Tag color="red">Inactive</Tag>
      ),
  },

  /* ACTIONS */
  {
    title: "Actions",
    key: "actions",
    width: 120,
    align: "center",
    render: (_value, record) => (
      <Space size="small">
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
        />
        <Button
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onDelete(record._id)}
        />
      </Space>
    ),
  },
];
