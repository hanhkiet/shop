import { ReactNode, useEffect, useRef } from 'react';

type Props = {
  className?: string;
  onClose: Function;
  children: ReactNode;
};

function Modal(props: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node))
      props.onClose();
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`fixed left-0 top-0 z-50 h-screen w-screen bg-neutral-900 bg-opacity-75 ${props.className}`}
    >
      <div className="w-fit rounded bg-white" ref={modalRef}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
