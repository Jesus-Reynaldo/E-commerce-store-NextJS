'use server'

import { PayPalButtonCreateOrder } from "@paypal/paypal-js";

export const paypalCreateOrder = async():Promise<PayPalButtonCreateOrder> => {
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
  "intent": "CAPTURE",
  "purchase_units": [
    {
      "amount": {
        "currency_code": "USD",
        "value": "12.00"
      }
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
};
try{
  const response = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/order", requestOptions).then((response) => response.json());
  return response;
}
catch (error) {
  console.log(error);
  throw new Error('Failed to create PayPal order');
}

}