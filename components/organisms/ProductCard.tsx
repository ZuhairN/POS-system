import { useCart, useSetCart } from '../../context/CartContext';

export default function ProductCard({ product }) {
  const { id, title, price, thumbnail, sku } = product;
  const cartItems = useCart();
  const dispatch = useSetCart();

  const handleUpdateCart = () => {
    const item = cartItems.find(item => item.id === id);
    if (item) return dispatch({ type: 'change-quantity', payload: { id, quantity: 1 } });
    dispatch({ type: 'add-item', payload: product });
  };

  return (
    <div
      className='cursor-pointer flex px-8 py-4 flex-col items-center justify-center border rounded border-lineB  bg-surface-b shadow-sm'
      onClick={handleUpdateCart}>
      <img className='w-[15rem]' src={thumbnail} alt={sku} />
      <h3 className='text-md text-center'>{title}</h3>
      <h4 className='text-base text-center'>${price}</h4>
    </div>
  );
}
