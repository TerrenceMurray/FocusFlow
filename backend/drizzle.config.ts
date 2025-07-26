import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/common/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.POSTGRES_DB_URL ?? ""
    }
});