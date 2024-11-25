"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo registrar la direccion",
    };
  }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
  const storeAddress = await prisma.userAddress.findUnique({
    where: { userId },
  });

  console.log({ userId, address });
  const addressToSave = {
    userId: userId,
    firstName: address.firstName,
    lastName: address.lastName,
    address: address.address,
    address2: address.address2,
    zipCode: address.zipCode,
    city: address.city,
    phone: address.phone,
    countryId: address.country,
  };
  if (!storeAddress) {
    const newAdress = await prisma.userAddress.create({
      data: addressToSave,
    });
    return newAdress;
  }
  const uptadedAddress = await prisma.userAddress.update({
    where: { userId },
    data: addressToSave,
  });
  return uptadedAddress;
};
