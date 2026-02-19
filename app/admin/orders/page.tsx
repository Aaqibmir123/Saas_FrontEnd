"use client";

import { useEffect, useState } from "react";
import { getAdminOrders } from "../../lib/adminBussiness/ordersApi";
import OrdersTable from "./components/OrdersTable";
import OrderDetailsDrawer from "./components/OrderDetailsDrawer";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [open, setOpen] = useState(false);
  console.log("Orders:", orders);

  const fetchOrders = async () => {
    const res = await getAdminOrders();
    if (res.success) {
      setOrders(res.data);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleView = (order: any) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>Orders</h2>

      <OrdersTable
        orders={orders}
        onView={handleView}
        refreshOrders={fetchOrders}
      />

      <OrderDetailsDrawer
        open={open}
        onClose={() => setOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
