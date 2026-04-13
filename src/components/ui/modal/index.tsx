import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
}: Readonly<ModalProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Sync native dialog state with isOpen prop
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  // Handle native ESC key and c
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault(); // Prevent default browser close to handle it via onClose
      if (onClose) onClose();
    };

    const handleClick = (e: MouseEvent) => {
      // If clicking exactly on the dialog (the backdrop), close it
      if (closeOnOverlayClick && e.target === dialog && onClose) {
        onClose();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onClose, closeOnOverlayClick]);

  if (!isOpen) return null;

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[999] bg-transparent p-0 m-0 w-full h-full flex items-center justify-center backdrop:bg-black/50 backdrop:backdrop-blur-sm open:animate-in open:fade-in duration-200"
    >
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${sizes[size]} overflow-hidden animate-in zoom-in duration-200 mx-4 flex flex-col max-h-[90vh]`}
      >
        {(title || showCloseButton) && (
          <div className="shrink-0 px-6 py-4 border-b border-border flex items-center justify-between">
            {title ? (
              <h2 id="modal-title" className="text-xl font-bold text-foreground">
                {title}
              </h2>
            ) : (
              <div />
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1 rounded-full hover:bg-background transition-colors text-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <IoMdClose size={24} />
              </button>
            )}
          </div>
        )}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </dialog>,
    document.body,
  );
}
