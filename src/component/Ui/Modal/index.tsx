import { useEffect, useRef, useState } from "react";
import Styles from "./Modal.module.scss";

const Modal = ({ children, onClose }: { children: React.ReactNode; onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && isModalOpen) {
        setIsModalOpen(false);
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen, onClose]);

  return (
    <div className={Styles.modal}>
      <div className={Styles.modal_main} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
