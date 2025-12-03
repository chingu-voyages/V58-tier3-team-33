import argon2 from "argon2";
import { Router } from "express";
import z from "zod";
import { ENV } from "../config/env.js";
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

    const passwordHash = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 19 * 2 ** 10,
      timeCost: 2,
      parallelism: 1,
      secret: Buffer.from(ENV.auth.PASSWORD_PEPPER),
    });

    await db
      .insertInto("users")
      .values({ full_name: fullName, email, password: passwordHash })
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

  const { email, password } = normalizeSignInData(validationResult.data);

  try {
    const db = makeDb<{ users: UserSchema }>();

    const existingUser = await db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!existingUser) {
      res.status(400).json({ message: "invalid credentials" });
      return;
    }

    const isPasswordValid = await argon2.verify(
      existingUser.password,
      password,
      {
        secret: Buffer.from(ENV.auth.PASSWORD_PEPPER),
      },
    );

    if (!isPasswordValid) {
      res.status(400).json({ message: "invalid credentials" });
      return;
    }

    res.status(200).json({ message: "user sign in success" });
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
