"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth.config";

export const getOrderById = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if(!order) throw `${id} no existe`;

    if (session.user.role === "user") {
        if (session.user.id !== order.userId){
            throw `${id} no pertenece a ese usuario`
        }
    }

    return { ok: true, order: order };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};
