"use client";


import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(state => state.updateProductQuantity)
  const [loaded, setLoaded] = useState(false)
  const productsInCart = useCartStore((state) => state.cart);
  const removeProduct = useCartStore((state) => state.removeProduct)
  useEffect(() => {
    setLoaded(true)
  }, [])
  
  if(!loaded){
    return <p>Loading...</p>
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-2">
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={`Imagen de ${product.title}`}
            className="mr-5 rounded"
          />
          <div>
            <span>
              {product.size} - {product.title} ({product.quantity})
            </span>
            <p className="font-bold">{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  );
};
