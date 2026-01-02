import { useCart } from '../../context/CartContext';

export default function CartSummary() {
  const cartItems = useCart();
  const subTotal = Number(cartItems.reduce((a, b) => a + b.price * b.quantity, 0).toFixed(2));
  const grandTotal = Number((subTotal * 1.16).toFixed(2));
  return (
    <div className='bg-surface-a p-16 pt-0 flex flex-col gap-12  border-l border-lineB '>
      <div className='border-t-2 border-cancel border-dashed'></div>
      <div className='grid grid-cols-[3fr_2fr] gap-[3rem]'>
        <div className='grid text-lg text-secondary'>
          <h3 className='flex justify-between items-center'>
            Sub Total <span className=''> ${subTotal}</span>
          </h3>
          <h3 className='flex justify-between items-center'>
            Tax <span className=''> 16%</span>
          </h3>
        </div>
        <div className='flex flex-col gap-12 border-l-2 border-dashed pl-[3rem]'>
          <h2 className='text-xl '>Grand Total</h2>
          <h2 className='text-xl '>${grandTotal}</h2>
        </div>
      </div>
    </div>
  );
}
