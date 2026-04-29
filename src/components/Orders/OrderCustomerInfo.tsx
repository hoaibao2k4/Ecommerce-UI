interface OrderCustomerInfoProps {
  userId: number;
  username: string;
  email: string;
  createdAt: string | Date;
}

export default function OrderCustomerInfo({
  userId,
  username,
  email,
  createdAt,
}: Readonly<OrderCustomerInfoProps>) {
  return (
    <div>
      <h3 className="font-bold text-lg border-b pb-2 mb-4 text-slate-800 italic">
        Customer Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 text-sm">
        <div>
          <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
            Customer ID
          </p>
          <p className="font-bold text-slate-700">#{userId}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
            Username
          </p>
          <p className="font-bold text-slate-800 text-base">{username}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
            Email Contact
          </p>
          <p className="font-bold text-primary underline underline-offset-4 decoration-primary/20">
            {email}
          </p>
        </div>
        <div>
          <p className="text-[10px] uppercase font-black text-slate-400 mb-1.5 tracking-widest">
            Order Date
          </p>
          <p className="font-bold text-slate-700">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
