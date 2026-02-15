export interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  status: "active" | "inactive";
  image?: string;
}
