import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import { getOrderById } from "@/actions";
import Image from "next/image";
import clsx from "clsx";
import { IoCartOutline } from "react-icons/io5";
import { redirect } from "next/navigation";
const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];
interface Props {
  params: {
    id: string;
  };
}
export default async function CheckOutPage({ params }: Props) {
  const { id } = params;
  //Todo: verficar
  const { ok, order } = await getOrderById(id);
  if (!ok) {
    redirect("/");
  }

  const address = order!.OrderAddress;

  // redirect(/)
  return (
    <div className="flex  justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": !order!.isPaid,
                  "bg-green-700": order!.isPaid,
                }
              )}
            >
              <IoCartOutline size={30} />
              <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "No pagado"}
                </span>
            </div>

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div key={item.product.slug} className="flex mb-2">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={`Imagen de ${item.product.title}`}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    {item.price} x {item.quantity}
                  </p>
                  <p className="underline font-bold">
                    Subtotal: ${item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
            

          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName}, {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.zipCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
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
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": !order!.isPaid,
                    "bg-green-700": order!.isPaid,
                  }
                )}
              >
                <IoCartOutline size={30} />
                <span className="mx-2">
                  {order?.isPaid ? "Pagada" : "Pendiente"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
