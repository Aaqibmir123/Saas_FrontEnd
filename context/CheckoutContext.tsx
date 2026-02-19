"use client";

import { createContext, useContext, useState } from "react";

const CheckoutContext = createContext<any>(null);

export const CheckoutProvider = ({ children }: any) => {
  const [shippingAddress, setShippingAddress] = useState<any>(null);

  return (
    <CheckoutContext.Provider value={{ shippingAddress, setShippingAddress }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => useContext(CheckoutContext);
