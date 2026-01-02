'use client';
import Homepage from '@/components/templates/Homepage';
import ParkSalesProvider from '@/context/ParkSalesContext';
import CartProvider from '@/context/CartContext';

export default function Home() {
  return (
    <CartProvider>
      <ParkSalesProvider>
        <Homepage />
      </ParkSalesProvider>
    </CartProvider>
  );
}
