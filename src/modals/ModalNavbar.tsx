import { ReactNode, useEffect, useRef } from 'react';
import { RemoveScrollBar } from 'react-remove-scroll-bar';

type Props = {
  className?: string;
  onClose: Function;
  children: ReactNode;
  isShown: boolean;
  isRight?: boolean;
  isBottom?: boolean;
};

function ModalNavbar(props: Props) {
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
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        props.onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <div
      className={`fixed right-0 top-0 z-50 flex h-screen w-full items-center bg-neutral-900 bg-opacity-75 ${props.className}`}
    >
      {!props.isRight && !props.isBottom && (
        <div
          className={`fixed top-0 z-50 h-screen w-[85%] overflow-y-auto bg-white duration-500 ${
            props.isShown ? `translate-x-0` : `-translate-x-full`
          } md:w-[50%] lg:w-[50%]`}
          ref={modalRef}
        >
          {props.isShown && <RemoveScrollBar />}
          {props.children}
        </div>
      )}
      {props.isRight && (
        <div
          className={`fixed top-0 z-50 h-screen w-[85%] overflow-y-auto bg-white duration-500 ${
            props.isShown ? `translate-x-0` : `translate-x-full`
          } md:w-[50%] lg:w-[50%]`}
          ref={modalRef}
        >
          {props.isShown && <RemoveScrollBar />}
          {props.children}
        </div>
      )}
      {props.isBottom && (
        <div
          className={`fixed bottom-0 z-50 h-[70%] w-screen overflow-y-auto bg-white duration-500 ${
            props.isShown ? `translate-y-0` : `translate-y-full`
          }`}
          ref={modalRef}
        >
          {props.isShown && <RemoveScrollBar />}
          {props.children}
        </div>
      )}
    </div>
  );
}

export default ModalNavbar;
