import CustomButton from "@/components/ui/button";
import Modal from "@/components/ui/modal";

interface CartSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewHistory: () => void;
  onContinueShopping: () => void;
}

export default function CartSuccessModal({
  isOpen,
  onClose,
  onViewHistory,
  onContinueShopping,
}: Readonly<CartSuccessModalProps>) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Order Successful">
      <div className="text-center space-y-4 py-4 px-2">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-800">Thank you!</h3>
          <p className="text-slate-500">
            Your order has been received and is being processed.
          </p>
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <CustomButton onClick={onViewHistory}>
            View Order History
          </CustomButton>
          <CustomButton
            variant="secondary"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </CustomButton>
        </div>
      </div>
    </Modal>
  );
}
