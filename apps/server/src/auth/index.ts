import { Router } from "express";
import { makeDb } from "../database/db.js";
import { type Generated } from "kysely";

interface UserSchema {
  id: Generated<string>;
  name: string;
  email: string;
  password: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
}

interface SignInRequest {
  email: string;
  password: string;
}

const db = makeDb<{ Person: UserSchema }>();

const authRouter = Router();
authRouter.post("/sign-up", async (req, res) => {
  const { name, email, password }: SignUpRequest = req.body as SignUpRequest;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "missing input field(s)" });
  }

  try {
    const existingUser = await db
      .selectFrom("Person")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (existingUser) {
      return res.status(400).json({ message: "email in use" });
    }

    await db.insertInto("Person").values({ name, email, password }).execute();
    return res.status(201).json({ message: "registration success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const { email, password }: SignInRequest = req.body as SignInRequest;

  if (!email || !password) {
    res.status(400).json({ message: "missing input field(s)" });
    return
  }

  try {
    const existingUser = await db
      .selectFrom("Person")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();

    if (!existingUser) {
      res.status(400).json({ message: "user does not exist" });
      return
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error" });
    return
  }
});

export default authRouter;
