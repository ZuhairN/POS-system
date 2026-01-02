import { useEffect, useRef, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useCart, useSetCart } from '../../context/CartContext';
import ClearCartForm from './ClearCartForm';
import CartItem from '../molecules/CartItem';
import { GiShoppingCart } from 'react-icons/gi';

export default function CartContent() {
  const cancelModalRef = useRef(null);
  const itemsListRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const items = useCart() || [];
  const oldItemsCount = useRef(items.length);
  const dispatch = useSetCart();

  const currentIndex = useRef<number>(0);
  const itemsCount = items.length;

  const handleDeleteCart = () => {
    dispatch({ type: 'reset-cart' });
    cancelModalRef.current.closeModal();
  };

  useEffect(() => {
    const listItems = itemsListRef.current?.children;
    if (oldItemsCount.current < itemsCount) {
      currentIndex.current = 0;
      setIsActive(st => !st);
      listItems[0].focus();
    }
    oldItemsCount.current = items.length;
  }, [items]);
  useEffect(() => {
    const onKey = e => {
      if (!itemsCount) return;
      const listItems = itemsListRef.current?.children;
      if (!listItems || !listItems[currentIndex.current]) {
        currentIndex.current = 0;
        setIsActive(st => !st);
      }
      const prevItem = listItems[currentIndex.current - 1];
      const currentItem = listItems[currentIndex.current];
      const nextItem = listItems[currentIndex.current + 1];

      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currentIndex.current < 1) {
          e.preventDefault();
          currentItem.focus();
          return;
        }
        e.preventDefault();
        prevItem.focus();
        currentIndex.current--;
        setIsActive(st => !st);
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currentIndex.current >= itemsCount - 1) {
          e.preventDefault();
          currentItem.focus();
          return;
        }
        e.preventDefault();
        nextItem.focus();
        setIsActive(st => !st);
        currentIndex.current++;
      } else if (e.key === '+') {
        e.preventDefault();

        dispatch({ type: 'change-quantity', payload: { id: Number(currentItem.id), quantity: 1 } });
      } else if (e.key === '-') {
        e.preventDefault();
        if (items.find(item => item.id === Number(currentItem.id)).quantity < 2) {
          return dispatch({ type: 'remove-item', payload: { id: Number(currentItem.id) } });
        }
        dispatch({ type: 'change-quantity', payload: { id: Number(currentItem.id), quantity: -1 } });
      } else if (e.key === 'Delete' && !e.shiftKey) {
        if (currentIndex.current > 0) {
          e.preventDefault();
          prevItem.focus();
          setIsActive(st => !st);
          currentIndex.current--;
        } else {
          e.preventDefault();
          currentItem.focus();
        }
        dispatch({ type: 'remove-item', payload: { id: Number(currentItem.id) } });
      } else if (e.key === 'Delete' || e.key === 'Escape') {
        if (e.shiftKey) {
          e.preventDefault();
          cancelModalRef.current.openModal();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [itemsCount, items]);

  if (!items.length)
    return (
      <div className='p-16 flex flex-col gap-12  text-secondary  justify-center items-center border-l border-lineB'>
        <h2 className='text-[5rem] '>Empty Cart</h2>
        <GiShoppingCart className='text-[20rem] ' />
      </div>
    );

  return (
    <div className='py-16 flex flex-col overflow-hidden border-l border-lineB'>
      <div className='flex px-16 items-center'>
        <h2 className='text-xl'>Cart Items</h2>
        <button
          className='bg-primary self-end  text-surface-a rounded-full px-16 py-8 gap-8  ml-auto  flex justify-center items-center '
          onClick={() => cancelModalRef.current.openModal()}>
          <FaRegTrashAlt />
          Clear Cart
        </button>
      </div>
      <ul className='px-16 pb-12 pt-[2px] mt-10 overflow-y-auto flex flex-col gap-12 scrollbar-hide' ref={itemsListRef}>
        {items.map((item, i) => (
          <CartItem {...item} key={item.id} isActive={i === currentIndex.current} />
        ))}
      </ul>
      <ClearCartForm modalRef={cancelModalRef} onDelete={handleDeleteCart} />
    </div>
  );
}
