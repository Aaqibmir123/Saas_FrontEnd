"use client";

import { List, Avatar } from "antd";

const IMAGE_BASE_URL = "http://localhost:5000/uploads/";

export default function OrderItemsList({ items }: any) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={items}
      renderItem={(item: any) => {
        const imageUrl = item.image
          ? `${IMAGE_BASE_URL}${item.image}`
          : undefined;

        return (
          <List.Item
            style={{
              padding: "16px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={imageUrl}
                  size={70}
                  shape="square"
                  style={{ borderRadius: 8 }}
                />
              }
              title={
                <span style={{ fontWeight: 600 }}>
                  {item.name}
                </span>
              }
              description={
                <div style={{ marginTop: 4 }}>
                  <div>Price: ₹{item.price}</div>
                  <div>Qty: {item.quantity}</div>
                  <div style={{ fontWeight: 500 }}>
                    Total: ₹{item.price * item.quantity}
                  </div>
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );
}
