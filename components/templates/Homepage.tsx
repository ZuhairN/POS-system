import { useCart } from '../../context/CartContext';
import ActionArea from '../organisms/ActionArea';
import CartContent from '../organisms/CartContent';
import ProductsGrid from '../organisms/ProductsGrid';
import CartSummary from '../organisms/CartSummary';

export default function Homepage() {
  const cartItems = useCart();
  return (
    <div className='grid grid-cols-[11fr_6fr] h-screen max-h-screen  bg-surface-b '>
      <ProductsGrid />
      <div
        className={`grid ${
          cartItems.length ? 'grid-rows-[5fr_1fr_2fr]' : 'grid-rows-[3fr_1fr]'
        } bg-surface-a  h-screen border-lineB`}>
        <CartContent />
        {cartItems.length ? <CartSummary /> : ''}
        <ActionArea />
      </div>
    </div>
  );
}
