import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
	NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
	BOT_TOKEN: z.string(),
    
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
	console.log(process.env.NODE_ENV);

	console.error("❌ Invalid environment variables", _env.error.format());

	throw new Error("Invalid environment variables");
}

export const env = _env.data;