import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import Link from 'next/link';
import Image from 'next/image'
import { QuantitySelector } from '@/components'
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
]
export default function CheckOutPage() {
  return (
    <div className="flex  justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Order"/>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>
          {/* Items */}
          {
            productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-2">
                <Image src={`/products/${product.images[0]}`} 
                width={100} 
                height={100} 
                alt={`Imagen de ${product.title}`} 
                className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>{product.price} x 3</p>
                  <p className='underline font-bold'>Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))
          }
          </div>


          {/* Checkout */}

          <div className="bg-white rounded-xl shadow-xl p-7">
            
            <h2 className="text-2xl font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Shana Braun</p>
              <p>400 S Melrose Dr</p>
              <p>Vista</p>
              <p>California</p>
              <p>United States</p>
              <p>CP 92081</p>
              <p>(760) 967-7777</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 64,980</span>

              <span>Impuesto (15%)</span>
              <span className="text-right">$ 100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 164.980</span>

            </div>

            <div className="mt-5 mb-2 w-full">
              <p className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer clic en Colocar orden, aceptas nuestros <a href="#" className="underline">términos y condiciones</a> y <a href="#" className="underline">política de privacidad</a>
                </span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Colocar Orden
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}