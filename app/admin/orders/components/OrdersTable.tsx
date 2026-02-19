"use client";

import { Table, Select, Tag, Button, Space, message } from "antd";
import { EyeOutlined, FilePdfOutlined } from "@ant-design/icons";
import { updateOrderStatus } from "../../../lib/adminBussiness/ordersApi";

const { Option } = Select;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending":
      return "orange";
    case "Confirmed":
      return "blue";
    case "Shipped":
      return "purple";
    case "Delivered":
      return "green";
    case "Cancelled":
      return "red";

    default:
      return "default";
  }
};

export default function OrdersTable({ orders, onView, refreshOrders }: any) {
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      message.success("Status updated");
      refreshOrders();
    } catch {
      message.error("Failed to update status");
    }
  };

  const handleDownloadInvoice = async (id: string) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch(`${API_URL}/admin/orders/${id}/invoice`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to download invoice");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      message.error("Invoice download failed");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "_id",
      render: (id: string) => (
        <span style={{ fontWeight: 500 }}>#{id.slice(-6)}</span>
      ),
    },
    {
      title: "Customer",
      render: (record: any) => (
        <span style={{ fontWeight: 500 }}>{record.user?.name || "N/A"}</span>
      ),
    },
    {
      title: "Total",
      dataIndex: "totalAmount",
      render: (amount: number) => (
        <span style={{ fontWeight: 600 }}>₹{amount}</span>
      ),
    },
    {
      title: "Status",
      render: (record: any) => (
        <Space orientation="vertical" size={4}>
          <Tag color={getStatusColor(record.status)}>{record.status}</Tag>

          <Select
            size="small"
            value={record.status}
            style={{ width: 130 }}
            onChange={(value) => handleStatusChange(record._id, value)}
            disabled={record.status === "Delivered"}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Confirmed">Confirmed</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Space>
      ),
    },
    {
      title: "Action",
      render: (record: any) => (
        <Space>
          {/* View Button */}
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
            style={{
              borderRadius: 8,
              fontWeight: 500,
            }}
          >
            View
          </Button>

          {/* Invoice Button */}
          <Button
            icon={<FilePdfOutlined />}
            danger
            onClick={() => handleDownloadInvoice(record._id)}
            style={{
              borderRadius: 8,
              fontWeight: 500,
            }}
          >
            Invoice
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="_id"
      columns={columns}
      dataSource={orders}
      pagination={{
        pageSize: 5,
        showSizeChanger: false,
      }}
      scroll={{ x: true }}
      style={{
        background: "#fff",
        borderRadius: 12,
      }}
    />
  );
}
