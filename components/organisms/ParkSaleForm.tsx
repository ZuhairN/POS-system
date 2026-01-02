import { useEffect, useRef, useState } from 'react';
import { GiSandsOfTime } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { v4 as uID } from 'uuid';
import { useCart, useSetCart } from '../../context/CartContext';
import { useParkSales, useSetParkSales } from '../../context/ParkSalesContext';
import ActionBtn from '../atoms/ActionBtn';
import Modal from './Modal';

export default function ParkSaleForm() {
  const parkModalRef = useRef(null);
  const textareaRef = useRef(null);
  const [customerName, setCustomerName] = useState('');
  const [nameError, setnameError] = useState(0);
  const dispatch = useSetCart();
  const cartItems = useCart();
  const { parkSale } = useSetParkSales();

  const onPark = () => {
    if (customerName.length === 0) {
      textareaRef.current.focus();
      return setnameError(1);
    }
    if (customerName.length < 3) {
      textareaRef.current.focus();
      return setnameError(2);
    }

    parkSale({ id: uID(), customerName: customerName, timestamp: Date.now(), cartItems });
    dispatch({ type: 'reset-cart' });
    setCustomerName('');
    setnameError(0);
    parkModalRef.current.closeModal();
  };

  const handleClose = () => {
    setCustomerName('');
    parkModalRef.current?.closeModal();
  };

  const handleEnter = e => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      return onPark();
    }
  };

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        parkModalRef.current.openModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        className='relative overflow-hidden flex items-center gap-8 col-span-2 justify-center border-lineB  py-2 px-6 rounded-xl shadow-sm text-lg  border '
        onClick={() => parkModalRef.current.openModal()}>
        <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
          <span className='-translate-x-[2.5px] -translate-y-[2px]'>P</span>
        </span>
        <GiSandsOfTime className='text-2xl' /> Park Sale{' '}
      </button>

      <Modal
        className='mx-auto my-auto w-[40vw]  rounded-sm '
        isModal
        id='ParkSale'
        ref={parkModalRef}
        onKeyDown={handleEnter}>
        <div className='flex flex-col gap-[3rem] bg-surface-a p-32 pb-40  text-start'>
          <h2 className='text-xl text-fire-opal'>Park Sale</h2>
          <p className='text-md  font-normal'>
            You are about to park this sale. Add the <span className='font-medium'>customer name</span> so it can be
            identified by the next person who continues this sale.
          </p>
          <div className='relative flex'>
            <input
              className=' rounded-sm shadow-sm text-md font-normal border-2 border-lineB  px-16 py-8 w-full'
              ref={textareaRef}
              onChange={evt => setCustomerName(evt.target.value)}
              value={customerName}
              rows={3}
              placeholder='Customer Name'
            />
            {!nameError ? (
              ''
            ) : nameError === 1 ? (
              <p className={`text-error absolute -top-[2.6rem] left-0 `}>Please add a name</p>
            ) : (
              <p className={`text-error absolute -top-[2.6rem] left-0 `}>3 character minimum</p>
            )}
          </div>
          <button
            className=' bg-opacity-10  bg-surface-b border border-lineB shadow-sm rounded-sm text-lg self-end px-[2rem] py-12'
            type='button'
            onClick={onPark}>
            Park Sale
          </button>
          <button
            className='absolute top-0 right-0 w-40 aspect-square bg-primary text-surface-a rounded-bl-sm text-2xl  flex justify-center items-center shadow-sm'
            type='button'
            onClick={handleClose}>
            <IoCloseSharp />
          </button>
        </div>
      </Modal>
    </>
  );
}
