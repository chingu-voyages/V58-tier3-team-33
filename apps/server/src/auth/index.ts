import argon2 from "argon2";
import { APIError, betterAuth, type BetterAuthOptions } from "better-auth";
import { Router } from "express";
import z from "zod";
import { ENV } from "../config/env.js";
import { makeDb } from "../database/db.js";

interface BetterAuthTablesConfig {
  user: BetterAuthOptions["user"];
  account: BetterAuthOptions["account"];
  session: BetterAuthOptions["session"];
  verification: BetterAuthOptions["verification"];
}

const authTablesConfig: BetterAuthTablesConfig = {
  user: {
    modelName: "users",
    fields: {
      emailVerified: "email_verified",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  account: {
    modelName: "accounts",
    fields: {
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      accessTokenExpiresAt: "access_token_expires_at",
      idToken: "id_token",
      refreshToken: "refresh_token",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  session: {
    modelName: "sessions",
    fields: {
      userId: "user_id",
      expiresAt: "expires_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
  verification: {
    modelName: "verifications",
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
};

const auth = betterAuth<BetterAuthOptions>({
  baseURL: ENV.server.ORIGIN,
  secret: ENV.auth.PASSWORD_PEPPER,
  database: {
    db: makeDb<never>(),
    type: "postgres",
    /*
    casing currently does nothing and is why authTablesConfig was added, see:
    https://github.com/better-auth/better-auth/issues/1027#issuecomment-3234230755
    TODO: update config when upgrading to a future version that changes things
    */
    casing: "snake",
    transaction: true,
  },
  ...authTablesConfig,
  emailAndPassword: {
    enabled: true,
    password: {
      hash(password) {
        return argon2.hash(password, {
          type: argon2.argon2id,
          memoryCost: 19 * 2 ** 10,
          timeCost: 2,
          parallelism: 1,
          secret: Buffer.from(ENV.auth.PASSWORD_PEPPER),
        });
      },
      verify({ hash, password }) {
        return argon2.verify(hash, password, {
          secret: Buffer.from(ENV.auth.PASSWORD_PEPPER),
        });
      },
    },
  },
});

const authRouter = Router();

authRouter.post("/sign-up", async (req, res) => {
  const { success, data: validated, error } = validateSignUpData(req.body);

  if (!success) {
    res.status(422).json({ message: "invalid input", errors: error });
    return;
  }

  const normalized = normalizeSignUpData(validated);

  try {
    const { headers, response } = await auth.api.signUpEmail({
      body: normalized,
      returnHeaders: true,
    });

    res.setHeaders(headers);
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      res.status(error.statusCode).json({ message: error.message });
      return;
    }

    res.status(500).json({ message: "internal server error" });
  }
});

authRouter.post("/sign-in", async (req, res) => {
  const { success, data: validated, error } = validateSignInData(req.body);

  if (!success) {
    res.status(422).json({ message: "invalid input", errors: error });
    return;
  }

  const normalized = normalizeSignInData(validated);

  try {
    const { headers, response } = await auth.api.signInEmail({
      body: normalized,
      returnHeaders: true,
    });

    res.setHeaders(headers);
    res.json(response);
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      // 401 is used for authorization purposes only
      const status = error.statusCode == 401 ? 400 : error.statusCode;
      res.status(status).json({ message: error.message });
      return;
    }

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
    name: z.string().trim().min(3),
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
  name: string;
  email: string;
  password: string;
}) {
  return {
    name: validatedData.name.trim(),
    email: validatedData.email.trim().toLocaleLowerCase(),
    password: validatedData.password,
  };
}
