"use server";

import { VERSION } from "@/lib/config/version";

/**
 * This is a server action function that returns the version.
 *
 * It is used to get the version in the client side.
 */
export async function getVersion() {
  return VERSION;
}
