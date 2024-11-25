"use server";

import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      ok: false,
      message: "No hay a sesión de usuario",
    };
  }

  // 1. Obtener los productos
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });
  console.log({ products });
  // Calcular los montos
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
  console.log({ itemsInOrder });
  // Los totales de tx, subtotal y tax
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products?.find(
        (product) => product.id === item.productId
      );
      if (!product) throw new Error(`${item.productId} Producto no encontrado`);

      const subTotal = productQuantity * product.price;
      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;
      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );
  console.log({ subTotal, tax, total });

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      const updatedProductsPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0);
        return tx.product.update({
          where: {
            id: product.id,
          },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        });
      });

      const updatedProducts = await Promise.all(updatedProductsPromises ?? []);
      //Verficar valores negativos
      updatedProducts.forEach((product) => {
        if (product.inStock < 0)
          throw new Error(
            `Product ${product.title} no tiene inventario suficiente`
          );
      });

      const order = await tx.order.create({
        data: {
          userId: userId,
          subtotal: subTotal,
          tax: tax,
          total: total,
          itemsInOrder: itemsInOrder,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      const { country, ...restAddress } = address;

      const orderAddress = await tx.orderAddress.create({
        data: {
          countryId: country,
          orderId: order.id,
          firstName: restAddress.firstName,
          lastName: restAddress.lastName,
          address: restAddress.address,
          address2: restAddress.address2,
          zipCode: restAddress.zipCode,
          city: restAddress.city,
          phone: restAddress.phone,
        },
      });

      return {
        order: order,
        orderAddress: orderAddress,
      };
    });
    return {
      ok: true,
      order: prismaTx?.order,
      prismaTx: prismaTx,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};
