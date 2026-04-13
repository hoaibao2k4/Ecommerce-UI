import CustomButton from "@/components/ui/button";
import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

interface ConfirmDialogProps {
  title?: string;
  message?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  isOpen?: boolean;
  isLoading?: boolean;
}
export default function ConfirmDialog({
  title,
  message,
  confirmText,
  onCancel,
  onConfirm,
  isOpen,
  isLoading,
}: Readonly<ConfirmDialogProps>) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // handle cancel (esc)
    const handleCancel = () => {
      if (onCancel) onCancel();
    };

    // handle click backdrop
    const handleClick = (e: MouseEvent) => {
      // if click on backdrop, close dialog
      if (e.target === dialog && onCancel) {
        onCancel();
      }
    };

    dialog.addEventListener("cancel", handleCancel);
    dialog.addEventListener("click", handleClick);

    return () => {
      dialog.removeEventListener("cancel", handleCancel);
      dialog.removeEventListener("click", handleClick);
    };
  }, [onCancel]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <dialog
      ref={dialogRef}
      className="bg-transparent border-none p-0 m-0 w-screen h-screen fixed inset-0 z-[999] backdrop:bg-black/40 backdrop:backdrop-blur-sm outline-none overflow-hidden flex items-center justify-center"
    >
      <div className="bg-soft-bg w-full max-w-sm rounded-[2rem] shadow-2xl p-8 border border-border/50 animate-in zoom-in duration-300 mx-4">
        <h2 className="text-2xl font-black text-foreground italic">{title}</h2>
        <p className="mt-3 text-slate-500 font-medium leading-relaxed italic">
          {message}
        </p>
        <div className="mt-8 flex gap-3 justify-end items-center">
          <CustomButton
            variant="ghost"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 rounded-xl font-bold"
          >
            Cancel
          </CustomButton>
          <CustomButton
            variant="danger"
            onClick={onConfirm}
            isLoading={isLoading}
            className="px-8 rounded-xl font-black shadow-lg shadow-danger/20"
          >
            {confirmText || "Confirm"}
          </CustomButton>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
