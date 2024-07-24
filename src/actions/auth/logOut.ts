"use server";

import { signOut } from "@/utils/auth.config";

export const logout = async () => {
  await signOut();
};