import { useImperativeHandle, useRef } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useParkSales, useSetParkSales } from '../../context/ParkSalesContext';
import readableTimeConverter from '../../utils/timestampProcessing';
import ClearCartForm from '../organisms/ClearCartForm';

export default function ParkedSale({ id, cartItems, customerName, timestamp, retrieveModalRef, idx, ref }) {
  const cancelModalRef = useRef(null);
  const { retrieveSale, cancelSale } = useSetParkSales();
  const parkedSales = useParkSales();
  const grandTotal = Number((cartItems.reduce((a, b) => a + b.price * b.quantity, 0) * 1.16).toFixed(2));
  const itemCount = cartItems.reduce((a, b) => a + b.quantity, 0);
  const time = readableTimeConverter(timestamp);

  const handleRetrieve = () => {
    retrieveSale(id);
    retrieveModalRef.current.closeModal();
  };
  const handleDeleteCart = () => {
    cancelSale(id);
    cancelModalRef.current.closeModal();
    if (parkedSales.length === 1) retrieveModalRef.current.closeModal();
  };
  useImperativeHandle(ref, () => ({
    openModal: cancelModalRef.current.openModal,
  }));

  return (
    <li className=' relative bg-surface-subtle rounded-sm flex flex-col  text-md w-[30rem] h-[26.5rem] shrink-0 overflow-hidden'>
      <span className='absolute w-[2.2rem] aspect-square orangeBtn  rounded-bl-[5rem] top-0 right-0 text-base text-surface-b flex items-start justify-center'>
        <span className='translate-x-[2px] -translate-y-[2px]'>{idx + 1}</span>
      </span>
      <div className='flex flex-col p-16 pb-[2rem] gap-[2rem] rounded-tl-sm rounded-tr-sm bg-surface-subtle overflow-hidden'>
        <div className='flex '>
          {' '}
          <div className='flex  items-center  gap-16  overflow-hidden'>
            <h3 className='text-md truncate w-[14ch] '>{customerName}</h3>
          </div>
          {/* <div className='flex  items-center gap-16 '>
            <AiOutlineDollarCircle className='text-[4rem]' />
            <h3 className='text-md'>${grandTotal}</h3>
          </div> */}
        </div>
        <ul className='grid gap-16 overflow-auto'>
          {cartItems.map(item => (
            <li className='text-md flex gap-12' key={item.id}>
              <span className='text-secondary'>x{item.quantity} </span> {item.title}
            </li>
          ))}
        </ul>
      </div>
      <div className=' grid grid-cols-[7rem_1fr] mt-auto'>
        <button
          className='flex justify-center bg-radial-[at_center] from-[#343a40] to-primary border-l border-b border-black p-12 py-[7px]  text-surface-b rounded-bl-sm '
          onClick={() => cancelModalRef.current.openModal()}>
          <HiOutlineTrash className='text-xl' />
        </button>{' '}
        <ClearCartForm modalRef={cancelModalRef} onDelete={handleDeleteCart} isParkedSale />
        <button
          className=' border-warning border-r border-b p-12 py-[7px] orangeBtn text-surface-b rounded-br-sm'
          onClick={handleRetrieve}>
          Retrieve Sale
        </button>
      </div>
      <div className='absolute top-16 right-16 text-secondary  items-center gap-16 '>
        <h3 className='text-md'>{time}</h3>
      </div>
    </li>
  );
}
