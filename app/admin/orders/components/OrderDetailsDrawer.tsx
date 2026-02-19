import { Drawer, Row, Col, Divider } from "antd";
import OrderItemsList from "./OrderItemsList";
import OrderSummary from "./OrderSummary";

export default function OrderDetailsDrawer({ open, onClose, order }: any) {
  if (!order) return null;

  return (
    <Drawer
      title={`Order #${order._id.slice(-6)}`}
      placement="right"
      onClose={onClose}
      open={open}
      width={window.innerWidth < 768 ? "100%" : 700}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <OrderItemsList items={order.items} />
        </Col>

        <Col span={24}>
          <Divider />
          <OrderSummary order={order} />
        </Col>
      </Row>
    </Drawer>
  );
}
