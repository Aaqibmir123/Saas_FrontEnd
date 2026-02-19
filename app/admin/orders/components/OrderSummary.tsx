import { Card } from "antd";

export default function OrderSummary({ order }: any) {
  return (
    <Card>
      <h3>Shipping Details</h3>
      <p><strong>Name:</strong> {order.shippingAddress?.name}</p>
      <p><strong>Phone:</strong> {order.shippingAddress?.phone}</p>
      <p><strong>Address:</strong> {order.shippingAddress?.address}</p>
      <p><strong>City:</strong> {order.shippingAddress?.city}</p>
      <p><strong>Pincode:</strong> {order.shippingAddress?.pincode}</p>

      <hr style={{ margin: "16px 0" }} />

      <h3>Payment</h3>
      <p><strong>Method:</strong> {order.paymentMethod}</p>
      <p><strong>Status:</strong> {order.status}</p>

      <hr style={{ margin: "16px 0" }} />

      <h3>Summary</h3>
      <p><strong>Subtotal:</strong> ₹{order.subtotal}</p>
      <p><strong>Delivery:</strong> ₹{order.deliveryCharge}</p>
      <p><strong>Total:</strong> ₹{order.totalAmount}</p>
    </Card>
  );
}
