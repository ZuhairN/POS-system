import { useEffect, useRef, useState } from 'react';
import { BiCartDownload } from 'react-icons/bi';
import { IoCloseSharp } from 'react-icons/io5';
import { useParkSales, useSetParkSales } from '../../context/ParkSalesContext';
import ParkedSale from '../molecules/ParkedSale';
import Modal from './Modal';

export default function ParkedSaleList() {
  const [isActiveModal, setIsActiveModal] = useState(false);
  const modalRefs = useRef([]);
  const retrieveModalRef = useRef(null);
  const parkedSales = useParkSales();
  const { retrieveSale, cancelSale } = useSetParkSales();
  const onRetrieve = () => {
    if (!parkedSales.length) return;
    retrieveModalRef.current.openModal();
  };

  const handleClose = () => {
    retrieveModalRef.current.closeModal();
  };

  const handleKeyDown = e => {
    if (!e.shiftKey && e.key >= '1' && e.key <= '9') {
      if (parkedSales[Number(e.key) - 1]) {
        e.preventDefault();
        return retrieveSale(parkedSales[Number(e.key) - 1].id);
      }
    }
    if (/^(Digit|Numpad)[1-9]$/.test(e.code)) {
      const idx = Number(e.code.match(/^(?:Digit|Numpad)([1-9])$/)[1]) - 1;
      if (parkedSales[idx]) {
        return modalRefs.current[idx].openModal();
        // return cancelModalRef.current.openModal();
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.shiftKey && /^(Digit|Numpad)[1-9]$/.test(e.code)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.key === 'r' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.shiftKey) {
        e.preventDefault();
        retrieveModalRef.current.openModal();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <button
        className='relative overflow-hidden col-span-2 flex justify-center items-center gap-8 border-lineB  py-2 px-6 rounded-xl shadow-sm text-lg  border disabled:shadow-none disabled:opacity-75 disabled:cursor-not-allowed'
        disabled={!parkedSales.length}
        onClick={onRetrieve}>
        <BiCartDownload className='text-2xl' />
        <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
          <span className='-translate-x-[2.5px] -translate-y-[2px]'>R</span>
        </span>
        Retrieve Sale
      </button>
      <Modal
        className='mx-auto my-auto   rounded-sm '
        isModal
        id='RetrieveSale'
        setIsOpen={setIsActiveModal}
        ref={retrieveModalRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}>
        <div
          className='flex flex-col gap-[3rem] bg-surface-a p-32 pb-40  text-start max-h-[90vh] max-w-[90vw] overflow-x-auto'
          tabIndex={0}>
          <h2 className=' text-xl text-fire-opal flex gap-8  items-center leading-none'>Parked Sales</h2>

          <ul className='flex  gap-16 overflow-auto scrollbar-hide' key={`${isActiveModal}`}>
            {parkedSales.map((sale, i) => (
              <ParkedSale
                key={sale.id}
                {...sale}
                retrieveModalRef={retrieveModalRef}
                idx={i}
                ref={el => (modalRefs.current[i] = el)}
              />
            ))}
          </ul>
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
