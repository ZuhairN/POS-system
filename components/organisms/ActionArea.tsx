import { FaHistory } from 'react-icons/fa';
import { FiMoreHorizontal } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import PayBtn from '../atoms/PayBtn';
import ParkSaleForm from './ParkSaleForm';
import ParkedSaleList from './ParkedSaleList';
import { RiDiscountPercentLine } from 'react-icons/ri';
import { LuNotebookPen } from 'react-icons/lu';

export default function ActionArea() {
  const cartItems = useCart();

  return (
    <div className='p-16 bg-surface-b border-t border-lineB grid gap-12 grid-rows-3 grid-cols-1'>
      <PayBtn />
      <div className='row-span-2 grid gap-12 grid-cols-3 '>
        {cartItems.length ? <ParkSaleForm /> : <ParkedSaleList />}
        <button
          className='relative overflow-hidden flex items-center gap-8  justify-center border-lineB  py-2 px-6 rounded-xl shadow-sm text-lg  border '
          onClick={() => alert('test')}>
          <FaHistory className='text-xl' />
          <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
            <span className='-translate-x-[2.5px] -translate-y-[2px]'>H</span>
          </span>
          History
        </button>
        <button
          className=' relative flex items-center gap-8  justify-center border-lineB  py-2 px-6 rounded-xl shadow-sm text-lg  border '
          onClick={() => alert('test')}>
          <RiDiscountPercentLine className='text-xl' />
          <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
            <span className='-translate-x-[2.5px] -translate-y-[2px]'>D</span>
          </span>
          Discount
        </button>
        <button
          className='relative flex items-center gap-8  justify-center border-lineB  py-2 px-6 rounded-xl shadow-sm text-lg  border '
          onClick={() => alert('test')}>
          <LuNotebookPen className='text-xl' />
          <span className='absolute w-[2.5rem] aspect-square orangeBtn  rounded-br-[5rem] top-0 left-0 text-base text-surface-b flex items-start justify-center'>
            <span className='-translate-x-[2.5px] -translate-y-[2px]'>N</span>
          </span>
          Note
        </button>
        <button
          className=' flex items-center gap-8  justify-center border-lineB  py-2 px-6 rounded-xl shadow-sm text-lg  border '
          onClick={() => alert('test')}>
          <FiMoreHorizontal className='text-xl' /> More
        </button>
      </div>
    </div>
  );
}
