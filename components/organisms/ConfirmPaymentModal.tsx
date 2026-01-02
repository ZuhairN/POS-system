import { FaApple, FaCreditCard } from 'react-icons/fa';
import Modal from './Modal';
import { GiCash } from 'react-icons/gi';
import { useRef } from 'react';
import ClearCartForm from './ClearCartForm';
import { useSetCart } from '../../context/CartContext';

export default function ConfirmPaymentModal({ modalRef, payMethod, parentModal }) {
  const cancelSaleModal = useRef(null);
  const dispatch = useSetCart();

  const handleDeleteCart = () => {
    dispatch({ type: 'reset-cart' });
    cancelSaleModal.current.closeModal();
    modalRef.current.closeModal();
    parentModal.current.closeModal();
  };

  const handleConfirmation = targetPayMethod => {
    if (targetPayMethod === payMethod) {
      dispatch({ type: 'reset-cart' });
      modalRef.current.closeModal();
      parentModal.current.closeModal();
      alert('Happy New Yeeear!');
      return;
    }
    if (targetPayMethod === 'creditCard') return modalRef.current.closeModal();
    if (targetPayMethod === 'cash') return cancelSaleModal.current.openModal();
    if (targetPayMethod === 'applePay' && payMethod === 'cash') return cancelSaleModal.current.openModal();
    return modalRef.current.closeModal();
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return e.stopPropagation();
    }
    if (!e.shiftKey && e.key >= '1' && e.key <= '3') {
      e.preventDefault();
      const targetPayMethod = e.key === '1' ? 'cash' : e.key === '2' ? 'creditCard' : 'applePay';
      if (targetPayMethod === payMethod) {
        dispatch({ type: 'reset-cart' });
        modalRef.current.closeModal();
        parentModal.current.closeModal();
        return;
      }
      if (targetPayMethod === 'creditCard') return modalRef.current.closeModal();
      if (targetPayMethod === 'cash') return cancelSaleModal.current.openModal();
      if (targetPayMethod === 'applePay' && payMethod === 'cash') return cancelSaleModal.current.openModal();
      return modalRef.current.closeModal();
    }
  };

  return (
    <>
      <Modal
        className='transparent ml-auto mt-auto w-[calc(100%*(6/17))] h-[24.8vh] '
        isModal
        id='ClearCart'
        ref={modalRef}
        onKeyDown={handleKeyDown}>
        <div className='grid gap-16 grid-cols-3 text-xl font-medium bg-surface-b p-16  h-full  text-center'>
          <button
            className={`${
              payMethod === 'cash'
                ? 'bg-radial-[at_center] from-[#FF8C52] to-[#FF6B4A] text-surface-b font-semibold'
                : 'bg-radial-[at_center] from-primary to-[#020202] text-surface-b'
            } relative flex px-8 py-4 gap-4 flex-col items-center justify-center border rounded border-lineB overflow-hidden  bg-surface-b shadow-sm`}
            onClick={() => handleConfirmation('cash')}>
            <span
              className={`${
                payMethod === 'cash' ? 'bg-surface-b text-warning' : 'bg-surface-b text-primary!'
              } absolute w-[2.5rem] aspect-square   rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center`}>
              <span className='-translate-x-[2.5px] -translate-y-[2px]'> 1</span>
            </span>
            <GiCash className='text-[4rem]' />
            {payMethod === 'cash' ? 'Confirm' : 'Cancel Sale'}
          </button>
          <button
            className={`${
              payMethod === 'creditCard'
                ? 'bg-radial-[at_center] from-[#FF8C52] to-[#FF6B4A] text-surface-b font-semibold'
                : 'text-secondary'
            } relative flex px-8 py-4 gap-4 flex-col items-center justify-center border rounded border-lineB overflow-hidden  bg-surface-b shadow-sm`}
            onClick={() => handleConfirmation('creditCard')}>
            <span
              className={`${
                payMethod === 'creditCard' ? 'bg-surface-b text-warning!' : 'orangeBtn'
              } absolute w-[2.5rem] aspect-square   rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center`}>
              {' '}
              <span className='-translate-x-[2.5px] -translate-y-[2px]'>2</span>
            </span>
            <FaCreditCard className='text-[4rem]' />
            {payMethod === 'creditCard' ? 'Confirm' : 'Change Payment'}
          </button>
          <button
            className={`${
              payMethod === 'applePay'
                ? 'bg-radial-[at_center] from-[#FF8C52] to-[#FF6B4A] text-surface-b font-semibold'
                : payMethod === 'cash'
                ? 'bg-radial-[at_center] from-primary to-[#020202] text-surface-b'
                : 'text-secondary'
            } relative flex px-8 py-4 gap-4 flex-col items-center justify-center border rounded border-lineB overflow-hidden  bg-surface-b shadow-sm`}
            onClick={() => handleConfirmation('applePay')}>
            <span
              className={`${
                payMethod === 'creditCard'
                  ? 'orangeBtn'
                  : payMethod === 'cash'
                  ? 'bg-surface-b text-primary!'
                  : 'bg-surface-b text-warning'
              } absolute w-[2.5rem] aspect-square   rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center`}>
              {' '}
              <span className='-translate-x-[2.5px] -translate-y-[2px]'>3</span>
            </span>
            <FaApple className='text-[4rem]' />
            {payMethod === 'applePay' ? 'Confirm' : payMethod === 'cash' ? 'Cancel Sale' : 'Change Payment'}
          </button>
        </div>
      </Modal>
      <ClearCartForm modalRef={cancelSaleModal} onDelete={handleDeleteCart} isInProgressSale />
    </>
  );
}
