import type { User, Twit } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Twit } from "@prisma/client";


export function getTwits() {
  return prisma.twit.findMany();
}

