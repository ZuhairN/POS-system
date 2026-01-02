import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function Modal(
  { className, id, children, isModal, setIsOpen, tabIndex = -1, ...otherProps },
  ref
) {
  'use no memo';
  const dialogRef = useRef(null);

  const openModal = () => {
    setIsOpen?.(true);
    if (isModal) return dialogRef.current!.showModal();
    return dialogRef.current!.show();
  };

  const closeModal = () => {
    dialogRef.current!.close();
  };

  const toggleModal = () => (dialogRef.current!.open ? closeModal() : openModal());

  const handleBackdrop = evt => {
    if (evt.target.id.includes('dialog')) closeModal();
  };

  useEffect(() => {
    if (isModal) return;
    if (setIsOpen) setIsOpen(dialogRef.current!.open);

    const handleClickOutside = evt => {
      evt.stopPropagation();
      const trgt = evt.target;
      const dialogDimensions = dialogRef.current?.getBoundingClientRect();

      if (trgt.nodeName === 'BUTTON') closeModal();
      if (dialogDimensions)
        if (
          evt.clientX < dialogDimensions.left ||
          evt.clientX > dialogDimensions.right ||
          evt.clientY < dialogDimensions.top ||
          evt.clientY > dialogDimensions.bottom
        ) {
          closeModal();
        }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isModal, closeModal, setIsOpen]);
  useEffect(() => {
    const dialog = dialogRef.current;
    dialog?.addEventListener('close', () => {
      setIsOpen?.(false);
    });
    return () => {
      dialog?.removeEventListener('close', () => setIsOpen?.(false));
    };
  }, [setIsOpen]);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
    toggleModal,
  }));

  return (
    <dialog
      className={className}
      id={`dialog ${id}`}
      ref={dialogRef}
      onClick={handleBackdrop}
      tabIndex={tabIndex}
      {...otherProps}>
      {children}
    </dialog>
  );
});
