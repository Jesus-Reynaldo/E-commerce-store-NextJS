'use client'
import { QuantitySelector, SizeSelector } from '@/components'
import type { Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import { useState } from 'react';
import { CartProduct } from '../../../../../interfaces/products.interface';

interface Props{
  product: Product
}

export const AddToCart = ({product}:Props) => {
  const addProductToCart = useCartStore(state => state.addProductTocart)
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const addToCart =()=>{
    setPosted(true)
    if(!size) return

    const cartProduct: CartProduct ={
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)

  }
  return (
    <>
    {
      posted && !size && (
        <span className='mt-2 text-red-500'>
          De de seleccionar una talla
        </span>
      )
    }
        {/* Slector de tallas */}
        <SizeSelector
          selectedSize={size}
          availableSize={product.sizes}
          onSizeChanged={(size) => setSize(size)}
        />
        {/* Selector de Cantidad */}
        <QuantitySelector 
          quantity={quantity} 
          onQuantityChanged={setQuantity}
          />
        {/* Button */}
        <button className="btn-primary my-5" onClick={addToCart}>Agregar al carrito</button>
    </>
  )
}
