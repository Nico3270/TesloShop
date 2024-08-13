"use server";
import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth.config";

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe estar autenticado como administrador",
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc"
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return {
    ok: true,
    orders: orders
  }
};


