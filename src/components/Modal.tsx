import { ReactNode, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

type Props = {
  className?: string;
  onClose: Function;
  children: ReactNode;
  isLeft?: boolean;
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
      className={`fixed left-0 top-0 z-50 flex h-screen w-full items-center bg-neutral-900 bg-opacity-75 ${props.className}`}
    >
      <div
        className={`fixed ${
          props.isLeft ? 'left' : 'right'
        }-0 top-0 z-50 h-screen w-[85%] overflow-y-auto bg-white md:w-[50%] lg:w-[50%]`}
        ref={modalRef}
      >
        <RemoveScrollBar />
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
