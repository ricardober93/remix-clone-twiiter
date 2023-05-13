import type { User, Twit } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Twit } from "@prisma/client";

export function getTwits() {
  return prisma.twit.findMany({
    select: {
      id: true,
      body: true,
      createdAt: true,
      user: {
        select: {
          name: true,
          photoUser: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export function getTwitsById(userId: string) {
  return prisma.twit.findMany({
    where: { userId },
    select: {
      id: true,
      body: true,
      createdAt: true,
      user: {
        select: {
          name: true,
        },
      },
    },
  });
}

export function createTwit({
  body,
  userId,
}: Pick<Twit, "body"> & {
  userId: User["id"];
}) {
  return prisma.twit.create({
    data: {
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}
