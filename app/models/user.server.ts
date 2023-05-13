import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import { prisma } from "~/db.server";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(
  email: User["email"],
  name: User["name"],
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      name,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  });
}

export async function editUserInfo({
  id,
  name,
  username,
  photoUser,
  backgroundUser,
  descriptionUser,
}: {
  id: User["id"];
  name: User["name"];
  username: User["username"] | null;
  photoUser: User["photoUser"] | null;
  backgroundUser: User["backgroundUser"] | null;
  descriptionUser: User["descriptionUser"] | null;
}) {
  return prisma.user.update({
    where: { id },
    data: {
      name,
      username,
      photoUser,
      backgroundUser,
      descriptionUser,
    },
  });
}

export function getUser({ userId: userId }: { userId: User["id"] }) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      photoUser: true,
      backgroundUser: true,
      descriptionUser: true,
    },
  });
}

export async function deleteUserByEmail(email: User["email"]) {
  return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(
  email: User["email"],
  password: Password["hash"]
) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    include: {
      password: true,
    },
  });

  if (!userWithPassword || !userWithPassword.password) {
    return null;
  }

  const isValid = await bcrypt.compare(
    password,
    userWithPassword.password.hash
  );

  if (!isValid) {
    return null;
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword;

  return userWithoutPassword;
}
