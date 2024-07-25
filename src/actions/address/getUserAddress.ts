"use server";

import prisma from "@/lib/prisma";
import { Address } from "../../interfaces/address.interface";

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
        where: {userId}
    });

    if (!address) return null;

    const {countryId, address2, ...rest} = address;

    return {...rest, country: countryId, city: "Hola mundo", address2: address2? address2:" "}

  } catch (error) {
    console.log(error);
    return null
  }
};
