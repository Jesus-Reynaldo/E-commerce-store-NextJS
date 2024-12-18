"use server";
import { revalidatePath } from 'next/cache';
import { PayPalOrderStatusResponse } from '../../interfaces/paypal.interface';
import prisma from "@/lib/prisma";

export const paypalCheckPayment = async (paypalTransasctionId: string) => {
  const authToken = await getPaypalBearerToken();
  console.log(authToken);
  if(!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autorizacion'
    }
  }
  const resp = await verifyPayPalPayment(paypalTransasctionId, authToken);
  if(!resp) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autorizacion'
    }
  }
  const {status, purchase_units} = resp;
  const {invoice_id: orderId} = purchase_units[0];
  if(status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'El pago no ha sido completado'
    }
  }
  try{
    console.log({status, purchase_units});
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    });
    revalidatePath(`/orders/${orderId}`);
    return {
      ok: true,
      message: 'El pago ha sido verificado'
    }
  }catch(error) {
    return {
      ok: false,
      message: '500 - Error al verificar el pago'
    }
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.NEXT_PUBLIC_PAYPAL_SECRET;
  const oauth2Url = process.env.NEXT_PUBLIC_PAYPAL_OAUTH_URL ?? '';
  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    `Basic ${base64Token}`
  );

  const raw = JSON.stringify({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: "100.00",
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,

  };
  try{
    const response = await fetch(oauth2Url, {...requestOptions, cache: 'no-cache'}).then((response) => response.json());
    return response.access_token;
  }
  catch (error) {
    console.log(error);
    return null
  }
}

const verifyPayPalPayment = async (paypalTransactionId: string, bearerToken: string):Promise<PayPalOrderStatusResponse|null> => {
  const paypalOrderUrl = `${process.env.NEXT_PUBLIC_PAYPAL_ORDERS_URL}/${paypalTransactionId}`
  const myHeaders = new Headers();
myHeaders.append(
  "Authorization", 
  `Bearer ${bearerToken}`
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};
try{
  const resp = await fetch(paypalOrderUrl, {...requestOptions, cache: 'no-cache'}).then((response) => response.json());
  return resp;
}catch (error) {
  console.log(error);
  throw new Error('Failed to verify PayPal payment');
}

}