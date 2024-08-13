"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/utils/auth.config";

export const getPaginatedUsers = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser usuario administrador",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return {
    ok: true,
    users: users,
  };
};
