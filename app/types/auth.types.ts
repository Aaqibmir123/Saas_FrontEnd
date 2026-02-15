export type UserRole = "business_admin" | "customer";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  accessToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterCustomerPayload {
  name: string;
  email: string;
  password: string;
}

export interface RegisterBusinessPayload {
  name: string;
  email: string;
  password: string;
  businessName: string;
}
