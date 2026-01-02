import { FaApple, FaCreditCard } from 'react-icons/fa';
import { GiCash } from 'react-icons/gi';
import Modal from './Modal';
import { useEffect, useRef, useState } from 'react';
import ConfirmPaymentModal from './ConfirmPaymentModal';

export default function PaymentMethodsModal({ modalRef }) {
  const [payMethod, setPayMethod] = useState('');
  const confirmModal = useRef(null);

  const handleOpenModal = payMethod => {
    setPayMethod(payMethod);
    confirmModal.current.openModal();
  };
  const handleConfirmPayment = () => {
    console.log(payMethod);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      return e.stopPropagation();
    }
    if (!e.shiftKey && e.key >= '1' && e.key <= '3') {
      e.preventDefault();
      const payment = e.key === '1' ? 'cash' : e.key === '2' ? 'creditCard' : 'applePay';
      return handleOpenModal(payment);
    }
  };

  return (
    <>
      <Modal
        className='transparent ml-auto mt-auto w-[calc(100%*(6/17))] h-[24.8vh] '
        isModal
        id='ClearCart'
        ref={modalRef}
        onKeyDown={handleKeyDown}
        tabIndex={0}>
        <div
          className='grid gap-16 grid-cols-3 text-xl font-medium bg-surface-b p-16  h-full  text-center'
          tabIndex={0}>
          <button
            className='relative flex px-8 py-4 gap-4 flex-col items-center justify-center border rounded border-lineB overflow-hidden  bg-surface-b shadow-sm'
            onClick={() => handleOpenModal('cash')}>
            <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
              <span className='-translate-x-[2.5px] -translate-y-[2px]'> 1</span>
            </span>
            <GiCash className='text-[4rem]' />
            Cash
          </button>
          <button
            className='relative flex px-8 py-4 gap-4 flex-col items-center justify-center border rounded overflow-hidden border-lineB  bg-surface-b shadow-sm'
            onClick={() => handleOpenModal('creditCard')}>
            <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
              <span className='-translate-x-[2.5px] -translate-y-[2px]'>2</span>
            </span>
            <FaCreditCard className='text-[4rem]' />
            Credit C.
          </button>
          <button
            className='relative flex px-8 overflow-hidden py-4 gap-4 flex-col items-center justify-center border rounded border-lineB  bg-surface-b shadow-sm'
            onClick={() => handleOpenModal('applePay')}>
            <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
              <span className='-translate-x-[2.5px] -translate-y-[2px]'>3</span>
            </span>
            <FaApple className='text-[4rem]' />
            Pay
          </button>
        </div>
      </Modal>
      <ConfirmPaymentModal
        onPayment={handleConfirmPayment}
        modalRef={confirmModal}
        parentModal={modalRef}
        payMethod={payMethod}
      />
    </>
  );
}
