import ActionBtn from '../atoms/ActionBtn';
import Modal from './Modal';

export default function ClearCartForm({ onDelete, modalRef, isParkedSale, isInProgressSale }) {
  const title = isParkedSale ? 'Delete Parked Sale' : isInProgressSale ? 'Cancel Payment' : 'Clear Cart';
  const description = isParkedSale
    ? 'Permanently delete this parked sale and all its items? This action cannot be undone.'
    : isInProgressSale
    ? 'This sale hasn’t been paid yet. Canceling will void this transaction and return items to inventory.'
    : 'Remove all items from the cart? This action cannot be undone.';
  const confirmBtnTxt = isParkedSale ? 'Delete Sale' : isInProgressSale ? 'Cancel Sale' : 'Clear Cart';
  const cancelBtnTxt = isParkedSale ? 'Keep Sale' : isInProgressSale ? 'Continue Payment' : 'Keep Items';

  const handleEnter = e => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      return onDelete();
    }
  };
  return (
    <Modal
      className='mx-auto my-auto w-[calc(100%-3.2rem)] max-w-[48rem] rounded-6 rounded'
      isModal
      id='ClearCart'
      ref={modalRef}
      onKeyDown={handleEnter}>
      <div className='flex flex-col gap-24 bg-surface-a p-32 pb-40  text-center'>
        <h2 className='text-xl text-fire-opal'>{title}</h2>
        <p className='text-lg mb-10 -mt-10'>{description}</p>
        <div className='grid gap-16 '>
          <ActionBtn className='bg-primary text-surface-subtle ' type='button' onClick={() => onDelete()}>
            {confirmBtnTxt}
          </ActionBtn>
          <ActionBtn
            className='bg-slate-blue bg-opacity-10  bg-surface-b border border-lineB shadow-sm '
            type='button'
            onClick={() => modalRef.current?.closeModal()}
            tabIndex={-1}>
            {cancelBtnTxt}
          </ActionBtn>
        </div>
      </div>
    </Modal>
  );
}
