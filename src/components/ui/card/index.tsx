import Badge from "@/components/ui/badge";
import CustomButton from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { Link } from "react-router";

const DEFAULT_IMAGE = "/placeholder-images.jpg";

interface CardProps {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  stockQuantity?: number;
  imageUrl?: string;
}

export default function Card({
  id,
  name = "Item",
  description,
  price = 0,
  stockQuantity = 0,
  imageUrl,
}: Readonly<CardProps>) {
  const [imgSrc, setImgSrc] = useState(imageUrl || DEFAULT_IMAGE);
  const { handleAddToCart, handleBuyNow } = useCart();
  return (
    <div className="group relative w-full max-w-[280px] bg-white rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full shadow-sm">
      {/* 1. Image Area */}
      <div className="aspect-square w-full overflow-hidden bg-slate-50 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={name}
          onError={() => setImgSrc(DEFAULT_IMAGE)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* 2. Content */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        {/* Link overlay Card for click whole card */}
        <h3 className="font-semibold text-lg text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          <Link to={`/product/${id}`}>
            {/* inset-0: overlay */}
            <span className="absolute inset-0 z-0" aria-hidden="true" /> {name}
          </Link>
        </h3>

        <p className="text-sm text-muted line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-xl font-bold text-foreground">
            ${price.toLocaleString()}
          </span>
          <Badge variant={stockQuantity > 0 ? "success" : "danger"} size="lg">
            {stockQuantity > 0 ? `Available: ${stockQuantity}` : "Sold Out"}
          </Badge>
        </div>

        {/* 3. Actions - z-10 for overlap the overlay of link */}
        <div className="relative z-10 flex items-center gap-2 mt-4">
          <CustomButton
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => handleBuyNow({ id, name, price, quantity: 1, stockQuantity })}
            disabled={stockQuantity === 0}
          >
            Buy Now
          </CustomButton>
          <CustomButton
            variant="secondary"
            size="sm"
            className="px-3"
            onClick={() => handleAddToCart({ id, name, price, quantity: 1, stockQuantity })}
            disabled={stockQuantity === 0}
          >
            🛒
          </CustomButton>
        </div>
      </div>
    </div>
  );
}
