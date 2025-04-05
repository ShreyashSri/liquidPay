// lib/auth.ts

import { getServerSession } from "next-auth/next";
import { authOptions } from "./authOptions"; // adjust path if needed
import { redirect } from "next/navigation";

/**
 * Fetches the current session using NextAuth's getServerSession with custom auth options.
 */
export async function getSession() {
  return await getServerSession(authOptions);
}

/**
 * Returns the current user from the session.
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

/**
 * Middleware-like utility to protect pages/routes by checking for a valid session.
 * If no user is found, redirects to /login.
 */
export async function requireAuth() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}
