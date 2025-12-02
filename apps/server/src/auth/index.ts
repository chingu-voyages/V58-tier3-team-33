import { Router } from "express";
import z from "zod";
import { makeDb } from "../database/db.js";

import type { Generated } from "kysely";

interface UserSchema {
  id: Generated<string>;
  full_name: string;
  email: string;
  password: string;
}

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const validationResult = validateSignUpData(req.body);

  if (!validationResult.success) {
    res
      .status(422)
      .json({ message: "invalid input", errors: validationResult.error });
    return;
  }

  const { fullName, email, password } = normalizeSignUpData(
    validationResult.data,
  );

  try {
    const db = makeDb<{ users: UserSchema }>();

    const existingUser = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (existingUser) {
      res.status(422).json({ message: "email in use" });
      return;
    }

    await db
      .insertInto("users")
      .values({ full_name: fullName, email, password })
      .execute();

    res.status(201).json({ message: "registration success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const validationResult = validateSignInData(req.body);

  if (!validationResult.success) {
    res
      .status(422)
      .json({ message: "invalid input", errors: validationResult.error });
    return;
  }

  const { email } = normalizeSignInData(validationResult.data);

  try {
    const db = makeDb<{ users: UserSchema }>();

    const existingUser = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!existingUser) {
      res.status(422).json({ message: "invalid credentials" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
  }
});

export default authRouter;

function validateSignInData(body: unknown) {
  const signInSchema = z.object({
    email: z.email(),
    password: z.string().min(8),
  });

  const { success, data, error } = signInSchema.safeParse(body);
  if (success) {
    return { success, data };
  }

  return { success, error: z.flattenError(error) };
}

function validateSignUpData(body: unknown) {
  const signUpSchema = z.object({
    fullName: z.string().trim().min(3),
    email: z.email(),
    password: z.string().min(8),
  });

  const { success, data, error } = signUpSchema.safeParse(body);
  if (success) {
    return { success, data };
  }

  return { success, error: z.flattenError(error) };
}

function normalizeSignInData(validatedData: {
  email: string;
  password: string;
}) {
  return {
    email: validatedData.email.trim().toLocaleLowerCase(),
    password: validatedData.password,
  };
}

function normalizeSignUpData(validatedData: {
  fullName: string;
  email: string;
  password: string;
}) {
  return {
    fullName: validatedData.fullName.trim(),
    email: validatedData.email.trim().toLocaleLowerCase(),
    password: validatedData.password,
  };
}
