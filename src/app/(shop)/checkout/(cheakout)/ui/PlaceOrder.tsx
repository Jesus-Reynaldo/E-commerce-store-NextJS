'use client'

import { placeOrder } from "@/actions"
import { useAddressStore, useCartStore } from "@/store"
import { currencyFormat } from "@/utils"
import clsx from "clsx"
import { sign } from "crypto"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


export const PlaceOrder = () => {
  const router = useRouter()
  const [loaded, setLoaded] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [isPlaceOrder, setIsPlaceOrder] = useState(false)
  const address = useAddressStore(state => state.address)

  const {itemsInCart, subTotal, tax, total } = useCartStore(state => state.getSummaryInformation())


  useEffect(() => {
    setLoaded(true)
  }, [])

  const cart = useCartStore(state => state.cart)
  const clearCart = useCartStore(state => state.clearCart)

  

  const onPlaceOrder = async () => {
    setIsPlaceOrder(true)

    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    const response = await placeOrder(productsToOrder, address)
    if(!response.ok){
      setIsPlaceOrder(false)
      setErrorMessage(response.message)
      return
    }

    clearCart()
    router.replace('/orders/'+response.order?.id)

    setIsPlaceOrder(false)
  }

  if(!loaded){
    return <p>Loading...</p>
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
            
    <h2 className="text-2xl font-bold">Direccion de entrega</h2>
    <div className="mb-10">
      <p className="text-xl">{address.firstName}, {address.lastName}</p>
      <p>{address.address}</p>
      <p>{address.address2}</p>
      <p>{address.zipCode}</p>
      <p>{address.city}, {address.country}</p>
      <p>{address.phone}</p>
    </div>

    {/* Divider */}
    <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

    <h2 className="text-2xl mb-2">Resumen de orden</h2>
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart === 1 ? '1 articulo':`${itemsInCart} artículos`}</span>

      <span>Subtotal</span>
      <span className="text-right">{ currencyFormat(subTotal) }</span>

      <span>Impuesto (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total:</span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
    <div className="mt-5 mb-2 w-full">
      <p className="mb-5">
        {/* Disclaimer */}
        <span className="text-xs">
          Al hacer clic en Colocar orden, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
        </span>
      </p>

      {/* Error message */}
      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

      <button
        className={
          clsx({
            "btn-primary": !isPlaceOrder,
            "btn-disabled": isPlaceOrder,
        })
        }
        onClick ={
          onPlaceOrder
        }
        //href="/orders/123"
      >
        Colocar Orden
      </button>
    </div>

  
  </div>
    
  )
}

