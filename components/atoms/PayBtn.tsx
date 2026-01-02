import { MdPayments } from 'react-icons/md';
import { useCart } from '../../context/CartContext';
import { useEffect, useRef } from 'react';
import PaymentMethodsModal from '../organisms/PaymentMethodsModal';

export default function PayBtn() {
  const paymentModal = useRef(null);
  const cartItems = useCart();
  const itemsCount = cartItems.reduce((a, b) => a + b.quantity, 0);
  const grandTotal = Number((cartItems.reduce((a, b) => a + b.price * b.quantity, 0) * 1.16).toFixed(2));

  const handleOpenModal = e => {
    paymentModal.current.openModal();
  };
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Enter' && itemsCount > 0) {
        e.preventDefault();
        paymentModal.current.openModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [itemsCount]);

  return (
    <>
      <button
        className={`flex relative overflow-hidden justify-center items-center bg-radial-[at_center]  ${
          grandTotal ? 'from-[#FF8C52] to-[#FF6B4A]' : 'from-[#FFB380] to-[#FF9A63]'
        } text-surface-b py-2 px-[2rem] rounded-xl shadow-sm  text-xl border border-lineC disabled:cursor-not-allowed disabled:opacity-75 disabled:border-none disabled:shadow-none `}
        disabled={!grandTotal}
        onClick={handleOpenModal}>
        {!grandTotal ? null : (
          <span className='absolute w-[4.2rem] aspect-square bg-surface-b text-warning rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
            <span className='-translate-x-[2.5px] translate-y-[5px]'>Ent</span>
          </span>
        )}
        {grandTotal ? (
          <span className='relative flex justify-center items-center gap-8'>
            <MdPayments className='text-2xl -ml-16' />
            Pay{' '}
            <span className='absolute -right-[.5rem] translate-x-[100%] bottom-0 text-sm'>
              {itemsCount} item{itemsCount > 1 ? 's' : ''}
            </span>
          </span>
        ) : (
          'Cart Still Empty'
        )}
      </button>
      <PaymentMethodsModal modalRef={paymentModal} />
    </>
  );
}
