"use server";
import "server-only";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { prisma } from "../db/prisma";
import { saltAndHashPassword } from "../utils/utils";
import { loginSchema, signupSchema } from "../validation/validate-auth";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const validation = loginSchema.safeParse({ email, password });

  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    revalidatePath("/");
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong, Please try again later." };
      }
    }

    throw error;
  }
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const validation = signupSchema.safeParse({ email, password, name });

  if (!validation.success) {
    return { error: validation.error.errors[0].message };
  }

  const {
    email: validatedEmail,
    password: validatedPassword,
    name: validatedName,
  } = validation.data;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedEmail },
    });

    if (existingUser) {
      return { error: "User with this email already exists" };
    }

    const hashedPassword = saltAndHashPassword(validatedPassword);
    await prisma.user.create({
      data: { email: validatedEmail, name: validatedName, hashedPassword },
    });
  } catch (error) {
    console.error("failed to signup: ", error);
    return {
      error: `Failed to create account. Please try again. eror: ${error}`,
    };
  }

  revalidatePath("/");
}
