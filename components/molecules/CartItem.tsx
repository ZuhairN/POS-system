import { HiOutlineTrash } from 'react-icons/hi';
import { TiMinus, TiPlus } from 'react-icons/ti';
import { useSetCart } from '../../context/CartContext';

export default function CartItem({ thumbnail, sku, title, quantity, id, price, isActive }) {
  const dispatch = useSetCart();
  const totalPrice = Number((price * quantity).toFixed(2));

  return (
    <li
      className='relative flex bg-surface-subtle rounded-sm h-[10rem] border border-line overflow-hidden shrink-0'
      tabIndex='0'
      id={id}>
      {isActive ? (
        <span className='absolute w-[2.2rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0'></span>
      ) : null}
      <img className='max-w-[9.9rem]' src={thumbnail} alt={sku} />
      <div className='flex w-full p-10 pt-12'>
        <div className='flex flex-col gap-10'>
          <h3 className='text-md'>{title}</h3>
          <div className='flex mt-auto'>
            <button
              className=' shadow-sm flex items-center w-40 aspect-square border border-lineB rounded-full justify-center'
              onClick={() =>
                quantity === 1
                  ? dispatch({ type: 'remove-item', payload: { id } })
                  : dispatch({ type: 'change-quantity', payload: { id, quantity: -1 } })
              }>
              {quantity === 1 ? <HiOutlineTrash className='text-xl' /> : <TiMinus />}
            </button>
            <span className='  flex text-lg justify-center rounded-lg w-40 aspect-square  items-center'>
              {quantity}
            </span>
            <button
              className=' shadow-sm flex items-center w-40 aspect-square border border-lineB rounded-full justify-center'
              onClick={() => dispatch({ type: 'change-quantity', payload: { id, quantity: 1 } })}>
              <TiPlus />
            </button>
          </div>
        </div>
        <div className='flex flex-col ml-auto justify-between'>
          <h3 className='text-md '>
            <span className='text-secondary'>Total </span>${totalPrice}
          </h3>
          <button
            className='bg-primary self-end  text-surface-a rounded-full w-40 aspect-square text-xl flex justify-center items-center '
            onClick={() => dispatch({ type: 'remove-item', payload: { id } })}>
            <HiOutlineTrash className='text-xl' />
          </button>
        </div>
      </div>
    </li>
  );
}
