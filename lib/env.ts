import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, "Sanity Project ID Is Required"),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1, "Sanity Dataset Is Required"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

const serverSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "Resend API Key Is Required"),
  CONTACT_EMAIL: z.email("Invalid Contact Email"),
  DATABASE_URL: z.url("Invalid Database URL"),
  DIRECT_URL: z.url("Invalid Direct URL"),
});

const _clientEnv = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
  NODE_ENV: process.env.NODE_ENV,
};

const _serverEnv = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  DATABASE_URL: process.env.DATABASE_URL,
  DIRECT_URL: process.env.DIRECT_URL,
};

const parsedClientEnv = clientSchema.safeParse(_clientEnv);

if (!parsedClientEnv.success) {
  console.error(
    "❌ Invalid Environment Variables (Client):",
    parsedClientEnv.error.flatten((issue) => issue.message)
  );
}

let parsedServerEnv = {};
if (typeof window === "undefined") {
  const parsed = serverSchema.safeParse(_serverEnv);
  if (!parsed.success) {
    console.error(
      "❌ Invalid Environment Variables (Server):",
      parsed.error.flatten((issue) => issue.message)
    );
  } else {
    parsedServerEnv = parsed.data;
  }
}

export const env = {
  ...(parsedClientEnv.success ? parsedClientEnv.data : _clientEnv),
  ...parsedServerEnv,
} as z.infer<typeof clientSchema> & z.infer<typeof serverSchema>;
